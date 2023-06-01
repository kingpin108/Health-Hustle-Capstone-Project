import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 16,
    paddingBottom: 10
  },
  imageContainer: {
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: 'hidden',
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
  dailyHeader: {
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