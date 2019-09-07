import React from 'react';
import { ScrollView, View, Text, Alert, Switch, AsyncStorage, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements'
import { connect } from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-root-toast';

import Icon from '@expo/vector-icons/Ionicons';
import BaseIcon from './Icon'
import Chevron from './Chevron'
import InfoText from './InfoText'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountType: '',

            picture: null,
            id: '',
            token: '',
            email: '',
            firstName: '',
            lastName: '',
            nameSociety: '',
            phoneNumber: '',
            load: true,
            pushNotifications: true,
        };
        this.init_token();
        this.profile = this.profile.bind(this)
    }

    //componentDidUpdate(prevProps, prevState) {

    //}

    componentDidMount() {
        this.init_token
        return
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.picture !== this.props.picture || prevProps.email !== this.props.email ||
            prevProps.firstName !== this.props.firstName || prevProps.lastName !== this.props.lastName) {
            this.setState({ load: true })
            if (this.props.picture[0] != null) {
                this.setState({ picture: this.props.picture[this.props.picture.length - 1].value })
            }
            if (this.props.email[0] != null) {
                this.setState({ email: this.props.email[this.props.email.length - 1] })
            }
            if (this.props.firstName[0] != null) {
                this.setState({ firstName: this.props.firstName[this.props.firstName.length - 1] })
            }
            if (this.props.lastName[0] != null) {
                this.setState({ lastName: this.props.lastName[this.props.lastName.length - 1] })
            }
            this.setState({ load: false })
        }
    }

    init_token = async () => {
        AsyncStorage.getItem('token', (err, getToken) => {
            this.setState({
                token: getToken
            })
        });
        await AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    let value = store[i][1];
                    console.log(key + " , " + value);
                    if (key == 'id') {
                        this.setState({
                            id: value
                        })
                    } else if (key == 'token') {
                        this.setState({
                            token: value
                        })
                        this.profile(this.state.token);
                    } else if (key == 'accountType') {
                        this.setState({
                            accountType: value
                        })
                    }
                });
            });
        });
    }

    getTraderProfile = (AuthToken) => {
        console.log("trader")

        axios.get('https://quickpay-api.herokuapp.com/api/v1/traders/' + this.state.id, {
            headers:
            {
                'Content-Type': 'application/json',
                Authorization: AuthToken
            }
        })
            .then(response => {
                let obj = response.data
                console.log(obj);
                this.setState({ email: obj.email })
                this.setState({ firstName: obj.firstName })
                this.setState({ lastName: obj.lastName })
                console.log(obj.lastName)
                this.setState({ load: false })
            }).catch(error => {
                Toast.show("Problem from trader profile's request", { position: Toast.positions.CENTER });
                console.log(error);
            })
    }

    getCustomerProfile = (AuthToken) => {
        console.log("customer ")
        axios.get('https://quickpay-api.herokuapp.com/api/v1/customers/' + this.state.id, {
            headers:
            {
                'Content-Type': 'application/json',
                Authorization: AuthToken
            }
        })
            .then(response => {
                let obj = response.data
                console.log(obj);
                this.setState({ email: obj.email })
                this.setState({ firstName: obj.firstName })
                this.setState({ lastName: obj.lastName })
                console.log(obj.lastName)
                this.setState({ load: false })
            }).catch(error => {
                Toast.show("Problem from trader profile's request", { position: Toast.positions.CENTER });
                console.log(error);
            })
    }

    profile = (token) => {
        this.setState({ load: true })
        console.log('id : ' + this.state.id)
        const AuthToken = 'Bearer '.concat(token);
        console.log('account type : ', this.state.accountType)
        if (this.state.accountType == 'trader') {
            console.log('ok')
            this.getTraderProfile(AuthToken);
        } else {
            console.log('non ok')
            this.getCustomerProfile(AuthToken);
        }

    }

    static navigationOptions = {
        title: 'Profile'
    };

    onPressEditProfile() {
        console.log("THIS.PROPS : ", this.props)
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                    this.setState({ load: true })
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    let value = store[i][1];
                    console.log("ASYNC STORAGE => ", key + " , " + value);
                    //console.log("PROPS", this.props);
                    if (key == 'email' && this.props.email[0] != null) {
                        AsyncStorage.setItem('email', this.props.email[this.props.email.length - 1], () => {
                            AsyncStorage.mergeItem('email', this.props.email[this.props.email.length - 1], () => {
                            });
                        });
                    } else if (key == 'firstname') {
                        AsyncStorage.setItem('firstname', this.props.firstName[this.props.firstName.length - 1], () => {
                            AsyncStorage.mergeItem('firstname', this.props.firstName[this.props.firstName.length - 1], () => {
                            });
                        });
                    } else if (key == 'lastname' && this.props.lastName[0] != null) {
                        AsyncStorage.setItem('lastname', this.props.lastName[this.props.lastName.length - 1], () => {
                            AsyncStorage.mergeItem('lastname', this.props.lastName[this.props.lastName.length - 1], () => {
                            });
                        });
                        /*
                        } else if (key == 'address' && this.props.address[0] != null) {     
                            AsyncStorage.setItem('address', this.props.address[this.props.address.length - 1], () => {
                                AsyncStorage.mergeItem('address', this.props.address[this.props.address.length - 1], () => {
                                });
                            });
                        } else if (key == 'city' && this.props.city[0] != null) {
                            AsyncStorage.setItem('city', this.props.city[this.props.city.length - 1], () => {
                                AsyncStorage.mergeItem('city', this.props.city[this.props.city.length - 1], () => {
                                });
                            });
                        } else if (key == 'nameSociety' && this.props.nameSociety[0] != null) {
                            AsyncStorage.setItem('nameSociety', this.props.nameSociety[this.props.nameSociety.length - 1], () => {
                                AsyncStorage.mergeItem('nameSociety', this.props.nameSociety[this.props.nameSociety.length - 1], () => {
                                });
                            });
                        } else if (key == 'phoneNumber' && this.props.phoneNumber[0] != null) {
                            AsyncStorage.setItem('phoneNumber', this.props.phoneNumber[this.props.phoneNumber.length - 1], () => {
                                AsyncStorage.mergeItem('phoneNumber', this.props.phoneNumber[this.props.phoneNumber.length - 1], () => {
                                });
                            });
                        } else if (key == 'postalCode' && this.props.postalCode[0] != null) {
                            AsyncStorage.setItem('postalCode', this.props.postalCode[this.props.postalCode.length - 1], () => {
                                AsyncStorage.mergeItem('postalCode', this.props.postalCode[this.props.postalCode.length - 1], () => {
                                });
                            });
    
                        } else if (key == 'country') { //} && this.props.country[0] != null) {
                            AsyncStorage.setItem('country', this.props.country[this.props.country.length - 1], () => {
                                AsyncStorage.mergeItem('country', this.props.country[this.props.country.length - 1], () => {
                                });
                            });
    
                        } else if (key == 'siretNumber') { //} && this.props.siretNumber[0] != null) {
                            AsyncStorage.setItem('siretNumber', this.props.siretNumber[this.props.siretNumber.length - 1], () => {
                                AsyncStorage.mergeItem('siretNumber', this.props.siretNumber[this.props.siretNumber.length - 1], () => {
                                });
                            });
                        } else if (key == 'codeCountry') { // && this.props.codeCountry[0] != null) {
                            AsyncStorage.setItem('codeCountry', this.props.codeCountry[this.props.codeCountry.length - 1], () => {
                                AsyncStorage.mergeItem('codeCountry', this.props.codeCountry[this.props.codeCountry.length - 1], () => {
                                });
                            });
    
    
                        } else if (key == 'iban') { //&& this.props.iban[0] != null) {
                            AsyncStorage.setItem('iban', this.state.iban[this.props.iban.length - 1], () => {
                                AsyncStorage.mergeItem('iban', this.props.iban[this.props.iban.length - 1], () => {
                                });
                            });
                            //this.props.navigation.navigate('UpdateProfile')
                        }*/

                        //this.setState({ load: false });

                    }
                });
                this.setState({ load: false });
                if (this.state.accountType === 'trader') {
                    this.props.navigation.navigate('UpdateTraderProfile')
                } else {
                    this.props.navigation.navigate('UpdateCustomerProfile')
                }
            });
        });
    }

    onPressMyCodeQr = () => {
        this.props.navigation.navigate('MyCodeQr')
    }

    onPressMyPayments = () => {
        this.props.navigation.navigate('MethodPayment')
    }

    onChangePushNotifications = () => {
        this.setState(state => ({
            pushNotifications: !state.pushNotifications,
        }))
    }

    render() {
        let { picture } = this.state;
        let { email } = this.state;
        let QrCode;
        if (this.state.accountType == 'trader') {
            QrCode =
                <ListItem title="My QR Code"
                    onPress={() => this.onPressMyCodeQr()}
                    containerStyle={styles.listItemContainer}
                    leftIcon={
                        <Icon name="ios-qr-scanner" />
                    }
                    rightIcon={<Chevron />}
                />
        } else {
            <Text> </Text>
        }

        return (
            <>
                {this.state.load === false ?
                    <ScrollView style={styles.scroll}>
                        <View style={styles.userRow}>
                            <View style={styles.userImage}>
                                <Avatar
                                    rounded
                                    size="large"
                                    source={{ uri: 'http://10.0.2.2:3000/' + picture }}
                                />
                            </View>
                            <View>
                                <Text style={{ fontSize: 16 }}>Votre nom : {this.state.firstName} {this.state.lastName}</Text>
                                <Text style={{ color: 'gray', fontSize: 16 }}> {this.state.email} </Text>
                            </View>
                        </View>

                        <InfoText text="Account" />
                        <View>
                            <ListItem
                                title="Edit your account"
                                onPress={() => this.onPressEditProfile()}
                                containerStyle={styles.listItemContainer}
                                leftIcon=
                                {
                                    <BaseIcon
                                        containerStyle={{ backgroundColor: '#C6C7C6' }}
                                        icon={{
                                            type: 'material',
                                            name: 'settings',
                                        }}
                                    />
                                }
                                rightIcon={<Chevron />}
                            />
                            <ListItem
                                title="My payments"
                                onPress={() => this.onPressMyPayments()}
                                containerStyle={styles.listItemContainer}
                                leftIcon={
                                    <BaseIcon
                                        containerStyle={{ backgroundColor: '#FAD291' }}
                                        icon={{
                                            type: 'font-awesome',
                                            name: 'money',
                                        }}
                                    />
                                }
                                rightIcon={<Chevron />}
                            />
                            {QrCode}
                        </View>
                    </ScrollView> :
                    <ActivityIndicator style={{ position: 'absolute', top: 200, left: 200 }} size="large" color="#0000ff" />
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        picture: state.photo,
        email: state.email,
        firstName: state.firstName,
        lastName: state.lastName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPhoto: (data) => {
            dispatch({ type: "GET_PHOTO", data: data })
        },
        updateProfil: (data) => {
            dispatch({ type: "UPDATE_PROFILE", data: data })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: 'white',
    },
    userRow: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
    },
    userImage: {
        marginRight: 12,
    },
    listItemContainer: {
        height: 55,
        borderWidth: 0.5,
        borderColor: '#ECECEC',
    },
})