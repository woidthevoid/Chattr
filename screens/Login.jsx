import React from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSigninButton, GoogleSignin } from "@react-native-google-signin/google-signin";
import { View, StyleSheet } from "react-native";
import FacebookLogin from "../components/facebookLogin";

const Login = () => {

    GoogleSignin.configure({
        webClientId: '111443027349-emkh02e8c3kff1vprp8s93lma39jvpud.apps.googleusercontent.com'
    });

    const loginHandle = async () => {
        try {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            return auth().signInWithCredential(googleCredential);
        }
        catch (error) {
            console.log(error)
        }
    };

    return (
        <View style={styles.container}>
            <GoogleSigninButton
                onPress={loginHandle}
                style={googleButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
            />
            <FacebookLogin />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#151718',
        alignItems: 'center',
        justifyContent: 'center',
    },
    googleButton: {
        width: 225,
        height: 60
    },
});

export default Login;