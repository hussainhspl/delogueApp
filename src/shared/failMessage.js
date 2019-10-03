import React from "react";
import { View, Text } from "react-native";
import ErrorMessage from "../styles/ErrorMessage";
import styled from "styled-components";

const WhiteText = styled.Text`
  color: #fff;
`;

class FailMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ErrorMessage>
        <WhiteText> {this.props.message} </WhiteText>
      </ErrorMessage>
    );
  }
}
export default FailMessage;
