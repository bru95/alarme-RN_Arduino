import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const AlertList = props => {
    const {alerts} = props;
    const retorno = alerts.map(alert => {
        const {id, data, hora, name} = alert;
        return (
            <View style={styles.container} key={id}>
                <Text style={[styles.default, styles.name]}>{name}</Text>
                <Text style={[styles.default, styles.date]}>{data}</Text>
                <Text style={[styles.default, styles.hour]}>{hora}</Text>
            </View>
        );
    })

    return (
        <ScrollView>
            { retorno }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    },
    default: {
        padding: 20,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        borderStyle: 'solid'
    },
    name: {
        flex: 0.4,
        textAlign: 'center'
    },
    date: {
        flex: 0.3,
        textAlign: 'center'
    },
    hour: {
        flex: 0.3
    }
});

export default AlertList;