import React from "react";
import { View, Text, Dimensions, Image, TouchableHighlight} from "react-native";
import styled from 'styled-components';
import { withTheme } from 'styled-components';
import AttachmentPopup from '../shared/AttachmentPopup';

const MainBlock = styled.View`
	width: ${props =>
    props.tablet
    ? Dimensions.get('window').width/ 4 -18
    : Dimensions.get('window').width/ 3- 24};
	height: auto;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;
const ImageView = styled.View`
	border: 1px solid #ddd;
	
	width: ${props =>
    props.tablet
    ? Dimensions.get('window').width/ 4 -34
    : Dimensions.get('window').width/ 3 -34};
	height: ${props =>
    props.tablet
    ? Dimensions.get('window').height/ 4 -60
    : Dimensions.get('window').height/ 3 -50 };
    padding: 3px;
    align-items: center;
`;

const StyleImage = styled.Image`
	  width : ${props =>
    props.tablet
    ? Dimensions.get('window').width/ 4 -50
    : Dimensions.get('window').width/ 3 - 44};
		height: ${props =>
    props.tablet
    ? Dimensions.get('window').height / 4 -50
    : Dimensions.get('window').height/ 3 - 60};
		margin: auto;
    
`;


const ImageName = styled.Text`
  text-align: center;
  padding: 0px 10px 10px 10px;
  font-size: ${props => props.theme.small};
  font-family: ${props => props.theme.regular};
  /* margin-bottom: 20px; */
`;

class ImageCard extends React.Component{
  constructor(props){
    super(props);
    this.state={
      tablet: false,
      modalVisible: false,      
    }
  }
  //require('../../assets/img/shirt-static.png')

  componentDidMount = () => {
    if (Dimensions.get("window").width > 568) {
      this.setState({ tablet: true }, () =>
        console.log("tablet search", this.state.tablet)
      );
    }
  }
  render() {
    console.log('image card props :', this.props);
    return(
      <MainBlock key={Math.random().toFixed(3)} tablet={this.state.tablet}>
        <TouchableHighlight underlayColor={this.props.theme.overlayBlue} onPress={() => this.setState({modalVisible: true})}>
        <ImageView tablet={this.state.tablet}>
          <StyleImage
            resizeMode={"contain"}
            source={this.props.imgPath}
            tablet={this.state.tablet}
          />
        </ImageView>
        </TouchableHighlight>
        <ImageName numberOfLines={1}> {this.props.fileName} </ImageName>
      
          <AttachmentPopup
            title={this.props.msgTitle}
            path = {this.props.bigImgUrl}
            modalVisible={this.state.modalVisible}
            Name={this.props.fileName}
            Date={""}
            fileSrc = {this.props.bigImgUrl
            }
            close={() => this.setState({modalVisible: false})} 
          /> 
      </MainBlock>
    )
  }
}
export default withTheme(ImageCard);
