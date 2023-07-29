import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  safeAreaContainer: {
    flex: 1,
  },
  genderButton: {
    padding: 5,
  },
  activeButton: {
    borderColor: '#000'
  },
  sideBar: {
    flex: 1,
    backgroundColor: 'white',
    elevation: 4,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    zIndex: 1,
    paddingTop: 10
  },
  mainContent: {
    flex: 4,
    backgroundColor: 'white',
  },
  appHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    marginTop: 20,
    position: 'absolute',
    top: 0,
    fontSize: 20,
    fontWeight: 'bold',
  },
  genderImage: {
    resizeMode: 'contain',
    width: 200,
    height: 200,
    marginVertical: 10
  },
  checkBox: {
    borderRadius: 20,
    marginBottom: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    marginBottom: 10,
  },
  typeRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  formImage: {
    resizeMode: 'contain',
    width: 300,
    height: 250,
    marginVertical: 10
  },
  typeImageContainer: {
    flex: 1,
    aspectRatio: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    overflow: 'hidden',
  },
  selectedType: {
    flex: 1,
    aspectRatio: 1,
    margin: 10,
    borderWidth: 2,
    borderColor: '#EE7CDC',
    borderRadius: 10,
    overflow: 'hidden',

  },
  focusAreaImage: {
    resizeMode: 'contain',
    width: 100,
    height: 200,
    marginVertical: 10,
    alignSelf: 'center'
  },
  typeImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  typeImage2: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  typeImageContainer2: {
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    overflow: 'hidden',
    width: 160,
    height: 160
  },
  sectionBottomMargin: {
    marginBottom: 20
  },
  radio: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
},
});

export default styles;