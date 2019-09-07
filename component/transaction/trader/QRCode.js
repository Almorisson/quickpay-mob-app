import React from 'react';
import { View, Text, Image } from 'react-native';

class QRCode extends React.Component {

    componentDidMount() {
        console.log("QR CODE : ", this.props.navigation.getParam('QrCode'));
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>QR Code to pay :</Text>
                <Image style={{ width: 400, height: 400 }}
                    //source={{ uri: 'http://localhost:3000/public/qr/Quickpay_1566396388714.png' }} />
                    //'http://10.0.0.2:3000/public/qr/Quickpay_1566404693834.png' }} />

                    source={{ uri: this.props.navigation.getParam('QrCode') }} />
            </View>
        );
    }
}

export default QRCode;