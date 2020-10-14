import React from 'react';
import { StyleSheet, View, Switch, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
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

        return (
            <View key={id} style={styles.container}>
                <View style={styles.content}>

                    <Icon name='cpu' size={70} color='#777' />
                    <Text style={{ marginTop: 10 }} >{name}</Text>
                    <Switch
                        trackColor={{ false: "#8B0000", true: "#008000" }}
                        thumbColor={active ? "#FFF" : "#FFF"}
                        ios_backgroundColor="#3e3e3e"
                        value={active}
                        onValueChange={this.toggleSwitch}
                        style={{ marginTop: 10 }}
                    />
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

