import React, { useState } from 'react';
import { View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { ProgressBar, Button, RadioButton, Provider as PaperProvider, Text } from 'react-native-paper';
import styles from './styles';

const steps = [
    { label: 'Step 1', content: 'Form Step 1' },
    { label: 'Step 2', content: 'Form Step 2' },
    { label: 'Step 3', content: 'Form Step 3' },
];

const Demo = () => {
    const theme = {
        colors: {
            primary: '#EE7CDC',
            background: '#FFFFFF',
        },
    };

    const [step, setStep] = useState(1);
    const [gender, setGender] = useState('');
    const [bodyGoals, setBodyGoals] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [desiredBodyType, setDesiredBodyType] = useState('');
    const [focusArea, setFocusArea] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [targetWeight, setTargetWeight] = useState('');
    const [age, setAge] = useState('');
    const [equipment, setEquipment] = useState('');

    const handleNext = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handlePrev = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <View style={styles.container}>
                        <Text style={styles.questionText}>Select your gender:</Text>
                        <View style={styles.imageContainer}>
                            <TouchableOpacity onPress={() => setGender('male')}>
                                <Image
                                    source={require('../../../assets/male.png')}
                                    style={styles.genderImage}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setGender('female')}>
                                <Image
                                    source={require('../../../assets/female.png')}
                                    style={styles.genderImage}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            case 2:
                return (
                    <View style={styles.container}>
                        <Text style={styles.questionText}>Select your body goals:</Text>
                        <RadioButton.Group
                            onValueChange={(value) => setBodyGoals(value)}
                            value={bodyGoals}
                        >
                            <RadioButton.Item
                                label="Weight Loss"
                                value="weightLoss"
                                style={styles.radioButton}
                            />
                            <RadioButton.Item
                                label="Posture Correction"
                                value="postureCorrection"
                                style={styles.radioButton}
                            />
                            <RadioButton.Item
                                label="Muscle Gain"
                                value="muscleGain"
                                style={styles.radioButton}
                            />
                            <RadioButton.Item
                                label="Agility"
                                value="agility"
                                style={styles.radioButton}
                            />
                        </RadioButton.Group>
                    </View>
                );
            case 3:
                return (
                    <View style={styles.container}>
                        <Text style={styles.questionText}>Select your body type:</Text>
                        {/* Add your body type selection component */}
                    </View>
                );
            // Continue adding cases for the remaining steps

            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PaperProvider theme={theme}>
                <View style={{ flex: 1, padding: 16, backgroundColor:'white' }}>
                    <ProgressBar progress={step / 8} color="#FF6F00" />

                    <View style={styles.container}>
                        {renderStepContent()}
                    </View>

                    <View style={styles.buttonContainer}>
                        {step > 1 && (
                            <Button mode="outlined" onPress={handlePrev} style={styles.button}>
                                Previous
                            </Button>
                        )}

                        {step < 8 && (
                            <Button mode="contained" onPress={handleNext} style={styles.button}>
                                Next
                            </Button>
                        )}
                    </View>
                </View>
            </PaperProvider>
        </SafeAreaView>
    );
};

export default Demo;
