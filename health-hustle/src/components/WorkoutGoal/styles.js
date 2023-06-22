import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  safeAreaContainer: {
    flex: 1,
  },
  appHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 4,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    zIndex: 1
  },
  appHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default styles;