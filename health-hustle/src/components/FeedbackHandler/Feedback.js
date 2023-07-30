import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Appbar, TextInput, HelperText, Button, List, ActivityIndicator, Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { database } from '../../database/config';


//[#6] Users can provide feedback about any issues they come across while using the application.
const Feedback = () => {
    const navigation = useNavigation();
    const handleBack = () => {
        navigation.goBack();
    };
    const { user } = useContext(AuthContext);
    const { uid } = user;
    const [feedback, setFeedback] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [theme, setTheme] = useState(false);

    const MAX_WORD_COUNT = 100;

    useEffect(() => {
        fetchDataFromSheets();
    }, [uid]);

    const handleChangeText = (newText) => {
        const words = newText.trim().split(/\s+/).filter(Boolean);
        if (words.length <= MAX_WORD_COUNT) {
            setFeedback(newText);
        }
    };

    const postToSheets = async () => {
        try {
            if (feedback.trim().length === 0) {
                alert('Please provide feedback before submitting.');
                return;
            }

            if (data.some(item => item.user === uid && item.feedback === feedback)) {
                alert('Feedback already provided. Please enter a new feedback.');
                return;
            }
            setLoading(true)
            const response = await axios.post('https://script.google.com/macros/s/AKfycbxJrbhKIEC2KL1Nc-8hokZMJ_DpRuBK5y3tyDUva0PxeWGoU2JFM5fqN71bFHDf2vSb/exec', {
                user: uid,
                feedback: feedback,
            });
            console.log('Data posted successfully:', response.data);
            setFeedback('');
            fetchDataFromSheets();
        } catch (error) {
            console.error('Error posting data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDataFromSheets = async () => {
        try {
            setLoading(true)
            const response = await axios.get('https://script.google.com/macros/s/AKfycbxJrbhKIEC2KL1Nc-8hokZMJ_DpRuBK5y3tyDUva0PxeWGoU2JFM5fqN71bFHDf2vSb/exec');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        const userRef = database.ref(`users/${uid}/formData`);

        userRef
            .once('value')
            .then((snapshot) => {
                const formData = snapshot.val();
                if (formData && formData.isDarkActive !== undefined) {
                    setTheme(formData.isDarkActive);
                }
            })
            .catch((error) => {
                console.error('Error fetching isDarkActive from Firebase:', error);

            });
    }, [uid]);

    const themeStyles = theme ? darkThemeStyles : lightThemeStyles;

    const paperTheme =
        theme
            ? { ...MD3DarkTheme }
            : { ...MD3LightTheme };

    const filteredFeedback = data.filter(item => item.user === uid);

    return (
        <PaperProvider theme={paperTheme} >
            {theme ? <></> : <StatusBar bar-style={'light-content'} />}
            <Appbar.Header style={styles.appHeaderContainer}>
                <Appbar.BackAction onPress={handleBack} />
                <Appbar.Content
                    title="Manage Feedback"
                    titleStyle={styles.appHeaderTitle}
                />
            </Appbar.Header>
            <View style={[themeStyles.container]}>
                <TextInput
                    mode="outlined"
                    label="Provide Feedback"
                    placeholder="Type something ..."
                    value={feedback}
                    onChangeText={handleChangeText}
                    style={styles.feedbackInput}
                    maxLength={500}
                    returnKeyType="done"
                />
                <HelperText type="info">
                    {`${feedback.trim().split(/\s+/).filter(Boolean).length}/${MAX_WORD_COUNT} words`}
                </HelperText>
                <Button icon="send" mode="contained" contentStyle={{ flexDirection: 'row-reverse' }} onPress={postToSheets}>
                    Submit
                </Button>
                <Button icon="reload" mode="contained" contentStyle={{ flexDirection: 'row-reverse' }} onPress={fetchDataFromSheets} style={{ marginTop: 5 }}>
                    Refresh List
                </Button>
                {loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : (
                    <View>
                        <List.Section style={styles.feedbackList}>
                            <List.Subheader>Your Feedback:</List.Subheader>
                            <ScrollView style={{ height: 400 }}>
                                {filteredFeedback.map(item => (
                                    <List.Item
                                        key={item.feedback}
                                        title={item.feedback}
                                        description={item.response ? `Response: ${item.response}` : 'Waiting for response'}
                                        left={() => <List.Icon icon="message" />}
                                        style={[themeStyles.feedbackItem]}
                                    />
                                ))}
                            </ScrollView>
                        </List.Section>
                    </View>
                )}
            </View>
        </PaperProvider>
    );
};

export default Feedback;

const lightThemeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        padding: 10
    },
    feedbackItem: {
        backgroundColor: '#f3e3ff',
        marginBottom: 10,
        padding: 5,
        borderRadius: 10,
    }
});

const darkThemeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444444',
        flexDirection: 'column',
        padding: 10
    },
    feedbackItem: {
        marginBottom: 10,
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white'
    }
});
