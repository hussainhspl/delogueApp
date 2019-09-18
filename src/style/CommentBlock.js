import React, {Fragment} from 'react';
import {View, Text, Dimensions } from 'react-native';
import styled from 'styled-components';
import {Icon} from 'native-base';
import ImageCard from '../shared/ImageCard';

const imgArr = [
	{key: 1}, {key: 2}, {key: 3}, {key: 4}
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
  font-family: ${ props => props.theme.regular};
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
  font-family: ${ props => props.theme.regular};
`;
const MessageBody = styled.Text`
	padding: 20px 0px;
	line-height: 20;
  font-family: ${ props => props.theme.regular};
`;
const ImageRow = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	margin-bottom: 15px;
	/* background-color: #000; */
	padding: 0px 5px;
`;

const ImageName = styled.Text`
	text-align: center;
	padding: 0px 10px 10px 10px ;
	font-size: 12px;
  font-family: ${ props => props.theme.regular};
	/* margin-bottom: 20px; */
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
								<Fragment>
									<ImageCard imgPath={require('../../assets/img/shirt-static.png')}>
										<ImageName numberOfLines={1} > sample.jpg </ImageName>
									</ImageCard>
								</Fragment>
							)

						})
					}
				</ImageRow>
			</CommentBox>
		)
	}
}
export default CommentBlock;