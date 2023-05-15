import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { Clothing } from '../../types/types';
import { styles } from './clothing.styles';
import { Feather } from '@expo/vector-icons';

interface CLothingProps {
  clothing: Clothing;
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
  section: string;
  selectItem: (item: Clothing, section: string) => void;
}

export default function ClothingItem({
  clothing,
  showModal,
  selectItem,
}: CLothingProps) {
  return (
    <TouchableWithoutFeedback onPress={() => showModal(true)}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {/* <Image style={styles.image} source={{ uri: clothing.image }} /> */}
          <View style={styles.image} />
          {/* <View style={styles.icons}>
          <Feather name='edit' size={24} color='black' />
          <Feather name='trash-2' size={24} color='black' />
        </View> */}
        </View>
        <Text style={styles.text}>{clothing.category}</Text>
        <Text style={styles.text}>{clothing.color}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
