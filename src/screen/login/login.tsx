import {
  Text,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { styles } from './login.styles';
import Logo from '../../components/logo/logo';
import Button from '../../components/button/button';
import { useHeaderHeight } from '@react-navigation/elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../contexts/authContext';
import { StatusBar } from 'expo-status-bar';

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef<TextInput | null>(null);
  const { loadingUser, setLoadingUser } = useAuth();

  // const authStuff = useAuth();
  const headerHeight = useHeaderHeight();

  const handleLogIn = async () => {
    setLoadingUser(true);
    if (email !== '' && password !== '') {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);

        // Extremly bad to store email and password in localstorage
        // TODO: make it work with safe token
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
        setLoadingUser(false);
      } catch (error: any) {
        Alert.alert('Unsuccessful', error.message);
        console.log(error);
        setLoadingUser(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.view, { flex: 1 }]}
      >
        <ScrollView>
          <Logo height={150} width={150} marginTop={60} marginBottom={40} />
          <Text style={styles.heading}>Welcome!</Text>
          <TextInput
            style={styles.input}
            placeholder='Email'
            placeholderTextColor={'#969696'}
            keyboardType='email-address'
            textContentType='emailAddress'
            autoCapitalize='none'
            value={email}
            onChangeText={(value) => setEmail(value)}
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
            returnKeyType='next'
          />
          <TextInput
            ref={passwordRef}
            style={styles.input}
            placeholder='Password'
            placeholderTextColor={'#969696'}
            textContentType='password'
            value={password}
            secureTextEntry
            onChangeText={(value) => setPassword(value)}
            returnKeyType='done'
          />
          <Button loading={loadingUser} title='Log In' onPress={handleLogIn} />
          <View style={styles.registerInfo}>
            <Text style={styles.register}>Not yet a user?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={[styles.register, styles.registerLink]}>
                Register here
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
