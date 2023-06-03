import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, IconButton, Appbar } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { format } from 'date-fns';
import styles from './styles';

const IconWithText = ({ iconName, iconColor, text }) => {
    return (
        <View style={styles.colorContainer}>
            <FontAwesome name={iconName} size={24} color={iconColor} style={styles.icon} />
            <Text variant="bodyLarge">{text}</Text>
        </View>
    );
};

const WorkoutCalendar = () => {
    const today = format(new Date(), 'yyyy-MM-dd');

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.appHeaderContainer}>
                <Appbar.Content
                    title="Workout Calendar"
                    titleStyle={styles.appHeaderTitle}
                />
            </Appbar.Header>
            <Calendar
                onDayPress={(day) => console.log('Selected day', day)}
                monthFormat={'MMMM yyyy'}
                onMonthChange={(month) => console.log('Month changed', month)}
                hideExtraDays={true}
                disableMonthChange={true}
                firstDay={1}
                markedDates={{
                    [today]: { selected: true, marked: true, selectedColor: 'green' },
                    '2023-06-03': { marked: true, dotColor: '#8A2BE2', activeOpacity: 0 },
                    '2023-06-04': { marked: true, dotColor: '#4B0082', activeOpacity: 0 },
                    '2023-06-05': { marked: true, dotColor: '#0000FF', activeOpacity: 0 },
                    '2023-06-06': { marked: true, dotColor: '#00FF00', activeOpacity: 0 },
                    '2023-06-07': { marked: true, dotColor: '#FFFF00', activeOpacity: 0 },
                    '2023-06-08': { marked: true, dotColor: '#FFA500', activeOpacity: 0 },
                    '2023-06-09': { marked: true, dotColor: '#FF0000', activeOpacity: 0 },
                }}
                theme={{
                    selectedDayBackgroundColor: 'blue',
                    todayTextColor: 'blue',
                    arrowColor: 'blue',
                }}
            />
            <View style={styles.colorCodeContainer}>
                <IconWithText iconName="square" iconColor="#8A2BE2" text="Leg" />
                <IconWithText iconName="square" iconColor="#4B0082" text="Cardio" />
                <IconWithText iconName="square" iconColor="#0000FF" text="Exercise" />
                <IconWithText iconName="square" iconColor="#00FF00" text="Break" />
                <IconWithText iconName="square" iconColor="#FFFF00" text="Exercise" />
                <IconWithText iconName="square" iconColor="#FFA500" text="Exercise" />
                <IconWithText iconName="square" iconColor="#FF0000" text="Exercise" /> 
            </View>
        </View>
    );
};

export default WorkoutCalendar;