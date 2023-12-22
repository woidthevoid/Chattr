import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const Home = () => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Icon name="search1" size={24} color={'#C5C5C7'} style={{ marginLeft: 15 }} />
            ),
            headerRight: () => (
                <Icon name="user" size={24} />
            ),
        })
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={navigation.navigate('Chat')}
                style={styles.chatButton}>
                <Icon name="wechat" size={24} color={"#FAFAFA"} />
            </TouchableOpacity>
        </View>
    )
}
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: "#fff",
    },
    chatButton: {
        backgroundColor: '#f57c00',
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#f57c00',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .9,
        shadowRadius: 8,
        marginRight: 20,
        marginBottom: 50,
    }
});