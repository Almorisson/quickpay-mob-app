import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, Image } from 'react-native';
import Register from './component/Register';
import Login from './component/Login';
import Photo from './component/Photo';
import Home from './component/Home';
import Profile from './component/profile/Profile';
import RegisterTrader from './component/RegisterTrader';

/*
 * Composants qui contiennent le tiroir de navigation
 *
 */
import ProfileStack from './navigation/ProfileStack';
//import PhotoStack from './navigation/PhotoStack';
import ListTransactionsStack from './navigation/ListTransactionsStack';
import HomeStack from './navigation/HomeStack';
import MapStack from './navigation/MapStack';

import {
    createSwitchNavigator,
    createAppContainer,
    createDrawerNavigator,
    createBottomTabNavigator,
    createStackNavigator,
    DrawerItems
} from 'react-navigation'
import Icon from '@expo/vector-icons/Ionicons';

const HomeBottomNavigation = createBottomTabNavigator(
    {
        HomeStack:
        {
            screen: HomeStack, navigationOptions:
            {
                title: 'Home', tabBarIcon:
                    ({ focused }) => (<Icon name="md-home" color={focused ? '#2b7ce5' : '#898e93'} size={25} />)
            }
        },
        ListTransactionsStack:
        {
            screen: ListTransactionsStack, navigationOptions:
            {
                title: 'Transactions', tabBarIcon:
                    ({ focused }) => (<Icon name="ios-add-circle" color={focused ? '#2b7ce5' : '#898e93'} size={25} />)
            }
        },
        MapStack:
        {
            screen: MapStack, navigationOptions:
            {
                title: 'Map', tabBarIcon:
                    ({ focused }) => (<Icon name="md-compass" color={focused ? '#2b7ce5' : '#898e93'} size={25} />)
            }
        },
        ProfileStack:
        {
            screen: ProfileStack, navigationOptions:
            {
                title: 'Profile', tabBarIcon:
                    ({ focused }) => (<Icon name="md-person" color={focused ? '#2b7ce5' : '#898e93'} size={25} />)
            }
        }
    },
    {
        navigationOptions: ({ navigation }) => {
            return {
                header: null,
            }
        }
    }
)

const HomeNavigation = createStackNavigator(
    {
        HomeBottomNavigation: HomeBottomNavigation
    }

)

const CustomDrawer = (props) => (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('./assets/icon.png')}
                style={{ height: 100, width: 100, borderRadius: 60 }} />
        </View>
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
    </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator(
    {
        Page: { screen: HomeNavigation, navigationOptions: { title: 'Page actuelle' } },
        Home: { screen: Home },
        Photo: { screen: Photo, navigationOptions: { title: 'Prendre une photo' } },
        Profile: { screen: Profile }
    }, {
        contentComponent: CustomDrawer
    }
)

const AppSwitchNavigator = createSwitchNavigator(
    {
        Login: { screen: Login },
        Register: { screen: Register },
        Home: { screen: AppDrawerNavigator },
        RegisterTrader: { screen: RegisterTrader }
    })

const AppContainer = createAppContainer(AppSwitchNavigator);

export default class Routes extends Component {
    render() {
        return (
            <AppContainer />
        )
    }
}