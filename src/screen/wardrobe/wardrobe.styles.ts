import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexGrow: 1,
    marginBottom: 100,
  },
  pageHeading: {
    fontSize: 40,
    textAlign: 'center',
    marginVertical: 20,
  },
  categoryHeading: {
    paddingHorizontal: 20,
    fontSize: 30,
  },
  categorySection: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginVertical: 20,
  },
  modal: {
    height: '90%',
    width: '90%',
    backgroundColor: colors.darkblue,
    borderWidth: 2,
    borderColor: 'black',
  },
  modalIn: {
    backgroundColor: colors.blue,
    height: '50%',
    width: '50%',
  },
});
