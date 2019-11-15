import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Icon } from "native-base";
// relative import
import CameraComponent from "../../shared/CameraComponent";
import CameraView from '../../styles/CameraView';
// import console = require("console");



class NewMessageCamera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraOn: false
    };
  }
  OnCamera = () =>  {
    this.setState({ cameraOn: true})
  }
  render() {
    console.log('msg camera: ', this.state.cameraOn)
    return (
      <View>
        <CameraView>
          <TouchableOpacity onPress={this.OnCamera}>
            <Icon style={{ color: "white", fontSize: 20 }} name="camera" />
          </TouchableOpacity>
        </CameraView>
        <View>
          {this.state.cameraOn &&
            <CameraComponent close={() => this.setState({ cameraOn: false })} />
          }
        </View>
      </View>
    );
  }
}
export default NewMessageCamera;
