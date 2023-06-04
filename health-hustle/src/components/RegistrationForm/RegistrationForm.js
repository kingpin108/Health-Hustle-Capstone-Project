import React, { useState, useContext } from 'react';
import { View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { ProgressBar, Button, RadioButton, Provider as PaperProvider, Text, Checkbox, TextInput, Switch } from 'react-native-paper';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import ConfettiCannon from 'react-native-confetti-cannon';
import Popover from 'react-native-popover-view';
import { AuthContext } from '../../contexts/AuthContext';
import { database } from '../../database/config';

const RegistrationForm = () => {
    const theme = {
        colors: {
            primary: '#EE7CDC',
            background: '#FFFFFF',
        },
    };

    const [step, setStep] = useState(1);
    const [gender, setGender] = useState('');
    const [bodyGoals, setBodyGoals] = useState([
        { label: 'Weight Loss', checked: true },
        { label: 'Posture Correction', checked: false },
        { label: 'Muscle Gain', checked: false },
        { label: 'Agility', checked: false },
    ]);
    const [bodyType, setBodyType] = useState('A');
    const [focusArea, setFocusArea] = useState([
        { label: 'Upper Body', checked: true },
        { label: 'Lower Body', checked: false },
        { label: 'Core', checked: false },
        { label: 'Cardio', checked: false },
        { label: 'Flexibility', checked: false }
    ]);
    const [weight, setWeight] = useState('');
    const [isKg, setIsKg] = useState(true);
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [equipment, setEquipment] = useState('true');
    const { user } = useContext(AuthContext);
    const { uid } = user;

    const handleNext = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handlePrev = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleBodyGoals = (index) => {
        setBodyGoals(prevState => {
            const updatedCheckboxes = [...prevState];
            updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
            return updatedCheckboxes;
        });
    };

    const handleFocusArea = (index) => {
        setFocusArea(prevState => {
            const updatedCheckboxes = [...prevState];
            updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
            return updatedCheckboxes;
        });
    };

    const handleGenderChange = (selectedGender) => {
        if (gender !== selectedGender) {
            setGender(selectedGender);
            setStep((prevStep) => prevStep + 1);;
        }
    }

    const handleWeightChange = (value) => {
        setWeight(value);
    };

    const handleUnitChange = () => {
        setIsKg(prevState => !prevState);
    };

    const convertWeight = () => {
        if (isKg) {
            // Convert weight from kg to lbs
            return Math.round(weight * 2.20462);
        } else {
            // Convert weight from lbs to kg
            return Math.round(weight / 2.20462);
        }
    };

    const saveFormData = (formData, uid) => {
        try {
            const usersRef = database.ref('users');
            const formDataRef = usersRef.child(uid).child('formData');
            formDataRef.set({ ...formData });
            console.log('Form data saved successfully');
        } catch (error) {
            console.log('Error saving form data:', error);
            throw error;
        }
    };

    const [showPopover, setShowPopover] = useState(false);
    const [confettiActive, setConfettiActive] = useState(false);

    const navigation = useNavigation();
    const n_weight = parseInt(weight)
    const n_height = parseFloat(height)
    const n_age = parseFloat(age)
    const handleSubmit = () => {
        const formData = {
            gender,
            bodyGoals,
            bodyType,
            focusArea,
            n_weight,
            n_height,
            n_age,
            equipment,
            isKg
        };

        console.log(formData);
        saveFormData(formData, uid);

        setConfettiActive(true);
        setShowPopover(true);

        setTimeout(() => {
            setShowPopover(false);
            setConfettiActive(false);

            navigation.navigate('Home');
        }, 3000);
    };


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
                            <Image
                                source={require('../../../assets/bodygoals.png')}
                                style={styles.genderImage}
                            />
                            {bodyGoals.map((checkbox, index) => (
                                <Checkbox.Item
                                    key={index}
                                    label={checkbox.label}
                                    status={checkbox.checked ? 'checked' : 'unchecked'}
                                    onPress={() => handleBodyGoals(index)}
                                    style={styles.checkBox}
                                />
                            ))}
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
                                        source={require('../../../assets/g_btype3.png')}
                                        style={styles.typeImage2}
                                    />
                                </TouchableOpacity>

                                <View style={styles.typeRow}>
                                    <TouchableOpacity
                                        style={styles.typeImageContainer}
                                        onPress={() => setBodyType('H')}
                                    >
                                        <Image
                                            source={require('../../../assets/g_btype4.png')}
                                            style={styles.typeImage}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.typeImageContainer}
                                        onPress={() => setBodyType('I')}
                                    >
                                        <Image
                                            source={require('../../../assets/g_btype5.png')}
                                            style={styles.typeImage}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}

                    </View>
                );

            case 4:
                return (
                    <View style={styles.container}>
                        <Text style={styles.questionText}>Select focus area:</Text>
                        <Text>{'\n'}</Text>
                        <View>
                            <Image
                                source={require('../../../assets/human_body.jpeg')}
                                style={styles.focusAreaImage}
                            />
                            {focusArea.map((checkbox, index) => (
                                <Checkbox.Item
                                    key={index}
                                    label={checkbox.label}
                                    status={checkbox.checked ? 'checked' : 'unchecked'}
                                    onPress={() => handleFocusArea(index)}
                                    style={styles.checkBox}
                                />
                            ))}
                        </View>
                    </View>
                );

            case 5:
                return (
                    <View style={styles.container}>
                        <Text style={styles.questionText}>Enter weight:</Text>
                        <View style={styles.sectionBottomMargin}>
                            <Image
                                source={require('../../../assets/weight_scale.png')}
                                style={styles.formImage}
                            />
                            <TextInput
                                label="Enter weight"
                                keyboardType="numeric"
                                value={weight}
                                mode="outlined"
                                onChangeText={handleWeightChange}
                            />
                        </View>
                        <Text>{`${weight} ${isKg ? 'kg' : 'lbs'}`}</Text>
                        <Switch
                            value={isKg}
                            onValueChange={handleUnitChange}
                            color="#1e0578"
                        />
                        <Text>{`${convertWeight()} ${isKg ? 'lbs' : 'kg'}`}</Text>
                    </View >
                );

            case 6:
                return (
                    <View style={styles.container}>
                        <Text style={styles.questionText}>Enter height in feet:</Text>
                        <View>
                            <Image
                                source={require('../../../assets/measure_height.png')}
                                style={styles.formImage}
                            />
                            <TextInput
                                label="Enter height(ft.)"
                                keyboardType="numeric"
                                value={height}
                                mode="outlined"
                                onChangeText={(height) => setHeight(height)}
                            />
                        </View>
                    </View >
                );

            case 7:
                return (
                    <View style={styles.container}>
                        <Text style={styles.questionText}>Enter your age:</Text>
                        <View>
                            <Image
                                source={require('../../../assets/ageing.png')}
                                style={styles.formImage}
                            />
                            <TextInput
                                label="Enter age (16-70)"
                                keyboardType="numeric"
                                value={age}
                                mode="outlined"
                                onChangeText={(age) => setAge(age)}
                            />
                        </View>
                    </View>
                )

            case 8:
                return (
                    <View style={styles.container}>
                        <Text style={styles.questionText}>Preferred workout?</Text>
                        <View>
                            <Image
                                source={require('../../../assets/workout_type.jpg')}
                                style={styles.formImage}
                            />
                            <RadioButton.Group onValueChange={newValue => setEquipment(newValue)} value={equipment}>
                                <View>
                                    <RadioButton.Item label="With equipment" value="true" style={styles.checkBox} />
                                    <RadioButton.Item label="Without Equipment" value="false" style={styles.checkBox} />
                                    <RadioButton.Item label="Both" value="neutral" style={styles.checkBox} />
                                </View>
                            </RadioButton.Group>
                        </View>
                    </View>
                )

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

                        {step == 8 && (
                            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                                Submit
                            </Button>
                        )}
                    </View>
                </View>
                {showPopover && (
                    <Popover isVisible={showPopover}>
                        <Text>Signing up...</Text>
                    </Popover>
                )}

                {confettiActive && (
                    <ConfettiCannon
                        count={200}
                        origin={{ x: -10, y: 0 }}
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        explosionSpeed={500}
                        fadeOut
                    />
                )}
            </PaperProvider>
        </SafeAreaView>
    );
};

export default RegistrationForm;
