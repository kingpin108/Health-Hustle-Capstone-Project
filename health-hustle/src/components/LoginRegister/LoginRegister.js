import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import styles from './styles';
import { auth } from '../../database/config';
import { useNavigation } from '@react-navigation/native';
import   Demo  from '../Demo/Demo';
// import * as database from '../../database';


const LoginRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const navigation = useNavigation()
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsRegistering(true);
        navigation.navigate("Demo");
        console.log('User Status:' ,isRegistering);
        console.log('Loggedin Login Subscribe:' ,isRegistering);
      } else {
        console.log('Testing');

        // setLoggedIn(false);
      }
    })
    return unsubscribe
  }, [])

    const handleRegister = () => {
        auth.createUserWithEmailAndPassword(email,password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Registered with: ', user.email);
          navigation.navigate("Demo")

          setIsRegistering(true);
          setEmail('');
          setPassword('');
          console.log('Loggedin SignUp:' ,isRegistering);
        //   database.saveUser(userCredentials.user.uid)
        })
        .catch(error => alert(error.message))
      }
    
      const handleLogin = () =>{
        auth.signInWithEmailAndPassword(email,password)
        .then(userCredentials => {
          const user = userCredentials.user;
          setIsRegistering(false);
          console.log('Logged in with: ', user.email);
          setEmail('');
          setPassword('');
        navigation.navigate("Demo");

          console.log('Loggedin Login:' ,isRegistering);
        })
        .catch(error => alert(error.message))
      }

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../../assets/HHLogo.png')}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={isRegistering ? handleRegister : handleLogin}
            >
                <Text style={styles.buttonText}>
                    {isRegistering ? 'Register' : 'Login'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setIsRegistering(!isRegistering)}
            >
                <Text style={styles.buttonText2}>
                    {isRegistering ? 'Switch to Login' : 'Switch to Register'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginRegister;
