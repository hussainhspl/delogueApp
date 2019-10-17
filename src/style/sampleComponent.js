import React, {Fragment} from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native";
import styled from "styled-components";
import { Icon } from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";


const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: #c6bfb8;
  border-bottom-width: 1px;
  background-color: ${props => props.theme.lightBrown};
`;
const StatusDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin: 15px;
`;
const ContentRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 3px;
`;
const ContentTitle = styled.Text`
  text-transform: uppercase;
  color: #8c8076;
  font-size: 11px;
  font-family: ${ props => props.theme.regular};
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
  font-family: ${ props => props.theme.regular};

`;
const CardInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const CardTittle = styled.Text`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 13px;
  color: #4a4a4a;
  font-family: ${ props => props.theme.regular};
`;
const Pieces = styled.Text`
  background-color: #c2beb6;
  /* width: 40px; */
  padding: 0px 5px;
  height: 20px;
  color: white;
  font-size: 13px;
  margin: 7px;
  font-family: ${ props => props.theme.regular};
`;
const MessageRow = styled.View`
  flex-direction: row;
`;
const CalenderTouchableOpacity = styled.TouchableOpacity`
  padding: 5px;
`
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
      deadlineText: '',
      etdText: '',
      sentText: '',
      receivedText: '',
      commentText: '',
      tablet: '',
    };
  }
  componentDidMount = () => {
    if(Dimensions.get('window').width >568) {
      this.setState({tablet: true},() =>console.log("will mount" , this.state.tablet))
    }
  }
  showDateTimePicker = (value) => {
    // console.log("value", value);
    if(value == 'deadline') {
      this.setState({ isDeadlineDateTimePickerVisible: true });
    }else if(value == 'etd') {
      this.setState({ isEtdDateTimePickerVisible: true });
    }else if(value == 'sent') {
      this.setState({ isSentDateTimePickerVisible: true });
    }else if(value == 'received') {
      this.setState({ isReceivedDateTimePickerVisible: true });    
    }else if(value == 'commented') {
      this.setState({ isCommentedDateTimePickerVisible: true });    
    }
  };

  hideDateTimePicker = (value) => {
    if(value == 'deadline') {
      this.setState({ isDeadlineDateTimePickerVisible: false });
    }else if(value == 'etd') {
      this.setState({ isEtdDateTimePickerVisible: false });
    }else if(value == 'sent') {
      this.setState({ isSentDateTimePickerVisible: false });
    }else if(value == 'received') {
      this.setState({ isReceivedDateTimePickerVisible: false });    
    }else if(value == 'commented') {
      this.setState({ isReceivedDateTimePickerVisible: false });    
    }
  };

  handleDatePicked = date => {
    // console.log("A date has been picked: ", date);
    this.hideDateTimePicker();
  };
  render() {
    // console.log("state",this.state.isDeadlineDateTimePickerVisible )
    return (
      <View style={{paddingBottom: "20px"}}>
        <TitleRow>
          <Text> 1st proto sample </Text>
          <StatusDot style={{ backgroundColor: "#964F4C" }} />
        </TitleRow>
        <CardInfo>
          <MessageRow>
            <Image
              resizeMode={"contain"}
              source={require("../../assets/img/sample/receivedblack.png")}
            />
            <CardTittle>sent</CardTittle>
          </MessageRow>
          <Pieces> 2 pcs </Pieces>
        </CardInfo>
        <ContentRow>
          <ContentTitle>deadline</ContentTitle>
          <DateRow>
            <DateInput
              onChangeText={deadlineText => this.setState({ deadlineText })}
              value={this.state.deadlineText}
              placeholder="dd-mm-yy"
            />
            <CalenderTouchableOpacity onPress={() => this.showDateTimePicker("deadline")}>
              <Icon
                style={{ color: "#8C8076", fontSize: 18}}
                name="calendar"
              />
            </CalenderTouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isDeadlineDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={() =>this.hideDateTimePicker("deadline")}
            />
          </DateRow>
        </ContentRow>
        <ContentRow>
          <ContentTitle> etd</ContentTitle>
          <DateRow>
            <DateInput
              onChangeText={etdText => this.setState({ etdText })}
              value={this.state.etdText}
              placeholder="dd-mm-yy"
            />
            <CalenderTouchableOpacity onPress={() => this.showDateTimePicker("etd")}>
              <Icon
                style={{ color: "#8C8076", fontSize: 18}}
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
              onChangeText={sentText => this.setState({ sentText })}
              value={this.state.sentText}
              placeholder="dd-mm-yy"
            />
            <CalenderTouchableOpacity onPress={() => this.showDateTimePicker("sent")}>
              <Icon
                style={{ color: "#8C8076", fontSize: 18}}
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
              onChangeText={receivedText => this.setState({ receivedText })}
              value={this.state.receivedText}
              placeholder="dd-mm-yy"
            />
            <CalenderTouchableOpacity onPress={() => this.showDateTimePicker("received")}>
              <Icon
                style={{ color: "#8C8076", fontSize: 18}}
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
              onChangeText={commentText => this.setState({ commentText })}
              value={this.state.commentText}
              placeholder="dd-mm-yy"
            />
            <CalenderTouchableOpacity onPress={() => this.showDateTimePicker("commented")}>
              <Icon
                style={{ color: "#8C8076", fontSize: 18}}
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
      </View>
    );
  }
}
export default sampleComponent;
