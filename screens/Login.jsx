import React from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSigninButton, GoogleSignin } from "@react-native-google-signin/google-signin";
import FacebookLogin from "../components/FacebookLogin";
import { View, StyleSheet } from "react-native";

const Login = () => {

    //Google login is not working properly, not found out what causes it, possibly some firebase auth issues. Use Facebook at the moment. 
    GoogleSignin.configure({
        webClientId: '111443027349-emkh02e8c3kff1vprp8s93lma39jvpud.apps.googleusercontent.com'
    });

    //Handle login when pushing button, get a idToken to authenticated
    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
      }

    return (
        <View style={styles.container}>
            <GoogleSigninButton
                onPress={onGoogleButtonPress}
                style={styles.googleButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
            />
            <FacebookLogin/>
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