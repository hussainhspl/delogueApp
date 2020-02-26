import React, { Fragment } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput,
  Image
} from "react-native";
import styled from "styled-components";
import { Icon } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// relative import
import OpacityView from "../../../styles/OpacityView";
import { parseISO, format } from "date-fns";
import GetAsyncToken from "../../../script/getAsyncToken";
import EditDate from '../../../api/sample/editDate';

const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: #91683c;
  border-bottom-width: 1px;
  background-color: ${props => props.theme.lightBrown};
  z-index: -1;
`;
const StatusDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin: 15px 10px;
  background-color: ${props => props.status ? "#0f0" : "#964F4C"};
`;
const ContentRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
`;
const ContentTitle = styled.Text`
  text-transform: uppercase;
  color: #8c8076;
  font-size: ${props => props.theme.xs};
  font-family: ${props => props.theme.regular};
`;
// CommentTitle = styled.Text`
// text-transform: uppercase;
// color: #8c8076;
// font-size: 11px;
// padding-top: 10px;
// font-family: ${ props => props.theme.regular};
// `;
const DateRow = styled.View`
  flex-direction: row;
  align-items: center;
  /* background-color:  #f0f; */
`;
const DateInput = styled.TextInput`
  border: 1px solid #ddd;
  height: 20px;
  padding: 3px 6px;
  font-size: 10px;
  margin-right: 5px;
  font-family: ${props => props.theme.regular};
`;
const CardInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const CardTittle = styled.Text`
  text-transform: uppercase;
  font-size: ${props => props.theme.large};
  color: ${props => props.theme.textColor};
  font-family: ${props => props.theme.bold};
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
const MessageRow = styled.View`
  flex-direction: row;
  flex: 1;
`;
const CalenderTouchableOpacity = styled.TouchableOpacity`
  padding: 4px;
`;
const MainBox = styled.View`
  border: 1px solid #ddd;
  /* border-radius: 5px; */
  width: ${props =>
    props.tablet
      ? Dimensions.get("window").width / 3 - 10
      : Dimensions.get("window").width / 2 - 10};
  height: ${props =>
    props.tablet
      ? Dimensions.get("window").width / 3 + 40
      : Dimensions.get("window").width / 2 + 80};
  margin: 3px;
  /* background-color: #ddd; */
  position: relative;
`;

const TitleRowText = styled.Text`
  font-family: ${props => props.theme.regular};
  color: ${props => props.theme.textColor};
  flex: 1;
`;
const NoteText = styled.Text`
  font-family: ${props => props.theme.italic};
  color: ${props => props.theme.textColor};
  font-style: italic;
