import React, { Fragment } from 'react';
import { View, Text, TouchableHighlight, Alert, Dimensions, TouchableOpacity, AppState } from 'react-native';
import styled from 'styled-components';
import { Icon, Picker } from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
import { withTheme } from 'styled-components';
// relative import
import CommonModal from '../../../shared/CommonModal';
import SetRequestedQuantity from '../SetRequestedQuantity';
import CameraComponent from '../../../shared/CameraComponent';
import CameraView from '../../../styles/CameraView';
import ItemDetail from '../../../shared/ItemDetail';
import Title from '../../../styles/SmallText';
import GetAsyncToken from '../../../script/getAsyncToken';
import AddSample from '../../../api/sample/AddSample';
import TextEditor from '../textEditor'
import CardText from '../../../styles/CardText';
import SharedImagePicker from '../../../shared/sharedImagePicker';
import NotificationModal from '../NotificationModal';
import CreateSampleRequest from '../../../api/sample/CreateSampleRequest';
import { format } from 'date-fns';
import {sortBy, orderBy} from 'lodash';


const StyledView = styled.View`
	border: 1px solid #ddd;
	height: 30px;
  margin-top: 5px;
	flex: 1;
`;
const StyledPicker = styled(Picker)`
	/* height: 30px;
	flex: 1; */
  height: 30px;
  padding-top: 0px;
  padding-bottom: 2px;
`;
const DateRow = styled.View`
  flex-direction: row;
  margin-top: 5px;
  align-items: center;
`;
const DateInput = styled.TextInput`
  border: 1px solid #ddd;
  height: 30px;
  padding: 3px 6px;
  font-size: 14px;
  flex: 1;
`;


const AddView = styled.View`
  border: 1px solid #ddd;
  width: ${(props) => props.tablet ? Dimensions.get('window').width / 3 - 10 : Dimensions.get("window").width / 2 - 10};
  height: ${(props) => props.tablet ? Dimensions.get('window').width / 3 + 40 : Dimensions.get("window").width / 2 + 50};  
  margin: 3px;
  justify-content: center;
`;

const AddInnerView = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
`;
const MainContent = styled.View`
  /* flex-direction: row;
  flex-wrap: wrap; */
  flex: 1;
`;
const ContentBlock = styled.View`
  flex-basis: ${(props) => props.tablet ? Dimensions.get('window').width / 2 : Dimensions.get('window').width};
  padding: 15px;
  /* background-color: #ccc; */
`;
const AddText = styled.Text`
  flex-wrap: wrap;
  flex: 1;
  margin-right: 5px;
  font-family: ${props => props.theme.regular};
  color: ${props => props.theme.textColor};
