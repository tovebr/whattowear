import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  cameraContainer: {
    justifyContent: 'flex-end',
    marginTop: 20,
    height: 400,
  },
  buttonContainer: {
    marginTop: 25,
    alignSelf: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 10,
  },
  preview: {
    marginTop: 20,
    width: '100%',
    height: 315,
    marginBottom: 30,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: colors.darkblue,
  },
  optionsContainer: {
    width: '80%',
    alignSelf: 'center',
  },
  select: {
    borderWidth: 1,
    borderColor: colors.darkblue,
    height: 45,
    width: '100%',
    borderRadius: 25,
    padding: 10,
  },
  selectContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  label: {
    fontSize: 20,
    marginRight: 10,
  },
});
