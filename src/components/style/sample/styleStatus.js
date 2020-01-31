import React, { Fragment } from 'react';
import {View, Text, TouchableOpacity, Image, Dimensions, TouchableHighlight, 
  StyleSheet, TextInput} from 'react-native';
import styled from 'styled-components';
import CameraComponent from '../../../shared/CameraComponent';
import {Icon, Picker} from 'native-base';
import CameraView from "../../../styles/CameraView";

import { withTheme } from 'styled-components';

const Box = styled.View`
	padding: 15px;
`;
const Label = styled.Text`
	color: #8D8177;
	font-family: ${props => props.theme.regular};
	color: ${props => props.theme.textColor};
	font-size: ${props => props.theme.large};
	text-transform: uppercase;
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

 const CommentText = styled.Text`
 	font-family: ${props => props.theme.regular};
 	color: ${props => props.theme.textColor};
 	font-size: ${props => props.theme.large};
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

 const TextArea = styled.TextInput`
 	border: 1px solid #ddd;
 	justify-content: flex-start;
 	align-items: flex-start;
 	padding: 10px;
 	margin-top: 10px;
 `;

const STextArea = styled(TextArea)`
	font-family: ${props => props.theme.regular};
	color: ${props => props.theme.textColor};
	font-size: ${props => props.theme.large};
`;

class StyleStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extArea: '',
			cameraOn: false,
			selected2: 'undefined',
    }
  }
  render() {
    return (
      <Fragment>
        <Box>
          <Label> Comment By Company </Label>
          <STextArea
            multiline={true}
            numberOfLines={4}
            onChangeText={(textArea) => this.setState({ textArea })}
            value={this.state.textArea}
            placeholder="Enter Comment"
            textAlignVertical='top'
          />
        </Box>
        {
          this.state.cameraOn &&
          <CameraComponent
            close={() => this.setState({ cameraOn: false })}
          />
        }
        <View>
          <AttachImageRow>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <AttachBox>
                <TouchableHighlight onPress={() => this.setState({ modalVisible: true })}
                  underlayColor={this.props.theme.overlayBlue}
                >
                  <AttachmentImage
                    resizeMode={"contain"}
                    source={require("../../../../assets/img/shirt-static.png")}
                  />
                </TouchableHighlight>
                <AttachClose>
                  <Icon style={{ fontSize: 15 }} name="close" />
                </AttachClose>
              </AttachBox>
              <AttachBox>
                <AttachmentImage
                  resizeMode={"contain"}
                  source={require("../../../../assets/img/shirt-static.png")}
                />
                <AttachClose>
                  <Icon style={{ fontSize: 15 }} name="close" />
                </AttachClose>
              </AttachBox>
            </View>
            <TouchableOpacity onPress={() => this.setState({ cameraOn: true })}>
              <CameraView>
                <Icon style={{ color: 'white', fontSize: 20 }} name="camera" />
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
      </Fragment>
    )
  }
}
export default withTheme(StyleStatus);