`;
class NewSampleRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      textArea: '',
      isDeadlineDateTimePickerVisible: false,
      isEtdDateTimePickerVisible: false,
      deadline: null,
      etd: null,
      estimatedDate: null,
      tablet: false,
      appState: AppState.currentState,
      style: null,
      styleColors: null,
      sizeRange: null,
      currentStatus: null,
      currentLocation: null,
      currentType: null,
      adminLocations: null,
      notifyModal: false,
      notifyList: [],
      quantityData: null


    }
  }
  setModalVisible(visible) {
    console.log('props close click');
    this.setState({ modalVisible: visible });
  }
  onStatusChanged(value) {
    console.log("status value", value);
    this.setState({
      currentStatus: value,
    });
  }
  onTypeChanged(value) {
    console.log("type value", value);
    this.setState({
      currentType: value,
    });
  }
  onLocationChanged(value) {
    console.log("status value", value);
    this.setState({
      currentLocation: value,
    });
  }


  showDateTimePicker = (value) => {
    // console.log("calender clicked: ", value);
    if (value === 'deadline') {
      this.setState({ isDeadlineDateTimePickerVisible: true });
    }
    if (value === 'etd') {
      this.setState({ isEtdDateTimePickerVisible: true });
    }
  };

  hideDateTimePicker = (value) => {
    if (value === 'deadline') {
      this.setState({ isDeadlineDateTimePickerVisible: false });
    }
    if (value === 'etd') {
      this.setState({ isEtdDateTimePickerVisible: false });
    }
  };

  handleDatePicked = (date, value) => {
    console.log("A date has been picked: ", date, value);
    if (value === 'deadline') {
      this.setState({
        deadline: format(date, "dd-MMM-yyyy")
      }, () => console.log(this.state.deadline))
    }
    if (value === 'etd') {
      this.setState({
        etd: format(date, "dd-MMM-yyyy")
      }, () => console.log(this.state.etd))
    }
    this.hideDateTimePicker(value);
  };
  redirectTo = (history) => {
    // console.log('enter in  redirect function');
    // history.push("/notificationModal")
    this.setState({
      notifyModal: true,
      modalVisible: false
    })
  }
  addSampleRequest (selectedUser) {
    console.log('adding sample request successfully', selectedUser);
    GetAsyncToken()
      .then(token => {
        CreateSampleRequest(token, this.state.deadline, this.state.etd, selectedUser)
          .then( res => {
            console.log('response while creating sample request', res)
          })
      })
    this.setState({
      notifyModal: false,
      modalVisible: false
    })
  }
  componentDidMount = () => {
    if (Dimensions.get('window').width > 568) {
      this.setState({ tablet: true }, () => console.log("did mount", this.state.tablet))
    }
    
    AppState.addEventListener('change', this._handleAppStateChange);

    GetAsyncToken()
      .then(token => {
        AddSample(token, this.props.styleId)
          .then(res => {
            console.log('getting add sample data', res);
            this.setState({
              style: res.data.style,
              styleColors: res.data.styleColors,
              sizeRange: res.data.sizeRange,
              adminLocations: res.data.adminLocations
            }, () => this.setCurrentLocation());

            if (res.data.notifiedUsers.internalUsers.length > 0) {
              const sorted = orderBy(res.data.notifiedUsers.internalUsers, [user => user.name.toLowerCase()]);
              // console.log('sorted users', sorted);
              this.setState({
                notifyList: sorted
              })
            }
            if (res.data.notifiedUsers.otherUsers.length > 0) {
              let internalUser = this.state.notifyList;
              let allUser = internalUser.concat(res.data.notifiedUsers.otherUsers);
              const sorted = orderBy(allUser, [user => user.name.toLowerCase()]);
              // console.log('all user', allUser, sorted);
              this.setState({
                notifyList: sorted,
                otherUsers: res.data.otherUsers
              })
              
            }
          })

      })
  };
  setCurrentLocation () {
    // console.log('set location', this.state.adminLocations);
    let defaultLocation = this.state.adminLocations.filter(item => item.defaultLocation == true)
    this.setState({
      currentLocation: defaultLocation[0]
    })
  }
  componentWillUnmount = () => {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
      this.setState({ modalVisible: false }, () => console.log(this.state.modalVisible));
    }
  }
  render() {
    const history = this.props.history;
    // console.log("notifyList ", this.state.notifyList);
    // console.log('size ranges', this.state.sizeRange);

    // console.log("calender etd ", this.state.isEtdDateTimePickerVisible);
    return (
      <Fragment>
        {this.state.style != null ?
          <View>
            <TouchableHighlight
              underlayColor={this.props.theme.overlayBlue}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
              <AddView tablet={this.state.tablet}>
                <AddInnerView>
                  <View>
                    <Icon style={{ fontSize: 30, marginRight: 10 }} name="add" />
                  </View>
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <AddText>Add new sample request </AddText>
                  </View>
                </AddInnerView>
              </AddView>
            </TouchableHighlight>
            <CommonModal
              title='Requested Quantity'
              modalVisible={this.state.modalVisible}
              close={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              okButtonText="notification"
              okClick={() => this.redirectTo(history)}
            >
              <ItemDetail data={this.props.data} />
              <MainContent>
                <ContentBlock tablet={this.state.tablet}>
                  <Title> status </Title>
                  <StyledView>
                    <StyledPicker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      placeholder="select status"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.currentStatus}
                      onValueChange={this.onStatusChanged.bind(this)}
                    >
                      <Picker.Item label="Requested" value="Requested" />
                      <Picker.Item label="Planned" value="Planned" />
                    </StyledPicker>
                  </StyledView>
                </ContentBlock>
                <ContentBlock tablet={this.state.tablet}>
                  <Title> sample type </Title>
                  <StyledView>
                    <StyledPicker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      placeholder="select Type"
                      placeholderStyle={{ color: "#bfc6ea", fontSize: 14 }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.currentType}
                      onValueChange={this.onTypeChanged.bind(this)}
                    >
                      {this.state.style.season.seasonMilestones.map(u => {
                        return (
                          <Picker.Item label={u.sampleType.name} value={u} />
                        )
                      })}
                    </StyledPicker>
                  </StyledView>
                </ContentBlock>
                <ContentBlock tablet={this.state.tablet}>
                  <Title> deadline for sample </Title>
                  <DateRow>
                    <DateInput
                      onChangeText={text => this.setState({ text })}
                      value={this.state.deadline}
                      placeholder="dd-mm-yy"
                    />
                    <View>
                      <TouchableOpacity onPress={() => this.showDateTimePicker('deadline')}>
                        <Icon
                          style={{ color: "#8C8076", fontSize: 20, paddingLeft: 10, paddingVertical: 5 }}
                          name="calendar"
                        />
                      </TouchableOpacity>
                    </View>
                    <DateTimePicker
                      isVisible={this.state.isDeadlineDateTimePickerVisible}
                      onConfirm={(date) => this.handleDatePicked(date, 'deadline')}
                      onCancel={() => this.hideDateTimePicker('deadline')}
                    />
                  </DateRow>
                </ContentBlock>
                <ContentBlock tablet={this.state.tablet}>
                  <Title> ETD </Title>
                  <DateRow>
                    <DateInput
                      onChangeText={text => this.setState({ text })}
                      value={this.state.etd}
                      placeholder="dd-mm-yy"
                    />
                    <TouchableOpacity onPress={() => this.showDateTimePicker('etd')}>
                      <Icon
                        style={{ color: "#8C8076", fontSize: 20, paddingLeft: 10, paddingVertical: 5 }}
                        name="calendar"
                      />
                    </TouchableOpacity>
                    <DateTimePicker
                      isVisible={this.state.isEtdDateTimePickerVisible}
                      onConfirm={(date) => this.handleDatePicked(date, 'etd')}
                      onCancel={() => this.hideDateTimePicker('etd')}
                    />
                  </DateRow>
                </ContentBlock>
                <ContentBlock tablet={this.state.tablet}>
                  <Title> Tracking Number </Title>
                  <DateRow>
                    <DateInput
                      onChangeText={text => this.setState({ text })}
                      value={this.state.text}
                      placeholder="Enter number"
                    />
                  </DateRow>
                </ContentBlock>
                <ContentBlock tablet={this.state.tablet}>
                  <Title> Location </Title>
                  <StyledView>
                    <StyledPicker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      placeholder="select Location"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.currentLocation}
                      onValueChange={this.onLocationChanged.bind(this)}
                    >
                      {
                        this.state.adminLocations.map(l => {
                          return(
                            <Picker.Item label={l.name} value={l} />
                          )
                        })
                      }
                      <Picker.Item label="Requested" value="key0" />
                      <Picker.Item label="Sent" value="key1" />
                    </StyledPicker>
                  </StyledView>
                </ContentBlock>
                <ContentBlock tablet={this.state.tablet}>
                  <Title> Address </Title>
                    <CardText>{this.state.currentLocation != null ? this.state.currentLocation.address: null}</CardText>
                </ContentBlock>
              </MainContent>
              {/* <CommentedButton small>
            <IconView>
              <Icon style={{ color: "#fff", fontSize: 15 }} name="tablet-portrait" />
            </IconView>
            <ButtonText> use template </ButtonText>
          </CommentedButton> */}
              <Title style={{ paddingLeft: 15 }}> Comment </Title>
              <View style={{ height: 200, margin: 15 }}>
                <TextEditor
                  bodyHtml={(html) => this.setState({ textArea: html })}
                />
              </View>
              <SharedImagePicker />
              {this.state.sizeRange != null &&(
                <SetRequestedQuantity
                  styleColors={this.state.styleColors}
                  sizeRange={this.state.sizeRange}
                  sendQuantity={(d1) => this.setState({quantityData: d1},() => console.log('d1', d1, this.state.quantityData))}
                />
              )}
            </CommonModal>
            {
              this.state.notifyModal &&(
                <NotificationModal 
                  allUsers= {this.state.notifyList}
                  close={() => {
                    this.setState({notifyModal: false, modalVisible: true});
                  }}
                  applyClick = {(d1) => this.addSampleRequest(d1)}
                />
              )
            }
            
          </View>
          : <Text>loading</Text>}
      </Fragment>
    )
  }
}

export default withTheme(NewSampleRequest);