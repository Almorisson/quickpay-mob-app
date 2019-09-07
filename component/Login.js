import React from 'react';
import {
    View, Text, StyleSheet, TextInput, Image, TouchableOpacity,
    Switch, AsyncStorage, Button, KeyboardAvoidingView
} from 'react-native';
import Toast from 'react-native-root-toast';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                email: '',
                password: '',
                switchValue: false
            }
    }

    onChangeEmail = (email) => {
        this.setState({ email })
    }

    onChangePassword = (password) => {
        this.setState({ password })
    }

    register() {
        this.props.navigation.navigate('Register');
    }

    connectAsUser() {
        //axios.post('https://quickpay-api.herokuapp.com/api/v1/customers/login', {
        let headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        };
        let data = {
            "email": this.state.email,
            "password": this.state.password
        }
        axios.post('https://quickpay-api.herokuapp.com/api/v1/customers/login', data, { headers: headers })
            .then(response => {
                let obj = response.data
                console.log(obj);
                if (obj != null) {
                    let accountType = obj.customer.accountType;
                    let id = obj.customer._id;
                    let token = obj.token;
                    let firstname = obj.customer.firstName;
                    let lastname = obj.customer.lastName;
                    let email = obj.customer.email;
                    let address = obj.customer.address;
                    let phoneNumber = obj.customer.phoneNumber;
                    let postalCode = obj.customer.postalCode;
                    let city = obj.customer.city;
                    let country = obj.customer.country;
                    let codeCountry = obj.customer.codeCountry;
                    AsyncStorage.setItem('accountType', accountType, () => {
                        AsyncStorage.mergeItem('accountType', accountType);
                    })
                    AsyncStorage.setItem('id', id, () => {
                        AsyncStorage.mergeItem('id', id);
                    })
                    AsyncStorage.setItem('token', token, () => {
                        AsyncStorage.mergeItem('token', token);
                    });
                    AsyncStorage.setItem('firstname', firstname, () => {
                        AsyncStorage.mergeItem('firstname', firstname);
                    });
                    AsyncStorage.setItem('lastname', lastname, () => {
                        AsyncStorage.mergeItem('lastname', lastname);
                    });
                    AsyncStorage.setItem('address', address, () => {
                        AsyncStorage.mergeItem('address', address);
                    });
                    AsyncStorage.setItem('email', email, () => {
                        AsyncStorage.mergeItem('email', email);
                    });
                    AsyncStorage.setItem('phoneNumber', phoneNumber, () => {
                        AsyncStorage.mergeItem('phoneNumber', phoneNumber);
                    });
                    AsyncStorage.setItem('postalCode', postalCode, () => {
                        AsyncStorage.mergeItem('postalCode', postalCode);
                    });
                    AsyncStorage.setItem('city', city, () => {
                        AsyncStorage.mergeItem('city', city);
                    });
                    AsyncStorage.setItem('country', country, () => {
                        AsyncStorage.mergeItem('country', country);
                    });
                    AsyncStorage.setItem('codeCountry', codeCountry, () => {
                        AsyncStorage.mergeItem('codeCountry', codeCountry);
                    });
                    this.props.navigation.navigate('Home')
                }
            }).catch(error => {
                Toast.show("Invalid password or email", { position: Toast.positions.CENTER });
                console.log(error);
            })
    }

    connectAsTrader() {
        let headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        };
        let data = {
            "email": this.state.email,
            "password": this.state.password
        }
        axios.post('https://quickpay-api.herokuapp.com/api/v1/traders/login', data, { headers: headers })
            .then(response => {
                let obj = response.data
                if (obj != null) {

                    let accountType = obj.trader.accountType;
                    let id = obj.trader._id;
                    let email = obj.trader.email;
                    let token = obj.token;
                    let address = obj.trader.address;
                    let city = obj.trader.city;
                    let firstname = obj.trader.firstName;
                    let lastname = obj.trader.lastName;
                    let nameSociety = obj.trader.nameSociety;
                    let phoneNumber = obj.trader.phoneNumber;
                    let postalCode = obj.trader.postalCode;
                    let country = obj.trader.country;
                    let siretNumber = obj.trader.siretNumber;
                    let iban = obj.trader.iban;
                    let codeCountry = obj.trader.codeCountry;
                    AsyncStorage.setItem('accountType', accountType, () => {
                        AsyncStorage.mergeItem('accountType', accountType);
                    })
                    AsyncStorage.setItem('id', id, () => {
                        AsyncStorage.mergeItem('id', id);
                    })
                    AsyncStorage.setItem('email', email, () => {
                        AsyncStorage.mergeItem('email', email);
                    });
                    AsyncStorage.setItem('token', token, () => {
                        AsyncStorage.mergeItem('token', token);
                    });
                    AsyncStorage.setItem('address', address, () => {
                        AsyncStorage.mergeItem('address', address);
                    });
                    AsyncStorage.setItem('city', city, () => {
                        AsyncStorage.mergeItem('city', city);
                    });
                    AsyncStorage.setItem('firstname', firstname, () => {
                        AsyncStorage.mergeItem('firstname', firstname);
                    });
                    AsyncStorage.setItem('lastname', lastname, () => {
                        AsyncStorage.mergeItem('lastname', lastname);
                    });
                    AsyncStorage.setItem('nameSociety', nameSociety, () => {
                        AsyncStorage.mergeItem('nameSociety', nameSociety);
                    });
                    AsyncStorage.setItem('phoneNumber', phoneNumber, () => {
                        AsyncStorage.mergeItem('phoneNumber', phoneNumber);
                    });
                    AsyncStorage.setItem('postalCode', postalCode, () => {
                        AsyncStorage.mergeItem('postalCode', postalCode);
                    });
                    AsyncStorage.setItem('country', country, () => {
                        AsyncStorage.mergeItem('country', country);
                    });
                    AsyncStorage.setItem('siretNumber', siretNumber, () => {
                        AsyncStorage.mergeItem('siretNumber', siretNumber);
                    });
                    AsyncStorage.setItem('iban', iban, () => {
                        AsyncStorage.mergeItem('iban', iban);
                    });
                    AsyncStorage.setItem('codeCountry', codeCountry, () => {
                        AsyncStorage.mergeItem('codeCountry', codeCountry);
                    });
                    this.props.navigation.navigate('Home')
                }
            }).catch(error => {
                Toast.show("Invalid password or email", { position: Toast.positions.CENTER });
                console.log(error.response);
            })
    }

    home() {
        if (this.state.email.length < 1 || this.state.password.length < 1) {
            Toast.show("Empty field password or email", { position: Toast.positions.CENTER });
            return
        }
        if (!this.state.switchValue) {
            this.connectAsUser();
        } else {
            this.connectAsTrader();
        }
    }

    setSwitchValue = (value) => {
        this.setState({ switchValue: value })
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={50}>
                    <Text>Quickpay</Text>
                    <Image source={require('../assets/logo.png')} />
                    <Switch
                        style={{ paddingTop: 20 }}
                        value={this.state.switchValue}
                        onValueChange={this.setSwitchValue} />
                    <Text style={styles.header}>{this.state.switchValue ? 'Trader\'s login page' : 'User\'s login page'}</Text>
                    <TextInput value={this.state.email}
                        style={styles.textinput}
                        placeholder="Email"
                        onChangeText={this.onChangeEmail} />
                    <TextInput value={this.state.password}
                        style={styles.textinput}
                        secureTextEntry={true}
                        placeholder="Mot de passe"
                        onChangeText={this.onChangePassword} />
                    <TouchableOpacity onPress={() => this.home()}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                    <Text>I'm new in Quickpay</Text>
                    <TouchableOpacity onPress={() => this.register()}>
                        <Text style={styles.registerbutton}>Create an account</Text>
                    </TouchableOpacity>
                    <Button title="Go pay" onPress={() => this.test()} />
                </KeyboardAvoidingView>
            </View>

        );
    }
}

