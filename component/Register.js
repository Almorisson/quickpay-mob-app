import React from 'react';
import { Button, View, Text, StyleSheet, TextInput, ToastAndroid, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-root-toast';

class Register extends React.Component {
    static navigationOptions = {
        title: 'Register'
    };

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phoneNumber: '',
            city: '',
            postalCode: '',
            address: '',
            country: '',
        };
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Create an user account</Text>
                <TextInput style={styles.input}
                    placeholder="Enter your firstname"
                    onChangeText={this.onChangeFirstName}
                    value={this.state.firstName} />
                <TextInput style={styles.input}
                    placeholder="Enter your lastname"
                    onChangeText={this.onChangeLastName}
                    value={this.state.lastName} />
                <TextInput style={styles.input}
                    placeholder="Enter your email"
                    onChangeText={this.onChangeEmail}
                    value={this.state.email} />
                <TextInput style={styles.input}
                    placeholder="Password"
                    onChangeText={this.onChangePassword}
                    value={this.state.password} />
                <TextInput style={styles.input}
                    placeholder="Phone number"
                    onChangeText={this.onChangePhoneNumber}
                    value={this.state.phoneNumber} />
                <TextInput style={styles.input}
                    placeholder="Your city"
                    onChangeText={this.onChangeCity}
                    value={this.state.city} />
                <TextInput style={styles.input}
                    placeholder="Your postal code"
                    onChangeText={this.onChangePostalCode}
                    value={this.state.postalCode} />
                <TextInput style={styles.input}
                    placeholder="Your address"
                    onChangeText={this.onChangeAddress}
                    value={this.state.address} />
                <TextInput style={styles.input}
                    placeholder="Your country"
                    onChangeText={this.onChangeCountry}
                    value={this.state.country} />

                <Button title="Sign Up !" style={{ marginBottom: 10 }}
                    onPress={() => this.home()}
                />
                <Button title="Go back to the login page !"
                    onPress={() => this.login()}
                />

                <TouchableOpacity onPress={() => this.registerTrader()}>
                    <Text style={styles.registerbutton}>Create account as trader</Text>
                </TouchableOpacity>
            </View>
        );
    }

    onChangeEmail = (email) => {
        this.setState({ email })
    };

    onChangePassword = (password) => {
        this.setState({ password })
    };

    onChangeFirstName = (firstName) => {
        this.setState({ firstName })
    };

    onChangeLastName = (lastName) => {
        this.setState({ lastName })
    };

    onChangeCountry = (country) => {
        this.setState({ country })
    };

    onChangeAddress = (address) => {
        this.setState({ address })
    }

    onChangeCity = (city) => {
        this.setState({ city })
    }

    onChangePostalCode = (postalCode) => {
        this.setState({ postalCode })
    }

    onChangePhoneNumber = (phoneNumber) => {
        this.setState({ phoneNumber })
    };

    login() {
        this.props.navigation.navigate('Login');
    }

    registerTrader() {
        this.props.navigation.navigate('RegisterTrader');
    }

    home() {
        if (this.state.email.length < 1 || this.state.password.length < 1) {
            Toast.show("Email or Password field is empty !", { position: Toast.positions.CENTER });
            return
        }

        let data = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            country: this.state.country,
            city: this.state.city,
            phoneNumber: this.state.phoneNumber,
            postalCode: this.state.postalCode,
            address: this.state.address
        }

        let headers = {
            "Content-Type": "application/json",
            //"Access-Control-Allow-Origin": "*"
        };
        //axios.post('https://quickpay-api.herokuapp.com/api/v1/customers/register', 
        axios.post('https://quickpay-api.herokuapp.com/api/v1/customers/register', data, { headers: headers })
            .then(response => {
                let obj = response.data
                console.log("ok" + response.data)
                if (obj.customer != null || obj.trader != null) {
                    ToastAndroid.showWithGravity(
                        obj["message"],
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                    this.props.navigation.navigate('Login')
                }
            }).catch(error => {
                Toast.show("Invalid value", { position: Toast.positions.CENTER });
                //console.log("500 : " + error.message);
                console.log(`Error received from axios.post: ${JSON.stringify(error.response)}`);
            })
    }
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        padding: 10,
        width: 300,
        height: 40,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 10
    },
    registerbutton: {
        textDecorationLine: 'underline',
        marginTop: 10,
        fontSize: 15,
        color: '#2b7ce5',
        marginLeft: 0,
    }
});
