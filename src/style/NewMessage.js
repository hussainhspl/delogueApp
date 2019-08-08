import React, {Fragment} from 'react';
import {Text, View, TextInput } from 'react-native';
import { Button, Icon, CheckBox, Item, Picker } from 'native-base';
import styled from 'styled-components/native';

const NewButton = styled(View)`
	background-color: #849D7A; 
	margin-left: 15;
	width: 150;
	margin-left: auto;
	margin-right: 20;
	padding: 0;
	flex-direction: row;
	align-items: center;
`;
const IconView = styled.View`
	width: 30;
	background-color: #354733;
	justify-content: center;
	align-items: center;
`;
const ButtonText = styled.Text`
	color: white;
	text-transform: uppercase;
	width: 120;
	text-align: center;
`;

const MessageBlock = styled.View`
	border: 1px solid #849d7a;
	border-radius: 5px;
	padding: 15px;
	margin: 15px;
`;

const SubjectInput = styled(TextInput)`
	border: 1px solid #ddd;
	padding: 5px 10px;
	height: 30px;
	margin-top: 5px;
	margin-bottom: 10px;
`;
const Row = styled.View`
	align-items: center;
	flex-direction: row;
	margin-bottom: 15
`;

const CheckBoxText = styled.Text`
	padding-left : 20;
`;
const Label = styled.Text`
	color: #8C8076;
`;
const StyledView = styled.View`
	border: 1px solid #ddd;
	height: 30px;
	margin-top: 5px;
	margin-bottom: 30px;
`;
const StyledPicker = styled(Picker)`
	height: 30
`;

const NotifySelector = styled.View`
	border: 1px solid #ddd;
	border-radius: 4;
	align-self: flex-start;
	padding: 10px;
	margin-right: 30px;
`;

const CancelNotify = styled.View`
	width: 20;
	height: 20;
	justify-content: center;
	align-items: center;
	position: absolute;
	right: -10px;
	top: -10px;
	background-color: #ddd;
	border-radius: 15px;
`;

const TextArea = styled.TextInput`
	border: 1px solid #ddd;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 10px;
`;

const ButtonRow = styled.View`
	flex-direction: row;
	justify-Content: space-between;
	margin-top: 20;
	align-items: center;
`;

const CameraView = styled.View`
	width: 40;
	height: 40;
	justify-content: center;
	align-items: center;
	background-color: #849d7a;
`;

const FooterButtonText = styled.Text`
	color: white;
	text-transform : uppercase;
	padding: 5px;
`;

// const CommentBlock = styled.View`

// `;
class NewMessage extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			subject: '',
			selected2: 'undefined',
			textArea: '',
		};
	}

	onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }
	render() {
		return(
			<View>
				<NewButton small>
					<IconView>
						<Icon style={{ color: '#fff'}} name="ios-add" />
					</IconView>
					<ButtonText>new message</ButtonText>
				</NewButton>
				<MessageBlock>
					<Label> subject </Label>
					<SubjectInput
						onChangeText={(subject) => this.setState({subject})}
						value={this.state.subject}   
					/>
					<Row>
						<CheckBox color="#aaa" checked={true} />
						<CheckBoxText> Only internal 	</CheckBoxText>
					</Row>
					<Label> Notify </Label>
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
							<Picker.Item label="Wallet" value="key0" />
							<Picker.Item label="ATM Card" value="key1" />
							<Picker.Item label="Debit Card" value="key2" />
							<Picker.Item label="Credit Card" value="key3" />
							<Picker.Item label="Net Banking" value="key4" />
						</StyledPicker>
					</StyledView>
					<Row>
						<NotifySelector>
							<CancelNotify>
								<Icon style={{fontSize: 15}} name="close" />
							</CancelNotify>
							<Text> hussain</Text>
						</NotifySelector>
						<NotifySelector>
							<CancelNotify>
								<Icon style={{fontSize: 15}} name="close" />
							</CancelNotify>
							<Text> hussain</Text>
						</NotifySelector>
					</Row>
					<TextArea
						multiline={true}
						numberOfLines={4}
						onChangeText={(textArea) => this.setState({textArea})}
						value={this.state.textArea}
						placeholder="type your message"
						textAlignVertical= 'top'
					/>
					<ButtonRow>
						<CameraView>
							<Icon style={{color: 'white', fontSize: 20}} name="camera" />
						</CameraView>
						<Row>
							<Button bordered light small style={{backgroundColor: '#C2BEB6'}}>
								<FooterButtonText>cancel</FooterButtonText> 
							</Button>
							<Button small style={{backgroundColor:"#849D7A", marginLeft: 15}} >
								<FooterButtonText>apply</FooterButtonText>
							</Button>
						</Row>
					</ButtonRow>
				</MessageBlock>
			</View>
		)
	}
}   
export default NewMessage;