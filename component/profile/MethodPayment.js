import React from 'react';
import { Button, View, Text, TextInput } from 'react-native';

class MethodPayment extends React.Component {

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Payment method</Text>
                <TextInput />
            </View>
        );
    }
}

export default MethodPayment;