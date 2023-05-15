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
    marginHorizontal: 10,
    height: 370,
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
    width: '80%',
  },
  preview: {
    marginTop: 25,
    width: '80%',
    height: 315,
    marginBottom: 30,
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
  label: {
    fontSize: 20,
    marginRight: 10,
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
});
