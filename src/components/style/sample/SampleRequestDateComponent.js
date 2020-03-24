import React, { Fragment } from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import { Icon, Picker } from "native-base";
// import DateTimePicker from "react-native-modal-datetime-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SmallText from "../../../styles/SmallText";
import CardText from "../../../styles/CardText";
import PiecesPopup from "../../../shared/PiecesPopup";


import { format } from "date-fns";
import { orderBy } from "lodash";
import EditDate from "../../../api/sample/editDate";
import GetAsyncToken from "../../../script/getAsyncToken";

const SampleName = styled.Text`
  color: ${props => props.theme.darkBlue};
  font-weight: 700;
  padding-bottom: 5px;
`;

const FirstRow = styled.View`
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;

const PiecesMain = styled.View`
  justify-content: center;
  align-items: flex-end;
`;
const PiecesView = styled.TouchableHighlight`
  background-color: #c2beb6;
  max-width: 60px;
  height: 20px;
  /* margin: 10px 5px; */
`;
const Pieces = styled.Text`
  color: white;
  font-size: ${props => props.theme.large};
  font-family: ${props => props.theme.regular};
`;
const DetailRow = styled.View`
  flex-direction: row;
`;
const Block = styled.TouchableOpacity`
  width: 100px;
`;

class SampleRequestDateComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: null,
      isDeadlineDatePickerVisible: false,
      isEtdDatePickerVisible: false,
      piecesModal: false,
      sampleData: null,
    };
  }
  componentDidMount = () => {
    this.setState({
      sampleData : this.props.data
    })
  }
  showDatePicker = value => {
    if (value == "deadline") {
      this.setState({ isDeadlineDatePickerVisible: true });
    } else if (value == "etd") {
      this.setState({ isEtdDatePickerVisible: true });
    }
  };

  hideDatePicker = value => {
    if (value == "deadline") {
      this.setState({ isDeadlineDatePickerVisible: false });
    } else if (value == "etd") {
      this.setState({ isEtdDatePickerVisible: false });
    } else {
      this.setState({
        isDeadlineDatePickerVisible: false,
        isEtdDatePickerVisible: false
      });
    }
  };

  handleConfirm = date => {
    // console.log("A date has been picked: ", date);
    let newDate = format(date, "dd-MMM-yy");
    if (this.state.isDeadlineDatePickerVisible == true) {
      this.setState(
        {
          selectedType: 0
        },
        () => {
          console.log("selectedType", this.state.selectedType);
          this.editDateByType(newDate);
        }
      );
      // console.log('deadline date', newDate);
    }
    if (this.state.isEtdDatePickerVisible == true) {
      this.setState(
        {
          selectedType: 1
        },
        () => this.editDateByType(newDate)
      );
    }
    this.hideDatePicker();
  };

  editDateByType(newDate) {
    console.log("new date", newDate, this.state.sampleData);
    GetAsyncToken().then(token => {
      EditDate(
        token, this.state.sampleData.id,
        this.state.selectedType, newDate
      ).then(res => {
        console.log("date edited successfully", res);
        if (this.state.selectedType == 0) {
          const date = new Date(res.data.deadline);
          let localDate = new Date(
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
          );
          let formattedDeadline = format(localDate, "d-MMM-yyyy");
          this.setState(
            prevState => ({
              sampleData: {
                ...prevState.sampleData,
                deadline: formattedDeadline
              }
            }),
            () => this.updateRedux(formattedDeadline)
          );
        }
        if (this.state.selectedType == 1) {
          console.log("enter in etd state");
          const date = new Date(res.data.etd);
          let localDate = new Date(
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
          );
          let formattedEtd = format(localDate, "d-MMM-yyyy");
          this.setState(prevState => ({
            sampleData: {
              ...prevState.sampleData,
              etd: formattedEtd
            }
          }));
        }
      });
    });
  }

  render() {
    return (
      // <Text> date Component </Text>
      <View>
      {this.state.sampleData != null ?
      <View>
       
        <FirstRow>
          <View style={{ flex: 1 }}>
            <SampleName numberOfLine={1}>
              {this.state.sampleData.typeOfSample.name}
            </SampleName>
            <DateTimePickerModal
              isVisible={this.state.isDeadlineDatePickerVisible}
              onConfirm={this.handleConfirm}
              onCancel={() => this.hideDatePicker("deadline")}
            />
            <DateTimePickerModal
              isVisible={this.state.isEtdDatePickerVisible}
              onConfirm={this.handleConfirm}
              onCancel={() => this.hideDatePicker("etd")}
            />
            <DetailRow>
              <Block onPress={() => this.showDatePicker("deadline")}>
                <SmallText>Deadline</SmallText>
                <CardText numberOfLines={1}>
                  {this.state.sampleData.deadline}
                </CardText>
              </Block>
              <Block onPress={() => this.showDatePicker("etd")}>
                <SmallText>ETD</SmallText>
                <CardText numberOfLines={1}>
                  {this.state.sampleData.etd}
                </CardText>
              </Block>
              <Block>
                <SmallText>Tracking Number </SmallText>
                <CardText numberOfLines={1}>
                  {this.state.sampleData.trackingNumber}
                </CardText>
              </Block>
            </DetailRow>
          </View>
          {this.state.sampleData.status != 7 && (
            //this.state.sampleData.status is defined only when sample status is planned
            <PiecesMain>
              <PiecesView
                underlayColor="#a39e95"
                onPress={() => this.setState({ piecesModal: true })}
              >
                <Pieces numberOfLines={1}>
                  {this.state.sampleData.pieces}
                  {this.state.sampleData.pieces > 1 ? "pcs" : "pc"}
                </Pieces>
              </PiecesView>
            </PiecesMain>
          )}
        </FirstRow>
        <PiecesPopup
          modalVisible={this.state.piecesModal}
          close={() => this.updatePieces()}
          data={this.state.sampleData.requestedSampleSizes}
        />
        
      </View>
      :null
      }
      </View>
    );
  }
}
export default SampleRequestDateComponent;
