import React from "react";
import { View, Text, TouchableHighlight, AppState } from "react-native";
import styled from "styled-components";
import { Col, Row, Grid } from "react-native-easy-grid";
// relative import
import CommonModal from "../../shared/CommonModal";

const sizeXl = [
  {
    description: "S",
    req: '',
    comp: '',
    want: ''
  },
  {
    description: "M",
    req: '',
    comp: '',
    want: ''
  },
  {
    description: "L",
    req: '',
    comp: '',
    want: ''
  },
  {
    description: "XL",
    req: '',
    comp: '',
    want: ''
  }
];

const ViewChart = styled.Text`
  align-self: flex-start;
  text-transform: uppercase;
  color: white;
  text-align: center;
  padding: 3px 6px;
  
`;
const SetView = styled.View`
  background-color: #849d7a;
  align-self: flex-start;
  margin: 15px;

`;
const HeaderRow = styled(Row)`
  background-color: #c9c2bb;
  height: 40px;
`;
const StyleCol = styled(Col)`
  border: 1px solid #bbb;
  padding-left: 10px;
  height: 40px;
  justify-content: center;
`;
const TableTextInput = styled.TextInput`
  border: 1px solid #ddd;
  text-align: center;
  padding: 5px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

class SetRequestedQuantity extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      appState: AppState.currentState,
      modalVisible : false,
    }
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentDidMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount= () => {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
      // this.setState({modalVisible : !this.state.modalVisible}, () => console.log(this.state.modalVisible));
      this.setModalVisible(!this.state.modalVisible);
    }
  }
  render() {
    return (
      <View>
        <SetView>
          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
          >
            <ViewChart>set requested quantity </ViewChart>
          </TouchableHighlight>
        </SetView>
        <CommonModal
          title="Requested Quantity"
          modalVisible={this.state.modalVisible}
          close={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <View>
            <Grid>
              <HeaderRow>
                <StyleCol size={1}>
                  <Text> Description </Text>
                </StyleCol>
                <StyleCol size={1}>
                  <Text> Available </Text>
                </StyleCol>
                <StyleCol size={1}>
                  <Text> Red Desert </Text>
                </StyleCol>
                <StyleCol size={1}>
                  <Text> Blue Ocean </Text>
                </StyleCol>
              </HeaderRow>
              {sizeXl.map(data => {
                return (
                  <Row style={{ height: 40 }} key={Math.random().toFixed(3)}>
                    <StyleCol size={1}>
                      <Text>{data.description}</Text>
                    </StyleCol>
                    <StyleCol size={1}>
                      <TableTextInput>{data.comp}</TableTextInput>
                    </StyleCol>
                    <StyleCol size={1}>
                      <TableTextInput>{data.comp}</TableTextInput>
                    </StyleCol>
                    <StyleCol size={1}>
                      <TableTextInput>{data.comp}</TableTextInput>
                    </StyleCol>
                  </Row>
                );
              })}
            </Grid>
          </View>
        </CommonModal>
      </View>
    );
  }
}
export default SetRequestedQuantity;