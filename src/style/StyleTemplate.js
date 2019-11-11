import React from 'react';
import {View, Text, TouchableOpacity, Image, Dimensions, TouchableHighlight} from 'react-native';
import styled from "styled-components";
import {Icon, Picker} from 'native-base';
import CameraComponent from '../shared/CameraComponent';
import { withTheme } from 'styled-components';


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
	font-family: ${props => props.theme.regular};
	color: ${props => props.theme.textColor};
	font-size: ${props => props.theme.large}
	text-transform: uppercase;
`;
const StyleFileTitle = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: ${props => props.theme.lightBrown};
	/* border: 1px solid #DCD7D4; */
	padding: 10px ;
	margin-bottom: 5px;
`;
const Capital = styled.Text`
	text-transform: uppercase;
	font-family: ${props => props.theme.regular};
	color: ${props => props.theme.textColor};
	font-size: ${props => props.theme.large};
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
	border-top-width: 0px;
  border-left-width: 0px;
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

const AttachImageRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
	margin-bottom: 10px;
	padding: 0px 15px;
`;

const AttachBox = styled.View`
  width: 80px;
  height: 90px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 20px;
  margin-top: 20px;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const AttachmentImage = styled.Image`
  width: 70px;
  height: 80px;
  margin: 5px;
`;
const AttachClose = styled.View`
  width: 15px;
  height: 15px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -7px;
  top: -7px;
  background-color: #ddd;
  border-radius: 10px;
`;
const IconBox = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid #bbb;
  position: absolute;
  top: 10;
  left: -15;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const Flex = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const LessText = styled.Text`
	font-family: ${props => props.theme.regular};
	color: ${props => props.theme.textColor};
	font-size: ${props => props.theme.large};
`;

const CommentText = styled.Text`
	font-family: ${props => props.theme.regular};
	color: ${props => props.theme.textColor};
	font-size: ${props => props.theme.large};
`;

const STextArea = styled(TextArea)`
	font-family: ${props => props.theme.regular};
	color: ${props => props.theme.textColor};
	font-size: ${props => props.theme.large};
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
				{/* <ButtonRow>
          <CommentedButton small>
            <IconView>
              <Icon style={{ color: "#fff", fontSize: 15 }} name="tablet-portrait" />
            </IconView>
            <ButtonText> use template </ButtonText>
          </CommentedButton>
        </ButtonRow> */}
				<StyleFileTitle>
					<Capital> style files </Capital>
					<Flex>
						<Icon style={{ color: "#555", fontSize: 15, marginRight: 10 }} name="remove" />
						<LessText>show less</LessText>
					</Flex>
				</StyleFileTitle>
				<Box>
					<Label> Comment By Company </Label>
					<STextArea
						multiline={true}
						numberOfLines={4}
						onChangeText={(textArea) => this.setState({textArea})}
						value={this.state.textArea}
						placeholder="Enter Comment"
						textAlignVertical= 'top'
					/>
				</Box>	
				{
					this.state.cameraOn &&
					<CameraComponent
						close={() => this.setState({cameraOn: false})}
					 />
				}
				<View>
					<AttachImageRow>
						<View style={{flexDirection: 'row', flex: 1}}>
						<AttachBox>
							<TouchableHighlight onPress={() => this.setState({modalVisible: true})}
								underlayColor={this.props.theme.overlayBlue}
							>
								<AttachmentImage
									resizeMode={"contain"}
									source={require("../../assets/img/shirt-static.png")}
								/>
							</TouchableHighlight>
							<AttachClose>
								<Icon style={{ fontSize: 15 }} name="close" />
							</AttachClose>
						</AttachBox>
						<AttachBox>
							<AttachmentImage
								resizeMode={"contain"}
								source={require("../../assets/img/shirt-static.png")}
							/>
							<AttachClose>
								<Icon style={{ fontSize: 15 }} name="close" />
							</AttachClose>
						</AttachBox>
						</View>
						<TouchableOpacity onPress={() => this.setState({cameraOn: true})}>
							<CameraView>
								<Icon style={{color: 'white', fontSize: 20}} name="camera" />
							</CameraView>
						</TouchableOpacity>
					</AttachImageRow>
					<Label> Comment by supplier </Label>
					<CommentBox>
						<CommentText>
						Dolor deserunt nulla elit consequat commodo ex consectetur consectetur officia do in consequat laborum. Est occaecat aliqua est quis officia ad labore ex anim. Officia officia eiusmod culpa ex pariatur reprehenderit irure minim laborum nisi tempor excepteur ipsum. Deserunt deserunt sit anim ad esse voluptate quis id ex aliqua. Fugiat excepteur irure ea excepteur reprehenderit.
						</CommentText>
					</CommentBox>
        </View>
				<StyleFileTitle>
					<Capital> Design </Capital>
					<Flex>
						<Icon style={{ color: "#555", fontSize: 15, marginRight: 10 }} name="add" />
						<Text>show more</Text>
					</Flex>
				</StyleFileTitle>
				<StyleFileTitle>
					<Capital> Finish </Capital>
					<Flex>
						<Icon style={{ color: "#555", fontSize: 15, marginRight: 10 }} name="add" />
						<Text>show more</Text>
					</Flex>
				</StyleFileTitle>
				<StyleFileTitle>
					<Capital> Item Placement </Capital>
					<Flex>
						<Icon style={{ color: "#555", fontSize: 15, marginRight: 10 }} name="add" />
						<Text>show more</Text>
					</Flex>
				</StyleFileTitle>
				<StyleFileTitle>
					<Capital> Custom Comment Files </Capital>
					<Flex>
						<Icon style={{ color: "#555", fontSize: 15, marginRight: 10 }} name="add" />
						<Text>show more</Text>
					</Flex>
				</StyleFileTitle>
				<StyleFileTitle>
					<Capital> style files </Capital>
					<Flex>
						<Icon style={{ color: "#555", fontSize: 15, marginRight: 10 }} name="add" />
						<Text>show more</Text>
					</Flex>
				</StyleFileTitle>
				<StyleFileTitle>
					<Capital> Sample Status </Capital>
					<Flex>
						<Icon style={{ color: "#555", fontSize: 15, marginRight: 10 }} name="add" />
						<Text>show more</Text>
					</Flex>
				</StyleFileTitle>
			</View>
		)
	}
}
export default withTheme(StyleTemplate);
