import React from "react";
import { View, Text } from "react-native";
import { Icon, Picker } from "native-base";
import styled from "styled-components";

const SummaryBox = styled.View`
  border-top-width: 1px;
  border-color: #aaa;
  margin: 0px 15px;
  padding: 15px;
`;
const Row = styled.View`
  flex-direction: row;
  flex: 1;
  /* align-items: center; */
  margin-bottom: 10px;
  align-items: ${props => (props.boolVar ? "flex-start" : "center")};
`;

const SummaryTitle = styled.Text`
  font-weight: 600;
  color: #9b9b9b;
  text-transform: uppercase;
  padding-right: 10px;
  width: 130px;
  text-align: right;
  padding-top: 5px;
  font-family: ${props => props.theme.bold};
`;
//drop down
const StyledView = styled.View`
  border: 1px solid #ddd;
  height: 30px;
  margin-top: 5px;
  flex: 1;
`;
const StyledPicker = styled(Picker)`
  height: 30px;
  flex: 1;
`;

const MainView = styled.View`
  flex: 1;
`;
class SampleRequestSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: "undefined",
      boolVar: true
    };
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }
  render() {
    return (
      <SummaryBox>
        <Row>
          <SummaryTitle> sample status </SummaryTitle>
          <StyledView>
            <StyledPicker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              placeholder="Select your SIM"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.selected2}
              onValueChange={this.onValueChange2.bind(this)}
            >
              <Picker.Item label="Sent" value="key0" />
              <Picker.Item label="ATM Card" value="key1" />
              <Picker.Item label="Debit Card" value="key2" />
              <Picker.Item label="Credit Card" value="key3" />
              <Picker.Item label="Net Banking" value="key4" />
            </StyledPicker>
          </StyledView>
        </Row>
        <Row>
          <SummaryTitle> sample type </SummaryTitle>
          <Text> photo sample</Text>
        </Row>
        <Row>
          <SummaryTitle> Milestone </SummaryTitle>
        </Row>
        <Row>
          <SummaryTitle> deadline </SummaryTitle>
        </Row>
        <Row>
          <SummaryTitle> etd </SummaryTitle>
        </Row>
        <Row>
          <SummaryTitle> tracking </SummaryTitle>
        </Row>
        <Row boolVar={true}>
          <SummaryTitle> note </SummaryTitle>
          <MainView>
            <Text>
              In id non ad exercitation laboris magna consectetur amet aliquip
              id do.
            </Text>
          </MainView>
        </Row>
      </SummaryBox>
    );
  }
}

export default SampleRequestSummary;
