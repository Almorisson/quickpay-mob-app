import React from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { BarCodeScanner, Permissions, WebBrowser } from 'expo'
import Toast from 'react-native-root-toast';
import axios from 'axios';

function delay(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => resolve(), time);
    });
}

export default class Scanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            value: '',
            token: ''
        }
        this.init_token();
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    async handleBarCodeScanned(data) {
        await WebBrowser.openBrowserAsync(data.data);
    }

    init_token() {
        AsyncStorage.getItem('token', (err, getToken) => {
            this.setState({
                token: getToken
            })
        });
    }

    onBarCodeRead = async obj => {
        await delay(500);
        let token = this.state.token
        if (this.state.value == obj.data) {
            return;
        }
        this.setState({ value: obj.data });
        let qrInfos = obj.data.split(";");
        let id = qrInfos[0];
        let iban = qrInfos[1];
        let amount = qrInfos[2];
        const AuthToken = 'Bearer '.concat(token);
        let headers = {
            'Content-Type': 'application/json',
            Authorization: AuthToken
        };
        axios.get('https://quickpay-api.herokuapp.com/api/v1/traders/' + id, { headers: headers })
            .then(response => {
                let obj = response.data
                let firstName = obj.firstName
                let lastName = obj.lastName
                let nameSociety = obj.nameSociety
                this.props.navigation.navigate('Payment',
                    {
                        firstName: firstName,
                        lastName: lastName,
                        nameSociety: nameSociety,
                        iban: iban,
                        amount: amount
                    });
            }).catch(error => {
                Toast.show("Error from server for get trader", { position: Toast.positions.CENTER });
                console.log("ERROR GET TRADER : ", error.response)
            })
        //console.log("ID : ", id, ", IBAN : ", iban, ", AMOUNT : ", amount);
        //alert(obj.data);
    };

    render() {
        if (this.state.hasCameraPermission === null) {
            return <Text>Nothing happened</Text>
        } else if (this.state.hasCameraPermission === false) {
            return <Text>No access to camera</Text>
        }
        return (
            <View style={styles.component}>
                <View style={styles.layouts}>
                    <View style={styles.layout1}>
                        <View style={styles.itemcontainer1}>
                            <View style={styles.itemcontainer1Inner}>
                                <Text>Scan a QR Code to pay !</Text>
                                <BarCodeScanner
                                    style={styles.item1}
                                    onBarCodeRead={this.onBarCodeRead}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    component: {
        width: '100%',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        paddingLeft: 7.5,
        paddingRight: 7.5,
        paddingTop: 7.5,
        paddingBottom: 7.5,
    },

    layouts: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    layout1: {
        width: '100%',
        height: 604.5,
    },

    itemcontainer1: {
        width: '100%',
        height: '100%',
        paddingTop: 7.5,
        paddingBottom: 7.5,
        paddingLeft: 7.5,
        paddingRight: 7.5,
    },

    itemcontainer1Inner: {
        width: '100%',
        height: '100%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },

    item1: {
        width: '60%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'rgba(33, 150, 243, 1)',
        borderRadius: 0,
    }
})