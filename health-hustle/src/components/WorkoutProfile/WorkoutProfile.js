import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, Dimensions, SafeAreaView, Image, ScrollView, Touchable, TouchableOpacity } from 'react-native';
import { Drawer, Appbar, Divider, Text, Button, Checkbox, TextInput, Switch, RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../contexts/AuthContext';
import Popover from 'react-native-popover-view';
import { database } from '../../database/config';


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
    const [workoutList, setWorkoutList] = useState('default');

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
            } catch (error) {
                console.error('Error fetching formData:', error);
            }
        };

        fetchData();

        return () => formDataRef.off();
    }, [uid]);

    // console.log(formData);

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
            // Convert weight from kg to lbs
            return Math.round(weight * 2.20462);
        } else {
            // Convert weight from lbs to kg
            return Math.round(weight / 2.20462);
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

    handleWorkoutList(selectedBodyGoal, selectedFocusArea, workoutList, setWorkoutList);

    const navigation = useNavigation();

    const handleHomePress = () => {
        navigation.navigate('Home');
    };

    const [activeItem, setActiveItem] = useState('home');

    const handleItemPress = (item) => {
        setActiveItem(item);
    };

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
    const workoutDays = formData.workoutDays
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
            isKg,
            workoutList,
            workoutDays
        };
        saveFormData(formData, uid);

        setShowPopover(true);

        setTimeout(() => {
            setShowPopover(false);
        }, 2000);
    };

    const renderContent = () => {
        if (active === 'gender') {
            return (
                <View style={styles.contentContainer}>
                    <Text style={styles.questionText}>Select your gender:</Text>
                    <Text>{'\n'}</Text>
                    <TouchableOpacity onPress={() => handleGenderChange('male')}
                        style={[
                            styles.genderButton,
                            gender === 'male' && styles.activeButton,
                        ]}>
                        <Image
                            source={require('../../../assets/male.png')}
                            style={styles.genderImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleGenderChange('female')}
                        style={[
                            styles.genderButton,
                            gender === 'female' && styles.activeButton,
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
                <View style={styles.contentContainer}>
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
            )
        } else if (active === 'type') {
            return (
                <View style={styles.contentContainer}>
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
            return (<View style={styles.contentContainer}>
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
            </View>)
        } else if (active === 'weight') {
            return (
                <View style={styles.contentContainer}>
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
            )
        } else if (active === 'height') {
            return (
                <View style={styles.contentContainer}>
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
            )
        } else if (active === 'age') {
            return (<View style={styles.contentContainer}>
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
            </View>)
        } else if (active === 'workout') {
            return (
                <View style={styles.contentContainer}>
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
        }
        return null;
    };

    return (
        <>
            <StatusBar bar-style='dark-content' />
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
                    <View style={styles.sideBar}>
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
                        <Button icon="check-bold" mode="elevated" dark={true} buttonColor='#150359' onPress={handleSubmit} style={{ borderRadius: 0 }}>
                            Save Changes
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
            {showPopover && (
                <Popover isVisible={showPopover}>
                    <Text variant="titleLarge" style={{ padding: 20 }}>Data Updated</Text>
                </Popover>
            )}
        </>
    );
};

export default WorkoutProfile;