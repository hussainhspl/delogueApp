import React from 'react';
import {View, Text, Dimensions } from 'react-native';
import styled from 'styled-components';
import {Icon} from 'native-base';

const CommentBox = styled.View`
	border: 1px solid #ddd;
	padding: 15px;
	margin: 15px;
`;

const FirstRow = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-bottom-color: #ddd;
	border-bottom-width: 1px;
	padding-bottom: 15px;
`;

const NewButton = styled(View)`
	background-color: #99AFAF; 
	margin-left: 15;
	width: 100;
	margin-left: auto;
	margin-right: 20;
	padding: 0;
	flex-direction: row;
	align-items: center;
`;
const IconView = styled.View`
	width: 30;
	height: 30;
	background-color: #415461;
	justify-content: center;
	align-items: center;
`;
const ButtonText = styled.Text`
	color: white;
	text-transform: uppercase;
	width: 70;
	text-align: center;
`;
const FromRow = styled.View`
	flex-direction: row;
	justify-Content: flex-end;
	padding: 10px 5px 0px 10px;

`;
const  HeaderText = styled.Text`
	color: #9b9b9b;
`;
const MessageBody = styled.Text`
	padding: 20px 0px;
	line-height: 20;
`;
const ImageRow = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	margin-bottom: 15px;
`;
const ImageView = styled.View`
	width: ${Dimensions.get('window').width/ 3 -35};
	padding: 10px;
	height: ${Dimensions.get('window').width/ 3 + 50};
	border: 1px solid #ddd;
	margin: 5px;
`;
const StyleImage = styled.Image`
		max-height: ${Dimensions.get('window').width/ 3 + 30};
		max-width: ${Dimensions.get('window').width/ 3 - 60};
`;

const ImageName = styled.Text`
	text-align: center;
	padding: 10px;
`;
class CommentBlock extends React.Component {
	render(){
		return (
			<CommentBox>
				<FirstRow>
					<Text> The title of message or comment </Text>
					<NewButton small>
						<IconView>
							<Icon style={{ color: '#fff', fontSize: 15}} name="undo" />
						</IconView>
						<ButtonText> reply </ButtonText>
					</NewButton>
				</FirstRow>
				<FromRow>
					<HeaderText> From </HeaderText>
					<HeaderText> hussain badri </HeaderText>
					<HeaderText> 21 Sept 2019 </HeaderText>
					<HeaderText> 9.10</HeaderText>
					<HeaderText> NOTIFIED </HeaderText>
				</FromRow>
				<FromRow>
				<HeaderText> NOTIFIED: Hussain, Siya, Deepakshi </HeaderText>
				</FromRow>
				<MessageBody>
					Laboris consectetur id tempor do nostrud enim laboris exercitation exercitation ad. Deserunt incididunt tempor sit cillum veniam officia eu esse laboris quis aliqua ex cupidatat eu. Ad et tempor proident velit et nulla Lorem. Mollit ut magna aliqua ex mollit aute in Lorem. Voluptate esse ut exercitation deserunt excepteur eu. Id laborum culpa pariatur anim dolor ipsum ullamco exercitation.
				</MessageBody>
				<ImageRow>
					<ImageView>
						<StyleImage
							resizeMode={"center"}
							source={require('../../img/shirt-static.png')}
						/>
					</ImageView>
					<ImageView>
						<StyleImage
							resizeMode={"center"}
							source={require('../../img/shirt-static.png')}
						/>
					</ImageView>
					<ImageView>
						<StyleImage
							resizeMode={"center"}
							source={require('../../img/shirt-static.png')}
						/>
						<ImageName> sample.jpg </ImageName>
					</ImageView>
				</ImageRow>
			</CommentBox>
		)
	}
}
export default CommentBlock;