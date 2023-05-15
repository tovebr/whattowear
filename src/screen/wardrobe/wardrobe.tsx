import { View, Text } from 'react-native';
import React, { useState } from 'react';
import UpdateItem from '../../components/modal/updateItem';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../contexts/authContext';
import ClothingItem from '../../components/clothing/clothingItem';
import { styles } from './wardrobe.styles';
import { Clothing, SelectedItem } from '../../types/types';

export default function Wardrobe() {
  const { wardrobe } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  // console.log(wardrobe);

  const hideModal = () => {
    setIsVisible(false);
  };
  const showModal = (clothing: Clothing, section: string) => {
    setSelectedItem({ clothing, section });
    setIsVisible(true);
  };
  const selectItem = (clothing: Clothing, section: string) => {
    setSelectedItem({ clothing, section });
  };

  return (
    <SafeAreaView>
      {selectedItem && (
        <UpdateItem
          item={selectedItem}
          hideModal={hideModal}
          visible={isVisible}
        />
      )}
      <StatusBar style='dark' />
      <Text style={styles.pageHeading}>Wardrobe</Text>
      <ScrollView style={styles.container}>
        <Text style={styles.categoryHeading}>Tops</Text>
        <ScrollView style={styles.categorySection} horizontal={true}>
          {wardrobe &&
            wardrobe?.tops.length > 0 &&
            wardrobe?.tops.map((item, i) => (
              <ClothingItem
                key={i}
                clothing={item}
                section='tops'
                showModal={() => showModal(item, 'tops')}
                selectItem={selectItem}
              />
            ))}
        </ScrollView>
        <Text style={styles.categoryHeading}>Bottoms</Text>
        <ScrollView style={styles.categorySection} horizontal={true}>
          {wardrobe &&
            wardrobe?.bottoms.length > 0 &&
            wardrobe?.bottoms.map((item, i) => (
              <ClothingItem
                key={i}
                clothing={item}
                section='bottoms'
                selectItem={selectItem}
                showModal={() => showModal(item, 'bottoms')}
              />
            ))}
        </ScrollView>
        <Text style={styles.categoryHeading}>Fullbody</Text>
        <ScrollView style={styles.categorySection} horizontal={true}>
          {wardrobe &&
            wardrobe?.fullbody.length > 0 &&
            wardrobe?.fullbody.map((item, i) => (
              <ClothingItem
                key={i}
                clothing={item}
                section='fullbody'
                selectItem={selectItem}
                showModal={() => showModal(item, 'fullbody')}
              />
            ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
