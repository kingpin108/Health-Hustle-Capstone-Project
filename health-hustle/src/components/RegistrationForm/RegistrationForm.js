import React, { useState, useContext } from 'react';
import { View, Image, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Keyboard } from 'react-native';
import { ProgressBar, Button, RadioButton, Provider as PaperProvider, Text, Checkbox, TextInput, Switch, Snackbar, TouchableRipple } from 'react-native-paper';
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

    const [showSnackbar, setShowSnackbar] = useState(false);

    const [step, setStep] = useState(1);
    const [gender, setGender] = useState('');
    const [bodyGoals, setBodyGoals] = useState([
        { label: 'Weight Loss', checked: true },
        { label: 'Posture Correction', checked: false },
        { label: 'Muscle Gain', checked: false },
        { label: 'Agility', checked: false },
    ]);
    const allBodyGoals = bodyGoals.every(goal => !goal.checked);
    const [bodyType, setBodyType] = useState('A');
    const [selectedType, setSelectedType] = useState('A');

    const [focusArea, setFocusArea] = useState([
        { label: 'Upper Body', checked: true },
        { label: 'Lower Body', checked: false },
        { label: 'Core', checked: false },
        { label: 'Cardio', checked: false },
        { label: 'Flexibility', checked: false }
    ]);
    const allFocusArea = focusArea.every(goal => !goal.checked);
    const [weight, setWeight] = useState('');
    const [isKg, setIsKg] = useState(true);
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [equipment, setEquipment] = useState('true');
    const { user } = useContext(AuthContext);
    const { uid } = user;
    const [workoutList, setWorkoutList] = useState('default');
    const [alertMessage, setAlertMessage] = useState('');
    const ageNumeric = Number.isInteger(parseFloat(age));
    const ageInRange = parseFloat(age) >= 16 && parseFloat(age) <= 70;
    const heightNumeric = !isNaN(height) && Number.isFinite(parseFloat(height));
    const heightInRange = parseFloat(height) >= 3 && parseFloat(height) <= 9;
    const heightDecimalCount = (height.split('.')[1] || '').length;
    const weightNumeric = !isNaN(weight) && Number.isFinite(parseFloat(weight));
    const weightInRange = parseFloat(weight) >= 40 && parseFloat(weight) <= 450;
    const weightDecimalCount = (weight.split('.')[1] || '').length;
    console.log("DecimalCount" + weightDecimalCount)
    const [isDarkActive, setIsDarkActive] = useState(false);



    const handleNext = () => {
        if (step === 1 && !gender) {
            setShowSnackbar(true);
        } else if (step === 2 && allBodyGoals) {
            setAlertMessage("Please select atleast one body goal")
            setShowSnackbar(true);
        } else if (step === 3 && !bodyType) {
            setShowSnackbar(true);
        } else if (step === 4 && allFocusArea) {
            setAlertMessage("Please select atleast one focus area")
            setShowSnackbar(true);
        } else if (step === 5 && (!weight || !weightInRange || !weightNumeric || weightDecimalCount > 1)) {
            if (!weightNumeric) {
                setAlertMessage("Please enter a valid numeric value for weight.");
            } else if (!weightInRange) {
                setAlertMessage("Enter a numeric value between 40.0 and 450.0 for weight.");
            } else if (weightDecimalCount > 1) {
                setAlertMessage("Weight should be upto 1 decimal place.");
            }
            setShowSnackbar(true);
        } else if (step === 6 && (!height || !heightInRange || !heightNumeric || heightDecimalCount > 2)) {
            if (!heightNumeric) {
                setAlertMessage("Please enter a numeric value for height.");
            } else if (!heightInRange) {
                setAlertMessage("Enter a numeric value between 3.0 and 9.0 for height.");
            } else if (heightDecimalCount > 2) {
                setAlertMessage("Height should be upto 2 decimal places.");
            }
            setShowSnackbar(true);
        } else if (step === 7 && (!age || !ageInRange || !ageNumeric)) {
            if (!ageNumeric || !age) {
                setAlertMessage("Please enter an integer value for age.")
            } else {
                setAlertMessage("Enter an integer value between 16 and 70.")
            }
            setShowSnackbar(true);
        } else if (step === 8 && !equipment) {
            setShowSnackbar(true);
        }
        else {
            setStep((prevStep) => prevStep + 1);
        }
    };

    const handleSnackbarDismiss = () => {
        setShowSnackbar(false);
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
            setBodyType('E');
        }
        setStep((prevStep) => prevStep + 1);
    }

    const handleWeightChange = (value) => {
        setWeight(value);
    };

    const handleUnitChange = () => {
        setIsKg(prevState => !prevState);
    };

    const convertWeight = () => {
        if (isNaN(weight)) {
            return 0;
        }
        if (isKg) {
            // Convert weight from kg to lbs
            return (weight * 2.20462).toFixed(1);
        } else {
            // Convert weight from lbs to kg
            return (weight / 2.20462).toFixed(1);
        }
    };
    const selectedBodyGoal = bodyGoals.find(goal => goal.checked);
    const selectedFocusArea = focusArea.find(area => area.checked);

    function handleWorkoutList(selectedBodyGoal, selectedFocusArea, workoutList, setWorkoutList) {
        if (selectedBodyGoal.label === 'Weight Loss' && selectedFocusArea.label === 'Upper Body') {
            if (workoutList !== '1') {
                setWorkoutList('1');
            }
        } else if (selectedBodyGoal.label === 'Posture Correction' && selectedFocusArea.label === 'Lower Body') {
            if (workoutList !== '2') {
                setWorkoutList('2');
            }
        } else if (selectedBodyGoal.label === 'Muscle Gain' && selectedFocusArea.label === 'Core') {
            if (workoutList !== '3') {
                setWorkoutList('3');
            }
        } else if (selectedBodyGoal.label === 'Posture Correction' && selectedFocusArea.label === 'Flexibility') {
            if (workoutList !== '4') {
                setWorkoutList('4');
            }
        } else if (selectedBodyGoal.label === 'Muscle Gain' && selectedFocusArea.label === 'Lower Body') {
            if (workoutList !== '5') {
                setWorkoutList('5');
            }
        } else {
            if (workoutList !== 'default') {
                setWorkoutList('default');
            }
        }
    }

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
    const workoutDuration = 0
    const workoutDays = 0
    const totalSteps = 0
    const handleSubmit = () => {
        handleWorkoutList(selectedBodyGoal, selectedFocusArea, workoutList, setWorkoutList);
        const formData = {
            gender,
            bodyGoals,
            bodyType,
            focusArea,
            n_weight,
            n_height,
            n_age,
            equipment,
            isKg,
            workoutList,
            workoutDuration,
            workoutDays,
            totalSteps, 
            isDarkActive
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

    const dismissKeyboard = () => {
        Keyboard.dismiss();
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
                                <TouchableRipple
                                    key={index}
                                    onPress={() => handleBodyGoals(index)}
                                    rippleColor="transparent"
                                >
                                    <Checkbox.Item
                                        key={index}
                                        label={checkbox.label}
                                        status={checkbox.checked ? 'checked' : 'unchecked'}
                                        style={styles.checkBox}
                                    />
                                </TouchableRipple>
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
                                        onPress={() => {
                                            setBodyType('A');
                                            setSelectedType('A');
                                        }}
                                    >
                                        <Image
                                            source={require('../../../assets/m_btype1.png')}
                                            style={[
                                                styles.typeImage,
                                                bodyType === 'A' && styles.selectedType,
                                            ]}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.typeImageContainer}
                                        onPress={() => {
                                            setBodyType('B');
                                            setSelectedType('B');
                                        }}

                                    >
                                        <Image
                                            source={require('../../../assets/m_btype2.png')}
                                            style={[
                                                styles.typeImage,
                                                bodyType === 'B' && styles.selectedType,
                                            ]}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.typeRow}>
                                    <TouchableOpacity
                                        style={styles.typeImageContainer}
                                        onPress={() => {
                                            setBodyType('C');
                                            setSelectedType('C');
                                        }}
                                    >
                                        <Image
                                            source={require('../../../assets/m_btype3.png')}
                                            style={[
                                                styles.typeImage,
                                                bodyType === 'C' && styles.selectedType,
                                            ]}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.typeImageContainer}
                                        onPress={() => {
                                            setBodyType('D');
                                            setSelectedType('D');
                                        }}
                                    >
                                        <Image
                                            source={require('../../../assets/m_btype4.png')}
                                            style={[
                                                styles.typeImage,
                                                bodyType === 'D' && styles.selectedType,
                                            ]}
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
                                        onPress={() => {
                                            setBodyType('E');
                                            setSelectedType('E');
                                        }}
                                    >
                                        <Image
                                            source={require('../../../assets/g_btype1.png')}
                                            style={[
                                                styles.typeImage,
                                                bodyType === 'E' && styles.selectedType,
                                            ]}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.typeImageContainer}
                                        onPress={() => {
                                            setBodyType('F');
                                            setSelectedType('F');
                                        }}
                                    >
                                        <Image
                                            source={require('../../../assets/g_btype2.png')}
                                            style={[
                                                styles.typeImage,
                                                bodyType === 'F' && styles.selectedType,
                                            ]}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    style={styles.typeImageContainer2}
                                    onPress={() => {
                                        setBodyType('G');
                                        setSelectedType('G');
                                    }}
                                >
                                    <Image
                                        source={require('../../../assets/g_btype3.png')}
                                        style={[
                                            styles.typeImage2,
                                            bodyType === 'G' && styles.selectedType,
                                        ]} />
                                </TouchableOpacity>

                                <View style={styles.typeRow}>
                                    <TouchableOpacity
                                        style={styles.typeImageContainer}
                                        onPress={() => {
                                            setBodyType('H');
                                            setSelectedType('H');
                                        }}
                                    >
                                        <Image
                                            source={require('../../../assets/g_btype4.png')}
                                            style={[
                                                styles.typeImage,
                                                bodyType === 'H' && styles.selectedType,
                                            ]}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.typeImageContainer}
                                        onPress={() => {
                                            setBodyType('I');
                                            setSelectedType('I');
                                        }}
                                    >
                                        <Image
                                            source={require('../../../assets/g_btype5.png')}
                                            style={[
                                                styles.typeImage,
                                                bodyType === 'I' && styles.selectedType,
                                            ]}
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
                                source={require('../../../assets/human_body.png')}
                                style={styles.focusAreaImage}
                            />
                            {focusArea.map((checkbox, index) => (
                                <TouchableRipple
                                    key={index}
                                    onPress={() => handleFocusArea(index)}
                                    rippleColor="transparent"
                                >
                                    <Checkbox.Item
                                        key={index}
                                        label={checkbox.label}
                                        status={checkbox.checked ? 'checked' : 'unchecked'}
                                        style={styles.checkBox}
                                    />
                                </TouchableRipple>
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
                                selectionColor="#EE7CDC"
                                onChangeText={handleWeightChange}
                                returnKeyType="done"
                                onSubmitEditing={dismissKeyboard}
                            />
                        </View>
                        <Text>{`${isNaN(weight) || weight === '' ? '0.0' : weight} ${isKg ? 'kg' : 'lbs'}`}</Text>
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
                                selectionColor="#EE7CDC"
                                onChangeText={(height) => setHeight(height)}
                                returnKeyType="done"
                                onSubmitEditing={dismissKeyboard}
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
                                selectionColor="#EE7CDC"
                                onChangeText={(age) => setAge(age)}
                                returnKeyType="done"
                                onSubmitEditing={dismissKeyboard}
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
                        <Text variant="titleLarge" style={{ padding: 20 }}>Signing up</Text>
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

                <Snackbar
                    visible={showSnackbar}
                    onDismiss={handleSnackbarDismiss}
                    duration={3000}
                    style={styles.snackbar}
                >
                    <Text style={{ color: 'white', textAlign: 'center' }}>{alertMessage}</Text>
                </Snackbar>
            </PaperProvider>
        </SafeAreaView>
    );
};

export default RegistrationForm;
