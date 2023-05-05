import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { useAuth } from '../../contexts/authContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

export default function Home() {
  const { user } = useAuth();
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>{user?.email}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
