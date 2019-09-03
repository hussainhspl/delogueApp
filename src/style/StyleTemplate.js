import React from 'react';
import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import styled from "styled-components";
import {Icon, Picker} from 'native-base';
import CameraComponent from '../shared/CameraComponent';

const CardArr = [
	{
		filename: 'file name',
		info: 'info',
		date: 'dd-mm-yyyy',
	},
	{
		filename: 'file name',
		info: 'info',
		date: 'dd-mm-yyyy'
	},
	{
		filename: 'file name',
		info: 'info',
		date: 'dd-mm-yyyy'
	},
];

//button css
const ButtonRow = styled.View`
  
`;
const CommentedButton = styled(View)`
  background-color: #99afaf;
  margin-left: 15;
  width: 180;
  margin: 15px;
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
  width: 150;
  text-align: center;
`;
//button css end
const TextArea = styled.TextInput`
	border: 1px solid #ddd;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 10px;
	margin-top: 10px;
`;
const Box = styled.View`
	padding: 15px;
`;
const Label = styled.Text`
	color: #8D8177;
	font-weight: 600;
	text-transform: uppercase;
`;
const StyleFileTitle = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: #F1EFED;
	border: 1px solid #DCD7D4;
`;
const Capital = styled.Text`
	text-transform: uppercase;
`;
const CameraView = styled.View`
	width: 40;
	height: 40;
	justify-content: center;
	align-items: center;
	background-color: #849d7a;
`;
const ImageRow = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	margin-bottom: 15px;
`;
const Card = styled.View`
  width: ${Dimensions.get('window').width/ 3};
  height: ${Dimensions.get('window').width/ 3 + 100};
  border: 1px solid #ccc;
  justify-content: space-between;
  align-items: center;
`;
const ImageView = styled.View`
	width: ${Dimensions.get('window').width/ 3 -20};
	height: ${Dimensions.get('window').width/ 3 + 20};
	border: 1px solid #ddd;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
const StyleImage = styled.Image`
		width: ${Dimensions.get('window').width/ 3 -40};
		height: ${Dimensions.get('window').width/ 3};
    
`;
const ImageInfo = styled.View`
	padding: 5px 10px;
`;
const CommentBox = styled.View`
	background-color: #faf2d4;
	margin: 15px;
	padding: 15px;
`;

class StyleTemplate extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			textArea: '',
			cameraOn: false,
			selected2: 'undefined',
		}
	}

	render() {
		return(
			<View>
				<ButtonRow>
          <CommentedButton small>
            <IconView>
              <Icon style={{ color: "#fff", fontSize: 15 }} name="tablet-portrait" />
            </IconView>
            <ButtonText> use template </ButtonText>
          </CommentedButton>
        </ButtonRow>
				
				<Box>
					<Label> Comment </Label>
					<TextArea
						multiline={true}
						numberOfLines={4}
						onChangeText={(textArea) => this.setState({textArea})}
						value={this.state.textArea}
						placeholder="type your message"
						textAlignVertical= 'top'
					/>
				</Box>
				<StyleFileTitle>
					<Capital> style files </Capital>
					<TouchableOpacity onPress={() => this.setState({cameraOn: true})}>
						<CameraView>
							<Icon style={{color: 'white', fontSize: 20}} name="camera" />
						</CameraView>
					</TouchableOpacity>
				</StyleFileTitle>
				{
					this.state.cameraOn &&
					<CameraComponent
						close={() => this.setState({cameraOn: false})}
					 />
				}
				<View>
          <ImageRow>
						{
							CardArr.map(data => {
								return(
									<Card key={Math.random().toFixed(3)}>
										<ImageView>
											<StyleImage
												resizeMode={"center"}
												source={require('../../assets/img/shirt-static.png')}
											/>
										</ImageView>
										<ImageInfo>
											<Text>File Name</Text>
											<Text>ImageInfo</Text>
											<Text>dd-mmm-yyyy</Text>
										</ImageInfo>
									</Card>
								)
							})
						}
          </ImageRow>
					<Label> Comment by supplier </Label>
					<CommentBox>
						<Text>
						Dolor deserunt nulla elit consequat commodo ex consectetur consectetur officia do in consequat laborum. Est occaecat aliqua est quis officia ad labore ex anim. Officia officia eiusmod culpa ex pariatur reprehenderit irure minim laborum nisi tempor excepteur ipsum. Deserunt deserunt sit anim ad esse voluptate quis id ex aliqua. Fugiat excepteur irure ea excepteur reprehenderit.
						</Text>
					</CommentBox>
        </View>
			</View>
		)
	}
}
export default StyleTemplate;
