import {
  ScrollView,
  SafeAreaView,
  TextInput,
  View,
  Text,
  Image,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { styles } from './addItem.styles';
import Button from '../../components/button/button';
import { colors } from '../../utils/colors';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesome5 } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { SelectList } from 'react-native-dropdown-select-list';

export default function AddItem() {
  const cameraRef = useRef<Camera | null>(null);
  const [hasCameraPermission, setCameraPermission] = useState<
    boolean | undefined
  >(undefined);
  const [hasMediaLibraryPermission, setMediaLibraryPermission] = useState<
    boolean | undefined
  >(undefined);
  const [photo, setPhoto] = useState<any>('../../../assets/cocktail.png');

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [colorsOpen, setColorsOpen] = useState(false);
  const [category, setCategory] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const categories = [
    { label: 'Pants', value: 'pants' },
    { label: 'Shirt', value: 'shirt' },
  ];
  const colors = [
    { label: 'Blue', value: 'blue' },
    { label: 'Red', value: 'red' },
  ];

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
      quality: 0.5,
      base64: true,
      exif: false,
    };

    const newPhoto = await cameraRef.current?.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    const savePic = async () => {
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      setPhoto(null);
    };
    return (
      <View style={styles.optionsContainer}>
        <Image
          style={styles.preview}
          source={{ uri: 'data:image/jpg;base64,' + photo.base64 }}
        ></Image>
        <View style={styles.selectContainer}>
          <SelectList
            data={categories}
            setSelected={(value: any) => setCategory(value)}
          />
        </View>
        <View style={styles.selectContainer}>
          <SelectList
            data={colors}
            setSelected={(value: any) => setColor(value)}
          />
        </View>

        <View style={styles.buttons}>
          <Button title='Save' onPress={savePic} />
          <Button title='Discard' onPress={() => setPhoto(null)} />
        </View>
      </View>
    );
  }

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
    <View style={styles.container}>
      <Camera style={styles.cameraContainer} ref={cameraRef}></Camera>
      <View style={styles.buttonContainer}>
        <Button title='Take Pic' onPress={takePic} />
      </View>
    </View>
  );
}
