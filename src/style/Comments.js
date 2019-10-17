import React, {Fragment} from 'react';
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Accordion, Icon } from "native-base";
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
  height: ${Dimensions.get('window').width/ 3};
  width: ${Dimensions.get('window').width/ 3-30};
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
  padding-bottom: 10px;
`;
const Title = styled.Text`
  width: 45%;
  text-align: right;
  color: #9b9b9b;
  text-transform: uppercase;
  font-family: ${ props => props.theme.bold};
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
  font-family: ${ props => props.theme.regular};
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  position: absolute;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  right: 20px;
  bottom: 70px;
`;

const FilterButton = styled.View`
  border: 1px solid #eee;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #849d7a;
  border-radius: 50px;
  z-index: 2;
  margin-top: 10px;
`;

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accordiontab: 2,
      ShowNewMsg: false,
    };
  }
  render() {
    return(
      <Fragment>
      <ScrollView 
        showsVerticalScrollIndicator={false}
      >
        <Row>
          <ImageView>
            <StyleImage
              resizeMode={"contain"}
              source={require('../../assets/img/shirt-static.png')}
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
        {this.state.ShowNewMsg && (
          <NewMessage />
        )}
        <CommentBlock />
      </ScrollView>
        <StyledTouchableOpacity
        activeOpacity={0.7}
        onPress={() => this.setState({ ShowNewMsg: true })}
      >
        <FilterButton>
          <Icon style={{ color: "#fff" }} name="ios-add" />
        </FilterButton>
      </StyledTouchableOpacity>
      </Fragment>
    )
  }
}

export default Comments;