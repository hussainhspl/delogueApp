import React, { Fragment } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback
  
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
  flex-direction: row;
  position: relative;
  margin: 10px auto;
`;
const CommentedButton = styled(View)`
  background-color: #99afaf;
  padding: 0;
  justify-content: center;
  align-items: center;
  height: 30;
`;
const IconView = styled.View`
  width: 30px;
  height: 30px;
  background-color: #415461;
  justify-content: center;
  align-items: center;
`;
const ButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  padding: 0px 10px;
  text-align: center;
  font-family: ${props => props.theme.regular};
`;
// button css end
const SampleRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
const ButtonOverlay = styled.View`
  position: absolute;
  top: 0;
  bottom: 0px;
  left: 0;
  right: 0;
  background-color: #dddddd33;
  z-index: 1;
`;
class Sample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleRequest: false,
      showOpacity: false,
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
            <View>
            <TouchableWithoutFeedback
              onPressIn={() => this.setState({ showOpacity: true })}
              onPressOut={() => this.setState({ showOpacity: false })}
              onPress={() => {}}
            >
              <ButtonRow>
                 {this.state.showOpacity && <ButtonOverlay />}
                <CommentedButton>
                  <ButtonText> hide commented </ButtonText>
                </CommentedButton>
                  <IconView>
                    <Icon style={{ color: "#fff", fontSize: 15 }} name="eye" />
                  </IconView>
              </ButtonRow>
            </TouchableWithoutFeedback>
              </View>
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
