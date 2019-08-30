import React from 'react';
import {View, Text, Dimensions } from 'react-native';
import styled from 'styled-components';
import {Icon} from 'native-base';

const imgArr = [
	{key: 1}, {key: 2}, {key: 3},
]
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
	margin-right: 10;
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
	flex-wrap: wrap;

`;
const  HeaderText = styled.Text`
	color: #9b9b9b;
	line-height: 29px;
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
	border: 1px solid #ddd;
	margin: auto;
	width: ${Dimensions.get('window').width/ 3 -35};
	height: ${Dimensions.get('window').width/ 3 -20 };
`;
const MainBlock = styled.View`
	width: ${Dimensions.get('window').width/ 3 -30};
	height: ${Dimensions.get('window').width/ 3 };
`;
const StyleImage = styled.Image`
		max-height: ${Dimensions.get('window').width/ 3 + 30};
		max-width: ${Dimensions.get('window').width/ 3 - 45};
		margin: auto;
`;

const ImageName = styled.Text`
	text-align: center;
	padding: 10px 0px;
	font-size: 12px;
`;
class CommentBlock extends React.Component {
	render(){
		return (
			<CommentBox>
				<FirstRow>
					<View style={{flex: 1, paddingRight: 2}}>
						<Text numberOfLines={1} > The title of message or comment </Text>
					</View>
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
					<HeaderText> NOTIFIED: Hussain, Siya, Deepakshi </HeaderText>
				</FromRow>
				<FromRow>
				{/* <HeaderText> NOTIFIED: Hussain, Siya, Deepakshi </HeaderText> */}
				</FromRow>
				<MessageBody>
					Laboris consectetur id tempor do nostrud enim laboris exercitation exercitation ad. Deserunt incididunt tempor sit cillum veniam officia eu esse laboris quis aliqua ex cupidatat eu. Ad et tempor proident velit et nulla Lorem. Mollit ut magna aliqua ex mollit aute in Lorem. Voluptate esse ut exercitation deserunt excepteur eu. Id laborum culpa pariatur anim dolor ipsum ullamco exercitation.
				</MessageBody>
				<ImageRow>
					{
						imgArr.map(data => {
							return(
								<MainBlock>
									<ImageView>
										<StyleImage
											resizeMode={"center"}
											source={require('../../img/shirt-static.png')}
										/>
									</ImageView>
									<ImageName numberOfLines={1} > sample.jpg </ImageName>
								</MainBlock>
							)

						})
					}
				</ImageRow>
			</CommentBox>
		)
	}
}
export default CommentBlock;