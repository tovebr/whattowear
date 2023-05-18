import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    height: '100%',

    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    marginTop: 10,
  },
  clothingContainer: {
    height: 440,
    maxWidth: 200,
    justifyContent: 'center',
  },
  clothing: {
    backgroundColor: colors.darkblue,
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  fullbodyContainer: {
    backgroundColor: colors.darkblue,
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  fullbody: {
    height: 300,
    width: 200,
    resizeMode: 'cover',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 10,
  },
  link: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
});
