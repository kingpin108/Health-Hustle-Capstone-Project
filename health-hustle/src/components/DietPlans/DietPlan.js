import React, { useState, useEffect, useContext } from "react";
import { View, SafeAreaView, Image, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme, Text, Appbar, Button, Checkbox, Portal, Dialog } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';
import axios from "axios";
import { database } from '../../database/config';
import { AuthContext } from "../../contexts/AuthContext";
import Icon from 'react-native-vector-icons/FontAwesome';


//Issue #5
const ListItem = ({ item }) => {
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  const handleRecipeModalToggle = () => {
    setShowRecipeModal(!showRecipeModal);
  };

  const { uid } = useContext(AuthContext);
  const [theme, setTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <TouchableOpacity
      style={[themeStyles.itemContainer]}
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
        <Portal>
          <Dialog visible={showRecipeModal} onDismiss={handleRecipeModalToggle} style={{ height: 600 }}>
            <Dialog.Actions>
              <TouchableOpacity onPress={handleRecipeModalToggle} style={styles.closeIcon}>
                <Icon name="times" size={30} color="#000" />
              </TouchableOpacity>
            </Dialog.Actions>
            <Dialog.Title style={styles.modalTitle}>{item.recipe.mealName}</Dialog.Title>
            <Dialog.Content>
              <Image source={{ uri: item.image }} style={styles.recipeImage} />
              <ScrollView showsVerticalScrollIndicator={true} style={styles.recipeScrollView}>
                <Text variant="headlineSmall">Ingredients</Text>
                {item.recipe.ingredients.map((step, index) => (
                  <Text key={index} style={styles.recipeStep}>
                    {'\u2022'} {step}
                  </Text>
                ))}
                <Text variant="headlineSmall">Recipe</Text>
                {item.recipe.instructions.map((step, index) => (
                  <Text key={index} style={styles.recipeStep}>
                    {'\u2022'} {step}
                  </Text>
                ))}
              </ScrollView>
            </Dialog.Content>
          </Dialog>
        </Portal>
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
  const [bodyGoal, setBodyGoal] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(false);

  let workoutSet = 'default';
  const { uid } = useContext(AuthContext);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const fetchFormData = async (uid) => {
    try {
      const usersRef = database.ref('users');
      const formDataRef = usersRef.child(uid).child('formData');

      const isDarkActiveSnapshot = await formDataRef.child('isDarkActive').once('value');
      const isDarkActive = isDarkActiveSnapshot.val();
      setTheme(isDarkActive);

      const bodyGoalsSnapshot = await formDataRef.child('bodyGoals').once('value');
      const bodyGoals = bodyGoalsSnapshot.val();

      const selectedGoal = Object.keys(bodyGoals).find((key) => bodyGoals[key].checked === true);

      if (selectedGoal) {
        setBodyGoal(bodyGoals[selectedGoal].label);
      }
    } catch (error) {
      console.log('Error fetching form data:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchFormData(uid).catch((error) => {
      setIsLoading(false);
      console.log('Error fetching data:', error);
    });
  }, [uid]);

  const themeStyles = theme ? darkThemeStyles : lightThemeStyles;

  const paperTheme =
    theme
      ? { ...MD3DarkTheme }
      : { ...MD3LightTheme };

  const handleFilterApply = () => {
    const filteredData = workoutData.filter(item => {
      return (
        (!vegChecked || item.type === 'Veg') &&
        (!nonVegChecked || item.type === 'Non-veg') &&
        (!glutenFreeChecked || item.type === 'Gluten-free') &&
        (!lactoseFreeChecked || item.type === 'Lectose free')
      );
    });
    setFilteredWorkoutData(filteredData);
    handleModalToggle();
  };

  useEffect(() => {
    setIsLoading(true);

    axios.get(`https://health-hustle-88599-default-rtdb.firebaseio.com/DietPlan/diet.json`)
      .then(response => {
        const jsonData = response.data;
        const workoutArray = Object.values(jsonData);
        setWorkoutData(workoutArray);
        setFilteredWorkoutData(workoutArray);
        setIsLoading(false);

      })
      .catch(error => {
        console.error('Error fetching API data:', error);
        setIsLoading(false);

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
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  fetchData();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  else {
    return (
      <PaperProvider theme={paperTheme}>
        {theme ? <></>: <StatusBar bar-style={'light-content'} />}  
        <Appbar.Header style={styles.appHeaderContainer}>
          <Appbar.BackAction onPress={handleBack} />
          <Appbar.Content title="Diet Plans" titleStyle={styles.appHeaderTitle} />
        </Appbar.Header>
        <SafeAreaView style={[themeStyles.container]}>
          <FlatList 
            data={filteredWorkoutData}
            keyExtractor={(item) => item.recipe.mealName}
            ListHeaderComponent={
              <>
                <Button
                  icon="filter"
                  mode="contained"
                  style={{ margin: '5%'}}
                  onPress={handleModalToggle}
                >
                  Filter
                </Button>
                <Text style={styles.titleInstruction} variant="headlineSmall">
                  Recipes for {bodyGoal}
                </Text>
              </>
            }
            renderItem={({ item }) => <ListItem item={item} />}
            showsVerticalScrollIndicator={false}
          />

          <Portal>
            <Dialog visible={showModal} onDismiss={handleModalToggle}>
              <Dialog.Title style={styles.modalTitle}>Select Filters:</Dialog.Title>
              <Dialog.Content>
                <View style={styles.checkboxContainer}>
                  <Checkbox.Item
                    label="Vegetarian"
                    status={vegChecked ? 'checked' : 'unchecked'}
                    onPress={() => setVegChecked(!vegChecked)}
                  />
                  <Checkbox.Item
                    label="Non-Vegetarian"
                    status={nonVegChecked ? 'checked' : 'unchecked'}
                    onPress={() => setNonVegChecked(!nonVegChecked)}
                  />
                  <Checkbox.Item
                    label="Gluten-Free"
                    status={glutenFreeChecked ? 'checked' : 'unchecked'}
                    onPress={() => setGlutenFreeChecked(!glutenFreeChecked)}
                  />
                  <Checkbox.Item
                    label="Lactose-Free"
                    status={lactoseFreeChecked ? 'checked' : 'unchecked'}
                    onPress={() => setLactoseFreeChecked(!lactoseFreeChecked)}
                  />
                </View>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  mode="contained"
                  onPress={handleFilterApply}
                >
                  Apply Filters
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </SafeAreaView>
      </PaperProvider>
    )
  }
};

export default DietPlan;

const lightThemeStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'white',
  },
  itemContainer: {
    elevation: 4,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black'
  },
});

const darkThemeStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#444444',
  },
  itemContainer: {
    elevation: 4,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: '#262626',
    borderRadius: 10,
    shadowColor: 'white'
  },
});