import React from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const colorArray = [
  '#ffeedd','#fdafda','#77aa22'
]

const ImageView = styled.View`
  width: ${(props) => props.tablet ? Dimensions.get('window').width / 2 : Dimensions.get('window').width -70};
  height: ${(props) => props.tablet ? Dimensions.get('window').width /1.8: Dimensions.get('window').width - 70};
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  margin : 20px auto;
`;
const StyleImage = styled.Image`
  width: ${(props) => props.tablet ? Dimensions.get('window').width /2.1 : Dimensions.get('window').width -120};
  height: ${(props) => props.tablet ? Dimensions.get('window').width / 1.9 : Dimensions.get('window').width - 90};
`;
const ColorBar = styled.View`
  border: 1px solid #ccc;
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-bottom : 10px;
`;
const ColorBox = styled.View`
  height: 30px;
  width: 30px;
  margin: 0px 5px;
`;
const StyleInfo = styled.View`
  flex-direction: row;
  padding: 5px;
`;
const Title = styled.Text`
  width: 50%;
  text-align: right;
  color: #9b9b9b;
  text-transform: uppercase;
  /* font-weight: 600; */
  padding-right: 5px;
  font-family: ${ props => props.theme.bold};
`;
const SubTitle = styled.Text`
  text-align: left;
  width: 50%;
  color: #4a4a4a;
  padding-left: 5;
  text-transform : capitalize;
  font-family: ${ props => props.theme.regular};
`;

class General extends React.Component {
  constructor(props){
    super(props);
    this.state={
       tablet: false,
    }
  }
  componentWillMount() {
    if(Dimensions.get('window').width >568) {
      this.setState({tablet: true},() =>console.log("will mount" , this.state.tablet))
    }
    // console.log("will mount out" , this.state.tablet);
  }
	render() {
		return(
			<ScrollView 
        showsVerticalScrollIndicator={false}
      >
        <ImageView tablet={this.state.tablet}>
          <StyleImage
            tablet={this.state.tablet}
            resizeMode={"center"}
            source={require('../../assets/img/shirt-static.png')}
          />
        </ImageView>
        <ColorBar>
          {
            colorArray.map(item => {
              // console.log('color', item);
              return(
              <ColorBox style={{backgroundColor: `${item}`}} key={Math.random().toFixed(3)} />
              )
            })
          }
        </ColorBar>
        <StyleInfo>
          <Title>brand</Title>
          <SubTitle>demo brand</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>contact person</Title>
          <SubTitle>delogue demo</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>style name</Title>
          <SubTitle>demo cool top</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>style no</Title>
          <SubTitle>1250-demo</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>description</Title>
          <SubTitle>top</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>state</Title>
          <SubTitle>published</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>ready for export</Title>
          <SubTitle>yes</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>supplier</Title>
          <SubTitle>demo supplier</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>primary</Title>
          <SubTitle>yes</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>contact person</Title>
          <SubTitle>demo supplier</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>season</Title>
          <SubTitle>SS20</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>group</Title>
          <SubTitle>spring viscose</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>categories</Title>
          <SubTitle>top</SubTitle>
        </StyleInfo>
      </ScrollView>
		)
	}
}
export default General;

        