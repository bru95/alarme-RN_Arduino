import React from 'react';
import { StyleSheet, View, Switch, Text, NativeModules, NativeEventEmitter } from 'react-native';
import BleManager from 'react-native-ble-manager';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            device:
            {
                id: 1,
                name: 'Procurando ...'
            },
            peripherals: new Map()
        }
    }

    componentDidMount() {
        const DEVICE_NAME = "HC-06";
        BleManager.start({ showAlert: false })

        /*this.handlerDiscover = bleManagerEmitter.addListener(
            'BleManagerDiscoverPeripheral',
            this.handleDiscoverPeripheral
        );

        this.handlerStop = bleManagerEmitter.addListener(
            'BleManagerStopScan',
            this.handleStopScan
        );

        this.scanForDevices(); // I chose to start scanning for devices here*/

        BleManager.getBondedPeripherals([]).then((bondedPeripheralsArray) => {
            bondedPeripheralsArray.map(device => {
                if (device.name == DEVICE_NAME) {
                    this.setState({ device: { name: device.name, id: device.id, active: false } });
                }
            })
        });
    }

    scanForDevices() {
        BleManager.scan([], 15);
    }

    handleDiscoverPeripheral = (peripheral) => {
        const { peripherals } = this.state;

        if (peripheral.id == "98:D3:32:31:15:05") {
            peripherals.set(peripheral.id, "HC-06");
        }
        this.setState({ peripherals });
    };

    handleStopScan = () => {
        console.log('Scan is stopped. Devices: ', this.state.peripherals);
    }

    toggleSwitch = () => {
        var active = !this.state.device.active;
        let device = this.state.device;
        device.active = active;
        this.setState({
            device: device
        });
        //send bool to HC-06
        this.sendData(active, device);
    };

    sendData(data, device) {
        console.log("Conectando ... " + device.id);
        BleManager.connect(device.id).then(() => {
            console.log('Connected to ' + device.name);
        }).catch((error) => {
            console.log('Connection error', error);
        });
    }

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

