import React from "react";
import { Button, TouchableOpacity, Text } from "react-native";
import auth from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import Icon from 'react-native-vector-icons/Entypo';

//A login button for facebook, using facebook sdk and login manager. 
const FacebookLogin = () => {
    async function onFacebookButtonPress() {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled login process';
        }

        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        return auth().signInWithCredential(facebookCredential);
    }

    //Returning a button with facebook logo, color and function for login
    return (
        <TouchableOpacity
            style={{
                height: 50,
                width: 220,
                backgroundColor: '#4267B2',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 10,
            }}
            onPress={onFacebookButtonPress}
        >
            <Icon name="facebook" size={30} color="#fff" />
            <Text style={{ color: '#fff', fontSize: 16, marginLeft: 10 }}>
                Sign in with Facebook
            </Text>
        </TouchableOpacity>
    )
}

export default FacebookLogin;

