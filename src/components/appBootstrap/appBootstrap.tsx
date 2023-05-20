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
import { auth, db } from '../../../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, onSnapshot } from 'firebase/firestore';

interface AppBootstrapProps {
  children: ReactNode;
}

SplashScreen.preventAutoHideAsync();

export default function AppBootstrap({ children }: AppBootstrapProps) {
  const [fontLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  const [authLoaded, setAuthLoaded] = useState(false);
  const { setUser, user, loadingUser, setLoadingUser, setWardrobe, wardrobe } =
    useAuth();

  useEffect(() => {
    setLoadingUser(true);
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    const loginWithStorageInfo = async () => {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');
      // email && (await AsyncStorage.removeItem('email'));
      // password && (await AsyncStorage.removeItem('password'));
      try {
        if (email && password && email.length > 0 && password.length > 0) {
          await signInWithEmailAndPassword(auth, email, password);
          // console.log('här');
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    if (!user) {
      loginWithStorageInfo();
    }

    return () => unSubscribe();
  }, []);

  // useEffect(() => {
  //   let unsub: Function = () => {};

  //   if (user) {
  //     try {
  //       const colRef = doc(db, 'wardrobes', user?.uid);
  //       unsub = onSnapshot(colRef, (doc) => {
  //         if (doc.exists() && doc.data()) {
  //           setWardrobe({
  //             tops: doc.data().tops,
  //             bottoms: doc.data().bottoms,
  //             fullbody: doc.data().fullbody,
  //           });
  //         }
  //       });
  //     } catch (error: any) {
  //       console.log(error.message);
  //     } finally {
  //       setLoadingUser(false);
  //       SplashScreen.hideAsync();
  //     }
  //   }
  //   return () => unsub();
  // }, [user]);

  useEffect(() => {
    setLoadingUser(true);
    let unsub: Function = () => {};

    if (user) {
      const colRef = doc(db, 'wardrobes', user?.uid);
      unsub = onSnapshot(colRef, (doc) => {
        if (doc.exists() && doc.data()) {
          setWardrobe({
            tops: doc.data().tops,
            bottoms: doc.data().bottoms,
            fullbody: doc.data().fullbody,
          });
        }
      });
    }

    setLoadingUser(false);
    return () => unsub();
  }, [user]);

  if (!loadingUser) SplashScreen.hideAsync();

  return <>{children}</>;
}
