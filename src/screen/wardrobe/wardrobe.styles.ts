import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexGrow: 1,
    marginBottom: 80,
  },
  pageHeading: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  pageHeadingWrapper: {
    borderBottomColor: colors.darkest,
    borderBottomWidth: 2,
    width: '100%',
  },
  categoryHeadingWrapper: {
    borderBottomColor: colors.darkest,
    borderBottomWidth: 2,
    width: '90%',
    marginHorizontal: 20,
  },
});
