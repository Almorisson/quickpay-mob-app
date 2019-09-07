import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ListTransactions from '../component/transaction/history/ListTransactions';
import Icon from '@expo/vector-icons/Ionicons';

const ListTransactionsStack = createStackNavigator({
    ListTransactions: {
        screen: ListTransactions,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: 'List of transactions',
                headerLeft:
                    (
                        <Icon style={{ paddingLeft: 10 }}
                            onPress={() => navigation.openDrawer()}
                            name="md-menu" size={30} />
                    ),
                headerStyle: { backgroundColor: '#2b7ce5' }
            }
        }
    }
})

export default ListTransactionsStack;