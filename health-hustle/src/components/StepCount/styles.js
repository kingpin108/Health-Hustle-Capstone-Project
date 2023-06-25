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
      },
      appHeaderTitle: {
        alignSelf: 'stretch',
        fontSize: 20,
        fontWeight: 'bold',
      },
});

export default styles;