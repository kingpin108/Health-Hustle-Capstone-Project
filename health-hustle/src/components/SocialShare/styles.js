import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        alignItems: 'center',
      },
      titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      generateButton: {
        height: 50,
        width: 300,
        backgroundColor: 'black',
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      generateButtonText: {
        color: 'white',
      },
      generatedImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      generatedImage: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
      },

})
export default styles;
