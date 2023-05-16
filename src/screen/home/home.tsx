import { View, Text } from 'react-native';
import React, { useContext, useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './home.styles';
import Button from '../../components/button/button';

export default function Home() {
  const { user, wardrobe } = useAuth();

  const [fullbodyOutfit, setFullbodyOutfit] = useState(
    Math.round(Math.random()) === 0 ? false : true
  );

  const randomOutfit = () => {
    let outfit: Array<number> = [];
    if (fullbodyOutfit && wardrobe && wardrobe.fullbody.length > 0) {
      if (wardrobe.fullbody.length === 1) {
        outfit.push(0);
      } else {
        const index = Math.floor(
          Math.random() * (wardrobe.fullbody.length - 1)
        );
        console.log(index);
      }
    }
  };

  console.log(fullbodyOutfit);
  randomOutfit();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Random outfit</Text>
        {fullbodyOutfit && (
          <View style={[styles.fullbody, styles.clothing]}></View>
        )}
        {!fullbodyOutfit && (
          <>
            <View style={styles.clothing}></View>
            <View style={styles.clothing}></View>
          </>
        )}
        <Button title='New outfit' />
      </ScrollView>
    </SafeAreaView>
  );
}
