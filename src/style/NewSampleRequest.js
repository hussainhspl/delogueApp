import React from 'react';
import {View, Text, TouchableHighlight, Alert, Dimensions, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import CommonModal from '../shared/CommonModal';
import {Icon, Picker} from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
import CameraComponent from '../shared/CameraComponent';
import SetRequestedQuantity from './SetRequestedQuantity';

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
  max-height: 180px;
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
  margin-left: 15px;
`;
const StyledView = styled.View`
	border: 1px solid #ddd;
	height: 30px;
	margin-top: 5px;
	flex: 1;
  margin: 5px 15px 10px 15px;
`;
const StyledPicker = styled(Picker)`
	height: 30px;
	flex: 1;
`;

const DateRow = styled.View`
  flex-direction: row;
  margin: 0px 15px;
  align-items: center;
`;
const DateInput = styled.TextInput`
  border: 1px solid #ddd;
  height: 30px;
  padding: 3px 6px;
  font-size: 14px;
  margin: 5px 15px 10px 0px;
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
	background-color: #F1EFED;
	border: 1px solid #DCD7D4;
`;
const Capital = styled.Text`
	text-transform: uppercase;
`;
const CameraView = styled.View`
	width: 40;
	height: 40;
	justify-content: center;
	align-items: center;
	background-color: #849d7a;
`;
const AddView = styled.View`
  border: 1px solid #ddd;
  padding: 15px;
  width: ${Dimensions.get("window").width / 2 - 10};
  margin: 5px;
  border-radius: 5px;
  flex-direction: row;
  /* flex: 1;
  flex-wrap: wrap; */
`;
class NewSampleRequest extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      modalVisible : false,
      textArea: '',
      isDeadlineDateTimePickerVisible: false,
      isEtdDateTimePickerVisible: false,
    }
  }
  setModalVisible(visible) {
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
  render(){
    const history= this.props.history;
    // console.log("camera on ",this.state.cameraOn);
    // console.log("calender etd ", this.state.isEtdDateTimePickerVisible);
    return(
      <View>
        <TouchableHighlight
          underlayColor='rgba(221, 221, 221, 0.4)'
					onPress={() => {
						this.setModalVisible(!this.state.modalVisible);
					}}>
            <AddView>
              <View>
                <Icon style={{fontSize: 30, marginRight: 10}} name="add" /> 
              </View>
              <View style={{flexDirection: 'row', flex: 1}}>
						    <Text style={{flexWrap: 'wrap', flex: 1, marginRight: 5, }}>Add new sample request </Text>
              </View>
            </AddView>
				</TouchableHighlight>
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
              resizeMode={"center"}
              source={require('../../img/shirt-static.png')}
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
          <ContentTitle> deadline for sample </ContentTitle>
          <DateRow>
            <DateInput
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              placeholder="dd-mm-yy"
            />
            <TouchableOpacity onPress={() => this.showDateTimePicker('deadline')}>
              <Icon
                style={{ color: "#8C8076", fontSize: 30 }}
                name="calendar"
              />
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isDeadlineDateTimePickerVisible}
              onConfirm={(date) => this.handleDatePicked(date, 'deadline')}
              onCancel={() => this.hideDateTimePicker('deadline')}
            />
          </DateRow>
          <ContentTitle> ETD </ContentTitle>
          <DateRow>
            <DateInput
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              placeholder="dd-mm-yy"
            />
            <TouchableOpacity onPress={() =>this.showDateTimePicker('etd')}>
              <Icon
                style={{ color: "#8C8076", fontSize: 30 }}
                name="calendar"
              />
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isEtdDateTimePickerVisible}
              onConfirm={(date) => this.handleDatePicked(date, 'etd')}
              onCancel={() => this.hideDateTimePicker('etd')}
            />
          </DateRow>
          <ContentTitle> Tracking Number </ContentTitle>
          <DateRow>
            <DateInput
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              placeholder="dd-mm-yy"
            />
          </DateRow>
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
          <ContentTitle> Address </ContentTitle>
          <Text style={{paddingLeft: 15}}> headfitted solutions pune</Text>
          <CommentedButton small>
            <IconView>
              <Icon style={{ color: "#fff", fontSize: 15 }} name="tablet-portrait" />
            </IconView>
            <ButtonText> use template </ButtonText>
          </CommentedButton>
          <ContentTitle> Comment </ContentTitle>
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