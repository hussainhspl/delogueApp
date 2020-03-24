import React from 'react';
import { View, Text, AppState, Modal, TouchableHighlight, Dimensions } from 'react-native';
import styled from 'styled-components';
import { Icon, Picker } from 'native-base'
// relative import
import ModalHeader from '../styles/ModalHeader';
import ModalTitle from '../styles/ModalTitle';
import CancelButton from '../styles/CancelButton';
import TouchableCancel from '../styles/ToucaableCancel';
import ApplyButton from '../styles/ApplyButton';
import TouchableApply from '../styles/TouchableApply';
import ButtonText from '../styles/ButtonText';

const ModalView = styled.View`
  flex: 1;
  background-color: #77777766;
  justify-content: flex-end;
`;
const StyledView = styled.View`
	border: 1px solid #ddd;
	height: 30px;
	margin-top: 5px;
`;

const StyledPicker = styled(Picker)`
  height: 30px;
  padding-top: 0px;
  padding-bottom: 2px;
`;
const InnerView = styled.View`
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

class tinyCommonModal extends React.Component {
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
 
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
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
    return (
      <View >
        <Modal
          transparent={false}
          title='Notify User about sample request update'
          visible={this.props.modalVisible}
        // close={() => {);
        // }}
        >
          <ModalView>
            <InnerView>
              <ModalHeader>
                <ModalTitle>{this.props.title}</ModalTitle>
                {/* <CloseBox>
                  <TouchableHighlight
                    underlayColor="rgba(221, 221, 221, 0.4)"
                    onPress={() => console.log('close button press')}
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
                </CloseBox> */}
              </ModalHeader>
              <Body>
                {
                  this.props.children
                }
                <ApplyBar>
                  <CancelButton>
                    <TouchableCancel
                      underlayColor="#8f8c86"
                      onPress={() => { this.closeModal(this.props.close) }}>
                      <ButtonText>{this.props.cancelButtonText ? this.props.cancelButtonText : 'cancel'} </ButtonText>
                    </TouchableCancel>
                  </CancelButton>
                  <ApplyButton>
                    <TouchableApply underlayColor="#354733" onPress={() => this.props.okClick()}>
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

export default tinyCommonModal;