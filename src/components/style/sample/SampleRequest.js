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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RectButton } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import DateTimePickerModal from "react-native-modal-datetime-picker";
// relative import
import SampleAccordion from "./SampleAccordion";
import ApplyButton from "../../../styles/ApplyButton";
import CancelButton from '../../../styles/CancelButton';
import ButtonText from '../../../styles/ButtonText';
import SmallText from "../../../styles/SmallText";
import CardText from "../../../styles/CardText";

import PiecesPopup from "../../../shared/PiecesPopup";
import GetAsyncToken from "../../../script/getAsyncToken";
import GetSampleOverview from "../../../api/sample/getSampleOverview";

import { parseISO, format } from "date-fns";
import EditDate from "../../../api/sample/editDate";
import PlannedSampleRequest from "./plannedSampleRequest";
import TouchableCancel from "../../../styles/ToucaableCancel";
import TouchableApply from "../../../styles/TouchableApply";
import UpdatePlanned from "../../../api/sample/updatePlanned";
import GetPlannedSample from "../../../api/sample/getPlannedSample";
import PlannedSampleAccordion from "./plannedSampleAccordion";

const StageArray = [ 'Requested', 'Sent', 'Received', 'Commented', 'Cancelled', 'Confirmed' ];
const PlannedStageArray = ['Planned', 'Requested', 'Cancelled'];
const otherStateCount = [ 0, 1, 2, 3, 4, 5, ];
const plannedStateCount = [0, 1, 2];


