import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    tile: {
        width: 150,
        height: 150,
        marginHorizontal: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        alignItems: 'center',
        borderColor: '0B022C',
        borderWidth: 1
    },
    logo: {
        width: 350,
        height: 250,
        resizeMode: 'contain'
    },
    tileImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    tileText: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#0B022C',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;