import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Icon } from "native-base";
import CameraComponent from "../shared/CameraComponent";
// import console = require("console");

const CameraView = styled.View`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: #849d7a;
`;

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
