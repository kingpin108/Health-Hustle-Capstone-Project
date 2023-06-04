import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,ScrollView} from 'react-native';
import { Avatar, Card ,IconButton,FAB, Chip, Button} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';

// import styles from './styles';

const url = "https://info6127-1119668-default-rtdb.firebaseio.com/Health_husle/dummy/-NMektQ_bToh7QCIv6iz.json";

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
    console.log(json_dataa.bodyGoals,"fetched data")
}

const Workout_details = () => {
    useEffect(() => {
        fetchData()
    }, [])
    return (
   <>
            <Card style={{ marginTop: "20%" }}>

                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <View style={{ alignItems: 'center', paddingTop: '5%' }}>
                    <Text style={{ fontWeight: 'bold' }}>Excercise Name</Text>
                </View>
                <ScrollView>
                    <Card.Content>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', padding: '5%' }}>
                            <View>
                                <Text variant="titleLarge" style={{ fontWeight: 'bold', margin: '6%' }}>Level</Text>
                                <Text variant="bodyMedium">Beginner</Text>
                            </View>
                            <View>
                                <Text variant="titleLarge" style={{ fontWeight: 'bold', margin: '6%' }}>Time</Text>
                                <Text variant="titleLarge">30 Mins</Text>
                            </View>
                        </View>
                        <Text variant="bodyMedium">The squat is a compound exercise that targets the muscles of the lower body. It primarily works the quadriceps, hamstrings, and glutes</Text>

                        <Text style={{ fontWeight: 'bold', marginTop: '3%' }}>Muscles Affected</Text>

                    </Card.Content>
                    <Chip style={{ marginRight: "60%", marginTop: '4%', marginLeft: '4%' }} icon="check" mode="outlined" onPress={() => console.log('Pressed')}>Quadriceps</Chip>
                    <Chip style={{ marginRight: "60%", marginTop: '4%', marginLeft: '4%' }} icon="check" mode="outlined" onPress={() => console.log('Pressed')}>Hamstrings</Chip>
                    <Chip style={{ marginRight: "60%", marginTop: '4%', marginLeft: '4%' }} icon="check" mode="outlined" onPress={() => console.log('Pressed')}>Glutes</Chip>
                    <Text style={{ fontWeight: 'bold', margin: '4%' }}>Equipment needed</Text>
                    <Chip style={{ marginRight: "60%", marginLeft: '4%', marginBottom: '4%', backgroundColor: "#ffffff" }} onPress={() => console.log('Pressed')}><Ionicons name="barbell" size={24} color="black" />Barbell</Chip>
                </ScrollView>

            </Card>

        <Button style={{ marginTop:'6%' }} mode="contained" onPress={() => console.log('Pressed')}>
                Start workout
            </Button></>
    );
};

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
  })

export default Workout_details;