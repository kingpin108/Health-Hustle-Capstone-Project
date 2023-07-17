// import { StyleSheet } from 'react-native';

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//     },
//     appHeaderContainer: {
//         flexDirection: 'row',
//         justifyContent: 'flex-start',
//         backgroundColor: 'white',
//         elevation: 4, 
//         shadowOpacity: 0.3, 
//         shadowOffset: { width: 0, height: 2 }, 
//         shadowRadius: 2,
//         zIndex: 1
//       },
//       appHeaderTitle: {
//         marginLeft: Platform.OS === 'ios' ? -32 : 10,
//         alignSelf: 'flex-start',
//         fontSize: 20,
//         fontWeight: 'bold',
//       },
// });

// export default styles;



import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        // backgroundColor: '#D5F5E3',
        paddingBottom: 30,
        padding: 20
    },

    title: {
        color: 'green',
        fontWeight: 'bold',
        fontSize:20
    },
    description: {
        fontsize: 15,
        marginBottom: 10
    },

    options:{
        container:{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10
        },
        label: {
            marginLeft: 10,
            fontsize: 15
        }
    },

    logs: {
        container:{
            marginTop:30
        },
        title:{
            fontsize: 15,
            fontweight: 'bold',

        },
        text:{
            fontsize: 10,
            marginTop:5
        }

    }
});
export default styles;
