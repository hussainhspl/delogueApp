import React, { Fragment } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableHighlight,
  AppState
} from "react-native";
import styled from "styled-components";
import { Icon, Button } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import StyleTemplate from "./StyleTemplate";
import SampleRequestSummary from "./SampleRequestSummary";
import ViewRequestedQuantity from "./ViewRequestedQuantity";
import CommonModal from "../shared/CommonModal";
import Header from "../Header";
import ApplyButton from "../styles/ApplyButton";
import ItemDetail from "../shared/ItemDetail";
import SmallText from '../styles/SmallText';
import CardText from '../styles/CardText';

// import console = require('console');

const data = {
  styleNo: "sty2211",
  styleName: "Casual Shirt",
  supplier: "head textiles",
  season: "summer"
};
const sizeXl = [
  {
    id: 11,
    description: "Shoulder",
    req: 22,
    comp: 23,
    want: 75
  },
  {
    id: 22,
    description: "Shoulder",
    req: 22,
    comp: 23,
    want: 75
  },
  {
    id: 33,
    description: "Shoulder",
    req: 22,
    comp: 23,
    want: 75
  },
  {
    id: 44,
    description: "Shoulder",
    req: 22,
    comp: 23,
    want: 75
  }
];
const colCount = [key= 1, key= 2, key= 3, key= 4];
// const table= [
//   r1, {
//     description: "Shoulder",
//     req: 22,
//     comp: 23,
//     want: 75
//   }
// ]

const desc= ['Req', 'Comp', 'Want'];

const Label = styled.Text`
  color: #8d8177;
  font-weight: 600;
  text-transform: uppercase;
  width: 140px;
  text-align: right;
  padding-right: 10px;
  font-family: ${props => props.theme.regular};
`;
const ViewChart = styled.Text`
  background-color: #849d7a;
  align-self: flex-start;
  text-transform: uppercase;
  color: white;
  text-align: center;
  padding: 3px 6px;
  font-family: ${props => props.theme.regular};
`;
const SizeText = styled.Text`
  color: #8d8177;
  font-family: ${props => props.theme.regular};
`;
const HeaderRow = styled(Row)`
  background-color: #c9c2bb;
  height: 40px;
`;
const StyleCol = styled(Col)`
  border: 1px solid #bbb;
  padding-left: 10px;
  height: 40px;
  justify-content: center;
`;

const TableTextInput = styled.TextInput`
  border: 1px solid #ddd;
  text-align: center;
  padding: 5px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const ApplyButtonText = styled.Text`
  color: #fff;
  text-transform: uppercase;
  padding: 0px 5px;
  font-family: ${props => props.theme.regular};
`;
const CancelButtonText = styled.Text`
  font-family: ${props => props.theme.regular};
`;

const FooterButton = styled.View`
  padding: 15px;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  height: 50px;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  border: 1px solid #efefef;
	background-color: #fff;
`;

const MainView = styled.View`
	padding-bottom: 60px;
`;
const SampleName = styled.Text`
  color: ${props => props.theme.darkBlue};
  font-weight: 700;
  padding-bottom: 5px;
`;

const FirstRow = styled.View`
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  /* background-color: #f00; */
`;

const Pieces = styled.View`
  background-color: #c2beb6;
  padding: 5px 10px;
  /* margin: 7px; */
  align-self: flex-start;
`;
const PiecesText = styled.Text`
  height: 20px;
  color: white;
  font-size: 13px;
  font-family: ${props => props.theme.regular};
`;
const DetailRow = styled.View`
  flex-direction: row;
`;
const Block = styled.View`
  width: 100px;
`;
const CurrentStage = styled.View`
  background-color: ${props => props.theme.brown};
  padding: 30px 0px;
