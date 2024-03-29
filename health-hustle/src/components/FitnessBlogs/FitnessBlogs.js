import React, { useState, useEffect, useContext } from "react";
import { View, SafeAreaView, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme, Text, Appbar, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import axios from "axios";
import { database } from '../../database/config';
import { AuthContext } from "../../contexts/AuthContext";
import { StatusBar } from 'expo-status-bar';

//[#2]Users can read blogs on health and wellbeing to learn more.
const ListItem = ({ item }) => {
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  const handleRecipeModalToggle = () => {
    setShowRecipeModal(!showRecipeModal);
  };

  const navigation = useNavigation();
  const handleNavigateToBlogs = () => {
    navigation.navigate('Blogs', {
      title: item.title,
      image: item.image,
      blog: item.blog,
    });
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
      onPress={handleNavigateToBlogs}
    >
      <View style={styles.listItem}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};


const FitnessBlogs = () => {
  const navigation = useNavigation();
  const [workoutData, setWorkoutData] = useState([]);
  const [isWorkoutDone, setIsWorkoutDone] = useState(false);
  const [filteredWorkoutData, setFilteredWorkoutData] = useState(false);
  const [bodyGoal, setBodyGoal] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  let workoutSet = 'default';
  const { uid } = useContext(AuthContext);
  const [theme, setTheme] = useState(false);


  const fetchFormData = async (uid) => {
    try {
      const usersRef = database.ref('users');
      const formDataRef = usersRef.child(uid).child('formData');

      // Fetch isDarkActive
      const isDarkActiveSnapshot = await formDataRef.child('isDarkActive').once('value');
      const isDarkActive = isDarkActiveSnapshot.val();
      setTheme(isDarkActive);

      // Fetch bodyGoals
      const bodyGoalsSnapshot = await formDataRef.child('bodyGoals').once('value');
      const bodyGoals = bodyGoalsSnapshot.val();

      // Find the selected body goal
      const selectedGoal = Object.keys(bodyGoals).find((key) => bodyGoals[key].checked === true);

      // Set the selected body goal to state
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


  useEffect(() => {
    axios.get(`https://health-hustle-88599-default-rtdb.firebaseio.com/blogs/fitness_blogs.json`)
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

  const themeStyles = theme ? darkThemeStyles : lightThemeStyles;

  const paperTheme =
    theme
      ? { ...MD3DarkTheme }
      : { ...MD3LightTheme };


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
          <Appbar.Content title="Fitness blogs" titleStyle={styles.appHeaderTitle} />
        </Appbar.Header>
        <SafeAreaView style={[themeStyles.container]}>
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
      </PaperProvider>
    );
  }
}
export default FitnessBlogs;

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
    shadowColor:'black'
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

