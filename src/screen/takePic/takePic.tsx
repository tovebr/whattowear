import { SafeAreaView, View, Text } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { styles } from './takePic.styles';
import Button from '../../components/button/button';
import { StatusBar } from 'expo-status-bar';

interface TakePicProps {
  updatePhoto: (photo: any) => void;
}

export default function TakePic({ updatePhoto }: TakePicProps) {
  const cameraRef = useRef<Camera | null>(null);
  const [hasCameraPermission, setCameraPermission] = useState<
    boolean | undefined
  >(undefined);
  const [hasMediaLibraryPermission, setMediaLibraryPermission] = useState<
    boolean | undefined
  >(undefined);

  useEffect(() => {
    const checkPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setCameraPermission(cameraPermission.status === 'granted');
      setMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    };
    checkPermissions();
  }, []);

  const takePic = async () => {
    let options = {
      quality: 0.2,
      base64: true,
      exif: false,
    };

    const newPhoto = await cameraRef.current?.takePictureAsync(options);
    updatePhoto(newPhoto);
  };

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <Text style={styles.heading}>
        Take a photo to add a new item of clothing!
      </Text>
      <Camera style={styles.cameraContainer} ref={cameraRef}></Camera>
      <View style={styles.buttonContainer}>
        <Button title='Take Pic' onPress={takePic} />
      </View>
    </SafeAreaView>
  );
}
