import React from 'react';
import {View, Text, TouchableHighlight, AppState} from 'react-native';
import {ListItem, CheckBox, Body} from 'native-base';
import CommonModal from '../shared/CommonModal';
import styled from 'styled-components';
import { connect } from "react-redux";

import { generalTab } from '../store/actions/index';

const SelectorBox = styled.View`
  padding: 10px;
`;
const TitleText = styled.Text`
  font-family: ${props => props.theme.regular};
  color: ${props => props.theme.textColor};
  font-size: ${props => props.theme.large};
  padding-bottom: 20px;
`;
const CheckBoxText = styled.Text`
  font-family: ${props => props.theme.bold};
  color: ${props => props.theme.textColor};
  font-size: ${props => props.theme.large};
`;

class Pdf extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      appState: AppState.currentState,
      modalVisible : true
    }
  }
	setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  redirectTo =(history) => {
    // console.log('enter in  redirect function');
    history.push("/style")
  }
  closeModal() {
    // console.log("enter in close modal")
    this.setState({modalVisible: false}, () => this.props.generalTabFunction());
    // if(this.state.modalVisible == false) {
    //   this.props.generalTabFunction();
    // }
  }
  componentDidMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount= () => {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
      this.setState({modalVisible : false}, () => this.props.generalTabFunction());
    }
  }
  render() {
    console.disableYellowBox = true
    history = this.props.history;
    // console.log('pdf history', this.props.history);
    return(
      <View style={{flex: 1}}> 
       {/* <TouchableHighlight
					onPress={() => {
						this.setModalVisible(!this.state.modalVisible);
					}}>

        <Text> pdf </Text>
          
          </TouchableHighlight> */}
        <CommonModal 
					title='Print Style'
					modalVisible={this.state.modalVisible}
          // close={() => {this.props.generalTabFunction()}}
          close={() => {this.closeModal()}}
          okButton = "print pdf"
				>
          <SelectorBox>
            <TitleText> Please select which parts of this style you would like to print </TitleText>
            <ListItem>
              <CheckBox checked={false} color="#415461"/>
              <Body>
                <CheckBoxText style={{paddingLeft: 15}}>All</CheckBoxText>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={true} color="#415461"/>
              <Body>
                <CheckBoxText style={{paddingLeft: 15}}>Finish list Screen</CheckBoxText>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={true} color="#415461"/>
              <Body>
                <CheckBoxText style={{paddingLeft: 15}}>Item List</CheckBoxText>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={true} color="#415461"/>
              <Body>
                <CheckBoxText style={{paddingLeft: 15}}>Style Files</CheckBoxText>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={true} color="#415461"/>
              <Body>
                <CheckBoxText style={{paddingLeft: 15}}>Measurement Chart</CheckBoxText>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={true} color="#415461"/>
              <Body>
                <CheckBoxText style={{paddingLeft: 15}}>Item Artwork</CheckBoxText>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={true} color="#415461"/>
              <Body>
                <CheckBoxText style={{paddingLeft: 15}}>Pending Sample Requests</CheckBoxText>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={true} color="#415461"/>
              <Body>
                <CheckBoxText style={{paddingLeft: 15}}>Sample Comments</CheckBoxText>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={false} color="#415461"/>
              <Body>
                <CheckBoxText style={{paddingLeft: 15}}>Communication Message</CheckBoxText>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={false} color="#415461"/>
              <Body>
                <CheckBoxText style={{paddingLeft: 15}}>Custom Fields</CheckBoxText>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={true} color="#415461"/>
              <Body>
                <CheckBoxText style={{paddingLeft: 15}}> Description + Artwork matrix</CheckBoxText>
              </Body>
            </ListItem>
          </SelectorBox>
        </CommonModal>
      </View>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    generalTabFunction: () => dispatch(generalTab()),
  }
}
export default connect(null, mapDispatchToProps) (Pdf);
// export default Pdf;