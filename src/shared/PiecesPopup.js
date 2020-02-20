import React, { Fragment } from "react";
import { View, Text, Modal, Dimensions, ScrollView } from "react-native";
import styled from 'styled-components';
import ApplyButton from '../styles/ApplyButton'
import TouchableApply from "../styles/TouchableApply";


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
  background-color: #fff;/
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
    },() => this.createTable())
  }
  createTable() {
    let rowCount = this.state.piecesData.length;
    // let colCount = this.state.piecesData.requestedSampleSizeSpecs.length + 1;
    // let rawArray = [...Array(rowCount)].map(x => Array(colCount).fill(0));
    // rawArray.map((d, index) => {
    //   return (
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
                    <HeaderColumn>
                      <Text>Available</Text>
                    </HeaderColumn>
                    {this.state.piecesData[0].requestedSampleSizeSpecs.map(c => {
                      return (
                        <HeaderColumn key={Math.random().toFixed(3)}>
                          <Text>{c.styleColorName}</Text>
                        </HeaderColumn>
                      )
                    })
                    }
                  </ColumnRow>
                  <TableData>
                    <ScrollView>
                      {
                        MainArr.map(data => {
                          return (
                            <ColumnRow key={Math.random().toFixed(3)}>
                              <Column>
                                <Text>{data.size}</Text>
                              </Column>
                              <Column>
                                <Text></Text>
                              </Column>
                              {data.spec.map(data => {
                                return (
                                  <Column>
                                    <Text>{data.qty}</Text>
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
export default PiecesPopup;