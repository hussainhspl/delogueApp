import React, { PureComponent } from "react";
import { View, Text, Dimensions, StyleSheet, Alert } from "react-native";
import styled from "styled-components";
import NetInfo from "@react-native-community/netinfo";
import {Badge } from 'native-base';

// const { width } = Dimensions.get('window');

const OfflineContainer = styled.View`
  
  height: 30px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: ${Dimensions.get("window").width};
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 1;
`;

function MiniOfflineSign() {
  return (
    <OfflineContainer style={{backgroundColor: '#f00'}}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </OfflineContainer>
  );
}

class OfflineNotice extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: ""
    };
  }
  componentDidMount = () => {
    NetInfo.addEventListener(state => {
      // console.log("subscribe Connection type", state.type);
      // console.log("subscribe Is connected?", state.isConnected);
      this.setState(
        {
          isConnected: state.isConnected
        },
        // () => console.log("local state resp: ", this.state.isConnected)
      );
    });
    // console.log("local state: ", this.state.isConnected);
  };

  render() {
    // console.log("entering offline", this.state.isConnected);
    if (!this.state.isConnected) {
      return <MiniOfflineSign />;
    }
    return null;
  }
}
const styles = StyleSheet.create({
  offlineText: {
    color: "#fff"
  }
});
export default OfflineNotice;
