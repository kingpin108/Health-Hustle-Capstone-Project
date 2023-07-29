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
      safeArea: {
        flex: 1,
      },
      container: {
        flex: 1,
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
      modalContainer:{
        margin:'10%',
        paddingTop:"10%"
      },
      modalTitle:{
        fontSize:17,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom: -5
      },
      recipeModalContainer:{
        margin:'20%'
      },
      recipeImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        margin:'10%',
        alignSelf: 'center',
        marginVertical: 10,
      },
      recipeScrollView: {
        height: 240,
        marginTop: 10
      }
    
});

export default styles;