`;
class SampleRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      modalVisible: false,
      xlcomp: '',
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  redirectTo() {
    console.log("redirect click");
    this.props.apply();
  }
  componentDidMount = () => {
    AppState.addEventListener("change", this._handleAppStateChange);
  };
  componentWillUnmount = () => {
    AppState.removeEventListener("change", this._handleAppStateChange);
  };
  _handleAppStateChange = nextAppState => {
    if (nextAppState === "background") {
      this.setState({ modalVisible: false }, () =>
        console.log(this.state.modalVisible)
      );
    }
  };
  render() {
    // console.log("history sr", this.props.history);
    
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={true}
        >
          <MainView>
            <ItemDetail data={data} />
              <FirstRow>
                <View style={{ flex: 1}}>
                  <SampleName numberOfLine={1}>photo sample</SampleName>
                  <DetailRow>
                    <Block>
                      <SmallText>Deadline</SmallText>
                      <CardText numberOfLines={1}> 31-Oct-2019</CardText>
                    </Block>
                    <Block>
                      <SmallText>ETD</SmallText>
                      <CardText numberOfLines={1}>Add</CardText>
                    </Block>
                    <Block>
                      <SmallText>Tracking #</SmallText>
                      <CardText numberOfLines={1}>13-oct-2019</CardText>
                    </Block>
                  </DetailRow>
                </View>
                <Pieces> 
                  <PiecesText>2 pcs</PiecesText>
                </Pieces>
              </FirstRow>
              <CurrentStage>
                <Text>hello</Text>
              </CurrentStage>
            <View style={{ flexDirection: "row", padding: 10 }}>
              <Label> measurement </Label>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                  // this.setState({modalVisible: true})
                }}
              >
                <ViewChart>view chart</ViewChart>
              </TouchableHighlight>

              <CommonModal
                title="Measurement Chart"
                modalVisible={this.state.modalVisible}
                close={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <View>
                  <Grid>
                    <View
                      style={{ flexDirection: "row", padding: 5, height: 30 }}
                    >
                      <SizeText> Size: </SizeText>
                      <Text> XL </Text>
                    </View>
                    <HeaderRow>
                      <StyleCol size={2}>
                        <Text> description </Text>
                      </StyleCol>
                      {
                        desc.map( data => {
                          return(
                            <StyleCol size={1}>
                              <Text> {data} </Text>
                            </StyleCol>
                          )
                        })
                      }
                    </HeaderRow>
                    {sizeXl.map(data => {
                      return (
                        <Row
                          style={{ height: 40 }}
                          key={Math.random().toFixed(3)}
                        >
                          <StyleCol size={2}>
                            <Text>{data.description}</Text>
                          </StyleCol>
                          {/* {
                            colCount.map(data => {
                              return(
                                <StyleCol size={1}>
                                  <TableTextInput
                                    onChangeText={req => this.setState({ req })}
                                    value={this.state.req}
                                    name="req" 
                                  >
                                    {data.req}
                                  </TableTextInput>
                                </StyleCol>
                              )
                            })

                          } */}
                          
                          
                        </Row>
                      );
                    })}

                    <View
                      style={{
                        flexDirection: "row",
                        padding: 5,
                        height: 30,
                        marginTop: 20
                      }}
                    >
                      <SizeText> Size: </SizeText>
                      <Text> Large </Text>
                    </View>

                    <HeaderRow>
                      <StyleCol size={2}>
                        <Text> description </Text>
                      </StyleCol>
                      <StyleCol size={1}>
                        <Text> Req </Text>
                      </StyleCol>
                      <StyleCol size={1}>
                        <Text> Comp </Text>
                      </StyleCol>
                      <StyleCol size={1}>
                        <Text> Want </Text>
                      </StyleCol>
                    </HeaderRow>
                    {/* {sizeXl.map(data => {
                      return (
                        <Row
                          style={{ height: 40 }}
                          key={Math.random().toFixed(3)}
                        >
                          <StyleCol size={2}>
                            <Text>{data.description}</Text>
                          </StyleCol>
                          <StyleCol size={1}>
                            <TableTextInput>{data.req}</TableTextInput>
                          </StyleCol>
                          <StyleCol size={1}>
                            <TableTextInput>{data.comp}</TableTextInput>
                          </StyleCol>
                          <StyleCol size={1}>
                            <TableTextInput>{data.want}</TableTextInput>
                          </StyleCol>
                        </Row>
                      );
                    })} */}
                  </Grid>
                </View>
              </CommonModal>
            </View>
            <StyleTemplate />
            <SampleRequestSummary />
            <ViewRequestedQuantity />
          </MainView>
        </KeyboardAwareScrollView>
        <FooterButton>
          <Button bordered light small danger>
            <CancelButtonText style={{ color: "#d9534e" }}>
              {" "}
              CANCEL{" "}
            </CancelButtonText>
          </Button>
          <ApplyButton
            onPress={() => {
              this.redirectTo(this.props.apply);
            }}
          >
            <ApplyButtonText>apply</ApplyButtonText>
          </ApplyButton>
        </FooterButton>
      </View>
    );
  }
}
export default SampleRequest;
