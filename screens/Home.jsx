import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, Button, FlatList, RefreshControl, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";

const Home = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Button title="Go to Chat" onPress={() => navigation.navigate("Chat")} />
        </View>
    )
}

export default Home;