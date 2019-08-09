import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import styled from 'styled-components/native';

const colorArray = [
  '#ffeedd','#fdafda','#77aa22'
]

const ImageView = styled.View`
  height: 200px;
  width: 200px;
  justifyContent: center;
  alignItems: center;
  border: 1px solid #ddd;
  margin : 20px auto;
`;
const StyleImage = styled.Image`
  max-height: 180px;
`;
const ColorBar = styled.View`
  border: 1px solid #ccc;
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-bottom : 10
`;
const ColorBox = styled.View`
  height: 30px;
  width: 30px;
  margin-horizontal: 5px;
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
  font-weight: 600;
  padding-right: 5px;
`;
const SubTitle = styled.Text`
  text-align: left;
  width: 50%;
  color: #4a4a4a;
  padding-left: 5;
  text-transform : capitalize;s
`;

class General extends React.Component {
	render() {
		return(
			<ScrollView 
        showsVerticalScrollIndicator={false}
      >
        <ImageView>
          <StyleImage

            resizeMode={"center"}
            source={require('../../img/shirt-static.png')}

          />
        </ImageView>
        <ColorBar>
          {
            colorArray.map(item => {
              // console.log('color', item);
              return(
                <ColorBox style={{backgroundColor: `${item}`}} />
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

        