import React from 'react';
import { Button, View, Text, StyleSheet, TextInput, ToastAndroid, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-root-toast';

class RegisterTrader extends React.Component {
    static navigationOptions = {
        title: 'RegisterTrader'
    };

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            nameSociety: '',
            email: '',
            password: '',
            phoneNumber: '',
            country: '',
            address: '',
            postalCode: '',
            city: '',
            siretNumber: '',
            iban: '',

            latitude: '',
            longitude: ''
        };
    };


    render() {
        return (
            <View style={styles.container}>
                <Text>Create a trader account</Text>
                <TextInput style={styles.input}
                    placeholder="Enter your firstname"
                    onChangeText={this.onChangeFirstName}
                    value={this.state.firstName} />
                <TextInput style={styles.input}
                    placeholder="Enter your lastname"
                    onChangeText={this.onChangeLastName}
                    value={this.state.lastName} />
                <TextInput style={styles.input}
                    placeholder="Name of your Society"
                    onChangeText={this.onChangeNameSociety}
                    value={this.state.nameSociety} />
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
                    placeholder="Country"
                    onChangeText={this.onChangeCountry}
                    value={this.state.country} />
                <TextInput style={styles.input}
                    placeholder="Address"
                    onChangeText={this.onChangeAddress}
                    value={this.state.address} />
                <TextInput style={styles.input}
                    placeholder="Postal code"
                    onChangeText={this.onChangePostalCode}
                    value={this.state.postalCode} />
                <TextInput style={styles.input}
                    placeholder="City"
                    onChangeText={this.onChangeCity}
                    value={this.state.city} />
                <TextInput style={styles.input}
                    placeholder="Siret number"
                    onChangeText={this.onChangeSiretNumber}
                    value={this.state.siretNumber} />
                <TextInput style={styles.input}
                    placeholder="Iban"
                    onChangeText={this.onChangeIban}
                    value={this.state.iban} />
                <Button title="Sign Up !" style={{ marginBottom: 10 }}
                    onPress={() => this.register()}
                />
                <Button title="Go back to the login page !"
                    onPress={() => this.login()}
                />
                <TouchableOpacity onPress={() => this.registerUser()}>
                    <Text style={styles.registerbutton}>Create account as user</Text>
                </TouchableOpacity>

            </View>
        );
    }

    onChangeFirstName = (firstName) => {
        this.setState({ firstName })
    };

    onChangeLastName = (lastName) => {
        this.setState({ lastName })
    };

    onChangeNameSociety = (nameSociety) => {
        this.setState({ nameSociety })
    };

    onChangeEmail = (email) => {
        this.setState({ email })
    };

    onChangePassword = (password) => {
        this.setState({ password })
    };

    onChangePhoneNumber = (phoneNumber) => {
        this.setState({ phoneNumber })
    };

    onChangeAddress = (address) => {
        this.setState({ address })
    };

    onChangeCountry = (country) => {
        this.setState({ country })
    };

    onChangePostalCode = (postalCode) => {
        this.setState({ postalCode })
    };

    onChangeCity = (city) => {
        this.setState({ city })
    };

    onChangeSiretNumber = (siretNumber) => {
        this.setState({ siretNumber })
    };

    onChangeIban = (iban) => {
        this.setState({ iban })
    };

    login() {
        this.props.navigation.navigate('Login');
    }

    registerUser() {
        this.props.navigation.navigate('Register');
    }

    register() {
        axios.get('https://nominatim.openstreetmap.org/search?q=' + this.state.address + ' ' + this.state.postalCode +
            ' ' + this.state.city + '&format=json&addressdetails=1&limit=1&polygon_svg=1')
            .then(res => {
                console.log("data", res.data)
                if (res.data[0]['lat'] && res.data[0]['lon']) {
                    this.setState({
                        latitude: res.data[0]['lat']
                    })
                    this.setState({
                        longitude: res.data[0]['lon']
                    })
                    this.home()
                } else {
                    Toast.show("Address not found, retry again", { position: Toast.positions.CENTER });
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    home() {
        if (this.state.email.length < 1) {
            Toast.show("Email field is empty !", { position: Toast.positions.CENTER });
            return
        } else if (this.state.password.length < 1) {
            Toast.show("Password field is empty !", { position: Toast.positions.CENTER });
            return
        } else if (this.state.firstName.length < 1) {
            Toast.show("Firstname field is empty !", { position: Toast.positions.CENTER });
            return
        } else if (this.state.lastName.length < 1) {
            Toast.show("Lastname field is empty !", { position: Toast.positions.CENTER });
            return
        } else if (this.state.address.length < 1) {
            Toast.show("Address field is empty !", { position: Toast.positions.CENTER });
            return
        } else if (this.state.postalCode.length < 1) {
            Toast.show("Postal code field is empty !", { position: Toast.positions.CENTER });
            return
        } else if (this.state.city.length < 1) {
            Toast.show("City field is empty !", { position: Toast.positions.CENTER });
            return
        } else if (this.state.country.length < 1) {
            Toast.show("Country field is empty !", { position: Toast.positions.CENTER });
            return
        } else if (this.state.phoneNumber.length < 1) {
            Toast.show("Phone number field is empty !", { position: Toast.positions.CENTER });
            return
        } else if (this.state.siretNumber.length < 1) {
            Toast.show("Siret number field is empty !", { position: Toast.positions.CENTER });
            return
        } else if (this.state.iban.length < 1) {
            Toast.show("Iban field is empty !", { position: Toast.positions.CENTER });
            return
        }

        let data = {
            "email": this.state.email,
            "password": this.state.password,
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "address": this.state.address,
            "postalCode": this.state.postalCode,
            "city": this.state.city,
            "nameSociety": this.state.nameSociety,
            "country": this.state.country,
            "phoneNumber": this.state.phoneNumber,
            "siretNumber": this.state.siretNumber,
            "iban": this.state.iban,
            "latitude": parseFloat(this.state.latitude),
            "longitude": parseFloat(this.state.longitude)
        }

        let headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        };

        //axios.post('https://quickpay-api.herokuapp.com/api/v1/traders/register', 
        axios.post('https://quickpay-api.herokuapp.com/api/v1/traders/register', data, { headers: headers })
            .then(response => {
                let obj = response.data
                console.log(response.data)
                if (obj.cutomer != null || obj.trader != null) {
                    ToastAndroid.showWithGravity(
                        obj["message"],
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                    this.props.navigation.navigate('Login')
                }
            })
            .catch(error => {
                Toast.show("Invalid email or password", { position: Toast.positions.CENTER });
                console.log(error.response);
            })
    }
}

export default RegisterTrader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
