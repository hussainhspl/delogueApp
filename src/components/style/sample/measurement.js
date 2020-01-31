import React, {Fragment} from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import styled from 'styled-components';
import CommonModal from "../../../shared/CommonModal";
import { Col, Row, Grid } from "react-native-easy-grid";
import SmallText from "../../../styles/SmallText";
import CardText from "../../../styles/CardText";
import GetAsyncToken from '../../../script/getAsyncToken';
import GetMeasurement from '../../../api/sample/getMeasurement';

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
const SView = styled.View `
  padding: 20px;
`;
const FirstRow = styled.View`
  flex-direction: row;
`;
class Measurement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      measurementComments: null
    }
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentDidMount = () => {
    console.log('hey');
    GetAsyncToken()
      .then(token => {
        GetMeasurement(token, this.props.id)
          .then(res => {
            console.log('response from measurement api', res);
            this.setState({
              measurementComments: res.data.measurementComments,
            })
          })
      })
  }
  render() {
    return (
      <View style={{ flexDirection: "row", padding: 0, justifyContent: "center" }}>
        {this.state.measurementComments != null ?
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
            okClick={() => this.setState({
              modalVisible: !this.state.modalVisible
            })}
          >
            <View>
              {
                this.state.measurementComments.map(data => {
                  return(
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
                  <StyleCol size={4}>
                    <Text> description </Text>
                    <SmallText>measured in centimeter </SmallText>
                  </StyleCol>

                  {desc.map(d => {
                    return (
                      <StyleCol size={1}>
                        <Text> {d} </Text>
                      </StyleCol>
                    );
                  })}
                </HeaderRow>
                {data.measurementLineMeasurements.map(data1 => {
                  return (
                    <Row
                      style={{ height: 40 }}
                      key={Math.random().toFixed(3)}
                    >
                      <StyleCol size={4}>
                        <Text>{data1.name}</Text>
                      </StyleCol>
                      <StyleCol size={1}>
                        <Text>{data1.supplierMeasurement}</Text>
                      </StyleCol>
                      <StyleCol size={1}>
                        <Text>{data1.requestedMeasurement}</Text>
                      </StyleCol>
                      <StyleCol size={1}>
                        <Text>{data1.newMeasurement}</Text>
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
      : <Text>loading</Text>
        }
      </View>
    )
  }
}
export default Measurement;