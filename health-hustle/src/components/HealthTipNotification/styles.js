import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 20,
    },
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
    textInput: {
      marginHorizontal: 16,
      marginVertical: 8,
      backgroundColor: '#CCCCFF',
      paddingHorizontal: 12,
      height: 40,
      borderRadius: 15,
    }, 
});

export default styles;