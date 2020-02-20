import React, { Fragment } from "react";
import {
  View,
  Text,
  Animated,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableHighlight,
  AppState
} from "react-native";
import styled from "styled-components";
import { Icon, Button } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import DateTimePickerModal from "react-native-modal-datetime-picker";
// relative import
import SampleAccordion from "./SampleAccordion";
import SampleRequestSummary from "../SampleRequestSummary";
import ViewRequestedQuantity from "../ViewRequestedQuantity";
import Header from "../../../Header";
import ApplyButton from "../../../styles/ApplyButton";
import CancelButton from '../../../styles/CancelButton';
import ButtonText from '../../../styles/ButtonText';
import ItemDetail from "../../../shared/ItemDetail";
import SmallText from "../../../styles/SmallText";
import CardText from "../../../styles/CardText";

import PiecesPopup from "../../../shared/PiecesPopup";
import GetAsyncToken from "../../../script/getAsyncToken";
import GetSampleOverview from "../../../api/sample/getSampleOverview";

import { parseISO, format } from "date-fns";
import EditDate from "../../../api/sample/editDate";

const StageArray = ['planned', 'requested', 'confirmed', 'sent', 'received', 'commented']

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

const PiecesTouch = styled.TouchableHighlight`
  align-self: flex-start;
`;
const PiecesView = styled.View`
  background-color: #c2beb6;
  max-width: 60px;
  height: 20px;
  margin: 10px 5px;
`;
const Pieces = styled.Text`
  color: white;
  font-size: ${props => props.theme.large};
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
  /* padding: 5px 0px; */
  /* padding: 5px 0px 0px 0px; */
  align-items: center;
`;
const CurrentStageTitle = styled.Text`
  color: ${props => props.theme.darkBrown};
  font-family: ${props => props.theme.bold};
  /* background-color: #f00; */
  text-align: center;
  padding: 5px 0px;
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
  width: ${Dimensions.get("window").width / 6 - 20.9};
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
      isDeadlineDatePickerVisible: false,
      isEtdDatePickerVisible: false,
      piecesModal: false,
      currentIndex: 0,
      sampleData: null,
      sampleRequestStatus: null,
      selectedType: null
    };
  }
  showDatePicker = value => {
    if (value == "deadline") {
      this.setState({ isDeadlineDatePickerVisible: true });
    } else if (value == "etd") {
      this.setState({ isEtdDatePickerVisible: true });
    }
  };

  hideDatePicker = value => {
    if (value == "deadline") {
      this.setState({ isDeadlineDatePickerVisible: false });
    } else if (value == "etd") {
      this.setState({ isEtdDatePickerVisible: false });
    }
    else {
      this.setState({
        isDeadlineDatePickerVisible: false,
        isEtdDatePickerVisible: false,

      });
    }
  };

  handleConfirm = date => {
    console.log("A date has been picked: ", date);
    let newDate = format(date, "dd-MMM-yy");
    if (this.state.isDeadlineDatePickerVisible == true) {
      this.setState({
        selectedType: 0,
      }, () => { console.log("selectedType", this.state.selectedType); this.editDateByType(newDate) })
      console.log('deadline date', newDate);
    }
    if (this.state.isEtdDatePickerVisible == true) {
      this.setState({
        selectedType: 1,
      }, () => this.editDateByType(newDate))
    }
    this.hideDatePicker();
  };
  editDateByType(newDate) {
    GetAsyncToken()
      .then(token => {
        EditDate(token, this.state.sampleData.id, this.state.selectedType, newDate)
          .then(res => {
            console.log('date edited successfully', res);
            if (this.state.selectedType == 0) {
              const date = new Date(res.data.deadline)
              let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
              let formatedDeadline = format(localDate, "d-MMM-yyyy");
              this.setState(prevState => ({
                sampleData: {
                  ...prevState.sampleData,
                  deadline: formatedDeadline
                }
              }))
            }
            if (this.state.selectedType == 1) {
              console.log('enter in etd state');
              const date = new Date(res.data.etd)
              let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
              let formatedEtd = format(localDate, "d-MMM-yyyy");
              this.setState(prevState => ({
                sampleData: {
                  ...prevState.sampleData,
                  etd: formatedEtd
                }
              }))
            }
          })
      })
  }
  redirectTo() {
    // console.log("redirect click");
    this.props.apply();
  }
  componentDidMount = () => {
    AppState.addEventListener("change", this._handleAppStateChange);
    GetAsyncToken()
      .then(token => {
        GetSampleOverview(token, this.props.id)
          .then(res => {
            console.log('success in sample overview', res);
            this.setState({
              sampleData: res.data
            }, () => this.getSampleRequestStatus())

          })
      })
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
  renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton onPress={this.close}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          Archive
        </Animated.Text>
      </RectButton>
    );
  };
  changeIndex = (currentIndex) => {
    console.log("Enter in ")
    this.setState({ currentIndex }, () => console.log('current Index', this.state.currentIndex));
  }
  _renderItem = ({ item, index }) => {
    // console.log("render", index, item, this._carousel);
    return (

      <CurrentStageTitle>{item}</CurrentStageTitle>
    );
  }
  getSampleRequestStatus = () => {
    let formatedDeadline = null;
    let formatedEtd = null;

    if (this.state.sampleData.deadline != null) {
      const date = new Date(this.state.sampleData.deadline)
      let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
      formatedDeadline = format(localDate, "d-MMM-yyyy");
    }

    if (this.state.sampleData.etd != null) {
      const date = new Date(this.state.sampleData.etd)
      let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
      formatedEtd = format(localDate, "d-MMM-yyyy");
    }

    this.setState(prevState => ({
      sampleData: {
        ...prevState.sampleData,
        deadline: formatedDeadline,
        etd: formatedEtd,
      }
    }))

    this.state.sampleData != null ?
      this.state.sampleData.sampleRequestStatus == "Requested" ?
        this.setState({
          sampleRequestStatus: 1,
          currentIndex: 1
        })
        : null
      : null
  }
  updatePieces () {
    this.setState({ piecesModal: false })
  }
  render() {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const slideWidth = Math.round(Dimensions.get('window').width / 2)
    console.log('this.state', this.state.sampleData)
    return (
      <View style={{ flex: 1 }}>
        {
          this.state.sampleData != null ?
            <KeyboardAwareScrollView showsVerticalScrollIndicator={true}>
              <MainView>
                {/* <ItemDetail data={data} /> */}
                <FirstRow>
                  <View style={{ flex: 1 }}>
                    <SampleName numberOfLine={1}> {this.state.sampleData.typeOfSample.name} </SampleName>
                    <DateTimePickerModal
                      isVisible={this.state.isDeadlineDatePickerVisible}
                      onConfirm={this.handleConfirm}
                      onCancel={() => this.hideDatePicker("deadline")}
                    />
                    <DateTimePickerModal
                      isVisible={this.state.isEtdDatePickerVisible}
                      onConfirm={this.handleConfirm}
                      onCancel={() => this.hideDatePicker("etd")}
                    />
                    <DetailRow>
                      <Block onPress={() => this.showDatePicker("deadline")}>
                        <SmallText>Deadline</SmallText>
                        <CardText numberOfLines={1}>{this.state.sampleData.deadline}</CardText>
                      </Block>
                      <Block onPress={() => this.showDatePicker("etd")}>
                        <SmallText>ETD</SmallText>
                        <CardText numberOfLines={1}>{this.state.sampleData.etd}</CardText>
                      </Block>
                      <Block>
                        <SmallText>Tracking #</SmallText>
                        <CardText numberOfLines={1}>12111112222222222222</CardText>
                      </Block>
                    </DetailRow>
                  </View>
                  <PiecesTouch onPress={() => this.setState({ piecesModal: true })}>
                    <PiecesView>
                      <Pieces numberOfLines={1}> {this.state.sampleData.pieces} {this.state.sampleData.pieces > 1 ? "pcs" : "pc"} </Pieces>
                    </PiecesView>
                  </PiecesTouch>
                </FirstRow>
                <PiecesPopup
                  modalVisible={this.state.piecesModal}
                  close={() =>this.updatePieces()}
                  data={this.state.sampleData.requestedSampleSizes}
                />
                <CurrentStage>
                  <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={StageArray}
                    renderItem={this._renderItem}
                    itemWidth={slideWidth}
                    sliderWidth={screenWidth}
                    callbackOffsetMargin={0}
                    onBeforeSnapToItem={this.changeIndex}
                    firstItem={this.state.sampleRequestStatus}
                  // onSnapToItem={(index) => console.log('hello')}
                  // onLayout={ () => console.log("swipe")}
                  // activeSlideAlignment={'center'}
                  // activeSlideOffset={'center'}
                  // layout={'tinder'}
                  />
                </CurrentStage>

                {/* <CurrentStage>
                <CurrentStageTitle>Planned</CurrentStageTitle>
              </CurrentStage> */}

                {/* <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            > */}
                <TabRow>
                  <Tab active={this.state.currentIndex >= 0 ? true : false}>
                    <RightTriangle active={this.state.currentIndex >= 0 ? true : false} />
                    <TabTail active={this.state.currentIndex >= 0 ? true : false} />
                  </Tab>
                  <Tab active={this.state.currentIndex >= 1 ? true : false}>
                    <TabTail active={this.state.currentIndex >= 1 ? true : false} />
                    <RightTriangle active={this.state.currentIndex >= 1 ? true : false} />
                  </Tab>
                  <Tab active={this.state.currentIndex >= 2 ? true : false}>
                    <TabTail active={this.state.currentIndex >= 2 ? true : false} />
                    <RightTriangle active={this.state.currentIndex >= 2 ? true : false} />
                  </Tab>
                  <Tab active={this.state.currentIndex >= 3 ? true : false}>
                    <TabTail active={this.state.currentIndex >= 3 ? true : false} />
                    <RightTriangle active={this.state.currentIndex >= 3 ? true : false} />
                  </Tab>
                  <Tab active={this.state.currentIndex >= 4 ? true : false}>
                    <TabTail active={this.state.currentIndex >= 4 ? true : false} />
                    <RightTriangle active={this.state.currentIndex >= 4 ? true : false} />
                  </Tab>
                  <Tab active={this.state.currentIndex >= 5 ? true : false}>
                    <TabTail active={this.state.currentIndex >= 5 ? true : false} />
                    {/* <RightTriangle active={this.state.currentIndex >= 5 ? true : false}/> */}
                  </Tab>
                </TabRow>


                <SampleAccordion
                  data={this.state.sampleData}
                />


                {/* <SampleRequestSummary /> */}
                {/* <ViewRequestedQuantity /> */}
              </MainView>

            </KeyboardAwareScrollView>
            : null}
        <FooterButton>
          <CancelButton>
            <ButtonText>CANCEL</ButtonText>
          </CancelButton>
          <ApplyButton
            onPress={() => {
              this.redirectTo(this.props.apply);
            }}
          >
            <ButtonText>apply</ButtonText>
          </ApplyButton>
        </FooterButton>

      </View>
    );
  }
}
export default SampleRequest;

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'red',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});