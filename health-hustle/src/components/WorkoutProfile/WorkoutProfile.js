import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Image, TouchableOpacity, Keyboard, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme, Drawer, Appbar, Text, Button, Checkbox, TextInput, Switch, RadioButton, Snackbar, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../contexts/AuthContext';
import Popover from 'react-native-popover-view';
import { database } from '../../database/config';

//Issue 15
const WorkoutProfile = () => {
    const { user } = useContext(AuthContext);
    const { uid } = user;
    const [formData, setFormData] = useState(null);
    const [gender, setGender] = useState('female');
    const [bodyGoals, setBodyGoals] = useState([
        { label: 'Weight Loss', checked: true },
        { label: 'Posture Correction', checked: false },
        { label: 'Muscle Gain', checked: false },
        { label: 'Agility', checked: false },
    ]);
    const allBodyGoals = bodyGoals.every(goal => !goal.checked);
    const [bodyType, setBodyType] = useState('A');
    const [isLoading, setIsLoading] = useState(true);

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
    const [workoutList, setWorkoutList] = useState('default');
    const [workoutDays, setWorkoutDays] = useState('');
    const [workoutDuration, setWorkoutDuration] = useState('');
    const [totalSteps, setTotalSteps] = useState('');

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const ageNumeric = !isNaN(age) && Number.isFinite(parseFloat(age));
    const ageInRange = parseFloat(age) >= 16 && parseFloat(age) <= 70;
    const heightNumeric = !isNaN(height) && Number.isFinite(parseFloat(height));
    const heightInRange = parseFloat(height) >= 3 && parseFloat(height) <= 9;
    const weightNumeric = !isNaN(weight) && Number.isFinite(parseFloat(weight));
    const weightInRange = parseFloat(weight) >= 40 && parseFloat(weight) <= 450;

    const [imageWidth, setImageWidth] = useState(0);

    useEffect(() => {
        const screenWidth = Dimensions.get('window').width;
        // const screenHeight = Dimensions.get('window').height;

        const imageRatio = 0.6;
        const calculatedWidth = screenWidth * imageRatio;
        const calculatedHeight = calculatedWidth;

        setImageWidth(calculatedWidth);
        // setImageHeight(calculatedHeight);
    }, []);
    const [isTextInputFocused, setTextInputFocused] = useState(false);

    const handleTextInputFocus = () => {
        setTextInputFocused(true);
    };

    const handleTextInputBlur = () => {
        setTextInputFocused(false);
    };

    const imageHeight = isTextInputFocused ? 0 : 200;

    const handleSnackbarDismiss = () => {
        setShowSnackbar(false);
    };

    useEffect(() => {
        const formDataRef = database.ref(`users/${uid}/formData`);

        const fetchData = async () => {
            try {
                const snapshot = await formDataRef.once('value');
                const formData = snapshot.val();
                setFormData(formData);
                setGender(formData.gender)
                setBodyGoals(formData.bodyGoals)
                setBodyType(formData.bodyType)
                setFocusArea(formData.focusArea)
                setWeight((formData.n_weight).toString())
                setIsKg(formData.isKg)
                setHeight((formData.n_height).toString())
                setAge((formData.n_age).toString())
                setWorkoutList(formData.workoutList)
                setEquipment(formData.equipment)
                setWorkoutDays(formData.workoutDays)
                setWorkoutDuration(formData.workoutDuration)
                setTotalSteps(formData.totalSteps)
            } catch (error) {
                console.error('Error fetching formData:', error);
            }
        };

        fetchData();

        return () => formDataRef.off();
    }, [uid]);

    const handleGenderChange = (selectedGender) => {
        if (gender !== selectedGender) {
            setGender(selectedGender);
        }
    }

    const handleFocusArea = (index) => {
        setFocusArea(prevState => {
            const updatedCheckboxes = [...prevState];
            updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
            return updatedCheckboxes;
        });
    };

    const handleBodyGoals = (index) => {
        setBodyGoals(prevState => {
            const updatedCheckboxes = [...prevState];
            updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
            return updatedCheckboxes;
        });
    };

    const handleWeightChange = (value) => {
        setWeight(value);
    };

    const handleUnitChange = () => {
        setIsKg(prevState => !prevState);
    };

    const convertWeight = () => {
        if (isKg) {
            return Math.round(weight * 2.20462);
        } else {
            return Math.round(weight / 2.20462);
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
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

    const navigation = useNavigation();

    const handleHomePress = () => {
        navigation.navigate('Home');
    };

    const [activeItem, setActiveItem] = useState('home');

    const handleBack = () => {
        navigation.goBack();
    };

    const [active, setActive] = useState('gender');

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
    const n_weight = parseInt(weight)
    const n_height = parseFloat(height)
    const n_age = parseFloat(age)
    const handleSubmit = () => {
        if (!gender) {
            setShowSnackbar(true);
        } else if (allBodyGoals) {
            setAlertMessage("Please select atleast one body goal")
            setShowSnackbar(true);
        } else if (!bodyType) {
            setShowSnackbar(true);
        } else if (gender === "male" && !["A", "B", "C", "D"].includes(bodyType)) {
            setAlertMessage("Please select body type for male")
            setShowSnackbar(true);
        } else if (gender === "female" && !["E", "F", "G", "H", "I"].includes(bodyType)) {
            setAlertMessage("Please select body type for female")
            setShowSnackbar(true);
        } else if (allFocusArea) {
            setAlertMessage("Please select atleast one focus area")
            setShowSnackbar(true);
        } else if ((!weight || !weightInRange || !weightNumeric)) {
            setAlertMessage("Enter a numeric value between 40.0 and 450.0")
            setShowSnackbar(true);
        } else if ((!height || !heightInRange || !heightNumeric)) {
            setAlertMessage("Enter a numeric value between 3.0 and 9.0")
            setShowSnackbar(true);
        } else if ((!age || !ageInRange || !ageNumeric)) {
            setAlertMessage("Enter a numeric value between 16 and 70")
            setShowSnackbar(true);
        } else if (!equipment) {
            setShowSnackbar(true);
        } else {
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
                workoutDays,
                workoutDuration,
                totalSteps
            };
            saveFormData(formData, uid);

            setShowPopover(true);

            Keyboard.dismiss();

            setTimeout(() => {
                setShowPopover(false);
            }, 2000);
        }
    };

    const [theme, setTheme] = useState(false);

    useEffect(() => {
        const userRef = database.ref(`users/${uid}/formData`);

        userRef
            .once('value')
            .then((snapshot) => {
                const formData = snapshot.val();
                if (formData && formData.isDarkActive !== undefined) {
                    setTheme(formData.isDarkActive);
                    setIsLoading(false);

                }
            })
            .catch((error) => {
                console.error('Error fetching isDarkActive from Firebase:', error);
                setIsLoading(false);

            });
    }, [uid]);

    const themeStyles = theme ? darkThemeStyles : lightThemeStyles;

    const paperTheme =
        theme
            ? { ...MD3DarkTheme }
            : { ...MD3LightTheme };


    const renderContent = () => {
        if (active === 'gender') {
            return (
                <View style={[themeStyles.container]}>
                    <Text style={styles.questionText}>Select your gender:</Text>
                    <Text>{'\n'}</Text>
                    <TouchableOpacity onPress={() => handleGenderChange('male')}
                        style={[
                            styles.genderButton,
                            gender === 'male' && { borderColor: theme ? 'white' : 'black', borderWidth: theme ? 1 : 1 },
                        ]}>
                        <Image
                            source={require('../../../assets/male.png')}
                            style={styles.genderImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleGenderChange('female')}
                        style={[
                            styles.genderButton,
                            gender === 'female' && { borderColor: theme ? 'white' : 'black', borderWidth: theme ? 1 : 1 },
                        ]}>
                        <Image
                            source={require('../../../assets/female.png')}
                            style={styles.genderImage}
                        />
                    </TouchableOpacity>
                </View>
            );
        } else if (active === 'goals') {
            return (
                <View style={[themeStyles.container]}>
                    <Text style={styles.questionText}>Select your body goals:</Text>
                    <View>
                        <Image
                            source={require('../../../assets/bodygoals.png')}
                            style={{ ...styles.genderImage, width: imageWidth, height: imageHeight, }}
                        />
                        {bodyGoals.map((checkbox, index) => (
                            <Checkbox.Item
                                key={index}
                                label={checkbox.label}
                                status={checkbox.checked ? 'checked' : 'unchecked'}
                                onPress={() => handleBodyGoals(index)}
                                style={[
                                    styles.checkBox,
                                    {
                                        backgroundColor: theme ? '#262626' : 'white',
                                        shadowColor: theme ? 'white' : 'black'
                                    },
                                ]}
                            />
                        ))}
                    </View>
                </View>
            )
        } else if (active === 'type') {
            return (
                <View style={[themeStyles.container]}>
                    <Text style={styles.questionText}>Select body type:</Text>
                    <Text>{'\n'}</Text>

                    {gender === 'male' && (
                        <>
                            <View style={styles.typeRow}>
                                <TouchableOpacity
                                    style={styles.typeImageContainer}
                                    onPress={() => {
                                        setBodyType('A');
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
            )
        } else if (active === 'focus') {
            return (<View style={[themeStyles.container]}>
                <Text style={styles.questionText}>Select focus area:</Text>
                <Text>{'\n'}</Text>
                <View>
                    <Image
                        source={require('../../../assets/human_body.png')}
                        style={{ ...styles.focusAreaImage, width: imageWidth, height: imageHeight, }}
                    />
                    {focusArea.map((checkbox, index) => (
                        <Checkbox.Item
                            key={index}
                            label={checkbox.label}
                            status={checkbox.checked ? 'checked' : 'unchecked'}
                            onPress={() => handleFocusArea(index)}
                            style={[
                                styles.checkBox,
                                {
                                    backgroundColor: theme ? '#262626' : 'white',
                                    shadowColor: theme ? 'white' : 'black'
                                },
                            ]}
                        />
                    ))}
                </View>
            </View>)
        } else if (active === 'weight') {
            return (
                <KeyboardAvoidingView style={[themeStyles.container]}>
                    <Text style={styles.questionText}>Enter weight:</Text>
                    <View style={styles.sectionBottomMargin}>
                        <Image
                            source={require('../../../assets/weight_scale.png')}
                            style={{ ...styles.formImage, width: imageWidth, height: imageHeight, }}
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
                            onFocus={handleTextInputFocus}
                            onBlur={handleTextInputBlur}
                        />
                    </View>
                    <Text>{`${weight} ${isKg ? 'kg' : 'lbs'}`}</Text>
                    <Switch
                        value={isKg}
                        onValueChange={handleUnitChange}
                        color="#1e0578"
                    />
                    <Text>{`${convertWeight()} ${isKg ? 'lbs' : 'kg'}`}</Text>
                </KeyboardAvoidingView >
            )
        } else if (active === 'height') {
            return (
                <KeyboardAvoidingView style={[themeStyles.container]}>
                    <Text style={styles.questionText}>Enter height in feet:</Text>
                    <View>
                        <Image
                            source={require('../../../assets/measure_height.png')}
                            style={{ ...styles.formImage, width: imageWidth, height: imageHeight, }}
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
                            onFocus={handleTextInputFocus}
                            onBlur={handleTextInputBlur}
                        />
                    </View>
                </KeyboardAvoidingView>
            )
        } else if (active === 'age') {
            return (<KeyboardAvoidingView style={[themeStyles.container]}>
                <Text style={styles.questionText}>Enter your age:</Text>
                <View>
                    <Image
                        source={require('../../../assets/ageing.png')}
                        style={{ ...styles.formImage, width: imageWidth, height: imageHeight, }}
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
                        onFocus={handleTextInputFocus}
                        onBlur={handleTextInputBlur}
                    />
                </View>
            </KeyboardAvoidingView>)
        } else if (active === 'workout') {
            return (
                <View style={[themeStyles.container]}>
                    <Text style={styles.questionText}>Preferred workout?</Text>
                    <View>
                        <Image
                            source={require('../../../assets/workout_type.jpg')}
                            style={{ ...styles.formImage, width: imageWidth, height: imageHeight, }}
                        />
                        <RadioButton.Group onValueChange={newValue => setEquipment(newValue)} value={equipment}>
                            <View style={{ marginBottom: 10 }}>
                                <RadioButton.Item label="With equipment" value="true" style={[
                                    styles.radio,
                                    {
                                        backgroundColor: theme ? '#262626' : 'white',
                                        shadowColor: theme ? 'white' : 'black'
                                    },
                                ]} />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <RadioButton.Item label="Without Equipment" value="false" style={[
                                    styles.radio,
                                    {
                                        backgroundColor: theme ? '#262626' : 'white',
                                        shadowColor: theme ? 'white' : 'black'
                                    },
                                ]} />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <RadioButton.Item label="Both" value="neutral" style={[
                                    styles.radio,
                                    {
                                        backgroundColor: theme ? '#262626' : 'white',
                                        shadowColor: theme ? 'white' : 'black'
                                    },
                                ]} />
                            </View>
                        </RadioButton.Group>
                    </View>
                </View>
            )
        }
        return null;
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    } else {
        return (
            <PaperProvider theme={paperTheme}>
                {theme ? <></> : <StatusBar bar-style={'light-content'} />}
                <Appbar.Header style={styles.appHeaderContainer}>
                    <Appbar.BackAction onPress={handleBack} />
                    <Appbar.Content
                        title="Update Details"
                        titleStyle={styles.appHeaderTitle}
                    />
                    <Appbar.Action icon="home" onPress={handleHomePress} />
                </Appbar.Header>
                <SafeAreaView style={styles.safeAreaContainer}>
                    <View style={styles.container}>
                        <View style={[themeStyles.sideBar]}>
                            <Drawer.CollapsedItem
                                focusedIcon="gender-male-female"
                                unfocusedIcon="gender-male-female"
                                label="Gender"
                                active={active === 'gender'}
                                onPress={() => setActive('gender')}
                            />
                            <Drawer.CollapsedItem
                                focusedIcon="adjust"
                                unfocusedIcon="adjust"
                                label="Body Goals"
                                active={active === 'goals'}
                                onPress={() => setActive('goals')}
                            />
                            <Drawer.CollapsedItem
                                focusedIcon="bulletin-board"
                                unfocusedIcon="bulletin-board"
                                label="Body Type"
                                active={active === 'type'}
                                onPress={() => setActive('type')}
                            />
                            <Drawer.CollapsedItem
                                focusedIcon="target"
                                unfocusedIcon="target"
                                label="Focus Area"
                                active={active === 'focus'}
                                onPress={() => setActive('focus')}
                            />
                            <Drawer.CollapsedItem
                                focusedIcon="weight"
                                unfocusedIcon="weight"
                                label="Weight"
                                active={active === 'weight'}
                                onPress={() => setActive('weight')}
                            />
                            <Drawer.CollapsedItem
                                focusedIcon="human-male-height"
                                unfocusedIcon="human-male-height"
                                label="Height"
                                active={active === 'height'}
                                onPress={() => setActive('height')}
                            />
                            <Drawer.CollapsedItem
                                focusedIcon="account-settings"
                                unfocusedIcon="account-settings"
                                label="Age"
                                active={active === 'age'}
                                onPress={() => setActive('age')}
                            />
                            <Drawer.CollapsedItem
                                focusedIcon="weight-lifter"
                                unfocusedIcon="weight-lifter"
                                label="Workout"
                                active={active === 'workout'}
                                onPress={() => setActive('workout')}
                            />
                        </View>
                        <View style={styles.mainContent}>
                            {renderContent()}
                            <Button
                                icon="check-bold"
                                mode="contained"
                                onPress={handleSubmit}
                                style={{ borderRadius: 0 }}>
                                Save Changes
                            </Button>
                            <Snackbar
                                visible={showSnackbar}
                                onDismiss={handleSnackbarDismiss}
                                duration={3000}
                                style={styles.snackbar}
                            >
                                <Text style={{ color: 'white', textAlign: 'center' }}>{alertMessage}</Text>
                            </Snackbar>
                        </View>
                    </View>
                </SafeAreaView>
                {showPopover && (
                    <Popover isVisible={showPopover}>
                        <Text variant="titleLarge" style={{ padding: 20 }}>Data Updated</Text>
                    </Popover>
                )}
            </PaperProvider>
        );
    }
};

export default WorkoutProfile;

const lightThemeStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sideBar: {
        flex: 1,
        backgroundColor: 'white',
        elevation: 4,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        zIndex: 1,
        paddingTop: 10
    },
});

const darkThemeStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#444444',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sideBar: {
        flex: 1,
        backgroundColor: '#262626',
        elevation: 4,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        zIndex: 1,
        paddingTop: 10
    },
});
