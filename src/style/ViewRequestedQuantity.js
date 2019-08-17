import React from "react";
import { View, Text, TouchableHighlight, Modal } from "react-native";
import styled from 'styled-components';
import CommonModal from '../shared/CommonModal';
import { Col, Row, Grid } from "react-native-easy-grid";

const sizeXl = [
	{
		description: 'S',
		req: 22,
		comp: 23,
		want: 75
	},
	{
		description: 'M',
		req: 22,
		comp: 23,
		want: 75
	},
	{
		description: 'L',
		req: 22,
		comp: 23,
		want: 75
	},
	{
		description: 'XL',
		req: 22,
		comp: 23,
		want: 75
	},
];

const ViewChart = styled.Text`
	background-color: #849D7A;
	align-self: flex-start;
	text-transform: uppercase;
	color: white;
	text-align: center;
	padding: 3px 6px;
	margin: 15px;
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

class ViewRequestedQuantity extends React.Component {
	state= {modalVisible : false}
	setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render() {
    return (
			<View>
        <TouchableHighlight
					onPress={() => {
						this.setModalVisible(!this.state.modalVisible);
					}}>
						<ViewChart>view requested quantity </ViewChart>
				</TouchableHighlight>
				<CommonModal 
					title='Requested Quantity'
					modalVisible={this.state.modalVisible}
					close={() => {this.setModalVisible(!this.state.modalVisible);
						}}
				>
					<View>
								<Grid>
								<HeaderRow>
									<StyleCol size={1}>
										<Text> Description </Text>
									</StyleCol>
									<StyleCol size={1}>
										<Text> Available </Text>
									</StyleCol>
									<StyleCol size={1}>
										<Text> Red Desert </Text>
									</StyleCol>
									<StyleCol size={1}>
										<Text> Blue Ocean </Text>
									</StyleCol>
								</HeaderRow>
									{
										sizeXl.map(data => {
											return(
												<Row style={{height: 40}}>
													<StyleCol size={1}>
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
    )
  }
}
export default ViewRequestedQuantity;