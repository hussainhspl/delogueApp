import React, {Fragment} from 'react';
import {View, Text, TouchableHighlight, Alert, Dimensions, TouchableOpacity, AppState} from 'react-native';
import styled from 'styled-components';
import CommonModal from '../shared/CommonModal';
import {Icon, Picker} from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
import CameraComponent from '../shared/CameraComponent';
import SetRequestedQuantity from './SetRequestedQuantity';
import CameraView from '../styles/CameraView';

const SampleRequestRow = styled.View`
  flex-direction: row;
  margin: 15px;
`;
const ImageView = styled.View`
  height: ${Dimensions.get('window').width/ 3 +30};
  width: ${Dimensions.get('window').width/ 3};
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  
  
`;
const ImageDetails = styled.View`
  text-align: center;
  flex: 1;
  align-items: center;
  margin: 20px 10px 20px 10px;
`;
const StyleImage = styled.Image`
  max-height: ${Dimensions.get('window').width/ 3};
  width: ${Dimensions.get('window').width/ 3-20};
`;
const StyleInfo = styled.View`
  flex-direction: row;
  padding-bottom: 10px;
`;
const Title = styled.Text`
  width: 45%;
  text-align: right;
  color: #9b9b9b;
  text-transform: uppercase;
  font-weight: 600;
  padding-right: 5px;
  font-size: 13;
`;
const SubTitle = styled.Text`
  text-align: left;
  width: 55%;
  color: #4a4a4a;
  padding-left: 5;
  text-transform : capitalize;
  font-size: 13;
`;
const ContentTitle = styled.Text`
  text-transform: uppercase;
  color: #8c8076;
  font-size: 12px;
  padding-bottom: 5px;
`;
const StyledView = styled.View`
	border: 1px solid #ddd;
	height: 30px;
	flex: 1;
`;
const StyledPicker = styled(Picker)`
	height: 30px;
	flex: 1;
`;
const DateRow = styled.View`
  flex-direction: row;
  /* margin: 0px 15px; */
  align-items: center;
`;
const DateInput = styled.TextInput`
  border: 1px solid #ddd;
  height: 30px;
  padding: 3px 6px;
  font-size: 14px;
  flex: 1;
`;

const CommentedButton = styled(View)`
  background-color: #99afaf;
  margin-left: 15;
  width: 180;
  margin: 15px;
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
`;
const TextArea = styled.TextInput`
	border: 1px solid #ddd;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 10px;
  margin: 5px 15px 10px 15px;

`;
const StyleFileTitle = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: ${props => props.theme.lightBrown};
	border: 1px solid #DCD7D4;
`;
const Capital = styled.Text`
	text-transform: uppercase;
`;
const AddView = styled.View`
  border: 1px solid #ddd;
  width: ${(props) => props.tablet ? Dimensions.get('window').width / 3-10 : Dimensions.get("window").width / 2 - 10};
  height: ${(props) => props.tablet ? Dimensions.get('window').width / 3 +40 : Dimensions.get("window").width / 2 + 80};  
  margin: 5px;
  /* border-radius: 5px;   */
  justify-content: center;
`;

const AddInnerView = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
`;
const MainContent = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
`;
const ContentBlock = styled.View`
  flex-basis: ${(props) => props.tablet ? Dimensions.get('window').width / 2 : Dimensions.get('window').width};
  padding: 15px;

  /* background-color: #ccc; */
