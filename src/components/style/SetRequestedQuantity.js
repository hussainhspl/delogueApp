import React, { Fragment } from "react";
import { View, Text, TouchableHighlight, AppState, ScrollView, TextInput } from "react-native";
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
  margin-bottom:30px;  

`;
const HeaderRow = styled.View`
  
  height: 40px;
  flex-direction: row;
`;
const StyleCol = styled.View`
  border-bottom-width: 1px;
  border-right-width: 1px;
  border-color: #544c46;
  padding: 5px;
  height: 40px;
  justify-content: center;
`;
const HeaderStyleCol = styled.View`
  border-bottom-width: 1px;
  border-right-width: 1px;
  border-color: #544c46;
  padding: 5px;
  height: 40px;
  justify-content: center;
  background-color: #c9c2bb;
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
    this.state = {
      appState: AppState.currentState,
      modalVisible: false,
      sizeRange: null,
      styleColors: null,
      selectedQuantity: [],
      initArray: null

    }
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentDidMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
    // console.log('table called', this.props.sizeRange);sss
    this.setState({
      sizeRange: this.props.sizeRange,
      styleColors: this.props.styleColors
    })
    let rowCount = this.props.sizeRange.sizes.length;
    let colCount = this.props.styleColors.length + 1;
    // console.log('count', rowCount, colCount);

    let rawArray = [...Array(rowCount)].map(x => Array(colCount).fill(0));
    rawArray.map((d, index) => {
      // console.log("d create object", d);
      // console.log('range size id',this.props.sizeRange.sizes[index].id);
      return (

        rawArray[index] = {
          "SizeRangeSizeId": this.props.sizeRange.sizes[index].id,
          "RequestedSampleSizeSpecCommands":
            d.map((i, innerIndex) => {
              // console.log('color id', innerIndex, this.props.styleColors);
              return (
                rawArray[index][innerIndex] = {
                  "Available": innerIndex == 0 ? true : false,
                  "StyleColorId": innerIndex == 0 ? "-1" : this.props.styleColors[innerIndex - 1].id,
                  "Quantity": "0"
                }
              )
            })
        }
      )
    })
    console.log('size array', rawArray);
    this.setState({
      initArray: rawArray,
    })
  }
  onChangeText(value, cid, sid) {
    console.log('value', value, cid, sid);
    // let stateArray = this.state.initArray;
    // stateArray.map((data, idx1) => {
    //   if (data.SizeRangeSizeId == sid) {
    //     console.log('data', data);
    //     data.RequestedSampleSizeSpecCommands.map((d, idx2) => {
    //       if (d.StyleColorId == cid) {
    //         console.log('data1', d);
    //         d.Quantity = value
    //       }
    //     })
    //   }
    // })

    // this.setState({
    //   initArray: stateArray
    // })
    this.setState(prevState =>({
      initArray : prevState.initArray.map(
        el => el.SizeRangeSizeId == sid ? { ...el, 
          RequestedSampleSizeSpecCommands : el.RequestedSampleSizeSpecCommands.map(
            el1 => el1.StyleColorId == cid ? {
              ...el1, Quantity: value
            } : el1
          )
        }
        : el
      )
    }))

  }
  componentWillUnmount = () => {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
      // this.setState({modalVisible : !this.state.modalVisible}, () => console.log(this.state.modalVisible));
      this.setModalVisible(!this.state.modalVisible);
    }
  }

  updateQuantity() {
    this.props.sendQuantity(2);
    this.setModalVisible(!this.state.modalVisible);
  }
  render() {
    console.log("sample data :", this.state.initArray);

    return (
      <Fragment>
        {this.state.sizeRange != null ?

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
              okClick={() => this.updateQuantity()}
              close={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <View >
                <ScrollView horizontal={true}>
                <View>
                <HeaderRow>
                  <HeaderStyleCol style={{ width: 70 }}>
                    <Text> Size </Text>
                  </HeaderStyleCol>
                  <HeaderStyleCol style={{ width: 100 }}>
                    <Text> Available </Text>
                  </HeaderStyleCol>
                  {
                    this.state.styleColors.map(c => {
                      return (
                        <HeaderStyleCol style={{ width: 100 }}>
                          <Text> {c.name} </Text>
                        </HeaderStyleCol>
                      )
                    })
                  }
                </HeaderRow>

                {this.state.initArray != null ?
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <View>
                      {
                        this.state.sizeRange.sizes.map(data => {
                          return (

                            <StyleCol style={{ width: 70, height: 40 }}>
                              <Text>{data.name}</Text>
                            </StyleCol>
                          )
                        })
                      }
                    </View>
                    <View>
                      {
                        this.state.initArray.map((d, index) => {

                          return (
                            <View style={{ flexDirection: "row" }}>{
                              d.RequestedSampleSizeSpecCommands.map((i, innerIndex) => {
                                console.log('i', i, i.Quantity, d.SizeRangeSizeId);
                                return (
                                  <StyleCol style={{ width: 100 }}>
                                    <TextInput
                                      style={{ height: 30, borderColor: 'gray', borderWidth: 1, padding: 5 }}
                                      onChangeText={text => this.onChangeText(text, i.StyleColorId, d.SizeRangeSizeId)}
                                      value={i.Quantity}
                                      keyboardType="numeric"


                                    />
                                  </StyleCol>
                                )
                              })
                            }
                            </View>
                          )
                        })
                      }
                    </View>
                  </View>
                  : null
                }
                </View>
                </ScrollView>
              </View>
            </CommonModal>
          </View>
          : null}
      </Fragment>
    );
  }
}
export default SetRequestedQuantity;


// {
//   this.state.initArray.map((d, index) => {
//     return (
//       d.RequestedSampleSizeSpecCommands.map((i, innerIndex) => {
//         console.log('i', i, i.Quantity, d.SizeRangeSizeId);
//         return (
//           <StyleCol style={{ width: 100 }}>
//             <TextInput
//               style={{ height: 30, borderColor: 'gray', borderWidth: 1, padding: 5 }}
//               onChangeText={text => this.onChangeText(text, i.StyleColorId, d.SizeRangeSizeId)}
//               value={i.Quantity}
//             />
//           </StyleCol>

//         )
//       })

//     )
//   })
// }