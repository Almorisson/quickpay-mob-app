import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Toast from 'react-native-root-toast';
import Stripe from 'react-native-stripe-api';
import axios from 'axios';

export default class Charge extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            token: '',
            currency: '',
            description: '',
        }
    }

    createCharge() {
        this.createStripeUser();
        const token = this.props.navigation.state.params.token;
        axios.post('http://10.0.2.2:3000/user/transaction', {
            amount: this.state.amount,
            token: token
        }).then(response => {
            let obj = response.data
            console.log(obj);
            if (obj['status'] == "succeeded") {
                this.props.navigation.navigate('Home');
            }
        }).catch((error) => {
            console.log(error.response);
        })
    }

    createStripeUser() {
        const token = this.props.navigation.state.params.token;
        const email = this.props.navigation.state.params.email;
        console.log(email);
        axios.post('http://10.0.2.2:3000/user/createStripeUser', {
            email: email,
            source: token
        }).then(response => {
            let obj = response.data
            console.log(obj);
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={(amount) => this.setState({ amount })}
                    value={this.state.amount}
                    placeholder={'Montant'}
                />
                <TextInput
                    onChangeText={(currency) => this.setState({ currency })}
                    value={this.state.currency}
                    placeholder={'Currency'}
                    maxLength={3}
                />
                <TextInput
                    onChangeText={(description) => this.setState({ description })}
                    value={this.state.description}
                    placeholder={'Description'}
                />
                <TouchableOpacity onPress={() => this.createCharge()}>
                    <Text>Payer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.createStripeUser()}>
                    <Text>Creer un user Stripe</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
};