import React from 'react';
import { StyleSheet, ScrollView, View, Switch, Text } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
Icon.loadFont();

const DeviceList = props => {
    const { device } = props;

    const { id, name, active } = device;

    return (
        <View key={id} style={styles.container}>
            <View style={styles.content}>

                <Icon name='cpu' size={70} color='#777' />
                <Text style={{ marginTop: 10 }} >Device I</Text>
                <Switch
                    trackColor={{ false: "#8B0000", true: "#008000" }}
                    thumbColor={active ? "#FFF" : "#FFF"}
                    ios_backgroundColor="#3e3e3e"
                    value={active}
                    style={{ marginTop: 10 }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 5,
        flex: 1
    },

    content: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
})


export default DeviceList;