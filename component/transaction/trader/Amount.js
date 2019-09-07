import React from 'react';
import { View, Text, TextInput, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-root-toast';

class Amount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            token: '',
            amount: '',
        }
        this.init_id();
    }

    init_id() {
        AsyncStorage.getItem('id', (err, getId) => {
            this.setState(
                { id: getId }
            )
        });
        AsyncStorage.getItem('token', (err, getToken) => {
            this.setState(
                { token: getToken }
            )
        })
    }

    onChangeAmount = (amount) => {
        this.setState({ amount })
    }

    createAmountToPay() {
        let data = {
            amount: this.state.amount
        }
        let token = this.state.token;
        const AuthToken = 'Bearer '.concat(token);
        let headers = {
            "Content-Type": "application/json",
            Authorization: AuthToken
        };
        //axios.post('https://quickpay-api.herokuapp.com/api/v1/customers/register', 
        console.log("ID TRADER : ", this.state.id);
        console.log("TOKEN TRADER : ", token);
        axios.post(//'http://10.0.2.2:3000/api/v1/qr-co des/'
            'https://quickpay-api.herokuapp.com/api/v1/qr-codes/' + this.state.id + '/generate', data, { headers: headers })
            .then(response => {
                let obj = response.data
                console.log("QR Code image : " + obj.qr_img);
                this.props.navigation.navigate('QRCode', { QrCode: obj.qr_img });
            }).catch(error => {
                Toast.show("Error from server for QR Codes", { position: Toast.positions.CENTER });
                console.log("ERROR : ", error)
            })
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TextInput value={this.state.amount}
                    style={styles.textinput}
                    placeholder="Amount"
                    onChangeText={this.onChangeAmount} />

                <TouchableOpacity onPress={() => this.createAmountToPay()}>
                    <Text>Create amount to pay</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Amount;

const styles = StyleSheet.create({
    textinput: {
        textAlign: 'center',
        alignSelf: 'stretch',
        height: 40,
        fontSize: 20,
        marginTop: 40,
        marginLeft: 65,
        marginRight: 72,
        marginBottom: 20,
        color: '#000',
        borderRadius: 15,
        borderTopColor: '#2b7ce5',
        borderRightColor: '#2b7ce5',
        borderLeftColor: '#2b7ce5',
        borderBottomColor: '#2b7ce5',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
    },
});