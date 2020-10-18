import React from 'react';
import { StyleSheet, View, Switch, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            device:
            {
                id: 1,
                name: 'Device I',
                active: true
            }
        }
    }

    toggleSwitch = () => {
        var active = !this.state.device.active;
        this.setState({
            device:
            {
                id: 1,
                name: 'Device I',
                active: active
            }
        });
    };

    render() {
        const { id, name, active } = this.state.device;

        let text;
        if (active) {
            text = 'Desarmar alarme';
        } else {
            text = 'Armar alarme';
        }

        return (
            <View key={id} style={styles.container}>
                <View style={styles.content}>

                    <Icon name='settings-remote' size={70} color='#777' />
                    <Text style={{ marginTop: 10 }} >{name}</Text>
                    <Switch
                        trackColor={{ false: "#8B0000", true: "#008000" }}
                        thumbColor={active ? "#FFF" : "#FFF"}
                        ios_backgroundColor="#3e3e3e"
                        value={active}
                        onValueChange={this.toggleSwitch}
                        style={{ marginTop: 10 }}
                    />
                    <Text style={{ marginTop: 10, fontStyle: 'italic' }} >{text}</Text>
                </View>
            </View>
        )
    }
}

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

