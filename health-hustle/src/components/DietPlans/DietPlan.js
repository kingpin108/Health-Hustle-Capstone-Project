import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Image, FlatList, TouchableOpacity,Modal,ScrollView } from 'react-native';
import { Text, Appbar, Button,Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import axios from "axios";
import { database } from '../../database/config';
import { auth } from '../../database/config';

const DietPlan = () => {
  const navigation = useNavigation();
  const [workoutData, setWorkoutData] = useState([]);
  const [isWorkoutDone, setIsWorkoutDone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [vegChecked, setVegChecked] = useState(false);
  const [nonVegChecked, setNonVegChecked] = useState(false);
  const [glutenFreeChecked, setGlutenFreeChecked] = useState(false);
  const [lactoseFreeChecked, setLactoseFreeChecked] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  let workoutSet = 'default'
  const user = auth.currentUser;
  const uid = user.uid;

  const handleModalToggle = () => {
    setShowModal(!showModal);
}

const handleRecipeModalToggle = () => {
    setShowRecipeModal(!showRecipeModal);
  };

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
    
    // const filteredData = workoutData.filter(item => {
    //   
    //   return (
    //     (vegChecked && item.isVeg) ||
    //     (nonVegChecked && !item.isVeg) ||
    //     (glutenFreeChecked && item.isGlutenFree) ||
    //     (lactoseFreeChecked && item.isLactoseFree)
    //   );
    // });
    // setWorkoutData(filteredData);
    
    handleModalToggle(); 
  };

  fetchFormData(uid)
  useEffect(() => {
      axios.get(`https://health-hustle-88599-default-rtdb.firebaseio.com/Exercises/${workoutSet}.json`)
          .then(response => {
              const jsonData = response.data;
              const workoutArray = Object.values(jsonData); // Convert the object into an array
              setWorkoutData(workoutArray);
          })
          .catch(error => {
              console.error('Error fetching API data:', error);
          });
  }, []);
  
  const handleBack = () => {
    navigation.goBack();
  };

  const ListItem = ({ item }) => (
    <TouchableOpacity
        style={styles.itemContainer}
        onPress={handleRecipeModalToggle}
    >
        <View style={styles.listItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.exerciseName}</Text>
                <Text style={styles.duration}>{item.bodyGoals}</Text>
            </View>
        </View>

        <Modal visible={showRecipeModal} onRequestClose={handleRecipeModalToggle}>
          <View style={styles.recipeModalContainer}>
            <Text style={styles.modalTitle}>Recipe Name</Text>
            <View style={{marginBottom:'10%'}}>
          <Image source={{uri:item.imageUrl}} style={styles.recipeImage} />
           <ScrollView showsVerticalScrollIndicator={false} style={{height:'50%'}}>
            <Text>recipe description recipe description recipe description recipe description recipe description
           recipe description recipe description recipe description recipe description  recipe description recipe description recipe description recipe description
             recipe description recipe description recipe description recipe descriptionrecipe description recipe description 
             recipe description recipe description
             recipe description recipe description recipe description recipe descriptionrecipe description recipe description 
             recipe description recipe description
             recipe description recipe description recipe description recipe descriptionrecipe description recipe description 
             recipe description recipe description
             recipe description recipe description recipe description recipe descriptionrecipe description recipe description 
             recipe description recipe description
             </Text>
           </ScrollView>
           </View>

           <View style={{justifyContent:'flex-end'}}>
           <Button mode="contained" onPress={handleRecipeModalToggle} style={{backgroundColor:"#EE7CDC"}}>Close Recipe</Button>
           </View>
          </View>
        </Modal>
    </TouchableOpacity>
);
return (
  <>
      <Appbar.Header style={styles.appHeaderContainer}>
          <Appbar.BackAction onPress={handleBack} />
          <Appbar.Content
              title="Diet Plan For You"
              titleStyle={styles.appHeaderTitle}
          />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
          <FlatList
              data={workoutData}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={
                  <>
                      <Button icon="filter" mode="contained" style={{margin:'5%',backgroundColor:'#EE7CDC'}} onPress={handleModalToggle}>Filter</Button>
                      <Text style={styles.titleInstruction} variant="headlineSmall">
                          Recipes
                      </Text>
                  </>
              }
              renderItem={ListItem}
              showsVerticalScrollIndicator={false}
          />
      </SafeAreaView>
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
          <Button mode="contained" onPress={handleFilterApply} style={{backgroundColor:"#EE7CDC"}}>Apply Filters</Button>
        </View>
      </Modal>
  </>


);
};

export default DietPlan;
