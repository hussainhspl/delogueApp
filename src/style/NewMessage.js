import React, { Fragment } from "react";
import { Text, View, TextInput, TouchableOpacity, Image, TouchableHighlight } from "react-native";
import {
  Button,
  Icon,
  CheckBox,
  Item,
  Picker,
} from "native-base";
import styled from "styled-components/native";
import NewMessageCamera from './NewMessageCamera';
import AttachmentPopup from "../shared/AttachmentPopup";
import { withTheme } from 'styled-components';
import ApplyButton from '../styles/ApplyButton'


const MessageBlock = styled.View`
  border: 1px solid #849d7a;
  border-radius: 5px;
  padding: 5px 15px;
  margin: 0px 15px 15px 15px;
`;

const SubjectInput = styled(TextInput)`
  border: 1px solid #ddd;
  padding: 5px 10px;
  height: 30px;
  margin-top: 5px;
  margin-left: 5px;
  margin-bottom: 5px;
  flex: 1;
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.darkBlue};
`;
const Separator = styled.View`
  border-bottom-width: 1px;
  border-color: #ddd;
  margin-bottom: 5px;

`;
const ButtonSet = styled.View`
  flex-direction: row;
`;
const Row = styled.View`
  align-items: center;
  flex-direction: row;
  margin-bottom: 15px;
`;

const CheckBoxText = styled.Text`
  padding-left: 10px;
  font-family: ${ props => props.theme.regular};
`;
const Label = styled.Text`
  color: #8c8076;
  font-size: 10px;
  font-family: ${ props => props.theme.regular};
  padding-right: 5px;
  align-self: center;
  /* background-color: red; */
`;
const StyledView = styled.View`
  border: 1px solid #ddd;
  height: 30px;
  flex: 1;
`;
const StyledPicker = styled(Picker)`
  height: 30px;
  padding-top: 0px;
  padding-bottom: 2px;
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

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
  /* z-index: 1; */
  /* background-color: #ddd; */
`;


const FooterButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  padding: 0px 5px;
  font-family: ${ props => props.theme.regular};
  position: relative;
  z-index: 2;
`;
const AttachImageRow = styled.View`
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
const IconBox = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid #bbb;
  position: absolute;
  top: 10;
  left: -15;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;
const MsgImage = styled.Image`
  width: 20px;
  height: 15px;
`;
class NewMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      selected2: "undefined",
      textArea: "",
      modalVisible: false,      
			cameraOn: false,
    };
  }

  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }
  render() {
    return (
      <View>
          <MessageBlock>
            <IconBox>
              <MsgImage 
                resizeMode={"contain"}
                source={require("../../assets/img/message-icon.png")} />
            </IconBox>
            <SubjectInput
              onChangeText={subject => this.setState({ subject })}
              value={this.state.subject}
              // autoFocus={true}
            />
            <Separator/>
            <Row>
            <Label> Notify: </Label>
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
              <NotifySelector>
                <CancelNotify>
                  <Icon style={{ fontSize: 12 }} name="close" />
                </CancelNotify>
                <Text> hussain </Text>
              </NotifySelector>
            </Row>
            <Row>
              <CheckBox color="#aaa" checked={true} style={{left: 0, paddingLeft: 2}} />
              <CheckBoxText> Only internal </CheckBoxText>
            </Row>
            <TextArea
              multiline={true}
              numberOfLines={4}
              onChangeText={textArea => this.setState({ textArea })}
              value={this.state.textArea}
              placeholder="Type your message"
              textAlignVertical="top"
            />
            <AttachImageRow>
              <AttachBox>
                <TouchableHighlight onPress={() => this.setState({modalVisible: true})}
                  underlayColor={this.props.theme.overlayBlue}
                >
                  <AttachmentImage
                    resizeMode={"contain"}
                    source={require("../../assets/img/shirt-static.png")}
                  />
                </TouchableHighlight>
                <AttachClose>
                  <Icon style={{ fontSize: 15 }} name="close" />
                </AttachClose>
              </AttachBox>
              <AttachBox>
                <AttachmentImage
                  resizeMode={"contain"}
                  source={require("../../assets/img/shirt-static.png")}
                />
                <AttachClose>
                  <Icon style={{ fontSize: 15 }} name="close" />
                </AttachClose>
              </AttachBox>
            </AttachImageRow>
            <ButtonRow>
							<NewMessageCamera />
              <ButtonSet>
                <Button
                  bordered
                  light
                  small
                  style={{ backgroundColor: "#C2BEB6", marginBottom: 0 }}
                >
                  <FooterButtonText>cancel</FooterButtonText>
                </Button>
                <ApplyButton>
                  <FooterButtonText>apply</FooterButtonText>
                </ApplyButton>
              </ButtonSet>
            </ButtonRow>
          </MessageBlock>
          {<AttachmentPopup 
            modalVisible={this.state.modalVisible}
            close={() => this.setState({modalVisible: false})}  
          />}     
      </View>
    );
  }
}
export default withTheme(NewMessage);
