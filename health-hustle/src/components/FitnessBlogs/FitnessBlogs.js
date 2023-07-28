import React, { useState, useEffect, useContext } from "react";
import { View, SafeAreaView, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Appbar, Button, Checkbox, Provider, Portal, Dialog } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import axios from "axios";
import { database } from '../../database/config';
import { auth } from '../../database/config';
import { AuthContext } from "../../contexts/AuthContext";

const ListItem = ({item}) => {
    const [showRecipeModal, setShowRecipeModal] = useState(false);
    const handleRecipeModalToggle = () => {
        setShowRecipeModal(!showRecipeModal);
      };

    const navigation = useNavigation();
    const handleBack = () => {
        navigation.goBack();
    };
    return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={handleRecipeModalToggle}
    >
      <View style={styles.listItem}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          {/* <Text style={styles.duration}>{item.image}</Text> */}
          {/* <Text style={styles.duration}>{item.blog}</Text> */}
        </View>
      </View>

      {showRecipeModal && (
        <Portal>
          <Dialog visible={showRecipeModal} onDismiss={handleRecipeModalToggle} style={{height: 600}}>
            <Dialog.Title style={styles.modalTitle}>{item.title}</Dialog.Title>
            <Dialog.Content>
              <Image source={{ uri: item.image }} style={styles.recipeImage} />
              <ScrollView showsVerticalScrollIndicator={true} style={styles.recipeScrollView}>
              <Text style={styles.recipeStep}>{item.blog}</Text>
              </ScrollView>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleRecipeModalToggle} style={{marginTop:-20}}>
                Close Recipe
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
    </TouchableOpacity>
  );
};


const FitnessBlogs = () => {
    const navigation = useNavigation();
    const [workoutData, setWorkoutData] = useState([]);
    const [isWorkoutDone, setIsWorkoutDone] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [filteredWorkoutData, setFilteredWorkoutData] = useState(false);
    const [bodyGoal, setBodyGoal] = useState('');
  
  
    let workoutSet = 'default';
    const { uid } = useContext(AuthContext);
  
    const handleModalToggle = () => {
      setShowModal(!showModal);
    };
  
    const fetchFormData = (uid) => {
      try {
        const usersRef = database.ref('users');
        const formDataRef = usersRef.child(uid).child('formData').child('bodyGoals');
        formDataRef.on('value', (snapshot) => {
          const bodyGoals = snapshot.val();
  
          // Find the selected body goal
          const selectedGoal = Object.keys(bodyGoals).find((key) => bodyGoals[key].checked === true);
  
          // Set the selected body goal to state
          if (selectedGoal) {
            setBodyGoal(bodyGoals[selectedGoal].label);
          }
        });
      } catch (error) {
        console.log('Error fetching form data:', error);
        throw error;
      }
    };
  
    useEffect(() => {
      fetchFormData(uid);
    }, []);
  
  
    useEffect(() => {
      axios.get(`https://health-hustle-88599-default-rtdb.firebaseio.com/blogs/fitness_blogs.json`)
        .then(response => {
          const jsonData = response.data;
          const workoutArray = Object.values(jsonData);
          setWorkoutData(workoutArray);
          setFilteredWorkoutData(workoutArray);
        })
        .catch(error => {
          console.error('Error fetching API data:', error);
        });
    }, []);
  
    const handleBack = () => {
      navigation.goBack();
    };
  
    return (
      <Provider>
        <Appbar.Header style={styles.appHeaderContainer}>
          <Appbar.BackAction onPress={handleBack} />
          <Appbar.Content title="Fitness blogs" titleStyle={styles.appHeaderTitle} />
        </Appbar.Header>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={filteredWorkoutData}
            keyExtractor={(item) => item.title}
            ListHeaderComponent={
              <>
               
                <Text style={styles.titleInstruction} variant="headlineSmall">
                  List of blogs for {bodyGoal}
                </Text>
              </>
            }
            renderItem={({ item }) => <ListItem item={item} />}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </Provider>
    );
  };
export default FitnessBlogs;