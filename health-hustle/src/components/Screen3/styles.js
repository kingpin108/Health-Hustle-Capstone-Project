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
        marginTop: 20,
        marginLeft: 20,
        fontWeight: 'bold',
      },
      textInstruction:{
        marginLeft: 20,
      },
      listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,  
      },
      image: {
        width: 80,
        height: 80,
        marginLeft: 15,
        borderRadius: 10,
        marginRight: 20
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
});

export default styles;