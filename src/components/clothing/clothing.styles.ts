import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 200,
    marginBottom: 20,
    marginRight: 20,
  },
  imageContainer: {
    backgroundColor: colors.darkblue,
    width: 150,
    height: 150,
  },
  image: {
    width: '100%',
    height: '100%',
  },

  // icons: {
  //   position: 'absolute',
  //   top: 5,
  //   right: 5,
  //   flexDirection: 'row',
  //   width: '35%',
  //   justifyContent: 'space-between',
  //   backgroundColor: '#ffffffd9',
  // },
  text: {
    fontSize: 20,
  },
});
