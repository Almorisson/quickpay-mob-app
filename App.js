import React, {Component} from "react";
import { AppLoading, Asset } from 'expo';
import Routes from "./Routes";

import { Provider } from 'react-redux';
import Store from './store/configureStore';

import {TabNavigator} from 'react-navigation'
//const App = () => <Routes/>

export default class App extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            loaded : false
        }
    }
    
    _loadResourcesAsync = async () => {
        return Promise.all([
          Asset.loadAsync([
            require('./assets/splash.png'),
            require('./assets/icon.png'),
            require('./assets/img_lights.jpg')
          ]),
        ]);
    };
  
    _handleLoadingError = error => {
        console.warn(error);
    };
    
    _handleFinishLoading = () => {
        this.setState({ loaded: true });
    };

    render() {
        if (!this.state.loaded) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            )
        } else {
            return(
                <Provider store={Store}>
                    <Routes />
                </Provider>
            )
        }
    }
}