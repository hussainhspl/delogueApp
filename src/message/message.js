import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import styled from 'styled-components';
import { Col, Row, Grid } from "react-native-easy-grid";
import Header from '../Header';

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
	border: 1px solid #ddd;
`;

const StyleCol = styled(Col)`
	border: 1px solid #bbb;
	padding-left: 10px;
	height: 40px;
	justify-content: center;
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
					<IconBox onPress={() => this.setState({currentView: 'message'})}>
						<Image 
							
							style={{width: 30, height: 20}}
							source={require('../../img/messageblack.png')}
						/>
					</IconBox>
					<IconBox onPress={() => this.setState({currentView: 'chat'})}>
						<Image 
							
							style={{width: 30, height: 20}}
							source={require('../../img/chat.png')}
						/>
					</IconBox>
				</IconRow>
				{
					this.state.currentView === 'message' ? 
							<View style={{flex: 1}}>
								<Grid style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
									{
										messageArr.map(data => {
											return (
												<Row>
													<StyleCol size={1}> 
														<Text>{data.brandName}</Text>
													</StyleCol>
													<StyleCol size={1}> 
														<Text>{data.title}</Text>
													</StyleCol>
													<StyleCol size={1}> 
														<Text>{data.description}</Text>
													</StyleCol>
												</Row>
											)
										})
									}
								</Grid>
							</View>
						:
						<View style={{flex: 1}}>
								<Grid style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
									{
										chatArr.map(data => {
											return (
												<Row>
													<StyleCol size={1}> 
														<Text>{data.brandName}</Text>
													</StyleCol>
													<StyleCol size={1}> 
														<Text>{data.styleNo}</Text>
													</StyleCol>
													<StyleCol size={1}> 
														<Text>{data.styleName}</Text>
													</StyleCol>
													<StyleCol size={1}> 
														<Text>{data.sampleType}</Text>
													</StyleCol>
												</Row>
											)
										})
									}
								</Grid>
							</View>
				}
				</ScrollView>
			</Header>
			</View>
		)
	}
}

export default Message;