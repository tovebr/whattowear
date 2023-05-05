import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.lightest,
    flex: 1,
    flexGrow: 1,
  },
  view: {
    width: '80%',
  },
  heading: {
    color: colors.darkblue,
    fontSize: 40,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    fontSize: 20,
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginBottom: 20,
    flex: 1,
  },
  button: {
    backgroundColor: colors.darkblue,
  },
  registerInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  register: {
    color: colors.darkblue,
    fontSize: 20,
    paddingTop: 15,
    marginRight: 5,
  },
  registerLink: {
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  loginInfo: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  loginLink: {
    paddingTop: 5,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});
