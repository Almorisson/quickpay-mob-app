import React from 'react';
import { View, Text, Button, Linking } from 'react-native';
import Toast from 'react-native-root-toast';
import axios from 'axios';

class Payment extends React.Component {

    paypal() {
        axios.get('https://quickpay-api.herokuapp.com/api/v1/payments/payment/')
            .then(response => {
                let obj = response.data
                console.log(obj)
                //Linking.openURL('https://quickpay-api.herokuapp.com/api/v1/payments/payment')
            }).catch(error => {
                Toast.show("Error from server for QR Codes", { position: Toast.positions.CENTER });
                console.log("ERROR : ", error.response)
            })
    }

    creditCard() {
        console.log("Credit card");
        this.props.navigation.navigate('PaymentStripe', { iban: this.props.navigation.getParam('iban') });
    }

    render() {
        let amount = this.props.navigation.getParam('amount');
        let firstName = this.props.navigation.getParam('firstName');
        let lastName = this.props.navigation.getParam('lastName');
        let nameSociety = this.props.navigation.getParam('nameSociety');
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>You have to pay {amount} euros to {firstName}, {lastName}</Text>
                <Text>of society : {nameSociety}.</Text>
                <Button title="Paypal" onPress={() => this.paypal()} />
                <Button title="Credit card" onPress={() => this.creditCard()} />
            </View>
        );
    }
}

export default Payment;