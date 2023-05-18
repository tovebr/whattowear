import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { styles } from './section.styles';
import ClothingItem from '../clothing/clothingItem';
import { Clothing } from '../../types/types';
import { capitalizeWord } from '../../utils/getCapitalizedWord';

interface SectionProps {
  section: Clothing[];
  showModal: (clothing: Clothing, section: string) => void;
  sectionName: string;
  selectItem: (item: Clothing, section: string) => void;
}

export default function Section({
  section,
  sectionName,
  showModal,
  selectItem,
}: SectionProps) {
  return (
    <>
      <View style={styles.sectionWrapper}>
        <View style={styles.categoryHeadingWrapper}>
          <Text style={styles.categoryHeading}>
            {capitalizeWord(sectionName)}
          </Text>
        </View>
        <ScrollView style={styles.categorySection} horizontal={true}>
          {section !== undefined &&
            section.length > 0 &&
            section.map((item, i) => (
              <ClothingItem
                key={i}
                clothing={item}
                section={sectionName}
                showModal={() => showModal(item, sectionName)}
                selectItem={selectItem}
              />
            ))}
          {(section === undefined || section.length < 1) && (
            <Text style={styles.message}>{`No ${sectionName} to display`}</Text>
          )}
        </ScrollView>
      </View>
    </>
  );
}
