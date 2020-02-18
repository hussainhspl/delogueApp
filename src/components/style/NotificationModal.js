import React from 'react';
import { View, Text, AppState, Modal, TouchableHighlight, Dimensions } from 'react-native';
import styled from 'styled-components';
import { Icon, Picker } from 'native-base'
// relative import
import CommonModal from '../../shared/CommonModal';
import ModalHeader from '../../styles/ModalHeader';
import ModalTitle from '../../styles/ModalTitle';
import CancelButton from '../../styles/CancelButton';
import TouchableCancel from '../../styles/ToucaableCancel';
import ApplyButton from '../../styles/ApplyButton';
import TouchableApply from '../../styles/TouchableApply';
import ButtonText from '../../styles/ButtonText';

const ModalView = styled.View`

  flex: 1;
  background-color: #77777766;
  
  /* flex-direction: column; */
  justify-content: flex-end;
  /* justify-content: center;
  align-items: center; */
`;
const StyledView = styled.View`
	border: 1px solid #ddd;
	height: 30px;
	margin-top: 5px;
	/* flex: 1; */
`;

const StyledPicker = styled(Picker)`
	/* height: 30px;
	flex: 1; */
  height: 30px;
  padding-top: 0px;
  padding-bottom: 2px;
`;
const InnerView = styled.View`
  /* height: 30%; */
  background-color: white;
  
`;

const CloseBox = styled.View`
	margin-left: auto;
	padding: 10px;
	justify-content: center;
	align-items: center;
`;

const Body = styled.View`
  padding: 15px;
  height: 200px;
`;

const ApplyBar = styled.View`
	padding: 15px;
	align-items: center;
	justify-content: flex-end;
	flex-direction: row;
	height: 50px;
	background-color: ${(props) => props.bg ? props.bg : props.theme.lightBrown};
	position: absolute;
	bottom: 0;
	right: 0;
	left: 0;
`;

class NotificationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifySelected: [],
      modalVisible: true,
      appState: AppState.currentState,

    }
  }
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  selectNotifyUser(value) {
    // this.setState(prevState => ({
    //   notifySelected: [...prevState.notifySelected, value]
    // }));
    this.setState(prevState => ({
      notifySelected: [...prevState.notifySelected, value]
    }), () => { console.log('setting', this.state.notifySelected[this.state.notifySelected.length - 1]) })
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  redirectTo = () => {
    const { history } = this.props;
    // console.log('enter in  redirect function');
    this.setState({ modalVisible: false })
    history.push("/style")
  }
  componentDidMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount = () => {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
      this.setState({ modalVisible: false }, () => console.log(this.state.modalVisible));
    }
  }
  closeModal() {
    this.props.close();
  }
  render() {
    history = this.props.history;
    // console.log('notification modal', history)
    console.log('this.props.allUsers', this.props.allUsers);
    return (
      <View >
        <Modal
          transparent={false}
          title='Notify User about sample request update'
          visible={this.state.modalVisible}
        // close={() => {);
        // }}
        >
          <ModalView>
            <InnerView>
              <ModalHeader>
                <ModalTitle>{this.props.title}</ModalTitle>
                <CloseBox>
                  <TouchableHighlight
                    underlayColor="rgba(221, 221, 221, 0.4)"
                    onPress={this.redirectTo}
                  >
                    <Icon
                      style={{
                        color: "#fff",
                        fontSize: 28,
                        paddingHorizontal: 10
                      }}
                      name="ios-close"
                    />
                  </TouchableHighlight>
                </CloseBox>
              </ModalHeader>
              <Body>

                <Text>Select Users to be Notified </Text>
                <StyledView>
                  <StyledPicker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    placeholder="Select users"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.notifySelected}
                    onValueChange={this.selectNotifyUser.bind(this)}

                  >
                    {/* <Picker.Item label="Hussain" value="key0" />
                    <Picker.Item label="Siya" value="key1" /> */}
                    {this.props.allUsers.map(u => {
                      return (
                        <Picker.Item label={u.name} value={u} />
                      )
                    })}
                  </StyledPicker>
                </StyledView>
                <ApplyBar>
                  <CancelButton>
                    <TouchableCancel
                      underlayColor="#8f8c86"
                      onPress={() => { this.closeModal(this.props.close) }}>
                      <ButtonText> CANCEL </ButtonText>
                    </TouchableCancel>
                  </CancelButton>
                  <ApplyButton>
                    <TouchableApply underlayColor="#354733" onPress={(data) => this.props.applyClick(this.state.notifySelected)}>
                      <ButtonText>{this.props.okButtonText ? this.props.okButtonText : 'apply'}</ButtonText>
                    </TouchableApply>
                  </ApplyButton>
                </ApplyBar>
              </Body>
            </InnerView>
          </ModalView>
        </Modal>
      </View>
    )
  }
}

export default NotificationModal;