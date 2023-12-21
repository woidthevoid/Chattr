import React, { useEffect, useState } from "react";
import { Text, View, Button, FlatList, RefreshControl, ActivityIndicator } from "react-native";
import auth from "@react-native-firebase/auth";
import SignOutButton from "../components/SignOutButton";
import ChatMessage from "../components/ChatMessage";




const MainScreen = () => {

    const logUserOut = () => {
        auth().signOut().then(() => console.log("User signed out"));
    }

    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('chats')
            .orderBy('createdAt', 'asc')    // Sort by timestamp
            .limitToLast(50)                // Only retrieve the last 15 messages
            .onSnapshot(querySnapshot => {
                const chatsArr = [];
                querySnapshot.forEach(doc => {
                    const id = doc.id;
                    const data = doc.data();
                    // Add docId and chat data to chats array 
                    chatsArr.push({ id, ...data });
                });
                setChats(chatsArr);
                setLoading(false);
                setRefresh(false);
            });

        return () => {
            unsubscribe();
            setLoading(false);
        };
    }, [refresh]);

    const handleRefresh = () => {
        setRefresh(true);
    }

    if (loading) {
        return <ActivityIndicator />;  // Show loader while loading chats
    } else {
        const username = auth().currentUser.displayName;
    }

    return (
        <View>
            <View>
                <Text>{username}</Text>
                <SignOutButton handleClick={logUserOut} />
            </View>

            <View>
                <FlatList
                    data={chats}
                    renderItem={({ item }) => <ChatMessage key={item.id} chat={item} />}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            </View>
        </View>
    )
}

export default MainScreen;