import React, { useState, useEffect, useContext } from "react";
import { View, TouchableOpacity, Image, StatusBar, Alert } from 'react-native';
import styles from './styles';
import { AuthContext } from "../../contexts/AuthContext";
import { auth } from '../../database/config';
import { Provider as PaperProvider, TextInput, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';


const LoginRegister = () => {
    const { login, signup } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Added state for password visibility


    const navigation = useNavigation();

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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        try {
            // Check if the email is already registered
            const signInMethods = await auth.fetchSignInMethodsForEmail(email);

            if (signInMethods && signInMethods.length > 0) {
                Alert.alert('Error', 'Email is already registered');
                return;
            }

            // If the email is not registered, proceed with registration
            await signup(email, password);
            setIsRegistering(true);
            navigation.navigate('RegistrationForm');
            clearForm();
        } catch (error) {
            console.log('Signup error:', error);
            Alert.alert('Error', 'Failed to register');
        }
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        try {
            await login(email, password);
            setIsRegistering(false);
            navigation.navigate('Home');
            clearForm();
        } catch (error) {
            console.log('Login error:', error);
            Alert.alert('Error', 'Invalid email or password');
        }
    };

    const validateForm = () => {
        const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password');
            return false;
        }
        if(password.length < 6 ){
            Alert.alert('Error', 'Password should be at least 6 characters');
            return false;
        }
        if (!emailPattern.test(email)) {
            Alert.alert('Error', 'Please enter a valid email');
            return false;
        }
        return true;
    };

    const clearForm = () => {
        setEmail('');
        setPassword('');
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
                    autoCapitalize="none"
                    selectionColor="#EE7CDC"
                />
                  <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        secureTextEntry={!showPassword}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        selectionColor="#EE7CDC"
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Entypo name={showPassword ? 'eye' : 'eye-with-line'} size={24} color="black" />
                    </TouchableOpacity>
                </View>

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
