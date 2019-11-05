import React, { Fragment } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableHighlight
  
} from "react-native";
import styled from "styled-components";
import { Icon } from "native-base";
import SampleComponent from "./sampleComponent";
import NewSampleRequest from "./NewSampleRequest";
import SampleRequest from "./SampleRequest";
import ItemDetail from "../shared/ItemDetail";
// import console = require("console");

const data = {
  styleNo: "sty2211",
  styleName: "Casual Shirt",
  supplier: "head textiles",
  season: "summer"
};

const sampleArr = [{ key: 1 }, { key: 2 }, { key: 3 }];
const StyleDescriptionRow = styled.View`
  padding: 5px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  margin-bottom: 5px;
`;
// button css start
const ButtonRow = styled.View`
  justify-content: center;
  align-items: center;
`;
const CommentedButton = styled(View)`
  background-color: #99afaf;
  margin-left: 15;
  width: 180;
  margin: 15px auto;
  padding: 0;
  flex-direction: row;
  align-items: center;
`;
const IconView = styled.View`
  width: 30;
  height: 30;
  background-color: #415461;
  justify-content: center;
  align-items: center;
`;
const ButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  width: 150;
  text-align: center;
  font-family: ${props => props.theme.regular};
`;
// button css end
const SampleRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

class Sample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleRequest: true
    };
  }
  saveChanges() {
    // console.log("parent function called", this.state.sampleRequest);
    this.setState({
      sampleRequest: false
    });
  }
  render() {
    const history = this.props.history;
    return (
      <Fragment>
        <ItemDetail data={data} />
        {this.state.sampleRequest == false && (
          <Fragment>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ButtonRow>
              <CommentedButton small>
                <ButtonText> hide commented </ButtonText>
                <IconView>
                  <Icon style={{ color: "#fff", fontSize: 15 }} name="eye" />
                </IconView>
              </CommentedButton>
            </ButtonRow>
            <SampleRow>
              {sampleArr.map(data => {
                return (
                  <SampleComponent
                    data={data}
                    close={() => {
                      this.setState({ sampleRequest: true });
                      console.log("hello");
                    }}
                  />
                );
              })}
              <NewSampleRequest history={this.props.history} />
            </SampleRow>
          </ScrollView>
          </Fragment>
        )}
        {this.state.sampleRequest == true && (
          <SampleRequest
            apply={() => this.saveChanges()}
            history={this.props.history}
          />
        )}
      </Fragment>
    );
  }
}
export default Sample;
