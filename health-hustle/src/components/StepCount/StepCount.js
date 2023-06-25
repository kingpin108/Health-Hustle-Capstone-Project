import React from 'react';
import { Appbar} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const StepCount = () => {
    const navigation = useNavigation();
    const handleBack = () => {
        navigation.goBack();
    };
    return (
        <>
            <Appbar.Header style={styles.appHeaderContainer}>
                <Appbar.BackAction onPress={handleBack} />
                <Appbar.Content
                    title="Step Count"
                    titleStyle={styles.appHeaderTitle}
                />
            </Appbar.Header>
        </>
    );
};

export default StepCount;