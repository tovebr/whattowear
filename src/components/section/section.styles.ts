import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  sectionWrapper: { marginTop: 30 },
  categoryHeadingWrapper: {
    borderBottomColor: colors.darkest,
    borderBottomWidth: 2,
    width: '90%',
    marginHorizontal: 20,
  },
  categoryHeading: {
    fontSize: 30,
  },
  categorySection: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginVertical: 20,
    minHeight: 80,
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
  message: {
    paddingLeft: 5,
    alignSelf: 'center',
  },
});
