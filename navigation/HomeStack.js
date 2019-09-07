import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from '../component/Home';

import Amount from '../component/transaction/trader/Amount';
import QRCode from '../component/transaction/trader/QRCode';

import Scanner from '../component/transaction/customer/Scanner';
import Payment from '../component/transaction/customer/Payment';
import PaymentStripe from '../component/transaction/customer/PaymentStripe';
import Charge from '../component/transaction/customer/Charge';


import Icon from '@expo/vector-icons/Ionicons';

const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: 'Home',
                headerLeft:
                    (
                        <Icon style={{ paddingLeft: 10 }}
                            onPress={() => navigation.openDrawer()}
                            name="md-menu" size={30} />
                    ),
                headerStyle: { backgroundColor: '#2b7ce5' }
            }
        }
    },

    Amount: {
        screen: Amount,
        navigationOptions: { headerTitle: 'Create an amount to pay' }
    },
    QRCode: {
        screen: QRCode,
        navigationOptions: { headerTitle: 'QR Code amount to pay' }
    },

    Scanner: {
        screen: Scanner,
        navigationOptions: { headerTitle: 'Scan a QR Code' }
    },
    Payment: {
        screen: Payment,
        navigationOptions: { headerTitle: 'Choose your payment method' }
    },
    PaymentStripe: {
        screen: PaymentStripe,
        navigationOptions: { headerTitle: 'Payment with credit card' }
    },
    Charge: {
        screen: Charge,
        navigationOptions: { headerTitle: 'Create a charge' }
    }
})

export default HomeStack;