import React from 'react';
import {View, Text, ScrollView, Dimensions, Image, 
	TouchableHighlight, Modal, Alert, TextInput, SafeAreaView} from 'react-native';
import styled from 'styled-components';
import {Icon, Button} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import StyleTemplate from './StyleTemplate';
import SampleRequestSummary from './SampleRequestSummary';
import ViewRequestedQuantity from './ViewRequestedQuantity';
import CommonModal from '../shared/CommonModal';
import Header from '../Header';
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
const FooterButton = styled.View`
	padding: 15px;
	align-items: center;
	justify-content: flex-end;
	flex-direction: row;
	height: 50px;
	
`;
class SampleRequest extends React.Component {
	state= {modalVisible : false}
	setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render() {
		return(
			// <Header history={this.props.history}>
				<ScrollView showsVerticalScrollIndicator={false}>
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

								<CommonModal 
									title='Measurement Chart'
									modalVisible={this.state.modalVisible}
									close={() => {this.setModalVisible(!this.state.modalVisible);
										}}
								>
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
													<Row style={{height: 40}} key={Math.random().toFixed(3)}>
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
													<Row style={{height: 40}} key={Math.random().toFixed(3)}>
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
										</Grid>
								</View>
								</CommonModal>
							</View>
					<StyleTemplate />
					<SampleRequestSummary />
					<ViewRequestedQuantity />
					<FooterButton>
						<Button bordered light small danger>
							<Text style={{color: "#d9534e"}}> CANCEL </Text> 
						</Button>
						<Button small style={{backgroundColor:"#849D7A", marginLeft: 15}}>
							<ApplyButtonText>apply</ApplyButtonText>
						</Button>
					</FooterButton>
				</ScrollView>
			// </Header>
		)
	}
}
export default SampleRequest;
