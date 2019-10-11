import React from 'react';
import { View, StyleSheet } from 'react-native';
import RadioButton from '../components/RadioButton';

function Position() {
    const options = [
        {
            key: '1',
            text: 'Henrique',
        },
        {
            key: '2',
            text: 'Emerson',
        },
        {
            key: '3',
            text: 'Edoil',
        },
        {
            key: '4',
            text: 'Fernando',
        },
        {
            key: '5',
            text: 'Daniel',
        },
        {
            key: '6',
            text: 'Diego',
        },
        {
            key: '7',
            text: 'Luan',
        },
        {
            key: '8',
            text: 'Leonardo',
        },
        {
            key: '9',
            text: 'Renato',
        },
    ];

    return (
        <View style={styles.container}>
            <RadioButton options={options} />
        </View>
    );
}

Position.navigationOptions = {
    title: 'Registrar eliminação',
    headerStyle: {
        backgroundColor: '#212121',
    },
    headerTintColor: '#ffc107',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
}

export default Position;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#263238'
    }
});