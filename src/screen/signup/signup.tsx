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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import { useHeaderHeight } from '@react-navigation/elements';

export default function Signup({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const confirmPasswordRef = useRef<TextInput | null>(null);

  const headerHeight = useHeaderHeight();

  const handleNewUser = async () => {
    if (email !== '' && password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        Alert.alert('Passwords do not match');
      } else {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          navigation.navigate('Login');
          Alert.alert('Successfully registered, proceed to log in');
        } catch (err: any) {
          console.log(err.message);
          Alert.alert('Unsuccessful', err.message);
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.view, { flex: 1 }]}
      >
        <ScrollView>
          <Logo height={150} width={150} />
          <TextInput
            ref={emailRef}
            returnKeyType='next'
            style={styles.input}
            placeholder='Email'
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
            textContentType='password'
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
            secureTextEntry
          />
          <Button title='Sign Up' onPress={handleNewUser} />
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
