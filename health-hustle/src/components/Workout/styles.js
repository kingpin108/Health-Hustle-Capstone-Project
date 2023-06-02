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
    justifyContent: 'flex-start',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EE7CDC',
  },
  buttonLabel: {
    fontSize: 16,
    marginLeft: 4,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 16,
    paddingTop: 10
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
});

export default styles;