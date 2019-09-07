import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Map from '../component/Map';
import Icon from '@expo/vector-icons/Ionicons';

const MapStack = createStackNavigator({
    Map: {
        screen: Map,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: 'Map',
                headerLeft: 
                (
                    <Icon style={{paddingLeft: 10}}
                        onPress={() => navigation.openDrawer()}
                        name="md-menu" size={30} />
                ),
                headerStyle: { backgroundColor: '#2b7ce5' }
            }
        }
    }
})

export default MapStack;
