import React, { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { TouchableOpacity, Text } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { Avatar, GiftedChat } from "react-native-gifted-chat";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/AntDesign';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await auth().signOut();
            console.log('User signed out successfully');
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                <TouchableOpacity style={{ marginRight: 10 }} onPress={handleLogout}>
                    <Icon name="logout" size={24} style={{ marginRight: 15 }} />
                </TouchableOpacity>
            }
        });
    }, [navigation]);

    useLayoutEffect(() => {
        const collectionRef = firestore().collection('chats');
        const unsubscribe = collectionRef
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                console.log('querySnapshot unsubscribe');
                const messages = querySnapshot.docs.map(doc => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user,
                }));
                setMessages(messages)
            });
        return unsubscribe;
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

        const {_id, createdAt, text, user} = messages[0];
        firestore().collection('chats').add({
            _id,
            createdAt,
            text,
            user
        });
    }, []);
    
    const user = auth().currentUser.uid;
    return (
        <GiftedChat 
        messages={messages}
        showAvatarForEveryMessage={false}
        showUserAvatar={true}
        messageContainerRef={{backgroundColor: '#fff'}}
        textInputStyle={{backgroundColor: '#fff', borderRadius: 20,}}
        onSend={messages => onSend(messages)}
        user={{_id: user, avatar: 'https://i.pravatar.cc/300'}}/>
    )
}

export default Chat;