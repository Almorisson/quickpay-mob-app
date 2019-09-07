import React from 'react';
import { View, Text, TextInput } from 'react-native';

class MyCodeQr extends React.Component {

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>My QR Code</Text>
            </View>
        );
    }
}

export default MyCodeQr;