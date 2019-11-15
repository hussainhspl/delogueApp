import React from 'react';
import {View, Text, Picker, AppState} from 'react-native';
import styled from 'styled-components';
import {Icon} from 'native-base'
// relative import
import CommonModal from '../../shared/CommonModal';

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
      appState: AppState.currentState,

    }
  }
  onValueChange2(value) {
		this.setState({
			selected2: value,
			note
		});
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  redirectTo =() => {
    const { history } = this.props;
    // console.log('enter in  redirect function');
    history.push("/style")
  }
  componentDidMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount= () => {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
      this.setState({modalVisible : false}, () => console.log(this.state.modalVisible));
    }
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