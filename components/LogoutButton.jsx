import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await auth().signOut();
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default LogoutButton;
