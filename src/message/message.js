import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import styled from 'styled-components';
import { Col, Row, Grid } from "react-native-easy-grid";
import Header from '../Header';
import {Card} from 'native-base';

let messageRow =0;

const messageArr = [
	{
		brandName: 'brand',
		title: '1250 Demo',
		description: 'cool top'
	},
	{
		brandName: 'brand',
		title: '1250 Demo',
		description: 'cool top'
	},
	{
		brandName: 'brand',
		title: '1250 Demo',
		description: 'cool top'
	},
	{
		brandName: 'brand',
		title: '1250 Demo',
		description: 'cool top'
	},
	{
		brandName: 'brand',
		title: '1250 Demo',
		description: 'cool top'
	},
];

const chatArr = [
	{
		brandName: 'brand',
		styleNo: '1250 Demo',
		styleName: 'Loose Sweat',
		sampleType: '1 Proto',
	},
	{
		brandName: 'brand',
		styleNo: '1250 Demo',
		styleName: 'Loose Sweat',
		sampleType: '1 Proto',
	},
	{
		brandName: 'brand',
		styleNo: '1250 Demo',
		styleName: 'Loose Sweat',
		sampleType: '1 Proto'
	},
	{
		brandName: 'brand',
		styleNo: '1250 Demo',
		styleName: 'Loose Sweat',
		sampleType: '1 Proto'
	},
	
];


const IconRow = styled.View`
	flex-direction: row;
	justify-content: center;
	padding: 15px;
`;
const IconBox = styled.TouchableOpacity`
	width: 50px;
	height: 40px;
	justify-content: center;
	align-items: center;
	border:  ${(props) => props.currentView ? `1px solid #818181` : `1px solid #ddd`};
`;

const StyleCol = styled(Col)`
	border: 0.5px solid #aaa;
	padding-left: 6px;
	padding-right: 3px;
	height: 40px;
	justify-content: center;
`;

const StyledText = styled.Text`
  font-family: ${props => props.theme.regular};
	color: #4A4A4A;
`;

const StyledRow = styled(Row)`
	/* background-color: ${ props => props.highlight ? '#F1EFED' : '#fff'}; */
	/* align-items: ${(props) => props.boolVar ? "flex-start" : "center"}; */
	background-color: #f00;
	width: 100%;
	flex-direction: row;
	flex-wrap: wrap;
	flex: 1;
`;
class Message extends React.Component {
	constructor(props) {
		super(props);
		this.state= {
			currentView: 'message',
		}
	}
	render() {
		console.log("comm state",this.state.currentView);
		history =this.props.history;
		return(
			<View style={{flex: 1}}>
				<Header history ={this.props.history}>
			 <ScrollView>
				<IconRow >
					<IconBox currentView={this.state.currentView == 'message' ?  true : false} onPress={() => this.setState({currentView: 'message'})}>
						<Image 
							
							style={{width: 30, height: 20}}
							source={require('../../assets/img/messageblack.png')}
						/>
					</IconBox>
					<IconBox currentView={this.state.currentView == 'chat' ?  true : false} onPress={() => this.setState({currentView: 'chat'})}>
						<Image 
							
							style={{width: 30, height: 25}}
							source={require('../../assets/img/chat.png')}
						/>
					</IconBox>
				</IconRow>
				{
					this.state.currentView === 'message' ? 
							<View style={{flex: 1, marginHorizontal: 10}}>
								<Card>
								<Grid>
									{/* <Row>
										<StyleHeaderCol size={1}> 
											<HeaderText>Brand Name</HeaderText>
										</StyleHeaderCol>
										<StyleHeaderCol size={1}> 
											<HeaderText>Title</HeaderText>
										</StyleHeaderCol>
										<StyleHeaderCol size={1}> 
											<HeaderText>Description</HeaderText>
										</StyleHeaderCol>
									</Row> */}
									{
										messageArr.map(data => {
											messageRow +=1;
											console.log("msg row", messageRow);
											return (
												<Row 
													style={{backgroundColor: messageRow % 2 == 0 ? '#F1EFED' : '#fff'}} 
													// highlight={messageRow % 2 == 0 ? true : false} 
													key={Math.random().toFixed(3)}
												>
													<StyleCol size={1}> 
														<StyledText>{data.brandName}</StyledText>
													</StyleCol>
													<StyleCol size={1}> 
														<StyledText>{data.title}</StyledText>
													</StyleCol>
													<StyleCol size={1}> 
														<StyledText>{data.description}</StyledText>
													</StyleCol>
												</Row>
											)
										})
									}
								</Grid>
								</Card>
							</View>
						:
						<View style={{flex: 1, marginHorizontal:10}}>
							<Card>
								<Grid style={{borderCollapse: 'collapse', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
									{
										chatArr.map(data => {
											messageRow +=1;
											return (
												<Row style={{backgroundColor: messageRow % 2 == 0 ? '#F1EFED' : '#fff'}} key={Math.random().toFixed(3)}>
													<StyleCol size={1}> 
														<StyledText>{data.brandName}</StyledText>
													</StyleCol>
													<StyleCol size={1}> 
														<StyledText>{data.styleNo}</StyledText>
													</StyleCol>
													<StyleCol size={1}> 
														<StyledText>{data.styleName}</StyledText>
													</StyleCol>
													<StyleCol size={1}> 
														<StyledText>{data.sampleType}</StyledText>
													</StyleCol>
												</Row>
											)
										})
									}
								</Grid>
								</Card>
							</View>
				}
				</ScrollView>
			</Header>
			</View>
		)
	}
}

export default Message;