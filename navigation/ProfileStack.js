import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Profile from '../component/profile/Profile';
import UpdateTraderProfile from '../component/profile/UpdateTraderProfile';
import UpdateCustomerProfile from '../component/profile/UpdateCustomerProfile';
import MyCodeQr from '../component/profile/MyCodeQr';
import MethodPayment from '../component/profile/MethodPayment';
import Icon from '@expo/vector-icons/Ionicons';

const ProfileStack = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: 'Profile',
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
    UpdateTraderProfile: {
        screen: UpdateTraderProfile,
        navigationOptions: { headerTitle: 'Update your profile' }
    },
    UpdateCustomerProfile: {
        screen: UpdateCustomerProfile,
        navigationOptions: { headerTitle: 'Update your profile' }
    },
    MyCodeQr: {
        screen: MyCodeQr,
        navigationOptions: { headerTitle: 'Your Code QR' }
    },
    MethodPayment: {
        screen: MethodPayment,
        navigationOptions: { headerTitle: 'All your method payments' }
    },
})

export default ProfileStack;