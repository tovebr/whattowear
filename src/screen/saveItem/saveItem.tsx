import { View, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { styles } from './saveItem.styles';
import Button from '../../components/button/button';
import { SelectList } from 'react-native-dropdown-select-list';
import { db, storage } from '../../../firebase/config';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { useAuth } from '../../contexts/authContext';
import {
  arrayRemove,
  arrayUnion,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { getSection } from '../../utils/useCatgory';
import { ClothSections, SelectedItem } from '../../types/types';

interface SaveItemProps {
  updatePhoto?: (photo: any) => void;
  photo: any;
  newPhoto?: boolean;
  item?: SelectedItem;
  hideModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SaveItem({
  updatePhoto,
  photo,
  newPhoto,
  item,
  hideModal,
}: SaveItemProps) {
  const [category, setCategory] = useState<string | null>(
    item !== undefined ? item.clothing.category : null
  );
  const [color, setColor] = useState<string | null>(
    item !== undefined ? item.clothing.color : null
  );
  const [isLoading, setIsloading] = useState(false);
  const { user } = useAuth();

  const categories = [
    { key: 'pants', value: 'Pants' },
    { key: 'shirt', value: 'Shirt' },
    { key: 't-shirt', value: 'T-shirt' },
    { key: 'sweater', value: 'Sweater' },
    { key: 'cardigan', value: 'Cardigan' },
    { key: 'skirt', value: 'Skirt' },
    { key: 'dress', value: 'Dress' },
    { key: 'onepiecs', value: 'Onepiece' },
  ];

  const colors = [
    { key: 'blue', value: 'Blue' },
    { key: 'red', value: 'Red' },
    { key: 'green', value: 'Green' },
    { key: 'yellow', value: 'Yellow' },
    { key: 'white', value: 'White' },
    { key: 'black', value: 'Black' },
    { key: 'pink', value: 'Pink' },
    { key: 'purple', value: 'Purple' },
    { key: 'multiple', value: 'Multiple' },
    { key: 'other', value: 'Other' },
  ];
  const clothSection: ClothSections = getSection(category ? category : '');

  const updateDb = async (url?: string, imageId?: string) => {
    setIsloading(true);
    if (item !== undefined) deleteItem(false);

    if (user) {
      try {
        await setDoc(
          doc(db, 'wardrobes', user.uid),
          {
            [clothSection]: arrayUnion({
              id: item === undefined ? imageId : item.clothing.id,
              image: item === undefined ? url : item.clothing.image,
              category,
              color,
            }),
          },
          { merge: true }
        );
        updatePhoto && updatePhoto(null);
        hideModal && hideModal(false);
        setIsloading(false);
      } catch (error: any) {
        console.log(error.message);
        setIsloading(false);
      }
    } else {
      setIsloading(false);
    }
  };

  const deleteItem = async (deleteImage: boolean) => {
    setIsloading(true);
    if (item && user) {
      try {
        await updateDoc(doc(db, 'wardrobes', user.uid), {
          [clothSection === item.section ? clothSection : item.section]:
            arrayRemove({
              id: item.clothing.id,
              image: item.clothing.image,
              category:
                item.clothing.category === category
                  ? category
                  : item.clothing.category,
              color:
                item.clothing.color === color ? color : item.clothing.color,
            }),
        });

        if (deleteImage) {
          const storageRef = ref(storage, `${user?.uid}/${item.clothing.id}`);

          try {
            deleteObject(storageRef);
          } catch (error: any) {
            console.log(error.message);
          }
        }

        hideModal && hideModal(false);
        setIsloading(false);
      } catch (error: any) {
        console.log(error.message);
        setIsloading(false);
      } finally {
        return true;
      }
    }
  };

  const savePic = async () => {
    setIsloading(true);
    const blob: any = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', photo.uri, true);
      xhr.send(null);
    });

    try {
      const imageId = String(Date.now());
      const storageRef = ref(storage, `${user?.uid}/${imageId}`);
      const result = await uploadBytes(storageRef, blob);
      blob.close();
      const url = await getDownloadURL(storageRef);

      updateDb(url, imageId);
      Alert.alert('Success', 'Your photo was successfully uploaded!');
    } catch (error: any) {
      console.log(error.message);
      Alert.alert('Error', error.message);
    }

    setIsloading(false);
  };

  return (
    <>
      <StatusBar style='dark' />
      <ScrollView
        style={styles.optionsContainer}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <Image
          style={styles.preview}
          source={{
            uri: item?.clothing.image
              ? item?.clothing.image
              : 'data:image/jpg;base64,' + photo.base64,
          }}
        ></Image>
        <View style={styles.selectContainer}>
          <SelectList
            data={categories}
            setSelected={(value: string) => setCategory(value)}
            defaultOption={
              item !== undefined
                ? {
                    key: item.clothing.category,
                    value: item.clothing.category,
                  }
                : { key: '', value: '' }
            }
          />
        </View>
        <View style={styles.selectContainer}>
          <SelectList
            defaultOption={
              item !== undefined
                ? { key: item.clothing.color, value: item.clothing.color }
                : { key: '', value: '' }
            }
            data={colors}
            setSelected={(value: string) => setColor(value)}
          />
        </View>

        <View style={styles.buttons}>
          <Button
            title='Save'
            onPress={() => {
              item === undefined ? savePic() : updateDb();
            }}
            loading={isLoading}
          />
          <Button
            loading={isLoading}
            title={item === undefined ? 'Discard' : 'Delete'}
            onPress={() => {
              item === undefined
                ? updatePhoto && updatePhoto(null)
                : deleteItem(true);
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}
