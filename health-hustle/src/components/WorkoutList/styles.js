import { StyleSheet, Platform,Dimensions } from 'react-native';
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
        alignSelf: 'stretch',
        fontSize: 20,
        fontWeight: 'bold',
      },
      titleTime:{
        marginLeft: 20,
        marginTop: 5
      },
      titleInstruction:{
        marginVertical: 10,
        marginLeft: 20,
        fontWeight: 'bold',
      },
      textInstruction:{
        marginLeft: 20,
      },
      itemContainer: {
        elevation: 4, 
        shadowOpacity: 0.3, 
        shadowOffset: { width: 0, height: 2 }, 
        shadowRadius: 2, 
        marginHorizontal: 20,
        marginVertical: 5,
        backgroundColor: 'white',
        borderRadius: 10,
      },
      listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,  
      },
      image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 20,
        resizeMode: 'contain'
      },
      textContainer: {
        flex: 1,
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
  
      description: {
        fontSize: 14,
        color: 'gray',
      },
  
      duration: {
        fontSize: 12,
        color: 'gray',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButton: {
        marginTop: 10,
    },
});

export default styles;