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
const Pieces = styled.Text`
  background-color: #c2beb6;
  padding: 0px 5px;
  max-width: 70px;
  height: 20px;
  color: white;
  font-size: ${props => props.theme.large};
  margin: 7px;
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
      isSentDatePickerVisible: false,
      isReceivedDatePickerVisible: false,
      isCommentedDatePickerVisible: false,
      text: "",
      deadlineDate: "",
      etdDate: "",
      sentDate: "",
      receivedDate: "",
      commentedDate: "",
      tablet: "",
      showOpacity: false,
      sampleData: null

    };
  }
  componentDidMount = () => {
    if (Dimensions.get("window").width > 568) {
      this.setState({ tablet: true }, () =>
        console.log("did mount", this.state.tablet, this.props.data)
      );
    }
    // const { id, sampleRequestStatus, typeOfSample, note, pieces,
    //   deadline, etd, sentDate, receivedDate, commentedDate,
    //   overAllApprovedStatus } = this.props.data;
    this.setState({
      sampleData: this.props.data
    }, () => this.dateConversion())

    // deadline != null ? this.state.deadlineDate == "" ?
    //   this.setState({
    //     deadlineDate: format(parseISO(deadline), "MM-dd-yy")
    //   })
    //   : null : null

    // etd != null ? this.state.etdDate == "" ?
    //   this.setState({
    //     etdDate: format(parseISO(etd), "MM-dd-yy")
    //   })
    //   : null : null

    // sentDate != null ? this.state.sentDate == "" ?
    //   this.setState({
    //     sentDate: format(parseISO(sent), "MM-dd-yy")
    //   })
    //   : null : null

    // receivedDate != null ? this.state.receivedDate == "" ?
    //   this.setState({
    //     receivedDate: format(parseISO(receivedDate), "MM-dd-yy")
    //   })
    //   : null : null

    //   commentedDate != null ? this.state.commentedDate == "" ?
    //   this.setState({
    //     commentedDate: format(parseISO(commentedDate), "MM-dd-yy")
    //   })
    //   : null : null

  };
  dateConversion () {
    // console.log('in date conversion :', this.state.sampleData);
    let formatedDeadline = null;
    let formatedEtd = null;
    let formatedSent = null;
    let formatedReceived = null;
    let formatedCommented = null;

    if(this.state.sampleData.deadline != null) {
      const date = new Date(this.state.sampleData.deadline)
      let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
      let formatedDeadline = format(localDate, "d-MMM-yyyy");
    }
    
    if(this.state.sampleData.etd != null) {
      const date = new Date(this.state.sampleData.deadline)
      let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
      let formatedEtd = format(localDate, "d-MMM-yyyy");
    }

    if(this.state.sampleData.sentDate != null) {
      const date = new Date(this.state.sampleData.deadline)
      let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
      let formatedDeadline = format(localDate, "d-MMM-yyyy");
    }

    if(this.state.sampleData.etd != null) {
      const date = new Date(this.state.sampleData.deadline)
      let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
      let formatedDeadline = format(localDate, "d-MMM-yyyy");
    }

    if(this.state.sampleData.etd != null) {
      const date = new Date(this.state.sampleData.deadline)
      let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
      let formatedDeadline = format(localDate, "d-MMM-yyyy");
    }

    // let formatedEtd = this.checkNullDate();

    this.setState(prevState => ({
      sampleData: {
        ...prevState.sampleData,
        deadline: formatedDeadline,
        etd: formatedEtd
      }
    }))


  }
  checkNullDate = () => {
    let formatedEtd = null;
    if(this.state.sampleData.etd != null) {
      console.log('etd conversion',this.state.sampleData.etd);
      formatedEtd = this.formatDate(this.state.sampleData.etd);
      console.log('converted date', formatedEtd)
    }
    return formatedEtd;
  }
  
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
      this.setState({ isSentDatePickerVisible: true });
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
      this.setState({ isSentDatePickerVisible: false });
    } else if (value == "received") {
      this.setState({ isReceivedDatePickerVisible: false });
    } else if (value == "commented") {
      this.setState({ isCommentedDatePickerVisible: false });
    }
    else {
      this.setState({
        isDeadlineDatePickerVisible: false,
        isEtdDatePickerVisible: false,
        isSentDatePickerVisible: false,
        isReceivedDatePickerVisible: false,
        isCommentedDatePickerVisible: false,

      });
    }
  };

  handleConfirm = date => {
    console.log("A date has been picked: ", date);
    let newDate = format(date, "dd-MMM-yy");
    let selectedType = -1;
    if (this.state.isDeadlineDatePickerVisible == true) {
      selectedType = 0;
      console.log('deadline date', newDate);

    }
    GetAsyncToken()
      .then(token => {
        EditDate(token, this.props.data.id, selectedType, newDate)
          .then(res => {
            console.log('date edited successfully', res);
            const date = new Date(res.data.deadline)
            let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
            let formatedDeadline = format(localDate, "d-MMM-yyyy");
            this.setState(prevState => ({
              sampleData: {
                ...prevState.sampleData,
                deadline: formatedDeadline
              }
            }))
            
          })
      })

    this.hideDatePicker();
  };
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
              onPress={() => this.props.closeSampleList(id)}
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
                    <CardTittle numberOfLines={1}> {this.state.sampleData.typeOfSample.sampleRequestStatus} </CardTittle>
                  </MessageRow>
                  <Pieces numberOfLines={1}> {this.state.sampleData.typeOfSample.pieces} {this.state.sampleData.typeOfSample.pieces > 1 ? "pcs" : "pc"} </Pieces>
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
                      value={this.state.etdDate}
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
                      // onChangeText={sentDate => this.setState({ sentDate })}
                      value={this.state.sentDate}
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
                      isVisible={this.state.isSentDatePickerVisible}
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
                      value={this.state.receivedDate}
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
                      value={this.state.commentedDate}
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
