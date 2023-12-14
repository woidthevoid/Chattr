import React from "react";
import { Button } from "react-native";
import auth from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";

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

    return (
        <Button
            onPress={onFacebookButtonPress}
            title="Facebook Sign-In"
        />
    )
}

export default FacebookLogin;