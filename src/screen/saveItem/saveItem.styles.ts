import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 10,
    width: '80%',
  },
  preview: {
    marginTop: 20,
    width: '80%',
    height: 315,
    marginBottom: 20,
  },
  optionsContainer: {
    width: '100%',
    alignSelf: 'center',
  },

  selectContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    width: '80%',
  },
});
