import React, { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { Send, GiftedChat } from "react-native-gifted-chat";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

const Chat = () => {

    //define message state
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    //function to logout user with a button
    const handleLogout = async () => {
        try {
            await auth().signOut();
            console.log('User signed out successfully');
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    };

    //logout button with icon from vector icons 
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 10 }} onPress={handleLogout}>
                    <Icon name="sign-out" size={24} style={{ marginRight: 15 }} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    //Get messages stored in firestore and update state
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

    //Function for sending message and creating a new doc in firestore
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

        const { _id, createdAt, text, user } = messages[0];
        firestore().collection('chats').add({
            _id,
            createdAt,
            text,
            user
        });
    }, []);

    //Renders a send icon and icon for future implementing a image upload
    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon
                        name="paperclip"
                        style={{
                            marginBottom: 10,
                            marginRight: 10,
                            transform: [{ rotateY: '180deg' }],
                        }}
                        size={25}
                        color='blue'
                        tvParallaxProperties={undefined} />

                    <Icon
                        name="send"
                        style={{ marginBottom: 10, marginRight: 10 }}
                        size={25}
                        color='orange'
                        tvParallaxProperties={undefined} />
                </View>
            </Send>
        )
    }

    //Using GiftedChat component for making the chat and populating with messages. 
    const user = auth().currentUser.uid;
    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={false}
            showUserAvatar={true}
            messageContainerRef={{ backgroundColor: '#fff' }}
            textInputStyle={{ backgroundColor: '#fff', borderRadius: 20, }}
            onSend={messages => onSend(messages)}
            user={{ _id: user, avatar: 'https://i.pravatar.cc/300' }}
            renderSend={renderSend}
            alwaysShowSend={true}
            scrollToBottom
             />
    )
}

export default Chat;