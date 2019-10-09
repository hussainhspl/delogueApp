import React from "react";
import { View, Text, Dimensions, Image} from "react-native";
import styled from 'styled-components';

const MainBlock = styled.View`
	width: ${props =>
    props.tablet
    ? Dimensions.get('window').width/ 4 -18
    : Dimensions.get('window').width/ 3- 24};
	height: auto;
  justify-content: center;
  align-items: center;
`;
const ImageView = styled.View`
	border: 1px solid #ddd;
	margin: 5px;
	width: ${props =>
    props.tablet
    ? Dimensions.get('window').width/ 4 -34
    : Dimensions.get('window').width/ 3 -34};
	height: ${props =>
    props.tablet
    ? Dimensions.get('window').height/ 4 -60
    : Dimensions.get('window').height/ 3 -60 };
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
    : Dimensions.get('window').height/ 3 - 50};
		margin: auto;
    
`;

class ClassName extends React.Component{
  constructor(props){
    super(props);
    this.state={
      tablet: false
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
    console.log('tablet state :', this.state.tablet);
    return(
      <MainBlock key={Math.random().toFixed(3)} tablet={this.state.tablet}>
        <ImageView tablet={this.state.tablet}>
          <StyleImage
            resizeMode={"contain"}
            source={this.props.imgPath}
            tablet={this.state.tablet}
          />
        </ImageView>
        {this.props.children}
      </MainBlock>
    )
  }
}
export default ClassName;
