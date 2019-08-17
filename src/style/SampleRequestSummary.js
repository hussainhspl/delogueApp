import React from 'react';
import {View, Text } from 'react-native';
import {Icon, Picker} from 'native-base';
import styled from 'styled-components';

const SummaryBox = styled.View`
	border-top-width: 1px;
	border-color: #aaa;
	margin: 0px 15px;
	padding: 15px;
`;
const Row = styled.View`
	flex-direction: row;
	flex: 1;
	/* align-items: center; */
	margin-bottom: 10px;
	align-items: ${(props) => props.boolVar ? "flex-start" : "center"};
`;

const SummaryTitle = styled.Text`
	font-weight: 600;
	color: #9B9B9B;
	text-transform: uppercase;
	padding-right: 10px;
	width: 130px;
	text-align: right;
	padding-top: 5px;
`;
//drop down
const StyledView = styled.View`
	border: 1px solid #ddd;
	height: 30px;
	margin-top: 5px;
	flex: 1;
`;
const StyledPicker = styled(Picker)`
	height: 30px;
	flex: 1;
`;
class SampleRequestSummary extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			selected2: 'undefined',
			boolVar: true,
		}
	}
	onValueChange2(value: string) {
		this.setState({
			selected2: value,
			note
		});
	}
	render() {
		return(
			<SummaryBox>
						<Row>
							<SummaryTitle> sample status </SummaryTitle>
							<StyledView>
								<StyledPicker
									mode="dropdown"
									iosIcon={<Icon name="arrow-down" />}
									style={{ width: undefined }}
									placeholder="Select your SIM"
									placeholderStyle={{ color: "#bfc6ea" }}
									placeholderIconColor="#007aff"
									selectedValue={this.state.selected2}
									onValueChange={this.onValueChange2.bind(this)}
								>
									<Picker.Item label="Sent" value="key0" />
									<Picker.Item label="ATM Card" value="key1" />
									<Picker.Item label="Debit Card" value="key2" />
									<Picker.Item label="Credit Card" value="key3" />
									<Picker.Item label="Net Banking" value="key4" />
								</StyledPicker>
							</StyledView>
						</Row>
						<Row>
							<SummaryTitle> sample type </SummaryTitle>
							<Text> photo sample</Text>
						</Row>
						<Row>
							<SummaryTitle> Milestone </SummaryTitle>
						</Row>
						<Row>
							<SummaryTitle> deadline </SummaryTitle>
						</Row>
						<Row>
							<SummaryTitle> etd </SummaryTitle>
						</Row>
						<Row>
							<SummaryTitle> tracking </SummaryTitle>
						</Row>
						<Row boolVar={true}>
							<SummaryTitle> note </SummaryTitle>
							<View style={{flex: 1}}>
								<Text>
									In id non ad exercitation laboris magna consectetur amet aliquip id do.
								</Text>
							</View>
						</Row>
					</SummaryBox>
		)
	}
}

export default SampleRequestSummary;