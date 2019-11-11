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
import SmallText from "../styles/SmallText";
import CardText from "../styles/CardText";

import DateTimePicker from "react-native-modal-datetime-picker";
import PiecesPopup from "../shared/PiecesPopup";

// import console = require('console');

const data = {
  styleNo: "sty2211",
  styleName: "Casual Shirt",
  supplier: "head textiles",
  season: "summer"
};
const sizeXl = [
  {
    req: 22,
    comp: 23,
    want: 75
  },
  {
    req: 22,
    comp: 23,
    want: 75
  },
  {
    req: 22,
    comp: 23,
    want: 75
  },
  {
    req: 22,
    comp: 23,
    want: 75
  }
];
const descCol = [
  {
    title: "A) 1/2 Chest measurement from the top"
  },
  {
    title: "A) 1/2 Waist measurement from the top"
  },
  {
    title: "A) 1/2 Bottom measurement from the top"
  },
  {
    title: "Sleeve"
  },
  {
    title: "1/2 Cuff"
  }
];
const colCount = [(key = 1), (key = 2), (key = 3)];
// const table= [
//   r1, {
//     description: "Shoulder",
//     req: 22,
//     comp: 23,
//     want: 75
//   }
// ]

const desc = ["Req", "Comp", "Want"];

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
  /* justify-content: center; */
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
  color: ${props => props.theme.redColor};
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

const Pieces = styled.TouchableHighlight`
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
const Block = styled.TouchableOpacity`
  width: 100px;
`;
const CurrentStage = styled.View`
  background-color: ${props => props.theme.brown};
  padding: 10px 0px;
  align-items: center;
`;
const CurrentStageTitle = styled.Text`
  color: ${props => props.theme.darkBrown};
  font-family: ${props => props.theme.bold};
`;
const TabRow = styled.View`
  flex-direction: row;
  border-bottom-width: 3px;
  border-top-width: 3px;
  border-color: #fff;
`;
const RightTriangle = styled.View`
  width: 0px;
  height: 0px;
  background-color: transparent;
  border-style: solid;
  border-top-width: 10px;
  border-top-color: transparent;
  border-bottom-width: 10px;
  border-bottom-color: transparent;
  border-left-width: 10px;
  border-left-color: ${props =>
    props.active ? props => props.theme.darkBrown : props => props.theme.brown};
  border-right-width: 10px;
  border-right-color: transparent;
  position: absolute;
  right: -20px;
  z-index: 1;
`;
const TabTail = styled.View`
  width: 0px;
  height: 0px;
  background-color: transparent;
  border-style: solid;
  border-top-width: 10px;
  border-top-color: ${props =>
    props.active ? props => props.theme.darkBrown : props => props.theme.brown};
  border-bottom-width: 10px;
  border-bottom-color: ${props =>
    props.active ? props => props.theme.darkBrown : props => props.theme.brown};
  border-left-width: 10px;
  border-left-color: transparent;
  border-right-width: 10px;
  border-right-color: ${props =>
    props.active ? props => props.theme.darkBrown : props => props.theme.brown};
  margin-left: -5px;
  position: absolute;
  left: -15px;
`;
const Tab = styled.View`
  width: 50px;
  height: 20px;
  background-color: ${props =>
    props.active ? props => props.theme.darkBrown : props => props.theme.brown};
  position: relative;
  margin-right: 25px;
`;

class SampleRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState0px,
      modalVisible: false,
      xlcomp: "",
      isDateTimePickerVisible: false,
      piecesModal: false
    };
  }
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.hideDateTimePicker();
  };
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
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={true}>
          <MainView>
            {/* <ItemDetail data={data} /> */}
            <FirstRow>
              <View style={{ flex: 1 }}>
                <SampleName numberOfLine={1}>photo sample</SampleName>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this.handleDatePicked}
                  onCancel={this.hideDateTimePicker}
                />
                <DetailRow>
                  <Block onPress={this.showDateTimePicker}>
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
              <Pieces onPress={() => this.setState({ piecesModal: true })}>
                <PiecesText>2 pcs</PiecesText>
              </Pieces>
            </FirstRow>
            <PiecesPopup
              modalVisible={this.state.piecesModal}
              close={() => this.setState({ piecesModal: false })}
            />
            <CurrentStage>
              <CurrentStageTitle>Planned</CurrentStageTitle>
            </CurrentStage>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TabRow>
                <Tab active={true}>
                  <RightTriangle active={true} />
                  <TabTail active={true} />
                </Tab>
                <Tab active={true}>
                  <TabTail active={true} />
                  <RightTriangle active={true} />
                </Tab>
                <Tab>
                  <TabTail />
                  <RightTriangle />
                </Tab>
                <Tab>
                  <TabTail />
                  <RightTriangle />
                </Tab>
                <Tab>
                  <TabTail />
                  <RightTriangle />
                </Tab>
                <Tab>
                  <TabTail />
                  <RightTriangle />
                </Tab>
              </TabRow>
            </ScrollView>
            <View style={{ flexDirection: "row", padding: 10, justifyContent: "center" }}>
              {/* <Label> measurement </Label> */}
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                
              >

                <ViewChart>view measurement chart</ViewChart>
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
                    <View style={{ padding: 5 }}>
                      <SmallText>Size</SmallText>
                      <CardText numberOfLines={1}>L</CardText>
                    </View>
                    <HeaderRow>
                      <StyleCol size={4}>
                        <Text> description </Text>
                        <SmallText>measured in centimeter </SmallText>
                      </StyleCol>

                      {desc.map(data => {
                        return (
                          <StyleCol size={1}>
                            <Text> {data} </Text>
                          </StyleCol>
                        );
                      })}
                    </HeaderRow>
                    {descCol.map(data => {
                      return (
                        <Row
                          style={{ height: 40 }}
                          key={Math.random().toFixed(3)}
                        >
                          <StyleCol size={4}>
                            <Text>{data.title}</Text>
                          </StyleCol>
                          {colCount.map(data => {
                            return (
                              <StyleCol size={1}>
                                <TableTextInput
                                  onChangeText={req => this.setState({ req })}
                                  value={this.state.req}
                                  name="req"
                                  keyboardType="numeric"
                                >
                                  {data.req}
                                </TableTextInput>
                              </StyleCol>
                            );
                          })}
                        </Row>
                      );
                    })}
                  </Grid>
                </View>
              </CommonModal>
            </View>
            <StyleTemplate />
            {/* <SampleRequestSummary /> */}
            {/* <ViewRequestedQuantity /> */}
          </MainView>
        </KeyboardAwareScrollView>
        <FooterButton>
          <Button bordered light small danger>
            <CancelButtonText>CANCEL</CancelButtonText>
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