const FooterButtonRow = styled.View`
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
  align-items: center;
`;
const CurrentStageTitle = styled.Text`
  color: ${props => props.theme.darkBrown};
  font-family: ${props => props.theme.bold};
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
    // console.log("A date has been picked: ", date);
    let newDate = format(date, "dd-MMM-yy");
    if (this.state.isDeadlineDatePickerVisible == true) {
      this.setState({
        selectedType: 0,
      }, () => { console.log("selectedType", this.state.selectedType); this.editDateByType(newDate) })
      // console.log('deadline date', newDate);
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
  // updateSampleRequest() {
  //   console.log('click on apply');
  //   GetAsyncToken()
  //     .then(token => {
  //       UpdatePlanned(res => {
  //         console.log('sample updated :');
  //       })
  //     })
  // }
  componentDidMount = () => {
    // AppState.addEventListener("change111", this._handleAppStateChange);
    // console.log('sample request did mount :',this.props.data.name);
    GetAsyncToken()
      .then(token => {
        if(this.props.data.name != "Planned") {
          GetSampleOverview(token, this.props.data.id)
          .then(res => {
            // console.log('success in sample overview', res);
            this.setState({
              sampleData: res.data
            }, () => this.getSampleRequestStatus())

          })
        } else {
          GetPlannedSample(token, this.props.data.id)
            .then(res => {
              // console.log('got planned data', res);
              this.setState({
                sampleData: res.data
              }, () => this.getSampleRequestStatus())
            })
        }
        
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
    // console.log("Enter in 22 ");
    // if(this.state.sampleData.sampleRequestStatus == "Planned" && currentIndex == 2) {
    //   this.setState({sampleRequestStatus: 5, currentIndex: 5})
    // }
    this.setState({ currentIndex }, () => console.log('current Index', this.state.currentIndex));
  }
  _renderItem = ({ item, index }) => {
    return (
      <CurrentStageTitle>{item}</CurrentStageTitle>
    );
  }
  getSampleRequestStatus = () => {
    // console.log('getSampleRequestStatus', this.state.sampleData);
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
    }), () => this.updateCarousel())

  }
  updateCarousel () {
    // console.log('update carousel', this.state.sampleData.sampleRequestStatus, this.state.currentIndex);

    if(this.state.sampleData != null ) { 
      
      
      if(this.state.sampleData.sampleRequestStatus == "Requested") {
        this.setState({
          sampleRequestStatus: 0, currentIndex: 0
        })
      }
      if(this.state.sampleData.sampleRequestStatus == "Sent") {
        this.setState({
          sampleRequestStatus: 1, currentIndex: 1
        })
      }
      if(this.state.sampleData.sampleRequestStatus == "Received") {
        this.setState({
          sampleRequestStatus: 2, currentIndex: 2
        })
      }
      if(this.state.sampleData.sampleRequestStatus == "Commented") {
        this.setState({
          sampleRequestStatus: 3, currentIndex: 3
        })
      }
      if(this.state.sampleData.sampleRequestStatus == "Cancelled") {
        this.setState({
          sampleRequestStatus: 4, currentIndex: 4
        }, () => console.log('4', this.state.sampleRequestStatus))
      }
      if(this.state.sampleData.sampleRequestStatus == "Confirmed") {
        this.setState({
          sampleRequestStatus: 5, currentIndex: 5
        })
      }
      if(this.state.sampleData.sampleRequestStatus =="Planned") {
        this.setState({
          sampleRequestStatus: 6, currentIndex: 6
        })
      }
      
      

    }
  }
  updatePieces() {
    this.setState({ piecesModal: false })
  }
  render() {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const slideWidth = Math.round(Dimensions.get('window').width / 2)
    let currentCount = null;
    if(this.state.sampleData != null) {
      currentCount = this.state.sampleData.status == 6 ? plannedStateCount : otherStateCount
    }
    // console.log('in render sample request', this.state.sampleRequestStatus)
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
                        <SmallText>Tracking Number </SmallText>
                        <CardText numberOfLines={1}>{this.state.sampleData.trackingNumber}</CardText>
                        
                      </Block>
                    </DetailRow>
                  </View>
                  {this.state.sampleData.status != 6 && (
                    //this.state.sampleData.status is defined only when sample status is planned
                    <PiecesTouch onPress={() => this.setState({ piecesModal: true })}>
                      <PiecesView>
                        <Pieces numberOfLines={1}> {this.state.sampleData.pieces} {this.state.sampleData.pieces > 1 ? "pcs" : "pc"} </Pieces>
                      </PiecesView>
                    </PiecesTouch>
                  )}
                </FirstRow>
                {/* <PiecesPopup
                  modalVisible={this.state.piecesModal}
                  close={() => this.updatePieces()}
                  data={this.state.sampleData.requestedSampleSizes}
                /> */}
                <CurrentStage>
                  {this.state.sampleRequestStatus != null || this.state.sampleData.status == 6 && (
                  <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={ this.state.sampleData.status == 6 ? PlannedStageArray : StageArray }
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
                  )}
                </CurrentStage>

                {/* <CurrentStage>
                <CurrentStageTitle>Planned</CurrentStageTitle>
              </CurrentStage> */}

                {/* <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            > */}
                <TabRow>
                  {
                    currentCount.map( count => {
                      return(
                        <Tab active={this.state.currentIndex >= count ? true : false}>
                          <RightTriangle active={this.state.currentIndex >= count ? true : false} />
                          <TabTail active={this.state.currentIndex >= count ? true : false} />
                        </Tab>
                      )
                    })
                  }
                  {/* {
                    this.state.sampleData.sampleRequestStatus == "Planned" ?

                  } */}
                </TabRow>


                {
                  this.state.sampleData.status != 6 && (
                    <SampleAccordion
                      data={this.state.sampleData}
                    />
                )}
                
                {this.state.sampleData.status == 6 && (
                  <PlannedSampleAccordion
                    data={this.state.sampleData}
                  />
                )}

                {/* {
                  this.state.sampleData.sampleRequestStatus == "Planned" && (
                    <PlannedSampleRequest />
                  )
                } */}



                {/* <SampleRequestSummary /> */}
                {/* <ViewRequestedQuantity /> */}
              </MainView>

            </KeyboardAwareScrollView>
            : null}
        <FooterButtonRow>
          <CancelButton>
            <TouchableCancel
              underlayColor="#8f8c86"
              onPress={() => { this.props.cancel() }}>
              <ButtonText>CANCEL</ButtonText>
            </TouchableCancel>
          </CancelButton>
          <ApplyButton>
            <TouchableApply onPress={() => {
              this.redirectTo(this.props.apply);
            }} underlayColor="#354733">
              <ButtonText>apply</ButtonText>
            </TouchableApply>

          </ApplyButton>
        </FooterButtonRow>

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