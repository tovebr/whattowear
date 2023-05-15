import {
  View,
  Text,
  Modal as NativeModal,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { styles } from './updateItem.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { Clothing, SelectedItem } from '../../types/types';
import SaveItem from '../../screen/saveItem/saveItem';
// import { TouchableOpacity } from 'react-native-gesture-handler';

interface UpdateItemProps {
  // clothing: Clothing;
  hideModal: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
  item: SelectedItem;
}

export default function Update({ hideModal, visible, item }: UpdateItemProps) {
  return (
    <NativeModal
      animationType={'slide'}
      visible={visible}
      onRequestClose={() => console.log('close')}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => hideModal(false)}
        >
          <AntDesign name='closecircleo' size={30} color='black' />
        </TouchableOpacity>
        {/* <View style={styles.contentContainer}> */}
        <SaveItem
          photo={item.clothing.image}
          item={item}
          hideModal={hideModal}
        />
        {/* </View> */}
      </View>
    </NativeModal>
  );
}
