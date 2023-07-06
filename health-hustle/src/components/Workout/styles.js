import { StyleSheet, Dimensions, Platform } from 'react-native';
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  appHeaderContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 4, 
    shadowOpacity: 0.3, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowRadius: 2,
  },
  appHeaderTitle: {
    marginLeft: Platform.OS === 'ios' ? -32 : 10,
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 15
  },
  backgroundImage: {
    height: windowWidth * 0.5,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'left',
  },
  button: {
    width: 120,
    height: 50,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EE7CDC',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginTop: 20,
    marginLeft: 16,
    paddingTop: 20,
    
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16,
  },
  image: {
    width: windowWidth * 0.45,
    height: windowWidth * 0.45,
    borderRadius: 10,
  },
  imgBodyFocus: {
    width: windowWidth * 0.45,
    height: windowWidth * 0.3,
    borderRadius: 10,
  },
  buttonContainer: {
    paddingTop: 20,
    paddingHorizontal: 10
  },
  buttonGoal:{
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    margin: 10,
    width: windowWidth * 0.25,
    marginHorizontal: 8,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  slideButtonContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  FABContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  fab: {
    margin: 10,
    right: 0,
    bottom: 0,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  
  

  
});

export default styles;