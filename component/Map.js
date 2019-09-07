import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, Button, Text, Linking, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import axios from 'axios';

class Map extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            refresh: 0,
            address: '',
            region: {
                latitude: 48.7855,
                longitude: 2.328579999999988,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            currentMarker: {
                coordinate: {
                    latitude: 48.7855,
                    longitude: 2.328579999999988,
                },
                title: 'Ajeel',
                description: 'Ajeel, à Cachan'
            },

            markers: []
        };
    }

    componentDidMount() {
        let newArray = []
        axios.get('https://quickpay-api.herokuapp.com/api/v1/traders/')
            .then(response => {
                let data = response.data
                for (trader of data.traders) {
                    if (trader.latitude && trader.longitude) {
                        newArray.push({
                            coordinate: {
                                latitude: trader.latitude,
                                longitude: trader.longitude,
                            },
                            title: trader.nameSociety,
                            description: trader.address + " " + trader.postalCode + " " + trader.city
                        })
                    }
                }
                console.log("newArray1", newArray);
                this.setState({ markers: newArray })

            })
            .catch(error => {
                console.log(error)
            })

    }

    onChangeSearch = (address) => {
        this.setState({ address })
    }

    search = () => {
        /*
        axios.get('https://map.google.com/maps/api/geocode/json?address=' + this.state.address + 
        '&key=AIzaSyCEEXim1kpn_t_Ph32JEX-divXNYhECOjw')
        .then(res => { console.log(res.data) })
        .catch(error => { 
            console.log(error)
        })
        */
        if (this.state.address < 1) {
            Alert.alert('Info', 'Votre champ est vide !', [{ text: 'Ok', style: 'cancel' }], { cancelable: false });
            return;
        }
        axios.get('https://nominatim.openstreetmap.org/search?q=' + this.state.address
            + '&format=json&addressdetails=1&limit=1&polygon_svg=1')
            .then(res => {
                this.setState({ refresh: Math.floor(Math.random() * 100) })
                if (res.data[0]['lat'] && res.data[0]['lon']) {
                    this.setState(value => ({
                        region: {
                            latitude: parseFloat(res.data[0]['lat']),
                            longitude: parseFloat(res.data[0]['lon']),
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }
                    }));
                    this.setState(value => ({
                        currentMarker: {
                            coordinate: {
                                latitude: parseFloat(res.data[0]['lat']),
                                longitude: parseFloat(res.data[0]['lon'])
                            },
                            title: this.state.address,
                            description: res.data[0]['display_name']
                        }
                    }))
                } else {
                    alert('Pas de résultat')
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    linkToGoogle = (marker) => {
        Linking.openURL('https://maps.apple.com/?q=' + marker.title +
            '&ll=' + marker.coordinate.latitude + ',' + marker.coordinate.longitude)
    }


    render() {
        return (
            <View>
                <MapView
                    key={this.state.refresh}
                    provider={PROVIDER_GOOGLE}
                    style={styles.container}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    initialRegion={this.state.region}>
                    <Marker
                        coordinate={this.state.currentMarker.coordinate}
                        title={this.state.currentMarker.title}
                        description={this.state.currentMarker.description}
                    />
                    {this.state.markers.map((marker, index) => {
                        return (
                            <MapView.Marker
                                key={index}
                                coordinate={marker.coordinate}
                                title={marker.title}
                                description={marker.description}
                            //onCalloutPress={() => this.linkToGoogle(marker)}
                            >
                                <MapView.Callout onPress={() => this.linkToGoogle(marker)} style={{ width: 150 }}>
                                    <Text style={{ fontWeight: 'bold' }}>{marker.title}</Text>
                                    <Text>{marker.description}</Text>
                                </MapView.Callout>
                            </MapView.Marker>
                        );
                    })}
                </MapView>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                    <TextInput placeholder="Adresse ..."
                        style={{ textAlign: 'center', height: 40, width: "70%", borderColor: 'black', borderWidth: 1, marginBottom: 20, marginTop: 20 }}
                        value={this.state.address}
                        onChangeText={(address) => this.setState({ address })}
                    />
                    <Button title="Search" onPress={this.search.bind(this)} />
                    <Text>{this.state.address}</Text>
                </View>
            </View>
        );
    }
}

export default Map;

const styles = StyleSheet.create({
    container: {
        height: '70%',
        width: '100%'
    },
    input: {
        height: 70,
        backgroundColor: '#ffffff',
        paddingLeft: 15,
        paddingRight: 15
    },
    borne: {
        width: 50,
        height: 50,
        justifyContent: 'flex-end',
    },
})
