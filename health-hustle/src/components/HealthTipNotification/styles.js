import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    appHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        elevation: 4, 
        shadowOpacity: 0.3, 
        shadowOffset: { width: 0, height: 2 }, 
        shadowRadius: 2,
        zIndex: 1
      },
      appHeaderTitle: {
        marginLeft: Platform.OS === 'ios' ? -32 : 10,
        alignSelf: 'flex-start',
        fontSize: 20,
        fontWeight: 'bold',
      },
});

export default styles;