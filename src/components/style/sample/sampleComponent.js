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
import DateTimePicker from "react-native-modal-datetime-picker";
// relative import
import OpacityView from "../../../styles/OpacityView";
import { parseISO, format } from "date-fns";

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
  font-size: 13px;
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
      isDeadlineDateTimePickerVisible: false,
      isEtdDateTimePickerVisible: false,
      isSentDateTimePickerVisible: false,
      isReceivedDateTimePickerVisible: false,
      isCommentedDateTimePickerVisible: false,
      text: "",
      deadlineDate: "",
      etdDate: "",
      sentDate: "",
      receivedDate: "",
      commentedDate: "",
      tablet: "",
      showOpacity: false
    };
  }
  componentDidMount = () => {
    if (Dimensions.get("window").width > 568) {
      this.setState({ tablet: true }, () =>
        console.log("will mount", this.state.tablet)
      );
    }
  };
  showDateTimePicker = value => {
    // console.log("value", value);
    if (value == "deadline") {
      this.setState({ isDeadlineDateTimePickerVisible: true });
    } else if (value == "etd") {
      this.setState({ isEtdDateTimePickerVisible: true });
    } else if (value == "sent") {
      this.setState({ isSentDateTimePickerVisible: true });
    } else if (value == "received") {
      this.setState({ isReceivedDateTimePickerVisible: true });
    } else if (value == "commented") {
      this.setState({ isCommentedDateTimePickerVisible: true });
    }
  };

  hideDateTimePicker = value => {
    if (value == "deadline") {
      this.setState({ isDeadlineDateTimePickerVisible: false });
    } else if (value == "etd") {
      this.setState({ isEtdDateTimePickerVisible: false });
    } else if (value == "sent") {
      this.setState({ isSentDateTimePickerVisible: false });
    } else if (value == "received") {
      this.setState({ isReceivedDateTimePickerVisible: false });
    } else if (value == "commented") {
      this.setState({ isReceivedDateTimePickerVisible: false });
    }
  };

  handleDatePicked = date => {
    // console.log("A date has been picked: ", date);
    this.hideDateTimePicker();
  };
  render() {
    // console.log("state",this.state.isDeadlineDateTimePickerVisible )
    const { id, sampleRequestStatus, typeOfSample, note, pieces,
      deadline, etd, sentDate, receivedDate, commentedDate,
      overAllApprovedStatus } = this.props.data;

    deadline != null ? this.state.deadlineDate == "" ?
      this.setState({
        deadlineDate: format(parseISO(deadline), "MM-dd-yy")
      })
      : null : null

    etd != null ? this.state.etdDate == "" ?
      this.setState({
        etdDate: format(parseISO(etd), "MM-dd-yy")
      })
      : null : null

    sentDate != null ? this.state.sentDate == "" ?
      this.setState({
        sentDate: format(parseISO(sent), "MM-dd-yy")
      })
      : null : null

    receivedDate != null ? this.state.receivedDate == "" ?
      this.setState({
        receivedDate: format(parseISO(receivedDate), "MM-dd-yy")
      })
      : null : null

      commentedDate != null ? this.state.commentedDate == "" ?
      this.setState({
        commentedDate: format(parseISO(commentedDate), "MM-dd-yy")
      })
      : null : null



    // let fsa = format(parseISO('2014-02-11T11:30:30'), "dd");



    // console.log('typeOf(pieces)', typeof (pieces));
    return (
      <Fragment>
        <MainBox tablet={this.state.tablet}>
          {this.state.showOpacity && <OpacityView />}
          <TouchableWithoutFeedback
            key={id}
            onPressIn={() => this.setState({ showOpacity: true })}
            onPressOut={() => this.setState({ showOpacity: false })}
            onPress={() => this.props.closeSampleList(id)}
          >
            <View>
              <TitleRow>
                <TitleRowText numberOfLines={1}> {typeOfSample.name} </TitleRowText>
                <StatusDot status={overAllApprovedStatus == true  ? true : false} />
              </TitleRow>
              <CardInfo>
                <MessageRow>
                  <Image
                    resizeMode={"contain"}
                    source={require("../../../../assets/img/sample/receivedblack.png")}

                  />
                  <CardTittle numberOfLines={1}> {sampleRequestStatus} </CardTittle>
                </MessageRow>
                <Pieces numberOfLines={1}> {pieces} {pieces > 1 ? "pcs" : "pc"} </Pieces>
              </CardInfo>
              <ContentRow>
                <ContentTitle>deadline</ContentTitle>
                <DateRow>
                  <DateInput
                    onChangeText={deadlineDate =>
                      this.setState({ deadlineDate })
                    }
                    value={this.state.deadlineDate}
                    placeholder="dd-mm-yy"
                  />
                  <CalenderTouchableOpacity
                    onPress={() => this.showDateTimePicker("deadline")}
                  >
                    <Icon
                      style={{ color: "#8C8076", fontSize: 18 }}
                      name="calendar"
                    />
                  </CalenderTouchableOpacity>
                  <DateTimePicker
                    isVisible={this.state.isDeadlineDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={() => this.hideDateTimePicker("deadline")}
                  />
                </DateRow>
              </ContentRow>
              <ContentRow>
                <ContentTitle> etd</ContentTitle>
                <DateRow>
                  <DateInput
                    onChangeText={etdDate => this.setState({ etdDate })}
                    value={this.state.etdDate}
                    placeholder="dd-mm-yy"
                  />
                  <CalenderTouchableOpacity
                    onPress={() => this.showDateTimePicker("etd")}
                  >
                    <Icon
                      style={{ color: "#8C8076", fontSize: 18 }}
                      name="calendar"
                    />
                  </CalenderTouchableOpacity>
                  <DateTimePicker
                    isVisible={this.state.isEtdDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={() => this.hideDateTimePicker("etd")}
                  />
                </DateRow>
              </ContentRow>
              <ContentRow>
                <ContentTitle> sent </ContentTitle>
                <DateRow>
                  <DateInput
                    onChangeText={sentDate => this.setState({ sentDate })}
                    value={this.state.sentDate}
                    placeholder="dd-mm-yy"
                  />
                  <CalenderTouchableOpacity
                    onPress={() => this.showDateTimePicker("sent")}
                  >
                    <Icon
                      style={{ color: "#8C8076", fontSize: 18 }}
                      name="calendar"
                    />
                  </CalenderTouchableOpacity>
                  <DateTimePicker
                    isVisible={this.state.isSentDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={() => this.hideDateTimePicker("sent")}
                  />
                </DateRow>
              </ContentRow>
              <ContentRow>
                <ContentTitle> received </ContentTitle>
                <DateRow>
                  <DateInput
                    onChangeText={receivedDate =>
                      this.setState({ receivedDate })
                    }
                    value={this.state.receivedDate}
                    placeholder="dd-mm-yy"
                  />
                  <CalenderTouchableOpacity
                    onPress={() => this.showDateTimePicker("received")}
                  >
                    <Icon
                      style={{ color: "#8C8076", fontSize: 18 }}
                      name="calendar"
                    />
                  </CalenderTouchableOpacity>
                  <DateTimePicker
                    isVisible={this.state.isReceivedDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={() => this.hideDateTimePicker("received")}
                  />
                </DateRow>
              </ContentRow>
              <ContentRow>
                {/* <CommentTitle> commented </CommentTitle> */}
                <ContentTitle> commented </ContentTitle>
                <DateRow>
                  <DateInput
                    onChangeText={commentedDate => this.setState({ commentedDate })}
                    value={this.state.commentedDate}
                    placeholder="dd-mm-yy"
                  />
                  <CalenderTouchableOpacity
                    onPress={() => this.showDateTimePicker("commented")}
                  >
                    <Icon
                      style={{ color: "#8C8076", fontSize: 18 }}
                      name="calendar"
                    />
                  </CalenderTouchableOpacity>
                  <DateTimePicker
                    isVisible={this.state.isCommentedDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={() => this.hideDateTimePicker("commented")}
                  />
                </DateRow>
              </ContentRow>
              <View>
                {/* <CommentTitle> commented </CommentTitle> */}
                <NoteText numberOfLines={1}> {note} </NoteText>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </MainBox>
      </Fragment>
    );
  }
}
export default sampleComponent;
