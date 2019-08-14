import React from 'react';
import {View, Text, ScrollView, Dimensions, Image, 
	TouchableHighlight, Modal, Alert, TextInput, SafeAreaView} from 'react-native';
import styled from 'styled-components';
import {Icon, Button} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import StyleTemplate from './StyleTemplate';
const sizeXl = [
	{
		description: 'Shoulder',
		req: 22,
		comp: 23,
		want: 75
	},
	{
		description: 'Shoulder',
		req: 22,
		comp: 23,
		want: 75
	},
	{
		description: 'Shoulder',
		req: 22,
		comp: 23,
		want: 75
	},
	{
		description: 'Shoulder',
		req: 22,
		comp: 23,
		want: 75
	},
];

const StyleDescriptionRow = styled.View`
  padding: 5px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  margin-bottom: 5px;
`;

const ImageBox = styled.View`
  height: 40px;
  width: 40px;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

const Flex = styled.View`
  flex: 1;
`;

const StyleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 11px;
  padding-right: 5px;
  color: #7b7b7b;
  text-transform: uppercase;
  text-align: right;
  width: ${Dimensions.get("window").width / 5};
  padding-top: 2px;
`;
const SubTitle = styled.Text`
  font-size: 12;
  color: #222;
`;

const Label = styled.Text`
	color: #8D8177;
	font-weight: 600;
	text-transform: uppercase;
	width: 140px;
	text-align: right;
	padding-right: 10px;
`;
const ViewChart = styled.Text`
	background-color: #849D7A;
	align-self: flex-start;
	text-transform: uppercase;
	color: white;
	text-align: center;
	padding: 3px 6px;
`;
// modal
const ModalTitle = styled.View`
	background-color: #415461;
	height: 30px;
	flex-direction: row;
	align-items: center;
  
`;
const CloseBox = styled.View`
	margin-left: auto;
	padding: 5px 10px;
`;
const HeaderText = styled.Text`
	color: white;
	padding-left: 10px;
	font-size: 16px;
	text-transform : uppercase;
`;
const SizeText = styled.Text`
	color: #8D8177;
`;
const HeaderRow = styled(Row)`
	background-color: #C9C2BB;
	height: 40px;
`;
const StyleCol = styled(Col)`
	border: 1px solid #bbb;
	padding-left: 10px;
	height: 40px;
	justify-content: center;
`;

const TableTextInput = styled.TextInput`
	border: 1px solid #ddd;
	text-align: center;
	padding: 5px;
	margin-right: 10px;
	margin-top:5px;
	margin-bottom: 5px;
`;

const ApplyButtonText = styled.Text`
	color: #fff;
	text-transform: uppercase;
	padding: 5px;
`;

const ApplyBar = styled.View`
	padding: 15px;
	align-items: center;
	justify-content: flex-end;
	flex-direction: row;
	height: 50px;
	background-color: #F1EFED;
`;

