import React from 'react';
import {View, Text, Picker} from 'react-native';
import styled from 'styled-components';
import {Icon} from 'native-base'
import CommonModal from '../shared/CommonModal';

const ModalView = styled.View`
  padding: 15px;
`;
const StyledView = styled.View`
	border: 1px solid #ddd;
	height: 30px;
	margin-top: 5px;
	flex: 1;
`;
const StyledPicker = styled(Picker)`
	height: 30px;
	flex: 1;
`;
class NotificationModal extends React.Component{
  constructor(props) {
    super(props);
    this.state= {
      selected2: 'undefined',
      modalVisible : true,     
    }
  }
  onValueChange2(value: string) {
		this.setState({
			selected2: value,
			note
		});
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  redirectTo =(history) => {
    // console.log('enter in  redirect function');
    history.push("/style")
  }
  render() {
    history = this.props.history;
    // console.log('notification modal', history)
    return(
      <View>
        <CommonModal    
					title='Notify User about sample request update'
					modalVisible={this.state.modalVisible}
          close={() => {this.redirectTo(history);
          }}
        >
          <ModalView>
            <Text>Please Select Users to be NOtified </Text>
            <StyledView>
								<StyledPicker
									mode="dropdown"
									iosIcon={<Icon name="arrow-down" />}
									style={{ width: undefined }}
									placeholder="Select users"
									placeholderStyle={{ color: "#bfc6ea" }}
									placeholderIconColor="#007aff"
									selectedValue={this.state.selected2}
									onValueChange={this.onValueChange2.bind(this)}
								>
									<Picker.Item label="Hussain" value="key0" />
									<Picker.Item label="Siya" value="key1" />
								</StyledPicker>
							</StyledView>
          </ModalView>
        </CommonModal>
      </View>
    )
  }
}

export default NotificationModal;