import React from "react";
import { View, Text, TouchableHighlight, Modal, Alert, SafeAreaView, BackHandler} from "react-native";
import styled from 'styled-components';
import {Icon, Button} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ApplyButton from '../styles/ApplyButton';
import TouchableApply from '../styles/TouchableApply';
import CancelButton from '../styles/CancelButton';
import TouchableCancel from '../styles/ToucaableCancel';
import ButtonText from '../styles/ButtonText';

import theme from "../../data/theme";
import ModalHeader from "../styles/ModalHeader";
import ModalTitle from '../styles/ModalTitle';
// import console = require("console");

const CloseBox = styled.View`
	margin-left: auto;
	padding: 10px;
	justify-content: center;
	align-items: center;
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

const CancelText = styled.Text`
	color: ${props => props.theme.redColor};
	font-family: ${props => props.theme.regular};
	font-size: ${props => props.theme.large};
`;
class CommonModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: this.props.modalVisible,
		}
	}
	closeModal() {
		this.props.close();
	}

  render() {
		// console.log('hide button', this.props);
		// const bg = this.props.bg;
    return (
			<Modal
				animationType="fade"
				transparent={false}
				visible={this.props.modalVisible}
				style={{flex: 1}}
				onRequestClose={() => {
					// this.props.close÷
					{this.closeModal(this.props.close)}
				}}>
					<SafeAreaView style={{ flex: 1}}>
							<KeyboardAwareScrollView >
							<View style={{flex: 1, marginBottom: 30}}>
								<ModalHeader>
									<ModalTitle>{this.props.title}</ModalTitle>
									<CloseBox>
										<TouchableHighlight
											underlayColor='rgba(221, 221, 221, 0.4)'
											onPress={
												this.props.close
											}>
												<Icon style={{color: '#fff', fontSize: 28, paddingHorizontal: 10}} name="ios-close" />
										</TouchableHighlight>
									</CloseBox>
								</ModalHeader>
							{
								this.props.children
							}
							</View>
						</KeyboardAwareScrollView>
							{
								this.props.hideButton ? null :
									<ApplyBar>
										<CancelButton>
											<TouchableCancel 
												underlayColor="#8f8c86"
												onPress={() => {this.closeModal(this.props.close)}}>
												<ButtonText> CANCEL </ButtonText>
											</TouchableCancel>
										</CancelButton>
										<ApplyButton>
											<TouchableApply underlayColor="#354733" onPress={() => this.props.okClick()}>
												<ButtonText>{this.props.okButtonText ?this.props.okButtonText : 'apply'}</ButtonText>
											</TouchableApply>
										</ApplyButton>
									</ApplyBar>
							}
					</SafeAreaView>	
			</Modal>
		);
  }
}
export default CommonModal;