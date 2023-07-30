import { View, ScrollView, Dimensions, Image, Alert, StyleSheet } from 'react-native';
import { Card, Chip, Appbar, Provider as PaperProvider, MD3DarkTheme, MD3LightTheme, Text, ActivityIndicator } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import YoutubePlayer from 'react-native-youtube-iframe';
import Carousel from 'react-native-new-snap-carousel/src/carousel/Carousel';
import Pagination from 'react-native-new-snap-carousel/src/pagination/Pagination';
import styles from './styles';
import { database } from '../../database/config';
import { AuthContext } from '../../contexts/AuthContext';
import * as Notifications from 'expo-notifications';


//#1 Users will be provided audio/video tutorials as a part of their daily workout routine.

const { width } = Dimensions.get('window');

const Workout_details = ({ route }) => {
  const { params } = useRoute();

  const item = params?.item || null;
  const [jsonData, setJsonData] = useState(item);
  const [carouselData, setCarouselData] = useState([]);
  const navigation = useNavigation();
  const [playing, setPlaying] = useState(false);
  const [isMute, setMute] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state
  const [goalsData, setGoalsData] = useState(null);
  const [theme, setTheme] = useState(false);
  const { uid } = useContext(AuthContext);

  useEffect(() => {
    setCarouselData([item]);
  }, [item]);

  useEffect(() => {
    if (jsonData) {
      const newCarouselData = [
        {
          type: 'image',
          source: { uri: jsonData.imageUrl },
        },
        {
          type: 'video',
          videoId: jsonData.videoUrl,
        },
      ];
      setCarouselData(newCarouselData);
      setLoading(false);

    }
  }, [jsonData]);

  const handleBack = () => {
    if(params.sessionDone == 1){
      navigation.navigate('Workout', { workoutDay: params.workoutDay+1 });
    } else {
      navigation.goBack();
    }
  };

  const getVideoId = (url) => {
    return url.split('v=')[1]?.split('&')[0];
  }

  useEffect(() => {
    const goalsRef = database.ref(`users/${uid}/goals`);
    const goalsListener = goalsRef.on('value', (snapshot) => {
      const goalsData = snapshot.val();

      if (goalsData === null) {
        console.log('No goals found');
      } else {
        setGoalsData(goalsData);
      }
    }, (error) => {
      console.log('Error retrieving goals data:', error);
    });

    return () => {
      goalsRef.off('value', goalsListener);
    };
  }, []);


  useEffect(() => {
    const updateWorkoutDuration = async () => {
      try {
        const userRef = database.ref(`users/${uid}/formData/workoutDuration`);
        const snapshot = await userRef.once('value');
        const currentDuration = snapshot.val() || 0;
        const updatedDuration = currentDuration + jsonData.estimatedTime;

        await userRef.set(updatedDuration);
        console.log('Workout duration updated successfully:', updatedDuration);

      } catch (error) {
        console.log('Error updating workout duration:', error);
      }
    };

    updateWorkoutDuration();
  }, []);

  useEffect(() => {
    const formDataRef = database.ref(`users/${uid}/formData`);
    const formDataListener = formDataRef.on('value', (snapshot) => {
      const formData = snapshot.val();
      const currentDuration = formData?.workoutDuration || 0;

      if (goalsData) {
        Object.entries(goalsData).forEach(([key, value]) => {
          const goalRef = database.ref(`users/${uid}/goals/${key}`);
          const updatedPercent = (((currentDuration - value.breakpoint) / value.value) * 100).toFixed(0);
          goalRef.update({ percent: updatedPercent });
          console.log(`Goal "${key}" percentage updated to ${updatedPercent}`);
          const newPercent = ((currentDuration / value.goal) * 100).toFixed(0);
          console.log("(Developers)New Percent %: ", newPercent)
          console.log(value.isActive)
        });
      }
    }, (error) => {
      console.log('Error retrieving form data:', error);
    });

    return () => {
      formDataRef.off('value', formDataListener);
    };
  }, [goalsData]);


  const onStateChange = (state) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('Video has finished playing!');
    }

    if (state !== 'playing') {
      setPlaying(false);
    }
  };

  const renderItem = ({ item }) => {
    if (item.type === 'image') {
      return <Image source={item.source} style={styles.image} />;
    }

    if (item.type === 'video') {
      return (
        <View style={styles.videoContainer}>
          <YoutubePlayer
            height={300}
            play={playing}
            mute={isMute}
            videoId={getVideoId(item.videoId)}
            onChangeState={onStateChange}
          />
        </View>
      );
    }

    return null;
  };


  // const sendLocalNotification = async (title, body) => {
  //   const handler = async () => {
  //     return { shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: true };
  //   };

  //   Notifications.setNotificationHandler(handler);

  //   await Notifications.presentNotificationAsync({
  //     title,
  //     body,
  //     ios: {
  //       _displayInForeground: true,
  //     },
  //   });

  //   console.log('Notification sent:', title, body);
  // };

  useEffect(() => {
    const userRef = database.ref(`users/${uid}/formData`);

    userRef
      .once('value')
      .then((snapshot) => {
        const formData = snapshot.val();
        if (formData && formData.isDarkActive !== undefined) {
          setTheme(formData.isDarkActive);
        }
      })
      .catch((error) => {
        console.error('Error fetching isDarkActive from Firebase:', error);

      });
  }, [uid]);

  const themeStyles = theme ? darkThemeStyles : lightThemeStyles;

  const paperTheme =
    theme
      ? { ...MD3DarkTheme }
      : { ...MD3LightTheme };

  return (
    <PaperProvider theme={paperTheme} >
      {theme ? <></> : <StatusBar bar-style={'light-content'} />}
      <Appbar.Header style={styles.appHeaderContainer}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content
          title="Exercise"
          titleStyle={styles.appHeaderTitle}
        />
      </Appbar.Header>

      <View style={[themeStyles.container]}>
        {jsonData === null || loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 40 }}>
              <Carousel
                data={carouselData}
                renderItem={renderItem}
                sliderWidth={width}
                itemWidth={width}
                onSnapToItem={(index) => setActiveIndex(index)}
              />
              <Pagination
                dotsLength={carouselData.length}
                activeDotIndex={activeIndex}
                containerStyle={styles.paginationContainer}
                dotStyle={[themeStyles.dot]}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              />
              <View style={{ alignItems: 'center', marginVertical: 5 }}>
                <Text style={{ fontWeight: 'bold' }}>{jsonData.exerciseName}</Text>
              </View>
            </View>
            <View style={{ flex: 60 }}> 
              <ScrollView style={{ height: '100%', paddingHorizontal:10 }} showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', padding: '5%' }}>
                  <View>
                    <Text variant="titleLarge" style={{ fontWeight: 'bold', margin: '6%' }}>Level</Text>
                    <Text variant="bodyMedium">{jsonData.level}</Text>
                  </View>
                  <View>
                    <Text variant="titleLarge" style={{ fontWeight: 'bold', margin: '6%' }}>Time</Text>
                    <Text variant="titleLarge">{jsonData.estimatedTime} Min</Text>
                  </View>
                </View>
                <Text variant="bodyMedium">{jsonData.description}</Text>

                <Text style={{ fontWeight: 'bold', marginTop: '3%' }}>Muscles Affected</Text>

                {jsonData.musclesAffected.map((muscle, index) => (
                  <Chip
                    key={index}
                    style={{ marginRight: '60%', marginTop: '4%', marginLeft: '4%' }}
                    icon="check"
                    mode="outlined"
                    onPress={() => console.log('Pressed')}
                  >
                    {muscle}
                  </Chip>
                ))}

                <Text style={{ fontWeight: 'bold', margin: '4%' }}>Equipment needed</Text>

                {jsonData.equipmentNeeded.map((equipment, index) => (
                  <Chip
                    key={index}
                    style={{ marginRight: "60%", marginLeft: '4%', marginBottom: '4%', width: "40%" }}
                    onPress={() => console.log('Pressed')}
                  >
                    <Ionicons name="barbell" size={24} color="black" />{equipment}
                  </Chip>
                ))}

              </ScrollView>
            </View>
          </View>
        )}
      </View>

    </PaperProvider>
  );
};

export default Workout_details;

const lightThemeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    margin: 10,
    marginHorizontal: 6,
  },
});

const darkThemeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444444',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    margin: 10,
    marginHorizontal: 6,
  },

});

