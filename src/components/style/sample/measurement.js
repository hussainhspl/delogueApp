import React, { Fragment } from 'react';
import { View, Text, TouchableHighlight, TextInput } from 'react-native';
import styled from 'styled-components';
import CommonModal from "../../../shared/CommonModal";
import { Col, Row, Grid } from "react-native-easy-grid";
import SmallText from "../../../styles/SmallText";
import CardText from "../../../styles/CardText";
import { connect } from 'react-redux';
import { measurementTable } from '../../../store/actions/index';
// import GetAsyncToken from '../../../script/getAsyncToken';
// import GetMeasurement from '../../../api/sample/getMeasurement';

const desc = ["Req", "Comp", "Want"];
const colCount = [(key = 1), (key = 2), (key = 3)];
const descCol = [
  {
    title: "A) 1/2 Chest measurement from the top"
  },
  {
    title: "A) 1/2 Waist measurement from the top"
  },
  {
    title: "A) 1/2 Bottom measurement from the top"
  },
  {
    title: "Sleeve"
  },
  {
    title: "1/2 Cuff"
  }
]

const ViewChart = styled.Text`
  background-color: #849d7a;
  align-self: flex-start;
  text-transform: uppercase;
  color: white;
  text-align: center;
  padding: 3px 6px;
  font-family: ${props => props.theme.regular};
  /* justify-content: center; */
`;
const HeaderRow = styled(Row)`
  background-color: #c9c2bb;
  height: 40px;
  margin-top: 10px;
`;
const StyleCol = styled(Col)`
  border-right-width: 1px;
  border-bottom-width: 1px;

  border-color: #bbb;
  padding: 0px 5px;
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
const SView = styled.View`
  padding: 20px;
`;
const FirstRow = styled.View`
  flex-direction: row;