`;
class NewSampleRequest extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      modalVisible : false,
      textArea: '',
      isDeadlineDateTimePickerVisible: false,
      isEtdDateTimePickerVisible: false,
      tablet: false,
      appState: AppState.currentState,
    }
  }
  setModalVisible(visible) {
    console.log('props close click');
    this.setState({modalVisible: visible});
  }
  onValueChange2(value: string) {
		this.setState({
			selected2: value,
			note
		});
  }

showDateTimePicker = (value) => {
  // console.log("calender clicked: ", value);
  if(value === 'deadline') {
    this.setState({ isDeadlineDateTimePickerVisible: true });
  }
  if(value === 'etd'){
    this.setState({ isEtdDateTimePickerVisible: true });
  }
};

hideDateTimePicker = (value) => {
  if(value === 'deadline') {
    this.setState({ isDeadlineDateTimePickerVisible: false });
  }
  if(value === 'etd'){
    this.setState({ isEtdDateTimePickerVisible: false });
  }
};

handleDatePicked = (date, value) => {
// console.log("A date has been picked: ", date, value);
this.hideDateTimePicker(value);
};
redirectTo =(history) => {
  // console.log('enter in  redirect function');
  history.push("/notificationModal")
}
// componentDidMount = () => {
  
// }
componentDidMount = () => {
  if(Dimensions.get('window').width >568) {
    this.setState({tablet: true},() =>console.log("will mount" , this.state.tablet))
  }
  AppState.addEventListener('change', this._handleAppStateChange);
}
componentWillUnmount= () => {
  AppState.removeEventListener('change', this._handleAppStateChange);
}
_handleAppStateChange = (nextAppState) => {
  if (nextAppState === 'background') {
    this.setState({modalVisible : false}, () => console.log(this.state.modalVisible));
  }
}
  render(){
    const history= this.props.history;
    console.log("tablet sample ",this.state.tablet);
    // console.log("calender etd ", this.state.isEtdDateTimePickerVisible);
    return(
      <View>
        <AddView tablet={this.state.tablet}>
          <TouchableHighlight
            underlayColor='rgba(221, 221, 221, 0.4)'
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
              <AddInnerView>
                <View>
                  <Icon style={{fontSize: 30, marginRight: 10}} name="add" /> 
                </View>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <Text style={{flexWrap: 'wrap', flex: 1, marginRight: 5, }}>Add new sample request </Text>
                </View>
              </AddInnerView>
				  </TouchableHighlight>
        </AddView>
        <CommonModal    
					title='Requested Quantity'
					modalVisible={this.state.modalVisible}
          close={() => {this.setModalVisible(!this.state.modalVisible);
          }}
          okButton = "notification"
          okClick = {() => this.redirectTo(history)}
				>
          <SampleRequestRow>
            <ImageView>
              <StyleImage
                resizeMode={"contain"}
                source={require('../../assets/img/shirt-static.png')}
              />
            </ImageView>
            <ImageDetails>
              <StyleInfo>
                <Title>brand</Title>
                <SubTitle numberOfLines={1} >demo brand</SubTitle>
              </StyleInfo>
              <StyleInfo>
                <Title>style name</Title>
                <SubTitle numberOfLines={1} >demo cool top</SubTitle>
              </StyleInfo>
              <StyleInfo>
                <Title>style no</Title>
                <SubTitle numberOfLines={1}>1250-demo</SubTitle>
              </StyleInfo>
              <StyleInfo>
                <Title>supplier</Title>
                <SubTitle numberOfLines={1}>demo supplier</SubTitle>
              </StyleInfo>
              <StyleInfo>
                <Title>season</Title>
                <SubTitle numberOfLines={1}>SS20</SubTitle>
              </StyleInfo>
            </ImageDetails>
          </SampleRequestRow>
          <MainContent>
            <ContentBlock tablet={this.state.tablet}>
              <ContentTitle> status </ContentTitle>
              <StyledView>
                <StyledPicker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="select status"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected2}
                  onValueChange={this.onValueChange2.bind(this)}
                >
                  <Picker.Item label="Requested" value="key0" />
                  <Picker.Item label="Sent" value="key1" />
                </StyledPicker>
              </StyledView>
            </ContentBlock>
            <ContentBlock tablet={this.state.tablet}>
              <ContentTitle> sample type </ContentTitle>
              <StyledView>
                <StyledPicker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="select status"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected2}
                  onValueChange={this.onValueChange2.bind(this)}
                >
                  <Picker.Item label="Requested" value="key0" />
                  <Picker.Item label="Sent" value="key1" />
                </StyledPicker>
              </StyledView>
            </ContentBlock>
            <ContentBlock tablet={this.state.tablet}>
              <ContentTitle> deadline for sample </ContentTitle>
              <DateRow>
                <DateInput
                  onChangeText={text => this.setState({ text })}
                  value={this.state.text}
                  placeholder="dd-mm-yy"
                />
                <View>
                  <TouchableOpacity onPress={() => this.showDateTimePicker('deadline')}>
                    <Icon
                      style={{ color: "#8C8076", fontSize: 20, paddingLeft: 10, paddingVertical: 5}}
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
              <ContentTitle> ETD </ContentTitle>
              <DateRow>
                <DateInput
                  onChangeText={text => this.setState({ text })}
                  value={this.state.text}
                  placeholder="dd-mm-yy"
                />
                <TouchableOpacity onPress={() =>this.showDateTimePicker('etd')}>
                  <Icon
                    style={{ color: "#8C8076", fontSize: 20, paddingLeft: 10, paddingVertical: 5}}
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
              <ContentTitle> Tracking Number </ContentTitle>
              <DateRow>
                <DateInput
                  onChangeText={text => this.setState({ text })}
                  value={this.state.text}
                  placeholder="Enter number"
                />
              </DateRow>
            </ContentBlock>
            <ContentBlock tablet={this.state.tablet}>
              <ContentTitle> Location </ContentTitle>
              <StyledView>
                <StyledPicker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="select status"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected2}
                  onValueChange={this.onValueChange2.bind(this)}
                >
                  <Picker.Item label="Requested" value="key0" />
                  <Picker.Item label="Sent" value="key1" />
                </StyledPicker>
              </StyledView> 
            </ContentBlock>
            <ContentBlock tablet={this.state.tablet}>
              <ContentTitle> Address </ContentTitle>
              <Text> headfitted solutions pune</Text>
            </ContentBlock>
          </MainContent>
          <CommentedButton small>
            <IconView>
              <Icon style={{ color: "#fff", fontSize: 15 }} name="tablet-portrait" />
            </IconView>
            <ButtonText> use template </ButtonText>
          </CommentedButton>
          <ContentTitle style={{paddingLeft: 15}}> Comment </ContentTitle>
          <TextArea
						multiline={true}
						numberOfLines={4}
						onChangeText={(textArea) => this.setState({textArea})}
						value={this.state.textArea}
						placeholder="type your message"
						textAlignVertical= 'top'
					/>
          <StyleFileTitle>
            <Capital> Visual Comment </Capital>
            <TouchableOpacity onPress={() => this.setState({cameraOn: true})}>
              <CameraView>
                <Icon style={{color: 'white', fontSize: 20}} name="camera" />
              </CameraView>
            </TouchableOpacity>
          </StyleFileTitle>
          {
            this.state.cameraOn &&
            <CameraComponent 
              close={() => this.setState({cameraOn: false})}
            />
          }
          <SetRequestedQuantity />
        </CommonModal>
      </View>
    )
  }
}

export default NewSampleRequest;