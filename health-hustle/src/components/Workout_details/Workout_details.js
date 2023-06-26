import { Text, View, ScrollView, Dimensions, Image } from 'react-native';
import { Card, Chip, Appbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState,useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Carousel from 'react-native-new-snap-carousel/src/carousel/Carousel';
import Pagination from 'react-native-new-snap-carousel/src/pagination/Pagination';
import styles from './styles';
import { database } from '../../database/config';
import { AuthContext } from '../../contexts/AuthContext';


//#1 Users will be provided audio/video tutorials as a part of their daily workout routine.
const fetchData = async () => {
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
    }
  });
  const json_dataa = await response.json();
  console.log(json_dataa.bodyGoals, "fetched data");
};

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
    }
  }, [jsonData]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleOpenVideo = () => {
    navigation.navigate('WorkoutVideo');
  };

  const getVideoId = (url) => {
    return url.split('v=')[1]?.split('&')[0];
  }

  // useEffect(() => {
  //   fetchData();
  // }, []);

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

  return (
    <>
      <Appbar.Header style={styles.appHeaderContainer}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content
          title="Exercise"
          titleStyle={styles.appHeaderTitle}
        />
      </Appbar.Header>

      <Card style={{ marginTop: 10 }}>
        {jsonData && (
          <View>
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
              dotStyle={styles.dot}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />

            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>{jsonData.exerciseName}</Text>
            </View>

            <ScrollView style={{ height:'100%' }} showsVerticalScrollIndicator={false}>
              <Card.Content>
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
                    style={{ marginRight: "60%", marginLeft: '4%', marginBottom: '4%', width:"40%",backgroundColor: "#ffffff" }}
                    onPress={() => console.log('Pressed')}
                  >
                    <Ionicons name="barbell" size={24} color="black" />{equipment}
                  </Chip>
                ))}
              </Card.Content>
            </ScrollView>
          </View>
        )}
      </Card>
    </>
  );
};

export default Workout_details;
