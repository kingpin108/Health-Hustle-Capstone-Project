import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    questionText: {
        marginTop: 20,
        position: 'absolute',
        top: 0,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0B022C'
    },
    genderImage: {
        resizeMode: 'contain',
        width: 150,
        height: 300,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});

export default styles;