import React, { useState } from 'react';
import { View, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import { ProgressBar, Button, RadioButton, Provider as PaperProvider, Text, Checkbox } from 'react-native-paper';
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
    const [bodyGoals, setBodyGoals] = useState('weightLoss');
    const [bodyType, setBodyType] = useState('A');
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

    const [checkedItems, setCheckedItems] = useState({
        weightLoss: true,
        postureCorrection: false,
        muscleGain: false,
        agility: false,
    });
    const handleCheckboxChange = (option) => {
        setCheckedItems((prevState) => ({
            ...prevState,
            [option]: !prevState[option],
        }));
    };

    const handleGenderChange = (selectedGender) => {
        if (gender !== selectedGender) {
            setGender(selectedGender);
            setStep((prevStep) => prevStep + 1);;
        }
    }

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <View style={styles.container}>
                        <Text style={styles.questionText}>Select your gender:</Text>
                        <Text>{'\n'}</Text>
                        <TouchableOpacity onPress={() => handleGenderChange('male')}>
                                <Image
                                    source={require('../../../assets/male.png')}
                                    style={styles.genderImage}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleGenderChange('female')}>
                                <Image
                                    source={require('../../../assets/female.png')}
                                    style={styles.genderImage}
                                />
                            </TouchableOpacity>
                    </View>
                );
            case 2:
                return (
                    <View style={styles.container}>
                        <Text style={styles.questionText}>Select your body goals:</Text>
                        <View>
                            <Checkbox.Item
                                label="Weight Loss"
                                value='weightLoss'
                                status={checkedItems.weightLoss ? 'checked' : 'unchecked'}
                                onPress={() => handleCheckboxChange('weightLoss')}
                                style={styles.checkBox}
                            />
                            <Checkbox.Item
                                label="Posture Correction"
                                value="postureCorrection"
                                status={checkedItems.postureCorrection ? 'checked' : 'unchecked'}
                                onPress={() => handleCheckboxChange('postureCorrection')}
                                style={styles.checkBox}
                            />
                            <Checkbox.Item
                                label="Muscle Gain"
                                value="muscleGain"
                                status={checkedItems.muscleGain ? 'checked' : 'unchecked'}
                                onPress={() => handleCheckboxChange('muscleGain')}
                                style={styles.checkBox}
                            />
                            <Checkbox.Item
                                label="Agility"
                                value="agility"
                                status={checkedItems.agility ? 'checked' : 'unchecked'}
                                onPress={() => handleCheckboxChange('agility')}
                                style={styles.checkBox}

                            />
                        </View>
                    </View>
                );
            case 3:
                return (
                    <View style={styles.container}>
                        <Text style={styles.questionText}>Select body type:</Text>
                        <Text>{'\n'}</Text>

                        {gender === 'male' && (
                            <>
                                <View style={styles.typeRow}>
                                    <TouchableOpacity
                                        style={styles.typeImageContainer}
                                        onPress={() => setBodyType('A')}
                                    >
                                        <Image
                                            source={require('../../../assets/m_btype1.png')}
                                            style={styles.typeImage}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.typeImageContainer}
                                        onPress={() => setBodyType('B')}
                                    >
                                        <Image
                                            source={require('../../../assets/m_btype2.png')}
                                            style={styles.typeImage}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.typeRow}>
                                    <TouchableOpacity
                                        style={styles.typeImageContainer}
                                        onPress={() => setBodyType('C')}
                                    >
                                        <Image
                                            source={require('../../../assets/m_btype3.png')}
                                            style={styles.typeImage}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.typeImageContainer}
                                        onPress={() => setBodyType('D')}
                                    >
                                        <Image
                                            source={require('../../../assets/m_btype4.png')}
                                            style={styles.typeImage}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}

                        {gender === 'female' && (
                            <>
                                <View style={styles.typeRow}>
                                    <TouchableOpacity
                                        style={styles.typeImageContainer}
                                        onPress={() => setBodyType('E')}
                                    >
                                        <Image
                                            source={require('../../../assets/g_btype1.png')}
                                            style={styles.typeImage}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.typeImageContainer}
                                        onPress={() => setBodyType('F')}
                                    >
                                        <Image
                                            source={require('../../../assets/g_btype2.png')}
                                            style={styles.typeImage}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    style={styles.typeImageContainer2}
                                    onPress={() => setBodyType('G')}
                                >
                                    <Image
                                        source={require('../../../assets/g_btype5.png')}
                                        style={styles.typeImage2}
                                    />
                                </TouchableOpacity>

                                <View style={styles.typeRow}>
                                    <TouchableOpacity
                                        style={styles.typeImageContainer}
                                        onPress={() => setBodyType('H')}
                                    >
                                        <Image
                                            source={require('../../../assets/g_btype3.png')}
                                            style={styles.typeImage}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.typeImageContainer}
                                        onPress={() => setBodyType('I')}
                                    >
                                        <Image
                                            source={require('../../../assets/g_btype4.png')}
                                            style={styles.typeImage}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}

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
                <View style={{ flex: 1, padding: 16, backgroundColor: 'white' }}>
                    <ProgressBar progress={step / 8} color="#FF6F00" style={styles.progressBar} />

                    <View style={styles.container}>
                        {renderStepContent()}
                    </View>

                    <View style={styles.buttonContainer}>
                        {step > 1 && (
                            <Button mode="outlined" onPress={handlePrev} style={styles.button}>
                                Previous
                            </Button>
                        )}

                        {step < 8 && step > 1 && (
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
