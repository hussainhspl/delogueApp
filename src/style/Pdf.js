import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {ListItem, CheckBox, Body} from 'native-base';
import CommonModal from '../shared/CommonModal';
import styled from 'styled-components';
import { connect } from "react-redux";

import { generalTab } from '../store/actions/index';

const SelectorBox = styled.View`
  padding: 10px;
`;

class Pdf extends React.Component {
  state= {modalVisible : true}
	setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  redirectTo =(history) => {
    console.log('enter in  redirect function');
    history.push("/style")
  }
  render() {
    // console.disableYellowBox = true
    history = this.props.history;
    console.log('pdf history', this.props.history);
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
          close={() => this.props.generalTabFunction()}
          // hideButton={true}
          okButton = "print pdf"
				>
          <SelectorBox>
            <Text style={{paddingBottom: 20}}> Please select which parts of this style you would like to print </Text>
            <ListItem>
              <CheckBox checked={false} color="#415461"/>
              <Body>
                <Text style={{paddingLeft: 15}}>All</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={true} color="#415461"/>
              <Body>
                <Text style={{paddingLeft: 15}}>Finish list Screen</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={true} color="#415461"/>
              <Body>
                <Text style={{paddingLeft: 15}}>Item List</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={true} color="#415461"/>
              <Body>
                <Text style={{paddingLeft: 15}}>Style Files</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={true} color="#415461"/>
              <Body>
                <Text style={{paddingLeft: 15}}>Measurement Chart</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={true} color="#415461"/>
              <Body>
                <Text style={{paddingLeft: 15}}>Item Artwork</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={true} color="#415461"/>
              <Body>
                <Text style={{paddingLeft: 15}}>Pending Sample Requests</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={true} color="#415461"/>
              <Body>
                <Text style={{paddingLeft: 15}}>Sample Comments</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={false} color="#415461"/>
              <Body>
                <Text style={{paddingLeft: 15}}>Communication Message</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={false} color="#415461"/>
              <Body>
                <Text style={{paddingLeft: 15}}>Custom Fields</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={true} color="#415461"/>
              <Body>
                <Text style={{paddingLeft: 15}}> Description + Artwork matrix</Text>
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
