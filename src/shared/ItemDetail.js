import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import styled from "styled-components";
import Title from "../styles/SmallText";

const ImageBox = styled.View`
  height: 80px;
  width: 80px;
  justify-content: center;
  align-items: center;
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
  /* width: 100%; */
  /* background-color: #ddd; */
`;

const SubTitle = styled.Text`
  font-size: 12px;
  color: #4a4a4a;
  padding-bottom: 10px;
`;

const MainRow = styled.View`
  border-bottom-width: 0.5px;
  border-color: rgba(0, 0, 0, 0.3);
  padding: 5px 5px 10px 5px;
  flex-direction: row;
  align-items: center;
  /* margin-bottom: 5px; */
`;

const StyledView = styled.View`
  width: 50%;
`;

const StyleImage = styled.Image`
  max-width: 80px;
  max-height: 80px;
`;

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let data = this.props.data;
    // console.log("data",data);
    return (
      <MainRow>
        <ImageBox>
          <StyleImage
            resizeMode="contain"
            source={require("../../assets/img/shirt-static.png")}
          />
        </ImageBox>
        <Flex>
          <StyledView>
            <View>
              <Title numberOfLines={1}>style no</Title>
              <SubTitle numberOfLines={1}>{data.styleNo}</SubTitle>
            </View>
            <View>
              <Title>style name</Title>
              <SubTitle numberOfLines={1}>{data.styleName}</SubTitle>
            </View>
          </StyledView>
          <StyledView>
            <View>
              <Title numberOfLines={1}>supplier</Title>
              <SubTitle numberOfLines={1}>{data.supplier}</SubTitle>
            </View>
            <View>
              <Title numberOfLines={1}>season</Title>
              <SubTitle numberOfLines={1}>{data.season}</SubTitle>
            </View>
          </StyledView>
        </Flex>
      </MainRow>
    );
  }
}

export default ItemDetail;
