import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  appHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column'
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
  headingDesign: {
    backgroundColor: 'rgba(155, 89, 182,0.5)',
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  textDesign: {
    backgroundColor: 'rgba(155, 89, 182,0.5)',
    height: 50,
    width: '85%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
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