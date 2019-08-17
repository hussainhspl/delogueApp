import React from "react";
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

const MainBox = styled.View`
  border: 1px solid #ddd;
  border-radius: 5px;
  width: ${Dimensions.get("window").width / 2 - 10};
  height: ${Dimensions.get("window").width / 2 + 50};
  margin: 5px;
`;
const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: #c6bfb8;
  border-bottom-width: 1px;
  background-color: #f1efed;
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
  font-size: 12px;
`;
const DateRow = styled.View`
  flex-direction: row;
`;
const DateInput = styled.TextInput`
  border: 1px solid #ddd;
  height: 20px;
  padding: 3px 6px;
  font-size: 13px;
  margin-right: 5px;
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
`;
const Pieces = styled.Text`
  background-color: #c2beb6;
  width: 40px;
  height: 20px;
  color: white;
  font-size: 13px;
  margin: 7px;
`;
const MessageRow = styled.View`
  flex-direction: row;
`;
class sampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      text: ""
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
  render() {
    return (
      <MainBox>
        <TitleRow>
          <Text> 1st proto sample </Text>
          <StatusDot style={{ backgroundColor: "#964F4C" }} />
        </TitleRow>
        <CardInfo>
          <MessageRow>
            <Image
              resizeMode={"cover"}
              source={require("../../img/sample/receivedblack.png")}
            />
            <CardTittle>sent</CardTittle>
          </MessageRow>
          <Pieces> 2 pcs </Pieces>
        </CardInfo>
        <ContentRow>
          <ContentTitle>deadline</ContentTitle>
          <DateRow>
            <DateInput
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              placeholder="dd-mm-yy"
            />
            <TouchableOpacity onPress={this.showDateTimePicker}>
              <Icon
                style={{ color: "#8C8076", fontSize: 20 }}
                name="calendar"
              />
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
            />
          </DateRow>
        </ContentRow>
        <ContentRow>
          <ContentTitle> etd</ContentTitle>
          <DateRow>
            <DateInput
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              placeholder="dd-mm-yy"
            />
            <TouchableOpacity onPress={this.showDateTimePicker}>
              <Icon
                style={{ color: "#8C8076", fontSize: 20 }}
                name="calendar"
              />
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
            />
          </DateRow>
        </ContentRow>
        <ContentRow>
          <ContentTitle> sent </ContentTitle>
          <DateRow>
            <DateInput
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              placeholder="dd-mm-yy"
            />
            <TouchableOpacity onPress={this.showDateTimePicker}>
              <Icon
                style={{ color: "#8C8076", fontSize: 20 }}
                name="calendar"
              />
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
            />
          </DateRow>
        </ContentRow>
        <ContentRow>
          <ContentTitle> received </ContentTitle>
          <DateRow>
            <DateInput
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              placeholder="dd-mm-yy"
            />
            <TouchableOpacity onPress={this.showDateTimePicker}>
              <Icon
                style={{ color: "#8C8076", fontSize: 20 }}
                name="calendar"
              />
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
            />
          </DateRow>
        </ContentRow>
        <ContentRow>
          <ContentTitle> commented </ContentTitle>
        </ContentRow>
      </MainBox>
    );
  }
}
export default sampleComponent;
