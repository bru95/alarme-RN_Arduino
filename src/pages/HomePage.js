import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Switch, Text, Platform } from 'react-native';
import { BleManager } from "react-native-ble-plx";
import base64 from 'react-native-base64'
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

const HomePage = (props) => {
    const [deviceInfo, setDeviceInfo] = useState({ active: false, connected: false, writable: false });
    const comm = useRef(null);
    let manager = new BleManager();
    const DEVICE_NAME = "Meu Alarme";

    useEffect(() => {
        if (Platform.OS == 'ios') {
            manager.onStateChange((state) => {
                if (state === 'PoweredOn') scanAndConnect()
            })
        } else {
            scanAndConnect()
        }
    }, []);

    scanAndConnect = () => {
        manager.startDeviceScan(null, null, (error, device) => {
            console.log('scanning ...')

            if (error) {
                console.log(error.message)
                return
            }

            if (device.name != null) {
                console.log(device.name);
            }

            if (device.name == DEVICE_NAME) {
                console.log("Connecting to device")
                manager.stopDeviceScan()
                device.connect()
                    .then((device) => {
                        setDeviceInfo({ ...deviceInfo, connected: true })
                        console.log("Discovering services and characteristics")
                        return device.discoverAllServicesAndCharacteristics()
                    })
                    .then((device) => {
                        findServicesAndCharacteristics(device);
                        console.log("Setting notifications")
                    })
                    .then(() => {
                        console.log("Listening...")
                    }, (error) => {
                        console.log(error.message)
                    })
            }
        })
    }

    findServicesAndCharacteristics = (device) => {
        device.services().then(services => {
            services.forEach((service, i) => {
                console.log("Service UUID: " + service.uuid);
                service.characteristics().then(characteristics => {
                    characteristics.forEach((c, i) => {
                        if ((c.isWritableWithoutResponse || c.isWritableWithResponse) && c.isReadable) {
                            comm.current = c;

                            c.read().then((response) => {
                                let act = false;
                                if (base64.decode(response.value) == '1') {
                                    act = true;
                                }
                                setDeviceInfo({ ...deviceInfo, active: act, writable: true });
                            });
                        }
                    });
                });
            });
        });
    }

    toggleSwitch = () => {
        let act = !deviceInfo.active;
        setDeviceInfo({ ...deviceInfo, active: act });
        sendData(act);
    };

    sendData = (act) => {
        data = '0';
        if (act) {
            data = '1';
        }
        comm.current.writeWithResponse(base64.encode(data))
            .then(() => console.log("Mensagem enviada com sucesso"))
            .catch(err => {
                console.log("Erro ao enviar mensagem: " + err);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>

                <Icon name='settings-remote' size={70} color='#777' />
                <Text style={{ marginTop: 10 }} >{deviceInfo.connected && deviceInfo.writable ? DEVICE_NAME : "Procurando ..."}</Text>
                <Switch
                    trackColor={{ false: "#8B0000", true: "#008000" }}
                    thumbColor={deviceInfo.active ? "#FFF" : "#FFF"}
                    ios_backgroundColor="#3e3e3e"
                    value={deviceInfo.active}
                    onValueChange={toggleSwitch}
                    style={{ marginTop: 10 }}
                />
                <Text style={{ marginTop: 10, fontStyle: 'italic' }} >{deviceInfo.active ? "Desarmar Alarme" : "Armar Alarme"}</Text>
            </View>
        </View>
    )
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

export default HomePage;