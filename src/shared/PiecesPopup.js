import React, { Fragment } from "react";
import { View, Text, Modal, Dimensions, ScrollView, TextInput } from "react-native";
import styled from 'styled-components';
import ApplyButton from '../styles/ApplyButton'
import TouchableApply from "../styles/TouchableApply";
import {sampleSizes } from '../store/actions/index';
import { connect } from "react-redux";



const colArr = ['Availble', '102 Nude', '200 Black', '300 White', '400 Cherry Red', '500 Orange'];
const sizeArr = ['S', 'M', 'L', 'XL', 'Total'];
const MainArr = [
  {
    size: 'S',
    Available: '',
    spec: [{
      color: '102 Nude',
      qty: 1,
    },
    {
      color: '200 Black',
      qty: '',
    },
    {
      // Available: true,
      color: '300 White',
      qty: 3,
    }, {
      color: '200 Black',
      qty: '',
    }, {
      color: '200 Black',
      qty: '',
    },]
  },
  {
    size: 'M',
    Available: '',
    spec: [{
      color: '102 Nude',
      qty: 4,
    },
    {
      // Available: true,
      color: '102 Nude',
      qty: 5,
    },
    {
      // Available: true,
      color: '102 Nude',
      qty: '',
    }, {
      qty: 3,
    }, {
      qty: 3,
    }]
  },
  {
    size: 'L',
    Available: '',
    spec: [{
      color: '102 Nude',
      qty: 7,
    },
    {
      Available: true,
      color: '102 Nude',
      qty: 8,
    },
    {
      Available: true,
      color: '102 Nude',
      qty: 9,
    }, {
      qty: 3,
    }, {
      qty: 3,
    }]
  },
  {
    size: 'XL',
    Available: '',
    spec: [{
      color: '102 Nude',
      qty: 27,
    },
    {
      Available: true,
      color: '102 Nude',
      qty: 28,
    },
    {
      Available: true,
      color: '102 Nude',
      qty: 11,
    }, {
      qty: 13,
    }, {
      qty: 13,
    }]
  }
]
const BgView = styled.View`
  background-color: ${props => props.theme.overlayBlue};
  flex: 1;
  justify-content: flex-end;
`;
const ModalView = styled.View`
  height: 60%;
  padding-top: 10px;
  background-color: #fff;
`;
const ColumnRow = styled.View`
  flex-direction: row;
`;
const HeaderColumn = styled.View`
  width: ${Dimensions.get("window").width / 5};
  height: ${Dimensions.get("window").width / 7};
  justify-content: center;
  align-items: center;
  background-color: #ccc;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-color: #aaa;
  padding: 5px;
`;

const Column = styled.View`
  width: ${Dimensions.get("window").width / 5};
  height: ${Dimensions.get("window").width / 7};
  justify-content: center;
  align-items: center;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-color: #aaa;
  padding: 5px;
`;
const TableData = styled.View`
  height: ${(Dimensions.get("window").width / 7) * 4.5};
`;
const SaveRow = styled.View`
  align-items: flex-end;
  padding: 15px;
`;
const ApplyButtonText = styled.Text`
	color: #fff;
	text-transform: uppercase;
	padding-bottom: -5px;
`;

class PiecesPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      piecesData: null
    }
  }
  componentDidMount = () => {
    this.setState({
      piecesData: this.props.data
    }, () => this.createTable())
  }
  createTable() {
    // let rowCount = this.state.piecesData.length;
    // let colCount = this.state.piecesData.requestedSampleSizeSpecs.length + 1;
    // let rawArray = [...Array(rowCount)].map(x => Array(colCount).fill(0));
    // rawArray.map((d, index) => {
    //   return (
  }
  onChangeText(value, cid, sid) {
    console.log('value', value, cid, sid);

    this.setState(prevState =>({
      piecesData : prevState.piecesData.map(
        el => el.sizeRangeSizeId == sid ? { ...el, 
          requestedSampleSizeSpecs : el.requestedSampleSizeSpecs.map(
            el1 => el1.styleColorId == cid ? {
              ...el1, quantity: value
            } : el1
          )
        }
        : el
      )
    }),() => {
        console.log('popup data changed', this.state.piecesData);
        this.props.sampleSizesFunction(this.state.piecesData);
      }
    )
    
  }
  render() {
    console.log("pieces called", this.state.piecesData);
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
        }}
      >
        <BgView>
          {this.state.piecesData != null ?
            <ModalView>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View>
                  <ColumnRow>
                    <HeaderColumn>
                      <Text>Size</Text>
                    </HeaderColumn>

                    {this.state.piecesData[0].requestedSampleSizeSpecs.map(c => {
                      return (
                        <HeaderColumn>
                          <Text>{c.available == true ? "Available" : c.styleColorName}</Text>
                        </HeaderColumn>
                      )
                    })
                    }
                  </ColumnRow>
                  <TableData>
                    <ScrollView>
                      {
                        this.state.piecesData.map(data => {
                          return (
                            <ColumnRow>
                              <Column>
                                <Text>{data.sizeRangeSizeName}</Text>
                              </Column>

                              {data.requestedSampleSizeSpecs.map(d => {
                                return (
                                  <Column>
                                    {/* <Text>{d.quantity}</Text>dfaf */}
                                    <TextInput
                                      style={{ height: 30, textAlign: "center", width: '100%', borderColor: '#ccc', borderWidth: 1, padding: 5 }}
                                      onChangeText={text => this.onChangeText(text, d.styleColorId, data.sizeRangeSizeId)}
                                      keyboardType="numeric"
                                      value={`${d.quantity}`}
                                    />
                                  </Column>
                                )
                              })}
                            </ColumnRow>
                          )
                        })
                      }
                      <ColumnRow>
                        <Column>
                          <Text>Total</Text>
                        </Column>
                        {
                          colArr.map(d => {
                            return (
                              <Column />
                            )
                          })
                        }
                      </ColumnRow>
                    </ScrollView>
                  </TableData>
                </View>
              </ScrollView>
              <SaveRow>
                <ApplyButton>
                  <TouchableApply underlayColor="#354733" onPress={() => this.props.close()} >
                    <ApplyButtonText>save </ApplyButtonText>
                  </TouchableApply>
                </ApplyButton>
              </SaveRow>
            </ModalView>
            : null
          }
        </BgView>
      </Modal>
    )
  }
}
const mapStateToProps = state => {
  return {
    // sampleStatusState: state.sampleRequestTabs.sampleStatusState,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    
    sampleSizesFunction: (data) => dispatch(sampleSizes(data)),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PiecesPopup);
