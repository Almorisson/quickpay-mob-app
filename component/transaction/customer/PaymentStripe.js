import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Toast from 'react-native-root-toast';
import Stripe from 'react-native-stripe-api';

/** 
 * Method payment Stripe, you have to fill credit card number, month, year and cvc of the card.
 * Mode de paiement Stripe, vous devez remplir le numéro de carte de crédit, le mois, l'année, CVC de la carte.
*/
export default class PaymentStripe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            expmonth: '',
            expyear: '',
            cvc: '',
        }
    }

    payment() {
        const API_PRIVATE_KEY = 'sk_test_JkLY9qfOJ8viaL1Ij1c8Qkcy00lbB8ZvFw';
        const customer = new Stripe(API_PRIVATE_KEY);
        if (this.state.number.length != 16 || this.state.expmonth.length < 1
            || this.state.expyear.length < 1 || this.state.cvc.length != 3) {
            Toast.show("Remplissez correctement les champs", { position: Toast.positions.CENTER });
            return
        }
        const token = customer.createToken({
            number: this.state.number,
            exp_month: this.state.expmonth,
            exp_year: this.state.expyear,
            cvc: this.state.cvc
        }).then((result) => {
            console.log(result);
            let token = result["id"]
            let error = result["error"]
            console.log("token charge :" + token);
            if (error) {
                Toast.show(error["message"], { position: Toast.positions.CENTER });
            }
            if (token) {
                this.props.navigation.navigate('Charge', { token: token, email: this.props.navigation.state.params.email });
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={(number) => this.setState({ number })}
                    value={this.state.number}
                    placeholder={'Votre carte de crédit'}
                    maxLength={16}
                />
                <TextInput
                    onChangeText={(expmonth) => this.setState({ expmonth })}
                    value={this.state.expmonth}
                    placeholder={'mois'}
                    maxLength={2}
                />
                <TextInput
                    onChangeText={(expyear) => this.setState({ expyear })}
                    value={this.state.expyear}
                    placeholder={'année'}
                    maxLength={2}
                />
                <TextInput
                    onChangeText={(cvc) => this.setState({ cvc })}
                    value={this.state.cvc}
                    placeholder={'CVC'}
                    maxLength={3}
                />
                <TouchableOpacity onPress={this.payment.bind(this)} >
                    <Text>Ajouter une carte de crédit</Text>
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