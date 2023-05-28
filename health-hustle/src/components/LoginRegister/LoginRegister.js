import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import styles from './styles';

const LoginRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogin = () => {
        // Handle login logic here
        console.log('Login', email, password);
    };

    const handleRegister = () => {
        // Handle registration logic here
        console.log('Register', email, password);
    };

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
