import React, { useState, useEffect, useContext } from "react";
import { View, TouchableOpacity, Image, StatusBar} from 'react-native';
import styles from './styles';
import { AuthContext } from "../../contexts/AuthContext";
import { auth } from '../../database/config';
import { useNavigation } from '@react-navigation/native';
import { Provider as PaperProvider, TextInput, Text } from 'react-native-paper';
// import * as database from '../../database';


const LoginRegister = () => {
    const { login, signup } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const navigation = useNavigation()
    const theme = {
        colors: {
            primary: '#0B022C', 
            background: '#EE7CDC',
        },
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setIsRegistering(true);
                console.log('User Status:', isRegistering);
                console.log('Loggedin Login Subscribe:', isRegistering);
            } else {
                console.log('Testing');
            }
        })
        return unsubscribe
    }, [])

    const handleRegister = async () => {
        try {
            await signup(email, password);
            setIsRegistering(true);
            setEmail('');
            setPassword('');
        } catch (error) {
            console.log('Signup error:', error);
        }
    };

    const handleLogin = async () => {
        try {
            await login(email, password);
            setIsRegistering(false);
            setEmail('');
            setPassword('');
        } catch (error) {
            console.log('Login error:', error);
            // Handle login error
        }
    };

    return (
        <PaperProvider theme={theme}>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Image
                    style={styles.logo}
                    source={require('../../../assets/HHLogo.png')}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder='Email'
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
        </PaperProvider>
    );
};

export default LoginRegister;
