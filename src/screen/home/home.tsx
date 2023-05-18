import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './home.styles';
import Button from '../../components/button/button';
import { Wardrobe } from '../../types/types';
import { Link } from '@react-navigation/native';

export default function Home() {
  const { user, wardrobe } = useAuth();

  const [outfit, setOutfit] = useState<Wardrobe>({
    fullbody: [],
    tops: [],
    bottoms: [],
  });

  const getRandomIndex = (max: number): number => {
    return Math.floor(Math.random() * max);
  };

  const randomOutfit = () => {
    const fullbody = Math.round(Math.random()) === 0 ? false : true;
    let tempOutfit: Wardrobe = { fullbody: [], tops: [], bottoms: [] };
    if (wardrobe) {
      if (fullbody && wardrobe.fullbody.length > 0) {
        if (wardrobe.fullbody.length === 1) {
          tempOutfit.fullbody.push(wardrobe.fullbody[0]);
        } else {
          tempOutfit.fullbody.push(
            wardrobe.fullbody[getRandomIndex(wardrobe.fullbody.length)]
          );
        }
      } else if (!fullbody) {
        for (const [key, value] of Object.entries(wardrobe)) {
          if (key !== 'fullbody' && value.length > 0) {
            tempOutfit[key].push(
              value[value.length === 1 ? 0 : getRandomIndex(value.length)]
            );
          }
        }
      }
    }

    setOutfit(tempOutfit);
  };

  useEffect(() => {
    randomOutfit();
  }, [wardrobe]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {!wardrobe && (
          <View style={styles.clothingContainer}>
            <Text style={styles.message}>Loading wardrobe...</Text>
          </View>
        )}

        {outfit.fullbody.length === 0 &&
        outfit.tops.length === 0 &&
        outfit.bottoms.length === 0 ? (
          <View style={styles.clothingContainer}>
            <Text style={styles.message}>No clothing found in wardrobe</Text>
            <Text style={styles.message}>
              <Link style={styles.link} to={{ screen: 'AddItem' }}>
                Click here
              </Link>{' '}
              to add clothing to your digital wardrobe
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.heading}>What to wear?</Text>
            <View style={styles.clothingContainer}>
              {outfit.fullbody.length === 1 && (
                <View style={styles.fullbody}>
                  <Image
                    style={styles.fullbody}
                    source={{ uri: outfit.fullbody[0].image }}
                  />
                </View>
              )}

              {outfit.fullbody.length === 0 && (
                <View style={styles.clothing}>
                  {outfit.tops.length === 1 && (
                    <Image
                      style={styles.clothing}
                      source={{ uri: outfit.tops[0].image }}
                    />
                  )}
                  {outfit.tops.length === 0 && (
                    <Text>No tops found in wardrobe</Text>
                  )}
                </View>
              )}

              {outfit.fullbody.length === 0 && (
                <View style={styles.clothing}>
                  {outfit.bottoms.length === 1 && (
                    <Image
                      style={styles.clothing}
                      source={{ uri: outfit.bottoms[0].image }}
                    />
                  )}
                  {outfit.bottoms.length === 0 && (
                    <Text>No bottoms found in wardrobe</Text>
                  )}
                </View>
              )}
            </View>
            <Button title='New outfit' onPress={randomOutfit} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
