import { StyleSheet, Dimensions, Platform } from 'react-native';
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  appHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    elevation: 4, 
    shadowOpacity: 0.3, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowRadius: 2,
    marginBottom: 5,
  },
  appHeaderTitle: {
    marginLeft: Platform.OS === 'ios' ? -32 : 10,
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
  }, 
  colorCodeContainer:{
    flex: 1,
    marginTop: 20
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 10
  },
  icon:{
    marginRight: 10,
  }

});

export default styles;