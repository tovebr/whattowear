import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffd9',
    // paddingVertical: 25,
    // paddingHorizontal: 20,
    height: '100%',
  },
  iconContainer: {
    // position: 'absolute',
    // top: 30,
    // right: 25,
    alignSelf: 'flex-end',
    marginRight: 25,
    marginTop: 30,
    height: 30,
    width: 30,
  },

  contentContainer: {
    paddingTop: 15,
  },
});
