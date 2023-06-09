import {
  Text,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { styles } from '../login/login.styles';
import Logo from '../../components/logo/logo';
import Button from '../../components/button/button';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../../../firebase/config';
import { useHeaderHeight } from '@react-navigation/elements';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/authContext';
import { StatusBar } from 'expo-status-bar';

export default function Signup({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { loadingUser, setLoadingUser } = useAuth();

  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const confirmPasswordRef = useRef<TextInput | null>(null);

  const headerHeight = useHeaderHeight();

  const handleNewUser = async () => {
    setLoadingUser(true);
    if (email !== '' && password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        Alert.alert('Passwords do not match');
      } else {
        try {
          const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          await setDoc(doc(db, 'wardrobes', user.uid), {
            bottoms: [],
            tops: [],
            fullbody: [],
          });
          setLoadingUser(false);
        } catch (err: any) {
          console.log(err.message);
          Alert.alert('Unsuccessful', err.message);
          setLoadingUser(false);
        }
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
          <TextInput
            ref={emailRef}
            returnKeyType='next'
            style={styles.input}
            placeholder='Email'
            placeholderTextColor={'#969696'}
            keyboardType='email-address'
            textContentType='emailAddress'
            autoCapitalize='none'
            value={email}
            onChangeText={(value) => {
              setEmail(value);
            }}
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
          />
          <TextInput
            ref={passwordRef}
            returnKeyType='next'
            style={styles.input}
            placeholder='Password'
            placeholderTextColor={'#969696'}
            textContentType='password'
            value={password}
            onChangeText={(value) => setPassword(value)}
            onSubmitEditing={() => {
              confirmPasswordRef.current?.focus();
            }}
            secureTextEntry
          />
          <TextInput
            ref={confirmPasswordRef}
            returnKeyType='done'
            style={styles.input}
            placeholder='Confirm Password'
            placeholderTextColor={'#969696'}
            textContentType='password'
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
            secureTextEntry
          />
          <Button
            loading={loadingUser}
            title='Sign Up'
            onPress={handleNewUser}
          />
          <View style={styles.loginInfo}>
            <Text style={styles.register}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}
            >
              <Text style={[styles.register, styles.loginLink]}>
                Login here
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
