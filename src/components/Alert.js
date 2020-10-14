import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Alert = props => {
    const { message } = props;

    return (
        <View style={styles.container}>
            <Text> {message} </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})


export default Alert;