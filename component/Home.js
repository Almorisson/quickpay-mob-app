import React from 'react';
import { Button, View, Text, AsyncStorage, Image, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            accountType: '',
        };
        this.init_email();
    }

    init_email() {
        AsyncStorage.getItem('email', (err, getEmail) => {
            this.setState(
                { email : getEmail }
            )
        });

        AsyncStorage.getItem('accountType', (err, getAccountType) => {
            this.setState(
                { accountType : getAccountType }
            )
        });
    }
    static navigationOptions = {
        title: 'Home'
    };

    pay() {
        this.props.navigation.navigate("Scanner", {email: this.state.email});
    }

    createAmountToPay() {
        this.props.navigation.navigate("Amount");
    }

    render() {
        if (this.state.accountType == 'trader') {
            return (
                <View style={{ flex: 1, alignItems:'center', justifyContent:'center' }}>
                    <Text value={this.state.email}> Welcome {this.state.email} </Text>
                    <Button title="Create amount to pay" onPress={() => this.createAmountToPay()} />
                </View>

            )
        } else {
            return(
                <View style={{ flex: 1, alignItems:'center', justifyContent:'center' }}>
                    <Image style={styles.homeImage}
                        source={require('../assets/qrcode.png')} />
                    <Text value={this.state.email}> Welcome {this.state.email} </Text>
                    <Button title="Go pay" onPress={() => this.pay()} />
                </View>
            )
        }
    }
}

export default Home;

const styles = StyleSheet.create({
    homeImage: {
        width: 200,
        height: 200,
        resizeMode: 'stretch'
    }
});