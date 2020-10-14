import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import AlertList from '../components/AlertList';
import Alert from '../components/Alert';

export default class AlertPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            alerts: [
                {
                    id: 1,
                    data: '03/10/2020',
                    hora: '13:00',
                    name: 'Dispositivo I'
                },
                {
                    id: 2,
                    data: '03/10/2020',
                    hora: '13:05',
                    name: 'Dispositivo I'
                },
                {
                    id: 3,
                    data: '01/08/2020',
                    hora: '08:00',
                    name: 'Dispositivo I'
                }
            ]
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.alerts.length > 0 && <AlertList alerts={this.state.alerts} />}
                {this.state.alerts.length == 0 && <Alert message="Não há notificações no momento!" />}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})
