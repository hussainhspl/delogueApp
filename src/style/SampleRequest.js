import React from 'react';
import {View, Text, ScrollView, Dimensions, Image, 
	TouchableHighlight, AppState} from 'react-native';
import styled from 'styled-components';
import {Icon, Button} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import StyleTemplate from './StyleTemplate';
import SampleRequestSummary from './SampleRequestSummary';
import ViewRequestedQuantity from './ViewRequestedQuantity';
import CommonModal from '../shared/CommonModal';
import Header from '../Header';
import ApplyButton from '../styles/ApplyButton';
import ItemDetail from '../shared/ItemDetail';
// import console = require('console');

const data = {
	styleNo: 'sty2211',
	styleName: 'Casual Shirt',
	supplier: 'head textiles',
	season: 'summer'
}
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


const Label = styled.Text`
	color: #8D8177;
	font-weight: 600;
	text-transform: uppercase;
	width: 140px;
	text-align: right;
	padding-right: 10px;
  font-family: ${ props => props.theme.regular};

`;
const ViewChart = styled.Text`
	background-color: #849D7A;
	align-self: flex-start;
	text-transform: uppercase;
	color: white;
	text-align: center;
	padding: 3px 6px;
  font-family: ${ props => props.theme.regular};

`;
const SizeText = styled.Text`
	color: #8D8177;
  font-family: ${ props => props.theme.regular};

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
	padding:0px 5px;
  font-family: ${ props => props.theme.regular};
`;
const CancelButtonText = styled.Text`
  font-family: ${ props => props.theme.regular};
`;

const FooterButton = styled.View`
	padding: 15px;
	align-items: center;
	justify-content: flex-end;
	flex-direction: row;
	height: 50px;
	
`;
class SampleRequest extends React.Component {
	constructor(props) {
    super(props);
    this.state={
      appState: AppState.currentState,
      modalVisible : false
    }
  }
	setModalVisible(visible) {
    this.setState({modalVisible: visible});
	}
	redirectTo() {
		console.log("redirect click");
		this.props.apply();
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
		// console.log("history sr", this.props.history);
		return(
			// <Header history={this.props.history}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<ItemDetail data={data} />
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
							<CancelButtonText style={{color: "#d9534e"}}> CANCEL </CancelButtonText> 
						</Button>
						<ApplyButton
						onPress={() => {this.redirectTo(this.props.apply)}}>
							<ApplyButtonText>apply</ApplyButtonText>
						</ApplyButton>
					</FooterButton>
				</ScrollView>
			// </Header>
		)
	}
}
export default SampleRequest;
