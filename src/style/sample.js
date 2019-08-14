import React from "react";
import { View, Text, ScrollView, Dimensions, Image } from "react-native";
import styled from "styled-components";
import { Icon } from "native-base";
import SampleComponent from "./sampleComponent";

const StyleDescriptionRow = styled.View`
  padding: 5px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  margin-bottom: 5px;
`;

const ImageBox = styled.View`
  height: 40px;
  width: 40px;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

const Flex = styled.View`
  flex: 1;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 11px;
  padding-right: 5px;
  color: #7b7b7b;
  text-transform: uppercase;
  text-align: right;
  width: ${Dimensions.get("window").width / 5};
  padding-top: 2px;
`;
const SubTitle = styled.Text`
  font-size: 12;
  color: #222;
`;
// button css start
const ButtonRow = styled.View`
  justify-content: center;
  align-items: center;
`;
const CommentedButton = styled(View)`
  background-color: #99afaf;
  margin-left: 15;
  width: 180;
  margin: 15px auto;
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
// button css end
const SampleRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
class Sample extends React.Component {
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <StyleDescriptionRow>
          <ImageBox>
            <Image
              resizeMode={"contain"}
              source={require("../../img/styleblack.png")}
            />
          </ImageBox>
          <Flex>
            <Row>
              <Title numberOfLines={1}>style no</Title>
              <Flex>
                <SubTitle numberOfLines={1}>sty1100</SubTitle>
              </Flex>
              {/* <Text>hello</Text> */}
            </Row>
            <Row>
              <Title numberOfLines={1}>style name</Title>
              <Flex>
                <SubTitle numberOfLines={1}>sty1100uyuyyhkghgjgg</SubTitle>
              </Flex>
            </Row>
          </Flex>

          <Flex>
            <Row>
              <Title numberOfLines={1}>supplier</Title>
              <Flex>
                <SubTitle numberOfLines={1}>sty1100</SubTitle>
              </Flex>
            </Row>
            <Row>
              <Title numberOfLines={1}>season</Title>
              <Flex>
                <SubTitle numberOfLines={1}>sty1100uyuyyhkghgjgg</SubTitle>
              </Flex>
            </Row>
          </Flex>
        </StyleDescriptionRow>
        <ButtonRow>
          <CommentedButton small>
            <IconView>
              <Icon style={{ color: "#fff", fontSize: 15 }} name="undo" />
            </IconView>
            <ButtonText> hide commented </ButtonText>
          </CommentedButton>
        </ButtonRow>
        <SampleRow>
          <SampleComponent />
          <SampleComponent />
          <SampleComponent />

        </SampleRow>
      </ScrollView>
    );
  }
}
export default Sample;
