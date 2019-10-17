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
const MainBox = styled.View`
  border: 1px solid #ddd;
  /* border-radius: 5px; */
  width: ${(props) => props.tablet ? Dimensions.get('window').width / 3 -10 : Dimensions.get("window").width / 2 - 10};
  height: ${(props) => props.tablet ? Dimensions.get('window').width / 3 +40 : Dimensions.get("window").width / 2 + 80};
  margin: 5px;
`;
class Sample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleRequest: false
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
    // console.log("sample req state ", this.state.sampleRequest);
    // console.log("history on sample page:", history);
    return (
      <Fragment>
        {this.state.sampleRequest == false && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <ItemDetail data={data} />
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
                  <MainBox tablet={this.state.tablet}>
                  
                  <TouchableHighlight
                  underlayColor="#42546033"
                    style={{paddingBottom: 33}}       
                    key={data.key}
                    onPress={() => {
                      this.setState({ sampleRequest: false });
                    }}
                  >
                    <SampleComponent />
                  </TouchableHighlight>
                  </MainBox>
                );
              })}
              <NewSampleRequest history={this.props.history} />
            </SampleRow>
          </ScrollView>
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
