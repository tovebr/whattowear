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
import { capitalizeWord } from '../../utils/getCapitalizedWord';

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
          <View style={styles.image} />
        </View>
        <Text style={styles.text}>{capitalizeWord(clothing.category)}</Text>
        <Text style={styles.text}>{capitalizeWord(clothing.color)}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
