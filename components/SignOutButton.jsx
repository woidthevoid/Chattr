import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native-reanimated/lib/typescript/Animated";

const SignOutButton = ({ handleClick }) => {
    return (
        <TouchableOpacity onPress={handleClick}>
            <Text>Sign Out</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        fontWeight: '600',
        color: '#030303',
    },
});

export default SignOutButton;