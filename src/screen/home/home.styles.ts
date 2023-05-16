import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    height: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
  },
  clothing: {
    backgroundColor: colors.darkblue,
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  fullbody: {},
});
