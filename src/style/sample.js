import React, {Fragment} from "react";
import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Icon } from "native-base";
import SampleComponent from "./sampleComponent";
import NewSampleRequest from './NewSampleRequest';
import SampleRequest from './SampleRequest';
// import console = require("console");
const  sampleArr= [{key: 1}, {key: 2}, {key: 3}]
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
  font-family: ${ props => props.theme.bold};
`;
const SubTitle = styled.Text`
  font-size: 12;
  color: #222;
  font-family: ${ props => props.theme.regular};
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
  font-family: ${ props => props.theme.regular};

`;
// button css end
const SampleRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
class Sample extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      sampleRequest :false,
    }
  }
  saveChanges () {
    // console.log("parent function called", this.state.sampleRequest);
    this.setState({
      sampleRequest: false,
    })
  }
  render() {
    const history = this.props.history;
    // console.log("sample req state ", this.state.sampleRequest);
    // console.log("history on sample page:", history);
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {this.state.sampleRequest == false && (
          <Fragment>
            <StyleDescriptionRow>
              <ImageBox>
                <Image
                  resizeMode={"contain"}
                  source={require("../../assets/img/styleblack.png")}
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
            {
              sampleArr.map( data => {
                return(
                  <TouchableOpacity key={data.key} onPress={() => {
                    this.setState({sampleRequest: true})
                  }}>
                    <SampleComponent />
                  </TouchableOpacity>
                )
              })
            }
          <NewSampleRequest history={this.props.history} />

        </SampleRow >
          </Fragment>
        )}
        {this.state.sampleRequest == true && (
          <Fragment>
            <SampleRequest
              apply={() =>this.saveChanges()}
              history={this.props.history} />
            {/* <Text> hello </Text> */}

          </Fragment>

        )}
      </ScrollView>
    );
  }
}
export default Sample;
