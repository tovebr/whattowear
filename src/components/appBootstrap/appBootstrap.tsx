import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, ReactNode } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { useAuth } from '../../contexts/authContext';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppBootstrapProps {
  children: ReactNode;
}
SplashScreen.preventAutoHideAsync();

export default function AppBootstrap({ children }: AppBootstrapProps) {
  const [fontLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  // const [authLoaded, setAuthLoaded] = useState(false);
  const { setUser, user, loadingUser, setLoadingUser } = useAuth();

  useEffect(() => {
    setLoadingUser(true);
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setLoadingUser(false);
      } else {
        setUser(null);
      }
    });

    const loginWithStorageInfo = async () => {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');

      if (email && password && email.length > 0 && password.length > 0) {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setLoadingUser(false);
    };

    if (!user) {
      loginWithStorageInfo();
    }

    return unSubscribe;
  }, []);

  if (!loadingUser) SplashScreen.hideAsync();

  return <>{children}</>;
}
