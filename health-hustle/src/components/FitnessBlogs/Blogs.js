import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet,Image,ScrollView} from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

const Blogs = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [blogs, setBlogs] = useState([]);

  const { title, image, blog } = route.params || {};

  const filteredBlogs = blogs.filter((item) => item.title === title);
  const handleBack = () => {
    navigation.goBack();
  };


  return (
    <View style={styles.container}>
         <Appbar.Header style={styles.appHeaderContainer}>
          <Appbar.BackAction onPress={handleBack} />
          <Appbar.Content title="Fitness Blogs" titleStyle={styles.appHeaderTitle} />
        </Appbar.Header>
      {/* Optional: Display the passed title and image */}
      {title && (
        <View style={styles.header}>
          
          <Text style={styles.title}>{title}</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={{ uri: image }} style={styles.image} />
          {image && <Image source={{ uri: image }} />}
          <View style={styles.subcontainer}>
          <Text style={styles.text}> Written by: Michal</Text>
          <Text style={styles.text}> 23 july 2022</Text>
          <Text style={styles.text}> Time to read: 4 min</Text>
          </View>
          
          <Text style={styles.blog}>{blog}</Text>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 16,
    backgroundColor: '#fff',
  },
  subcontainer:{
    padding:'7%'
  },
  blogItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text:{
   alignSelf:'center',
   padding:'2%',
   fontFamily:'Cochin'
  },
  blog: {
    fontSize: 16,
    lineHeight:32,
    textAlign:'justify',
    // fontFamily:'Helvetica'
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    margin:'15%',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius:20
  },
  header:{
    flex:1,
    padding:25
  },
  appHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    elevation: 4, 
    shadowOpacity: 0.3, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowRadius: 2, 
  },
  appHeaderTitle: {
    alignSelf: 'stretch',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Blogs;
