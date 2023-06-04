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
    // const today = format(new Date(), 'yyyy-MM-dd');

    LocaleConfig.locales['en'] = {
        monthNames: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        monthNamesShort: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
        dayNames: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    };
    LocaleConfig.defaultLocale = 'en';

    const markedDates = {
        [today]: {
            selected: true,
            marked: true,
            selectedColor: 'green',
        },
        '2023-06-04': {
            customStyles: {
                container: {
                    borderWidth: 2,
                    borderColor: '#4B0082',
                    borderRadius: 5,
                },
            },
        },
        '2023-06-05': {
            customStyles: {
                container: {
                    borderWidth: 2,
                    borderColor: '#0000FF',
                    borderRadius: 5,
                },
            },
        },
        '2023-06-06': {
            customStyles: {
                container: {
                    borderWidth: 2,
                    borderColor: '#00FF00',
                    borderRadius: 5,
                },
            },
        },
        '2023-06-07': {
            customStyles: {
                container: {
                    borderWidth: 2,
                    borderColor: '#FFFF00',
                    borderRadius: 5,
                },
            },
        },
        '2023-06-08': {
            customStyles: {
                container: {
                    borderWidth: 2,
                    borderColor: '#FFA500',
                    borderRadius: 5,
                },
            },
        },
        '2023-06-09': {
            customStyles: {
                container: {
                    borderWidth: 2,
                    borderColor: '#FF0000',
                    borderRadius: 5,
                },
            },
        },
    };


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
                markedDates={markedDates}
                markingType={'custom'}
                renderCustomDay={(day, markingStyle) => (
                    <View style={[markingStyle, { borderRadius: 5, borderColor: 'black', borderWidth: 1 }]}>
                        <Text>{day.day}</Text>
                    </View>
                )}
                theme={{
                    selectedDayBackgroundColor: 'blue',
                    todayTextColor: 'blue',
                    arrowColor: 'blue',
                }}
            />
            <View style={styles.colorCodeContainer}>
                <IconWithText iconName="square" iconColor="#8A2BE2" text="Leg" />
                <IconWithText iconName="square" iconColor="#4B0082" text="Cardio" />
                <IconWithText iconName="square" iconColor="#0000FF" text="Chest" />
                <IconWithText iconName="square" iconColor="#00FF00" text="Break" />
                <IconWithText iconName="square" iconColor="#FFFF00" text="Arm" />
                <IconWithText iconName="square" iconColor="#FFA500" text="Back" />
                <IconWithText iconName="square" iconColor="#FF0000" text="Core" />
            </View>
        </View>
    );
};

export default WorkoutCalendar;