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
        color: '#0B022C',
    },
    genderImage: {
        resizeMode: 'contain',
        width: 200,
        height: 250,
        marginVertical: 10
    },
    checkBox: {
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom: 10,
        shadowColor: 'black',
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
    typeImageContainer: {
        flex: 1,
        aspectRatio: 1,
        margin: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        overflow: 'hidden',
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
});

export default styles;