`;
class Measurement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      measurementLineComments: null
    }
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentDidMount = () => {
    console.log('hey');
    this.setState({
      measurementLineComments: this.props.data,
    })
    // GetAsyncToken()
    //   .then(token => {
    //     GetMeasurement(token, this.props.id)
    //       .then(res => {
    //         console.log('response from measurement api', res);
    //         this.setState({
    //           measurementLineComments: res.data.measurementLineComments,
    //         })
    //       })
    //   })
  }
  onChangeText(value, currentTableId, rowId, columnNumber) {
    console.log('value', value, currentTableId, rowId, columnNumber, this.state.measurementLineComments);
    if(columnNumber == 1) {
      this.setState(prevState => ({
        measurementLineComments: prevState.measurementLineComments.map(
          el => el.id == currentTableId ? {
            ...el,
            measurementLineMeasurements: el.measurementLineMeasurements.map(
              el1 => el1.id == rowId ? {
                ...el1, requestedMeasurement: value
              } : el1
  
            )
          }
            : el
        )
      }))
    }
    if(columnNumber == 2) {
      this.setState(prevState => ({
        measurementLineComments: prevState.measurementLineComments.map(
          el => el.id == currentTableId ? {
            ...el,
            measurementLineMeasurements: el.measurementLineMeasurements.map(
              el1 => el1.id == rowId ? {
                ...el1, companyMeasurement: value
              } : el1
  
            )
          }
            : el
        )
      }))
    }
    if(columnNumber == 3) {
      this.setState(prevState => ({
        measurementLineComments: prevState.measurementLineComments.map(
          el => el.id == currentTableId ? {
            ...el,
            measurementLineMeasurements: el.measurementLineMeasurements.map(
              el1 => el1.id == rowId ? {
                ...el1, newMeasurement: value
              } : el1
  
            )
          }
            : el
        )
      }))
    }
  }
  applyClick () {
    console.log('update measurement', this.state.measurementLineComments);
    // return;
    this.setState({
      modalVisible: !this.state.modalVisible
    }, 
    () => this.props.parent(this.state.measurementLineComments)
    // () => this.props.measurementTableFunction(this.state.measurementLineComments)
    )
  }
  render() {
    return (
      <View style={{ flexDirection: "row", padding: 0, justifyContent: "center" }}>
        {this.state.measurementLineComments != null ?
          <SView>
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >

              <ViewChart>view measurement chart</ViewChart>
            </TouchableHighlight>

            <CommonModal
              title="Measurement Chart"
              modalVisible={this.state.modalVisible}
              close={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              okClick={() => this.applyClick()}
            >
              <View>
                {
                  this.state.measurementLineComments.map(data => {
                    return (
                      // <FirstRow>
                      //   <View style={{ padding: 5 }}>
                      //     <SmallText>Size</SmallText>
                      //     <CardText numberOfLines={1}>{data.sizeRangeSizeName}</CardText>
                      //   </View>
                      //   <View style={{ padding: 5 }}>
                      //     <SmallText>Measurements in</SmallText>
                      //     <CardText numberOfLines={1}>{data.unit}</CardText>
                      //   </View>
                      // </FirstRow>


                      <Grid>
                        <FirstRow>
                          <View style={{ padding: 5 }}>
                            <SmallText>Size</SmallText>
                            <CardText numberOfLines={1}>{data.sizeRangeSizeName}</CardText>
                          </View>
                          <View style={{ padding: 5 }}>
                            <SmallText>Measurements in</SmallText>
                            <CardText numberOfLines={1}>{data.unit}</CardText>
                          </View>
                        </FirstRow>
                        <HeaderRow>
                          <StyleCol size={3}>
                            <Text> description </Text>
                            {/* 
                      <TextInput
                        style={{ height: 30, textAlign: "center", width: '100%', borderColor: '#ccc', borderWidth: 1, padding: 5 }}
                        onChangeText={text => this.onChangeText(text, d.styleColorId, data.sizeRangeSizeId)}
                        keyboardType="numeric"
                        value={`${d.quantity}`}
                      /> */}
                            <SmallText>measured in centimeter </SmallText>
                          </StyleCol>

                          {desc.map(d => {
                            console.log('measurement', d)
                            return (
                              <StyleCol size={1} key={Math.random().toFixed(3)}>
                                <Text> {d} </Text>
                              </StyleCol>
                            );
                          })}
                        </HeaderRow>
                        {data.measurementLineMeasurements.map(data1 => {
                          return (
                            <Row
                              style={{ height: 40 }}
                            // key={Math.random().toFixed(3)}
                            >
                              <StyleCol size={3}>
                                <Text>{data1.name}</Text>
                              </StyleCol>
                              <StyleCol size={1}>
                                {/* <Text>{data1.requestedMeasurement}</Text> */}
                                {/* 
                                  <TextInput
                                    style={{ height: 30, textAlign: "center", width: '100%', borderColor: '#ccc', borderWidth: 1, padding: 5 }}
                                    onChangeText={text => this.onChangeText(text, d.styleColorId, data.sizeRangeSizeId)}
                                    keyboardType="numeric"
                                    value={`${d.quantity}`}
                                  /> */}
                                <TextInput
                                  style={{ height: 30, textAlign: "center", width: '100%', borderColor: '#ccc', borderWidth: 1, padding: 5 }}
                                  value={data1.requestedMeasurement == null ? '-' : `${data1.requestedMeasurement}`}
                                  onChangeText={text => this.onChangeText(text, data.id, data1.id, 1)}
                                  keyboardType="numeric"
                                />
                              </StyleCol>
                              <StyleCol size={1}>
                                {/* <Text>b{data1.companyMeasurement}</Text> */}
                                <TextInput
                                  style={{ height: 30, textAlign: "center", width: '100%', borderColor: '#ccc', borderWidth: 1, padding: 5 }}
                                  value={data1.companyMeasurement != null ? `${data1.companyMeasurement}` : '-'}
                                  onChangeText={text => this.onChangeText(text, data.id, data1.id, 2)}
                                  keyboardType="numeric"
                                />
                              </StyleCol>
                              <StyleCol size={1}>
                                {/* <Text>c{data1.newMeasurement}</Text> */}
                                <TextInput
                                  style={{ height: 30, textAlign: "center", width: '100%', borderColor: '#ccc', borderWidth: 1, padding: 5 }}
                                  value={data1.newMeasurement != null ? `${data1.newMeasurement}` : '-'}
                                  onChangeText={text => this.onChangeText(text, data.id, data1.id, 3)}
                                  keyboardType="numeric"
                                />
                              </StyleCol>
                              {/* {colCount.map(data => {
                        return (
                          <StyleCol size={1}>
                            <TableTextInput
                              onChangeText={req => this.setState({ req })}
                              value={this.state.req}
                              name="req"
                              keyboardType="numeric"
                            >
                              aa
                            </TableTextInput>
                          </StyleCol>
                        );
                      })} */}
                            </Row>
                          );
                        })}

                      </Grid>
                    )
                  })
                }
              </View>
            </CommonModal>
          </SView>
          : null
        }
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    // unreadList: state.unreadMessagesList.unreadMessagesListState
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // measurementTableFunction: (data) => dispatch(measurementTable(data))
    
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Measurement);