const mapStateToProps = (state) => {
    console.log("Login mapState :" + JSON.stringify(state))
    if (this.state.switchValue == true) {
        //traders
        return {
            email: state.email,
            firstname: state.firstName,
            lastname: state.lastName,
            address: state.address,
            city: state.city,
            nameSociety: state.nameSociety,
            phoneNumber: state.phoneNumber,
            postalCode: state.postalCode,
            country: state.country,
            codeCountry: state.codeCountry,
            siretNumber: state.siretNumber,
            iban: state.iban,
        }
    } else {
        //custmers
        return {
            email: state.email,
            firstname: state.firstName,
            lastname: state.lastName,
            address: state.address,
            city: state.city,
            phoneNumber: state.phoneNumber,
            postalCode: state.postalCode,
            country: state.country,
            codeCountry: state.codeCountry,
        }
    }
}

export default Login;

const styles = StyleSheet.create({
    logo: {
        width: 80,
        height: 80,
        justifyContent: 'flex-end',
    },
    connection: {
        width: 80,
        height: 40,
        justifyContent: 'flex-end'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 40,
        color: '#000',
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomColor: '#2b7ce5',
        borderBottomWidth: 1.5,
    },
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
    textbutton: {
        alignItems: "center",
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,
        color: '#fff',
        backgroundColor: '#2b7ce5',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 5,
        height: 35,
        width: 200
    },
    registerbutton: {
        textDecorationLine: 'underline',
        marginTop: 10,
        fontSize: 15,
        color: '#2b7ce5',
        marginLeft: 0,
    }
})
