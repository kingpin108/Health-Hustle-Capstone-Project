import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Image, FlatList, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Text, Appbar, Button, Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import axios from "axios";
import { database } from '../../database/config';
import { auth } from '../../database/config';

const ListItem = ({ item }) => {
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  const handleRecipeModalToggle = () => {
    setShowRecipeModal(!showRecipeModal);
  };

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={handleRecipeModalToggle}
    >
      <View style={styles.listItem}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.recipe.mealName}</Text>
          <Text style={styles.duration}>{item.type}</Text>
          <Text style={styles.duration}>{item.mealTime}</Text>
        </View>
      </View>

      {showRecipeModal && (
        <Modal
          visible={showRecipeModal}
          onRequestClose={handleRecipeModalToggle}
        >
          <View style={styles.recipeModalContainer}>
            <Text style={styles.modalTitle}>{item.recipe.mealName}</Text>
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.recipeScrollView}
            >
              {item.recipe.instructions.map((step, index) => (
                <Text key={index} style={styles.recipeStep}>
                  {step}
                </Text>
              ))}
            </ScrollView>
            <Button
              mode="contained"
              onPress={handleRecipeModalToggle}
              style={styles.closeButton}
            >
              Close Recipe
            </Button>
          </View>
        </Modal>
      )}
    </TouchableOpacity>
  );
};

const DietPlan = () => {
  const navigation = useNavigation();
  const [workoutData, setWorkoutData] = useState([]);
  const [isWorkoutDone, setIsWorkoutDone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [vegChecked, setVegChecked] = useState(false);
  const [nonVegChecked, setNonVegChecked] = useState(false);
  const [glutenFreeChecked, setGlutenFreeChecked] = useState(false);
  const [lactoseFreeChecked, setLactoseFreeChecked] = useState(false);
  const [filteredWorkoutData, setFilteredWorkoutData] = useState(false);

  let workoutSet = 'default'
  const user = auth.currentUser;
  const uid = user.uid;

  const handleModalToggle = () => {
    setShowModal(!showModal);
  }

  const fetchFormData = (uid) => {
    try {
      const usersRef = database.ref('users');
      const formDataRef = usersRef.child(uid).child('formData');
      formDataRef.on('value', (snapshot) => {
        workoutSet = snapshot.val().workoutList;
      });

    } catch (error) {
      console.log('Error fetching form data:', error);
      throw error;
    }
  };

  const handleFilterApply = () => {
    const filteredData = workoutData.filter(item => {
      return (
        (!vegChecked || item.type === 'veg') &&
        (!nonVegChecked || item.type === 'non-veg') &&
        (!glutenFreeChecked || item.type === 'gluten-free') &&
        (!lactoseFreeChecked || item.type === 'lectose free')
      );
    });
    setFilteredWorkoutData(filteredData);
    handleModalToggle();
  };

  fetchFormData(uid)
  useEffect(() => {
    axios.get(`https://health-hustle-88599-default-rtdb.firebaseio.com/DietPlan/diet.json`)
      .then(response => {
        const jsonData = response.data;
        const workoutArray = Object.values(jsonData); // Convert the object into an array
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

  const fetchData = async () => {
    try {
      const response = await fetch('https://edamam-recipe-search.p.rapidapi.com/search?q=vegan', {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '875418e97bmsh4cb44f6d411f72bp108c2djsn627b1c3a20bf',
          'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      console.log(data);
      // Process the retrieved data here
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  fetchData();

  return (
    <>
      <Appbar.Header style={styles.appHeaderContainer}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content
          title="Diet Plans"
          titleStyle={styles.appHeaderTitle}
        />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={filteredWorkoutData}
          keyExtractor={(item) => item.recipe.mealName}
          ListHeaderComponent={
            <>
              <Button icon="filter" mode="contained" style={{ margin: '5%', backgroundColor: '#EE7CDC' }} onPress={handleModalToggle}>Filter</Button>
              <Text style={styles.titleInstruction} variant="headlineSmall">
                Recipes
              </Text>
            </>
          }
          renderItem={({ item }) => <ListItem item={item} />}
          showsVerticalScrollIndicator={false}
        />
        <Modal visible={showModal} onRequestClose={handleModalToggle}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Filters:</Text>
            <View style={styles.checkboxContainer}>
              <Checkbox.Item
                label="Vegetarian"
                status={vegChecked ? 'checked' : 'unchecked'}
                onPress={() => setVegChecked(!vegChecked)}
                color="#EE7CDC"
              />
              <Checkbox.Item
                label="Non-Vegetarian"
                status={nonVegChecked ? 'checked' : 'unchecked'}
                onPress={() => setNonVegChecked(!nonVegChecked)}
                color="#EE7CDC"
              />
              <Checkbox.Item
                label="Gluten-Free"
                status={glutenFreeChecked ? 'checked' : 'unchecked'}
                onPress={() => setGlutenFreeChecked(!glutenFreeChecked)}
                color="#EE7CDC"
              />
              <Checkbox.Item
                label="Lactose-Free"
                status={lactoseFreeChecked ? 'checked' : 'unchecked'}
                onPress={() => setLactoseFreeChecked(!lactoseFreeChecked)}
                color="#EE7CDC"
              />
            </View>
            <Button mode="contained" onPress={handleFilterApply} style={{ backgroundColor: "#EE7CDC" }}>Apply Filters</Button>
          </View>
        </Modal>
      </SafeAreaView>

    </>


  );
};

export default DietPlan;
