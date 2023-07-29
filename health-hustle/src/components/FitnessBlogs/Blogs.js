import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Appbar, Provider as PaperProvider, MD3DarkTheme, MD3LightTheme, Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { database } from '../../database/config';
import { AuthContext } from "../../contexts/AuthContext";
import { StatusBar } from 'expo-status-bar';

const Blogs = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [blogs, setBlogs] = useState([]);
  const [theme, setTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { uid } = useContext(AuthContext);



  const { title, image, blog } = route.params || {};

  const filteredBlogs = blogs.filter((item) => item.title === title);
  const handleBack = () => {
    navigation.goBack();
  };

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
          <Appbar.Content title="Blog Post" titleStyle={styles.appHeaderTitle} />
        </Appbar.Header>
        {title && (
          <View style={[themeStyles.container]}>

            <Text variant="headlineSmall" style={{alignSelf: "center", textAlign: "center"}}>{title}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Image source={{ uri: image }} style={styles.image} />
              {image && <Image source={{ uri: image }} />}
              <View style={styles.subcontainer}>
                <Text variant="titleLarge" style={styles.text}> Written by: Michal</Text>
                <Text variant="titleLarge" style={styles.text}> 23 july 2022</Text>
                <Text variant="titleLarge" style={styles.text}> Time to read: 4 min</Text>
              </View>
              <Text style={styles.blog}>{blog}</Text>
            </ScrollView>
          </View>
        )}
      </PaperProvider>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subcontainer: {
    padding: '7%'
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
  text: {
    alignSelf: "center", 
    textAlign: "center",
    fontStyle: 'italic'
  },
  blog: {
    fontSize: 16,
    lineHeight: 32,
    textAlign: 'justify',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    margin: '15%',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 20
  },
  
  appHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    elevation: 4,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    zIndex: 1
  },
  appHeaderTitle: {
    alignSelf: 'stretch',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Blogs;

const lightThemeStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
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
    padding: 25,
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