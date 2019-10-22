import React from "react";
import { View, Text } from "react-native";
import styled from 'styled-components';
import { Picker, Icon, Button } from 'native-base';
import ApplyButton from '../styles/ApplyButton';
import NewMessageCamera from './NewMessageCamera';


const ReplyTitle = styled.Text`
  padding: 5px 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  flex: 1;
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.darkBlue};
  border-bottom-width: 1px;
  border-color: #ddd;
`;
const StyledPicker = styled(Picker)`
  height: 30px;
  padding-top: 0px;
  padding-bottom: 2px;
`;
const StyledView = styled.View`
  border: 1px solid #ddd;
  height: 30px;
  flex: 1;
`;
const Row = styled.View`
  align-items: center;
  flex-direction: row;
  margin-bottom: 15px;
`;
const Label = styled.Text`
  color: #8c8076;
  font-size: 10px;
  font-family: ${ props => props.theme.regular};
  padding-right: 5px;
  align-self: center;
`;
const NotifySelector = styled.View`
  border: 1px solid #ddd;
  border-radius: 4px;
  align-self: flex-start;
  padding: 5px 25px 5px 5px;
  margin-right: 10px;
`;

const CancelNotify = styled.View`
  width: 15px;
  height: 15px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 7px;
  top: 7px;
  background-color: #ddd;
  border-radius: 15px;
`;
const TextArea = styled.TextInput`
  border: 1px solid #ddd;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
`;
const AttachImage = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const AttachBox = styled.View`
  width: 80px;
  height: 90px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 20px;
  margin-top: 20px;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const AttachmentImage = styled.Image`
  width: 70px;
  height: 80px;
  margin: 5px;
`;
const AttachClose = styled.View`
  width: 15px;
  height: 15px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -7px;
  top: -7px;
  background-color: #ddd;
  border-radius: 10px;
`;
const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
  /* z-index: 1; */
  border-bottom-width: 1px;
  border-color: #ddd;
  /* background-color: #f00; */
`;
const FooterButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  padding: 0px 5px;
  font-family: ${ props => props.theme.regular};
  position: relative;
  z-index: 2;
`;



class ReplyComponent extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selected2: '',
    }
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }
  render() {
    return(
      <View>
        <ReplyTitle> swatch samples </ReplyTitle>
        <Row>
            <Label> Notify </Label>
        <StyledView>
          <StyledPicker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined }}
            placeholder="Select User"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={this.state.selected2}
            onValueChange={this.onValueChange2.bind(this)}
          >
            <Picker.Item label="Hussain" value="key0" />
            <Picker.Item label="John" value="key1" />
            <Picker.Item label="Tom" value="key2" />
            <Picker.Item label="James" value="key3" />
          </StyledPicker>
        </StyledView>
        </Row>
        <Row>
          <NotifySelector>
            <CancelNotify>
              <Icon style={{ fontSize: 12 }} name="close" />
            </CancelNotify>
            <Text> hussain </Text>
          </NotifySelector>
        </Row>
        <TextArea
          multiline={true}
          numberOfLines={4}
          onChangeText={textArea => this.setState({ textArea })}
          value={this.state.textArea}
          placeholder="type your message"
          textAlignVertical="top"
        />
        <AttachImage>
          <AttachBox>
            <AttachmentImage
              resizeMode={"contain"}
              source={require("../../assets/img/shirt-static.png")}
            />
            <AttachClose>
              <Icon style={{ fontSize: 15 }} name="close" />
            </AttachClose>
          </AttachBox>
        </AttachImage>
        <ButtonRow>
          <Row>
            <NewMessageCamera />
          </Row>
          <Row>
          <Button bordered light small danger
          >
            <Text style={{color: "#d9534e"}}> CANCEL </Text>
          </Button>
          <ApplyButton>
            <FooterButtonText>apply</FooterButtonText>
          </ApplyButton>
          </Row>
        </ButtonRow>
      </View>
    )
  }
}
export default ReplyComponent;