import React from "react";
import { View, Text, TouchableHighlight, Modal, Alert, SafeAreaView, Dimensions} from "react-native";
import styled from 'styled-components';
import {Icon, Button} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const ModalTitle = styled.View`
	background-color: #415461;
	padding: 10px 0px;
	flex-direction: row;
	align-items: center;
  
`;
const CloseBox = styled.View`
	margin-left: auto;
	padding: 0px 10px;
	justify-content: center;
	align-items: center;
`;
const HeaderText = styled.Text`
	color: white;
	padding-left: 10px;
	font-size: 16px;
	text-transform : uppercase;
	line-height: 25px;
`;
const ApplyBar = styled.View`
	padding: 15px;
	align-items: center;
	justify-content: center;
	background-color: #F1EFED;
	padding-right: 15px;
`;
const SummaryTitle = styled.Text`
	font-weight: 600;
	color: #9B9B9B;
	text-transform: uppercase;
	padding-right: 5px;
	width: 50%;
	text-align: right;
  /* background-color:  #ddd; */
`;
const Info = styled.Text`
  width: 50%;
  /* background-color: red; */
  padding-left: 5px;
`;
const Row = styled.View`
  flex-direction: row;
  padding-bottom: 10px;
`;
const StyleImage = styled.Image`
  max-width: ${Dimensions.get('window').width-30};
  max-height: ${Dimensions.get('window').width-30};
  padding: 10px;
  
`;
const ImageBox = styled.View`
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').width};
  justify-content: center;
  align-items: center;
`;
class StyleModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: this.props.modalVisible,
		}
	}
  render() {
		console.log('hide button', this.props);
    return (
			<Modal
				animationType="fade"
				transparent={false}
				visible={this.props.modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
				}}>
					<SafeAreaView>
							<KeyboardAwareScrollView>
							<View style={{flex: 1}}>
								<ModalTitle>
									<HeaderText>Style File</HeaderText>
									<CloseBox>
										<TouchableHighlight
											onPress={
												this.props.close
											}>
												<Icon style={{color: '#fff', fontSize: 28}} name="ios-close" />
										</TouchableHighlight>
									</CloseBox>
								</ModalTitle>
							</View>
              <ImageBox>
                <StyleImage
                  resizeMode={"contain"}
                  source={require('../../img/shirt-static.png')}
                />
              </ImageBox>
							{
								this.props.hideButton ? null :
									<ApplyBar>
										<Row>
                      <SummaryTitle> Name </SummaryTitle>
                      <Info >babican_feather tee</Info>
                    </Row>
                    <Row>
                      <SummaryTitle> file name </SummaryTitle>
                      <Info>babican_feather tee.png</Info>
                    </Row>
                    <Row>
                      <SummaryTitle> created </SummaryTitle>
                      <Info>18 Aug 2019</Info>
                    </Row>
                    <Row>
                      <SummaryTitle> State </SummaryTitle>
                      <Info>Active</Info>
                    </Row>
                    <Row>
                      <SummaryTitle> File Note </SummaryTitle>
                      <Info>PLaborum voluptate nostrud pariatur deserunt amet est excepteur laborum cillum occaecat voluptate. Irure est aute tempor ex incididunt ea nostrud ullamco consequat </Info>
                    </Row>
                    
									</ApplyBar>
							}
						</KeyboardAwareScrollView>
					</SafeAreaView>	
			</Modal>
		);
  }
}
export default StyleModal;