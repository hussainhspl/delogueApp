import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import styled from "styled-components";
import Title from "../styles/SmallText";
import CardText from '../styles/CardText';

const ImageBox = styled.View`
  height: 80px;
  width: 80px;
  /* justify-content: center;
  align-items: center; */
  margin-right: 20px;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
`;
const Flex = styled.View`
  flex: 1;
  flex-direction: row;
  height: 70px;
`;

const MainRow = styled.View`
  border-bottom-width: 0.5px;
  border-color: rgba(0, 0, 0, 0.3);
  padding: 5px 5px 5px 5px;
  flex-direction: row;
  align-items: center;
  /* margin-bottom: 5px; */
`;

const StyledView = styled.View`
  width: 50%;
  justify-content: space-between;
`;

const StyleImage = styled.Image`
  width: 80px;
  height: 80px;
`;

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let data = this.props.data;
    // console.log("data",data.logo);
    return (
      <MainRow>
        <ImageBox>
          <StyleImage
            resizeMode={"contain"}
            source={{uri: data.logo ? data.logo.url: 
              noImage
            }}
            // source={require("../../assets/img/shirt-static.png")}
          />
        </ImageBox>
        <Flex>
          <StyledView>
            <View>
              <Title numberOfLines={1}>style no</Title>
              <CardText numberOfLines={1}>{data.userDefinedId}</CardText>
            </View>
            <View>
              <Title>style name</Title>
              <CardText numberOfLines={1}>{data.name}</CardText>
            </View>
          </StyledView>
          <StyledView>
            <View>
              <Title numberOfLines={1}>supplier</Title>
              <CardText numberOfLines={1}>{data.supplierName}</CardText>
            </View>
            <View>
              <Title numberOfLines={1}>season</Title>
              <CardText numberOfLines={1}>{data.seasonName}</CardText>
            </View>
          </StyledView>
        </Flex>
      </MainRow>
    );
  }
}

export default ItemDetail;
