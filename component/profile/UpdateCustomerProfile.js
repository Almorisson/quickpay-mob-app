import React from 'react';
import { Button, View, Text, TextInput, AsyncStorage, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';


class UpdateCustomerProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            picture: null,
            id: '',
            token: '',

            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            address: '',
            postalCode: '',
            city: '',
            country: '',

            load: true,
            pushNotifications: true,
        };
    }

    componentDidMount() {
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                    this.setState({ load: true })
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    let value = store[i][1];
                    console.log("UPDATE CUSTOMER PROFILE => ", key + " , " + value);
                    if (key == 'id') {
                        this.setState({
                            id: value
                        })
                    } else if (key == 'token') {
                        this.setState({
                            token: value
                        })
                    } else if (key == 'email') {
                        this.setState({
                            email: value
                        })
                    } else if (key == 'address') {
                        this.setState({
                            address: value
                        })
                    } else if (key == 'city') {
                        this.setState({
                            city: value
                        })
                    } else if (key == 'firstname') {
                        this.setState({
                            firstName: value
                        })
                    } else if (key == 'lastname') {
                        this.setState({
                            lastName: value
                        })
                    } else if (key == 'phoneNumber') {
                        this.setState({
                            phoneNumber: value
                        })
                    } else if (key == 'postalCode') {
                        this.setState({
                            postalCode: value
                        })
                    } else if (key == 'country') {
                        this.setState({
                            country: value
                        })
                    } else if (key == 'codeCountry') {
                        this.setState({
                            codeCountry: value
                        })
                    }
                    this.setState({ load: false });
                });
            });
        });
    }

    updateCustomerProfile() {
        let data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            postalCode: this.state.postalCode,
            city: this.state.city,
            country: this.state.country
        }

        let token = this.state.token;
        const AuthToken = 'Bearer '.concat(token);
        axios.put('https://quickpay-api.herokuapp.com/api/v1/customers/' + this.state.id, data, {
            headers:
            {
                'Content-Type': 'application/json',
                Authorization: AuthToken
            }
        })
            .then(response => {
                let obj = response.data
                console.log("aaah" + JSON.stringify(obj));
                const action = {
                    type: "UPDATE_CUSTOMER_PROFILE",
                    value: {
                        email: obj.customer.email,
                        firstName: obj.customer.firstName,
                        lastName: obj.customer.lastName,
                        address: obj.customer.address,
                        city: obj.customer.city,
                        phoneNumber: obj.customer.phoneNumber,
                        postalCode: obj.customer.postalCode,
                        country: obj.customer.country,
                        codeCountry: obj.customer.codeCountry
                    }
                }
                console.log("OK CUSTOMER UPDATE !")
                this.props.updateCustomerProfile(action)
                this.props.navigation.navigate('Profile');
            }).catch(error => {
                Toast.show("Problem from profil's request", { position: Toast.positions.CENTER });
                console.log(error);
            })
    }

    render() {
        return (
            <>
                {this.state.load === false ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Firstname</Text>
                            <TextInput
                                style={styles.inputToUpdate}
                                onChangeText={(firstName) => this.setState({ firstName })}
                                value={this.state.firstName}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Lastname</Text>
                            <TextInput
                                style={styles.inputToUpdate}
                                onChangeText={(lastName) => this.setState({ lastName })}
                                value={this.state.lastName}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Email</Text>
                            <TextInput
                                style={styles.inputToUpdate}
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Phone number</Text>
                            <TextInput
                                editable={false} selectTextOnFocus={false}
                                style={styles.input}
                                onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                                value={this.state.phoneNumber}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Address</Text>
                            <TextInput
                                editable={false} selectTextOnFocus={false}
                                style={styles.input}
                                onChangeText={(address) => this.setState({ address })}
                                value={this.state.address}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Postal Code</Text>
                            <TextInput
                                editable={false} selectTextOnFocus={false}
                                style={styles.input}
                                onChangeText={(postalCode) => this.setState({ postalCode })}
                                value={this.state.postalCode}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>City</Text>
                            <TextInput
                                editable={false} selectTextOnFocus={false}
                                style={styles.input}
                                onChangeText={(city) => this.setState({ city })}
                                value={this.state.city}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Country</Text>
                            <TextInput
                                editable={false} selectTextOnFocus={false}
                                style={styles.input}
                                onChangeText={(country) => this.setState({ country })}
                                value={this.state.country}
                            />
                        </View>

                        <TouchableOpacity onPress={() => this.updateCustomerProfile()}>
                            <Text style={styles.registerbutton}>Update your profile</Text>
                        </TouchableOpacity>
                    </View> :
                    <ActivityIndicator style={{ position: 'absolute', top: 200, left: 200 }} size="large" color="#0000ff" />
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("Update mapState :" + JSON.stringify(state))

    return {
        email: state.email,
        firstName: state.firstName,
        lastName: state.lastName,
        address: state.address,
        city: state.city,
        phoneNumber: state.phoneNumber,
        postalCode: state.postalCode,
        country: state.country,
        codeCountry: state.codeCountry,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateCustomerProfile: (data) => {
            dispatch({ type: "UPDATE_CUSTOMER_PROFILE", data: data })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCustomerProfile);

const styles = StyleSheet.create({
    registerbutton: {
        textDecorationLine: 'underline',
        marginTop: 10,
        fontSize: 15,
        color: '#2b7ce5',
        marginLeft: 0,
    },
    inputToUpdate: {
        padding: 10,
        width: 300,
        height: 40,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 10
    },
    input: {
        padding: 10,
        width: 300,
        height: 40,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 10,
        color: 'grey'
    },
})