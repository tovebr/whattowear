import { View, Text } from 'react-native';
import React from 'react';
import { styles } from './logout.styles';
import Button from '../../components/button/button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../../firebase/config';
import { signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Logout() {
  const handleSignout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.message}>Are you sure you want to log out?</Text>
      <Button title='Log out' onPress={handleSignout} />
    </SafeAreaView>
  );
}
