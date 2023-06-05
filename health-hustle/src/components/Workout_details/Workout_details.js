import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native';
import { Avatar, Card, IconButton, FAB, Chip, Button, Appbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Carousel from 'react-native-new-snap-carousel/src/carousel/Carousel';
import Pagination from 'react-native-new-snap-carousel/src/pagination/Pagination';
import styles from './styles';
import axios from 'axios';

const url = "https://info6127-1119668-default-rtdb.firebaseio.com/Health_husle/dummy/-NMemxkO7aLtUBPtdCmV.json";

const fetchData = async () => {
    const response = await fetch(url,
        {
            headers: {
                'Accept': 'application/json',
                // 'Authorization': `Bearer ${token}`
            }
        }
    )
    const json_dataa = await response.json();
    console.log(json_dataa.bodyGoals, "fetched data")
}
const { width } = Dimensions.get('window');


const Workout_details = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    axios.get('https://info6127-1119668-default-rtdb.firebaseio.com/Health_husle/dummy/-NMemxkO7aLtUBPtdCmV.json')
      .then(response => {
        const jsonData = response.data;
        setJsonData(jsonData);
      })
      .catch(error => {
        console.error('Error fetching API data:', error);
      });
}, []);

    const navigation = useNavigation();
    const [playing, setPlaying] = useState(false);
    const [isMute, setMute] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleBack = () => {
        navigation.goBack();
    };
    const handleOpenVideo = () => {
        navigation.navigate('WorkoutVideo');
    };
    useEffect(() => {
        fetchData()
    }, [])

    const onStateChange = (state) => {
      if (state === 'ended') {
        setPlaying(false);
        Alert.alert('Video has finished playing!');
      }
  
      if (state !== 'playing') {
        setPlaying(false);
      }
    };
  
    const data = [
      {
        type: 'image',
        source: require('../../../assets/Bench-press-1.png'),
      },
      {
        type: 'video',
        videoId: '676GkswmHRY',
      },
    ];
  
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
              videoId={item.videoId}
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
                    titleStyle={styles.appHeaderTitle} />
            </Appbar.Header>

                <Card style={{ marginTop: 10 }}>
                {jsonData && (
                  <View>
                    <Carousel
                        data={data}
                        renderItem={renderItem}
                        sliderWidth={width}
                        itemWidth={width}
                        onSnapToItem={(index) => setActiveIndex(index)}
                    />
                    <Pagination
                        dotsLength={data.length}
                        activeDotIndex={activeIndex}
                        containerStyle={styles.paginationContainer}
                        dotStyle={styles.dot}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                    />
                      {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
                    <View style={{ alignItems: 'center'}}>
                        <Text style={{ fontWeight: 'bold' }}>{JSON.stringify(jsonData.exerciseName).replace(/"/g, '')}</Text>
                    </View>
                    <ScrollView showsHorizontalScrollIndicator={false}>
                        <Card.Content>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', padding: '5%' }}>
                                <View>
                                    <Text variant="titleLarge" style={{ fontWeight: 'bold', margin: '6%' }}>Level</Text>
                                    <Text variant="bodyMedium">{JSON.stringify(jsonData.level).replace(/"/g, '')}</Text>
                                </View>
                                <View>
                                    <Text variant="titleLarge" style={{ fontWeight: 'bold', margin: '6%' }}>Time</Text>
                                    <Text variant="titleLarge">30 Mins</Text>
                                </View>
                            </View>
                            <Text variant="bodyMedium">{JSON.stringify(jsonData.description).replace(/"/g, '')}</Text>

                            <Text style={{ fontWeight: 'bold', marginTop: '3%' }}>Muscles Affected</Text>

                        </Card.Content>
                        <Chip style={{ marginRight: "60%", marginTop: '4%', marginLeft: '4%' }} icon="check" mode="outlined" onPress={() => console.log('Pressed')}>{JSON.stringify(jsonData.musclesAffected[0]).replace(/"/g, '')}</Chip>
                        <Chip style={{ marginRight: "60%", marginTop: '4%', marginLeft: '4%' }} icon="check" mode="outlined" onPress={() => console.log('Pressed')}>{JSON.stringify(jsonData.musclesAffected[1]).replace(/"/g, '')}</Chip>
                        <Chip style={{ marginRight: "60%", marginTop: '4%', marginLeft: '4%' }} icon="check" mode="outlined" onPress={() => console.log('Pressed')}>{JSON.stringify(jsonData.musclesAffected[2]).replace(/"/g, '')}</Chip>
                        
                        <Text style={{ fontWeight: 'bold', margin: '4%'}}>Equipment needed</Text>
                        <Chip style={{ marginRight: "60%", marginLeft: '4%', marginBottom: '4%', backgroundColor: "#ffffff" }} onPress={() => console.log('Pressed')}><Ionicons name="barbell" size={24} color="black" />Barbell</Chip>
                    </ScrollView>
                    </View>
                )}
                </Card>

                {/* <Button style={{ marginTop: '6%' }} mode="contained" onPress={() => console.log('Start workout pressed')}>
                    Start workout
                </Button> */}

        </>
    );
};

export default Workout_details;