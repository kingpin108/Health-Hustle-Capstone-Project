import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  safeAreaContainer: {
    flex: 1,
  },
  card: {
    marginVertical: 10,
    width: 300
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  appHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    elevation: 4, 
    shadowOpacity: 0.3, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowRadius: 2, 
  },
});

export default styles;