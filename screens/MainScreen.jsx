import React from "react";
import { Text, View, Button } from "react-native";
import auth from "@react-native-firebase/auth";



const MainScreen = () => {
    const logUserOut = () => {
        auth().signOut().then(() => console.log("User signed out"));
    }

    return (
        <View>
            <Text>Hello there!</Text>
            <Button title="Sign out" onPress={logUserOut}>Sign Out</Button>
        </View>
    )
}

export default MainScreen;