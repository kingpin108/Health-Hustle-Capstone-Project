import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  appHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    elevation: 4,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    zIndex: 1
  },
  appHeaderTitle: {
    alignSelf: 'stretch',
    fontSize: 20,
    fontWeight: 'bold',
  },
  row_container: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: 20,
  },
  column_container: {
    flex: 1,
    flexDirection: 'column'
  },
  demoImage: {
    flex: 0.7,
    width: '40%',
    height: '100%',
    alignSelf: 'center',
  },
  stepCountCircle: {
    borderWidth: 2, 
    borderColor: '#EE7CDC', 
    alignSelf: 'center', 
    paddingVertical: 10, 
    paddingHorizontal: 18, 
    borderRadius: 25,
    fontWeight: '700',
    margin: 10,
    alignItems: 'center',
  },
});

export default styles;