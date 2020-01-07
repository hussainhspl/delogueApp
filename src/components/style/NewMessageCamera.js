import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Icon } from "native-base";
// relative import
import ImagePicker from 'react-native-image-picker';
import GetAsyncToken from '../../script/getAsyncToken';

import ImageUpload from '../../api/imageUpload';
import CameraView from '../../styles/CameraView';
import Toast from 'react-native-root-toast';

class NewMessageCamera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // attachment: null
    };
  }
  selectPhotoTapped(folderId) {
    console.log('folder id in select picker', folderId, this.props.styleID);
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        // console.log('User cancelled photo picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = response.uri;
        GetAsyncToken()
          .then(token => {

            ImageUpload(token, source, response.fileName, 0, this.props.styleID)
              .then(res => {
                let toast = Toast.show('image successfully attached', {
                  duration: Toast.durations.LONG,
                  position: Toast.positions.BOTTOM,
                  shadow: false, animation: true,
                  hideOnPress: true, delay: 0,
                })
                setTimeout(() =>{ Toast.hide(toast)}, 3000);
                console.log('response in upload success', res.data);
                let jsonObject = JSON.parse(res.data);
                console.log('convert', jsonObject.id);
                this.props.attachmentImage(jsonObject)
              })
          })
        console.log('source', source);
      }
    });
  }
  render() {
    // console.log('msg camera: ', this.state.cameraOn)
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.selectPhotoTapped()}
        >
          <CameraView>
            <Icon style={{ color: "white", fontSize: 20 }} name="camera" />
          </CameraView>
        </TouchableOpacity>
      </View>
    );
  }
}
export default NewMessageCamera;
