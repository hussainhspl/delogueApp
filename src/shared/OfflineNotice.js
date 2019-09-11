import React, { PureComponent } from 'react';
import { Text, Dimensions, StyleSheet, Alert } from 'react-native';
import styled from 'styled-components';
import NetInfo from "@react-native-community/netinfo";

// const { width } = Dimensions.get('window');

const OfflineContainer = styled.View`
  background-color: #b52424;
  height: 30px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: ${Dimensions.get('window').width};
`;

function MiniOfflineSign() {
  return (
    <OfflineContainer>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </OfflineContainer>
  );
}


class OfflineNotice extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      isConnected: '',
    };
  }
  componentDidMount = () => {
    NetInfo.addEventListener(state => {
      console.log("subscribe Connection type", state.type);
      console.log("subscribe Is connected?", state.isConnected);
      this.setState({
        isConnected: state.isConnected,
      },() => console.log("local state resp: ", this.state.isConnected))
    });
    console.log("local state: ", this.state.isConnected);
  }

  render() {
    console.log("entering offline", this.state.isConnected);
      if (!this.state.isConnected) {
        return <MiniOfflineSign />;
      }
      return null;
    }
   
}
const styles = StyleSheet.create({
  
  offlineText: { 
    color: '#fff'
  }
});
export default OfflineNotice;