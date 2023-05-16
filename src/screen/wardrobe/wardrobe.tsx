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
import Section from '../../components/section/section';

export default function Wardrobe() {
  const { wardrobe } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

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

  const sections = wardrobe
    ? Object.entries(wardrobe).map(([key, value]) => (
        <Section
          key={key}
          showModal={showModal}
          selectItem={selectItem}
          section={value}
          sectionName={key}
        />
      ))
    : null;

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
      <View style={styles.pageHeadingWrapper}>
        <Text style={styles.pageHeading}>Wardrobe</Text>
      </View>
      <ScrollView style={styles.container}>
        {!wardrobe && <Text>No wardrobe found in database</Text>}
        {wardrobe && sections}
      </ScrollView>
    </SafeAreaView>
  );
}
