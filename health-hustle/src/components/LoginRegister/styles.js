import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#0B022C'
    },
    logo: {
        width: 400,
        height: 200,
        resizeMode: 'contain'
    },
    input: {
        width: 300,
        height: 50,
        marginBottom: 30,
        backgroundColor: 'white',
        fontSize: 20
    },
    button: {
        width: 150,
        marginTop: 20
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#EE7CDC',
        fontSize: 20,
        marginVertical: 10,
        borderColor: '#EE7CDC',
        borderWidth: 3,
        borderRadius: 5,
        padding: 8
    },
    buttonText2: {
        fontWeight: 'bold',
        color: '#EE7CDC',
        fontSize: 20,
        marginVertical: 10,
    },
    passwordInput: {
        width: 200,
        fontSize: 20
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 300,
        height: 50,
        marginBottom: 30,
        backgroundColor: 'white',
        paddingRight: 10
    },
});

export default styles;