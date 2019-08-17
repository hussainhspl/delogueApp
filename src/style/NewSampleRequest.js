import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import styled from 'styled-components';
import CommonModal from '../shared/CommonModal';

class NewSampleRequest extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      modalVisible : true,
    }
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render(){
    return(
      <View>
        <TouchableHighlight
					onPress={() => {
						this.setModalVisible(!this.state.modalVisible);
					}}>
						<Text>Add new  req </Text>
				</TouchableHighlight>
				<CommonModal 
					title='Requested Quantity'
					modalVisible={this.state.modalVisible}
					close={() => {this.setModalVisible(!this.state.modalVisible);
						}}
				>
          <Text>new req modal </Text>
        </CommonModal>
      </View>
    )
  }
}

export default NewSampleRequest;