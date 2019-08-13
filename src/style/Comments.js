import React, {Fragment} from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { Accordion } from "native-base";
import styled from 'styled-components/native';
import General from './General';
import NewMessage from './NewMessage';
import CommentBlock from './CommentBlock';

const dataArray = [
  { title: "New Message", content:  <NewMessage/>},
];

// const MessageAccordion = styled.Accordion`
//   background-color: #f00;
// `;

const ImageView = styled.View`
  height: ${Dimensions.get('window').width/ 3 +30};
  width: ${Dimensions.get('window').width/ 3};
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  margin : 20px 0px 20px 20px;
  
`;
const StyleImage = styled.Image`
  max-height: 180px;
  width: ${Dimensions.get('window').width/ 3-20};
`;
const Row = styled.View`
  flex-direction: row;
`;

const ImageDetails = styled.View`
  text-align: center;
  flex: 1;
  align-items: center;
  margin: 20px 10px 20px 10px;
`;
const StyleInfo = styled.View`
  flex-direction: row;
`;
const Title = styled.Text`
  width: 45%;
  text-align: right;
  color: #9b9b9b;
  text-transform: uppercase;
  font-weight: 600;
  padding-right: 5px;
  font-size: 13;
`;
const SubTitle = styled.Text`
  text-align: left;
  width: 55%;
  color: #4a4a4a;
  padding-left: 5;
  text-transform : capitalize;
  font-size: 13;
`;

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accordiontab: 2,
    };
  }
  render() {
    return(
      <ScrollView 
        showsVerticalScrollIndicator={false}
      >
        <Row>
          <ImageView>
            <StyleImage
              resizeMode={"center"}
              source={require('../../img/shirt-static.png')}
            />
          </ImageView>
          <ImageDetails>
            <StyleInfo>
              <Title>brand</Title>
              <SubTitle>demo brand</SubTitle>
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
              <Title>supplier</Title>
              <SubTitle>demo supplier</SubTitle>
            </StyleInfo>
            <StyleInfo>
              <Title>season</Title>
              <SubTitle>SS20</SubTitle>
            </StyleInfo>
          </ImageDetails>
        </Row>
        {/* <NewMessage /> */}
        <CommentBlock />
      </ScrollView>

    )
  }
}

export default Comments;