class SampleRequest extends React.Component {
	state= {modalVisible : false}
	setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render() {
		return(
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* <Text>hello</Text> */}
        <StyleDescriptionRow>
          <ImageBox>
            <Image
              resizeMode={"contain"}
              source={require("../../img/styleblack.png")}
            />
          </ImageBox>
          <Flex>
            <StyleRow>
              <Title numberOfLines={1}>style no</Title>
              <Flex>
                <SubTitle numberOfLines={1}>sty1100</SubTitle>
              </Flex>
            </StyleRow>
            <StyleRow>
              <Title numberOfLines={1}>style name</Title>
              <Flex>
                <SubTitle numberOfLines={1}>sty1100uyuyyhkghgjgg</SubTitle>
              </Flex>
            </StyleRow>
          </Flex>
          <Flex>
            <StyleRow>
              <Title numberOfLines={1}>supplier</Title>
              <Flex>
                <SubTitle numberOfLines={1}>sty1100</SubTitle>
              </Flex>
            </StyleRow>
            <StyleRow>
              <Title numberOfLines={1}>season</Title>
              <Flex>
                <SubTitle numberOfLines={1}>sty1100uyuyyhkghgjgg</SubTitle>
              </Flex>
            </StyleRow>
          </Flex>
        </StyleDescriptionRow>
				<View style={{flexDirection: 'row', padding: 10}}>
					<Label> sample type </Label>
					<Text>photo sample</Text>
				</View>
				<View style={{flexDirection: 'row', padding: 10}}>
					<Label> measurement </Label>
					<TouchableHighlight
						onPress={() => {
							this.setModalVisible(!this.state.modalVisible);
							// this.setState({modalVisible: true})
						}}>
							<ViewChart>view chart</ViewChart>
					</TouchableHighlight>
					<Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
						<SafeAreaView>
								<KeyboardAwareScrollView>
            <View style={{flex: 1}}>
							<ModalTitle>
								<HeaderText>Measurement Chart</HeaderText>
								<CloseBox>
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                      <Icon style={{color: '#fff', fontSize: 28}} name="ios-close" />
                  </TouchableHighlight>
                </CloseBox>
							</ModalTitle>
							<View>
								<Grid>
							<View style={{flexDirection: 'row', padding: 5, height:30}}>
								<SizeText> Size: </SizeText>
								<Text> XL </Text>
							</View>
								<HeaderRow>
									<StyleCol size={2}>
										<Text> description </Text>
									</StyleCol>
									<StyleCol size={1}>
										<Text> Req </Text>
									</StyleCol>
									<StyleCol size={1}>
										<Text> Comp </Text>
									</StyleCol>
									<StyleCol size={1}>
										<Text> Want </Text>
									</StyleCol>
								</HeaderRow>
									{
										sizeXl.map(data => {
											return(
												<Row style={{height: 40}}>
													<StyleCol size={2}>
														<Text>{data.description}</Text>
													</StyleCol>
													<StyleCol size={1}>
														<TableTextInput>{data.comp}</TableTextInput>
													</StyleCol>
													<StyleCol size={1}>
														<TableTextInput>{data.comp}</TableTextInput>
													</StyleCol>
													<StyleCol size={1}>
														<TableTextInput>{data.comp}</TableTextInput>
													</StyleCol>
												</Row>																						
											)
										})
									}
							
							<View style={{flexDirection: 'row', padding: 5, height: 30, marginTop: 20}}>
								<SizeText> Size: </SizeText>
								<Text> Large </Text>
							</View>
							
								<HeaderRow>
									<StyleCol size={2}>
										<Text> description </Text>
									</StyleCol>
									<StyleCol size={1}>
										<Text> Req </Text>
									</StyleCol>
									<StyleCol size={1}>
										<Text> Comp </Text>
									</StyleCol>
									<StyleCol size={1}>
										<Text> Want </Text>
									</StyleCol>
								</HeaderRow>
									{
										sizeXl.map(data => {
											return(
												<Row style={{height: 40}}>
													<StyleCol size={2}>
														<Text>{data.description}</Text>
													</StyleCol>
													<StyleCol size={1}>
														<TableTextInput>{data.comp}</TableTextInput>
													</StyleCol>
													<StyleCol size={1}>
														<TableTextInput>{data.comp}</TableTextInput>
													</StyleCol>
													<StyleCol size={1}>
														<TableTextInput>{data.comp}</TableTextInput>
													</StyleCol>
												</Row>																						
											)
										})
									}
									<ApplyBar>
										<Button bordered light small danger>
											<Text style={{color: "#d9534e"}}> CANCEL </Text> 
										</Button>
										<Button small style={{backgroundColor:"#849D7A", marginLeft: 15}}>
											<ApplyButtonText>apply</ApplyButtonText>
										</Button>
									</ApplyBar>
									</Grid>
							</View>
						</View>
									</KeyboardAwareScrollView>
						</SafeAreaView>
					</Modal>
				</View>
				<StyleTemplate />
				
			</ScrollView >
		)
	}
}
export default SampleRequest;
