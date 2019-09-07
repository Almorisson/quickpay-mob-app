import React from 'react';
import { Button, Image, View, AsyncStorage, Promise } from 'react-native';
import { ImagePicker, Permissions, Constants } from 'expo';

import { connect } from 'react-redux';

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Toast from 'react-native-root-toast';

class Photo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image:null,
            token: '',
            id: ''
        };
        this.init_token();
    }

    componentDidUpdate() {
        console.log("update:" + JSON.stringify(this.props.navigation.state) );
    }

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    };

    render() {
        let { image } = this.state;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    title="Pick an image from your gallery !"
                    onPress={this._pickImage}
                />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                <Button title="Take a picture" onPress={this.camera}/>
                <Button title="Add photo" onPress={() => this.addphoto()}/>
            </View>
        );
    }

    init_token() {
        AsyncStorage.getItem('token', (err, getToken) => {
            this.setState(
                { token : getToken }
            )
            this.setState({id: jwt_decode(getToken)._id})
        });
    }

    camera = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchCameraAsync({
            aspect: [1, 1],
            base64: false,
        });

        if (!result.cancelled) {

        }
    };

  addphoto () {
      let random = Math.floor(Math.random() * 100)
      const formData = new FormData();
      formData.append('image', {uri: this.state.image, name: this.state.id + '_' + random + 'photo.jpg', type:'image/jpeg'});
      const config = {
          headers: {
              'content-type': 'multipart/form-data',
              'token': this.state.token
          }
      };
      axios.post('http://10.0.2.2:3000/user/profile/photo',formData, config).then(response => {
          let obj = response.data
          console.log("---" + obj['picture'])
          const action = { type: "ADD_PHOTO", value: obj['picture'] }
          this.props.addnewphoto(action)
          this.props.navigation.navigate('Profile')
      }).catch(error => {
          Toast.show("Incorrect photo", { position: Toast.positions.CENTER });
      })
  }


  _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
      });

      console.log(result);

      if (!result.cancelled) {
          this.setState({ image: result.uri });
      }
    };
}

//REDUX
const mapStateToProps = (state) => {
    console.log("state :" + state.photo)
    return {
        picture: state.photo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addnewphoto: (data) => {
            dispatch({type: "ADD_PHOTO", data: data})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photo);