`;

class sampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeadlineDatePickerVisible: false,
      isEtdDatePickerVisible: false,
      isSendDatePickerVisible: false,
      isReceivedDatePickerVisible: false,
      isCommentedDatePickerVisible: false,
      text: "",
      deadlineDate: "",
      etdDate: "",
      sendDate: "",
      receivedDate: "",
      commentedDate: "",
      tablet: "",
      showOpacity: false,
      sampleData: null,
      selectedType : null,

    };
  }
  componentDidMount = () => {
    if (Dimensions.get("window").width > 568) {
      this.setState({ tablet: true }, () =>
        console.log("did mount sample component", this.state.tablet, this.props.data)
      );
    }

    this.setState({
      sampleData: this.props.data
    }, () => this.dateConversion())

  };
  dateConversion () {
    // console.log('in date conversion :', this.state.sampleData);
    let formatedDeadline = null;
    let formatedEtd = null;
    let formatedSend = null;
    let formatedReceived = null;
    let formatedCommented = null;

    if(this.state.sampleData.deadline != null) {
      const date = new Date(this.state.sampleData.deadline)
      let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
      formatedDeadline = format(localDate, "d-MMM-yyyy");
    }
    
    if(this.state.sampleData.etd != null) {
      const date = new Date(this.state.sampleData.etd)
      let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
      formatedEtd = format(localDate, "d-MMM-yyyy");
    }
    console.log("sent date", this.state.sampleData.sendDate);
    if(this.state.sampleData.sendDate != null) {
      const date = new Date(this.state.sampleData.sendDate)
      let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
      formatedSend = format(localDate, "d-MMM-yyyy");
      console.log('entered sent date');
    }

    if(this.state.sampleData.receivedDate != null) {
      const date = new Date(this.state.sampleData.receivedDate)
      let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
      formatedReceived = format(localDate, "d-MMM-yyyy");
    }

    if(this.state.sampleData.commentedDate != null) {
      const date = new Date(this.state.sampleData.commentedDate)
      let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
      formatedCommented = format(localDate, "d-MMM-yyyy");
    }

    // let formatedEtd = this.checkNullDate();

    this.setState(prevState => ({
      sampleData: {
        ...prevState.sampleData,
        deadline: formatedDeadline,
        etd: formatedEtd,
        sendDate: formatedSend,
        receivedDate: formatedReceived,
        commentedDate: formatedCommented
      }
    }))


  }
  // checkNullDate = () => {
  //   let formatedEtd = null;
  //   if(this.state.sampleData.etd != null) {
  //     console.log('etd conversion',this.state.sampleData.etd);
  //     formatedEtd = this.formatDate(this.state.sampleData.etd);
  //     console.log('converted date', formatedEtd)
  //   }
  //   return formatedEtd;
  // }
  
  formatDate = (rawDate) => {
    const date = new Date(rawDate)

    let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
    return format(localDate, "d-MMM-yyyy");
  }

  showDatePicker = value => {
    // console.log("value", value);
    if (value == "deadline") {
      this.setState({ isDeadlineDatePickerVisible: true });
    } else if (value == "etd") {
      this.setState({ isEtdDatePickerVisible: true });
    } else if (value == "sent") {
      this.setState({ isSendDatePickerVisible: true });
    } else if (value == "received") {
      this.setState({ isReceivedDatePickerVisible: true });
    } else if (value == "commented") {
      this.setState({ isCommentedDatePickerVisible: true });
    }

  };

  hideDatePicker = value => {
    if (value == "deadline") {
      this.setState({ isDeadlineDatePickerVisible: false });
    } else if (value == "etd") {
      this.setState({ isEtdDatePickerVisible: false });
    } else if (value == "sent") {
      this.setState({ isSendDatePickerVisible: false });
    } else if (value == "received") {
      this.setState({ isReceivedDatePickerVisible: false });
    } else if (value == "commented") {
      this.setState({ isCommentedDatePickerVisible: false });
    }
    else {
      this.setState({
        isDeadlineDatePickerVisible: false,
        isEtdDatePickerVisible: false,
        isSendDatePickerVisible: false,
        isReceivedDatePickerVisible: false,
        isCommentedDatePickerVisible: false,

      });
    }
  };

  handleConfirm = date => {
    console.log("A date has been picked: ", date);
    let newDate = format(date, "dd-MMM-yy");
    
    if (this.state.isDeadlineDatePickerVisible == true) {
      this.setState({
        selectedType : 0,
      }, () => {console.log("selectedType", this.state.selectedType); this.editDateByType(newDate)})
      console.log('deadline date', newDate);
    }
    if(this.state.isEtdDatePickerVisible == true) {
      this.setState({
        selectedType : 1,
      }, () => this.editDateByType(newDate))
    }
    if(this.state.isSendDatePickerVisible == true) {
      this.setState({
        selectedType : 2,
      }, () => this.editDateByType(newDate))
    }
    if(this.state.isReceivedDatePickerVisible == true) {
      this.setState({
        selectedType : 3,
      }, () => this.editDateByType(newDate))
    }
    if(this.state.isCommentedDatePickerVisible == true) {
      this.setState({
        selectedType : 4,
      }, () => this.editDateByType(newDate))
    }
    
    

    this.hideDatePicker();
  };
  editDateByType (newDate) {
    GetAsyncToken()
      .then(token => {
        EditDate(token, this.props.data.id, this.state.selectedType, newDate)
          .then(res => {
            console.log('date edited successfully', res);
            if(this.state.selectedType == 0) {
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
            if(this.state.selectedType == 1) {
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
            if(this.state.selectedType == 2) {
              console.log('enter in send state');
              const date = new Date(res.data.sendDate)
              let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
              let formatedSend = format(localDate, "d-MMM-yyyy");
              this.setState(prevState => ({
                sampleData: {
                  ...prevState.sampleData,
                  sendDate: formatedSend
                }
              }))
            }
            if(this.state.selectedType == 3) {
              console.log('enter in received state');
              const date = new Date(res.data.receivedDate)
              let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
              let formatedReceived = format(localDate, "d-MMM-yyyy");
              this.setState(prevState => ({
                sampleData: {
                  ...prevState.sampleData,
                  receivedDate: formatedReceived
                }
              }))
            }
            if(this.state.selectedType == 4) {
              console.log('enter in received state');
              const date = new Date(res.data.commentedDate)
              let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
              let formatedCommented = format(localDate, "d-MMM-yyyy");
              this.setState(prevState => ({
                sampleData: {
                  ...prevState.sampleData,
                  commentedDate: formatedCommented
                }
              }))
            }
            
          })
      })
  }
  render() {

    console.log('render sample component: ', this.state.sampleData)
    return (
      <Fragment>
        {this.state.sampleData != null ?
          <MainBox tablet={this.state.tablet}>
            {this.state.showOpacity && <OpacityView />}
            <TouchableWithoutFeedback
              key={this.state.sampleData.id}
              onPressIn={() => this.setState({ showOpacity: true })}
              onPressOut={() => this.setState({ showOpacity: false })}
              onPress={() => this.props.closeSampleList(this.state.sampleData)}
            >
              <View>
                <TitleRow>
                  <TitleRowText numberOfLines={1}> {this.state.sampleData.typeOfSample.name} </TitleRowText>
                  <StatusDot status={this.state.sampleData.overAllApprovedStatus == true ? true : false} />
                </TitleRow>
                <CardInfo>
                  <MessageRow>
                    <Image
                      resizeMode={"contain"}
                      source={require("../../../../assets/img/sample/receivedblack.png")}

                    />
                    <CardTittle numberOfLines={1}> {this.state.sampleData.sampleRequestStatus} </CardTittle>
                  </MessageRow>
                  <PiecesView>
                    <Pieces numberOfLines={1}> {this.state.sampleData.pieces} {this.state.sampleData.pieces > 1 ? "pcs" : "pc"} </Pieces>
                  </PiecesView>
                </CardInfo>
                <ContentRow>
                  <ContentTitle>deadline</ContentTitle>
                  <DateRow>
                    <DateInput
                      // onChangeText={1}
                      value={this.state.sampleData.deadline}
                      placeholder="dd-mm-yy"
                    />
                    <CalenderTouchableOpacity
                      onPress={() => this.showDatePicker("deadline")}
                    >
                      <Icon
                        style={{ color: "#8C8076", fontSize: 18 }}
                        name="calendar"
                      />
                    </CalenderTouchableOpacity>
                    <DateTimePickerModal
                      isVisible={this.state.isDeadlineDatePickerVisible}
                      onConfirm={this.handleConfirm}
                      onCancel={() => this.hideDatePicker("deadline")}
                      mode="date"
                    />
                  </DateRow>
                </ContentRow>
                <ContentRow>
                  <ContentTitle> etd</ContentTitle>
                  <DateRow>
                    <DateInput
                      // onChangeText={etdDate => this.setState({ etdDate })}
                      value={this.state.sampleData.etd}
                      placeholder="dd-mm-yy"
                    />
                    <CalenderTouchableOpacity
                      onPress={() => this.showDatePicker("etd")}
                    >
                      <Icon
                        style={{ color: "#8C8076", fontSize: 18 }}
                        name="calendar"
                      />
                    </CalenderTouchableOpacity>
                    <DateTimePickerModal
                      isVisible={this.state.isEtdDatePickerVisible}
                      onConfirm={this.handleConfirm}
                      onCancel={() => this.hideDatePicker("etd")}
                      mode="date"
                    />
                  </DateRow>
                </ContentRow>
                <ContentRow>
                  <ContentTitle> sent </ContentTitle>
                  <DateRow>
                    <DateInput
                      // onChangeText={sendDate => this.setState({ sendDate })}
                      value={this.state.sampleData.sendDate}
                      placeholder="dd-mm-yy"
                    />
                    <CalenderTouchableOpacity
                      onPress={() => this.showDatePicker("sent")}
                    >
                      <Icon
                        style={{ color: "#8C8076", fontSize: 18 }}
                        name="calendar"
                      />
                    </CalenderTouchableOpacity>
                    <DateTimePickerModal
                      isVisible={this.state.isSendDatePickerVisible}
                      onConfirm={this.handleConfirm}
                      onCancel={() => this.hideDatePicker("sent")}
                      mode="date"
                    />
                  </DateRow>
                </ContentRow>
                <ContentRow>
                  <ContentTitle> received </ContentTitle>
                  <DateRow>
                    <DateInput
                      // onChangeText={receivedDate =>
                      //   this.setState({ receivedDate })
                      // }
                      value={this.state.sampleData.receivedDate}
                      placeholder="dd-mm-yy"
                    />
                    <CalenderTouchableOpacity
                      onPress={() => this.showDatePicker("received")}
                    >
                      <Icon
                        style={{ color: "#8C8076", fontSize: 18 }}
                        name="calendar"
                      />
                    </CalenderTouchableOpacity>
                    <DateTimePickerModal
                      isVisible={this.state.isReceivedDatePickerVisible}
                      onConfirm={this.handleConfirm}
                      onCancel={() => this.hideDatePicker("received")}
                      mode="date"
                    />
                  </DateRow>

                </ContentRow>
                <ContentRow>
                  {/* <CommentTitle> commented </CommentTitle> */}
                  <ContentTitle> commented </ContentTitle>
                  <DateRow>
                    <DateInput
                      // onChangeText={commentedDate => this.setState({ commentedDate })}
                      value={this.state.sampleData.commentedDate}
                      placeholder="dd-mm-yy"
                    />
                    <CalenderTouchableOpacity
                      onPress={() => this.showDatePicker("commented")}
                    >
                      <Icon
                        style={{ color: "#8C8076", fontSize: 18 }}
                        name="calendar"
                      />
                    </CalenderTouchableOpacity>
                    <DateTimePickerModal
                      isVisible={this.state.isCommentedDatePickerVisible}
                      onConfirm={this.handleConfirm}
                      onCancel={() => this.hideDatePicker("commented")}
                      mode="date"
                    />
                  </DateRow>
                </ContentRow>
                <View>
                  {/* <CommentTitle> commented </CommentTitle> */}
                  <NoteText numberOfLines={1}> {this.state.sampleData.note} </NoteText>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </MainBox>
          : null
        }
      </Fragment>
    );
  }
}
export default sampleComponent;
