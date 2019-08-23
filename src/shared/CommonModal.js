import React from "react";
import { View, Text, TouchableHighlight, Modal, Alert, SafeAreaView} from "react-native";
import styled from 'styled-components';
import {Icon, Button} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import console = require("console");


const ModalTitle = styled.View`
	background-color: #415461;
	flex-direction: row;
	align-items: center;
  
`;
const CloseBox = styled.View`
	margin-left: auto;
	padding: 10px;
	/* background-color: green; */
	justify-content: center;
	align-items: center;
`;
const HeaderText = styled.Text`
	color: white;
	padding: 10px;
	font-size: 16px;
	text-transform : uppercase;
	line-height: 25px;
`;
const ApplyBar = styled.View`
	padding: 15px;
	align-items: center;
	justify-content: flex-end;
	flex-direction: row;
	height: 50px;
	background-color: ${(props) => props.bg ? props.bg : '#F1EFED'};
	/* align-items: ${(props) => props.boolVar ? "flex-start" : "center"}; F1EFED*/
	padding-right: 15px;
`;
const ApplyButtonText = styled.Text`
	color: #fff;
	text-transform: uppercase;
	/* padding: 5px; */
	
	
`;
const ApplyButton = styled(Button)`
	justify-content: center;
	align-items: center;
	padding: 0px 5px;
	margin-left: 15px;
`;
class CommonModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: this.props.modalVisible,
		}
	}
  render() {
		// console.log('hide button', this.props);
		// const bg = this.props.bg;
    return (
			<Modal
				animationType="fade"
				transparent={false}
				visible={this.props.modalVisible}

				onRequestClose={() => {
					this.props.close
				}}>
					<SafeAreaView>
							<KeyboardAwareScrollView>
							<View style={{flex: 1}}>
								<ModalTitle>
									<HeaderText>{this.props.title}</HeaderText>
									<CloseBox>
										<TouchableHighlight
											underlayColor='rgba(221, 221, 221, 0.4)'
											onPress={
												// () => {
												// this.setModalVisible(!this.state.modalVisible);
												// }
												this.props.close
											}>
												<Icon style={{color: '#fff', fontSize: 28, paddingHorizontal: 10}} name="ios-close" />
										</TouchableHighlight>
									</CloseBox>
								</ModalTitle>
							</View>
							{/* <View></View> */}
							{
								this.props.children
							}{
								this.props.hideButton ? null :
									<ApplyBar>
										<Button bordered light small danger 
											// onPress={() => {this.props.closeModal()}}
											>
											<Text style={{color: "#d9534e"}}> CANCEL </Text> 
										</Button>
										<ApplyButton 
											// onPress={this.props.okClick ? this.props.okClick : ''} 
											small style={{backgroundColor:"#849D7A"}}>
											<ApplyButtonText>{this.props.okButton ?this.props.okButton : 'apply'}</ApplyButtonText>
										</ApplyButton>
									</ApplyBar>
							}
						</KeyboardAwareScrollView>
					</SafeAreaView>	
			</Modal>
		);
  }
}
export default CommonModal;