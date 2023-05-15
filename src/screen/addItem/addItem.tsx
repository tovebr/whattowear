import { SafeAreaView, View, Text, Image, Alert } from 'react-native';
import React, { useState, useRef } from 'react';
import { styles } from './addItem.styles';
import { StatusBar } from 'expo-status-bar';
import TakePic from '../takePic/takePic';
import SaveItem from '../saveItem/saveItem';

export default function AddItem() {
  const [photo, setPhoto] = useState<any>();

  const updatePhoto = (photo: any) => {
    setPhoto(photo);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      {!photo && <TakePic updatePhoto={updatePhoto} />}
      {photo && <SaveItem updatePhoto={updatePhoto} photo={photo} newPhoto />}
    </SafeAreaView>
  );
}
