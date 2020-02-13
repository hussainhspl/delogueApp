import React, { Fragment } from "react";
import { Text, View, TextInput, TouchableOpacity, Image, TouchableHighlight } from "react-native";
import {
  Button,
  Icon,
  CheckBox,
  Item,
  Picker,
  StatusBar
} from "native-base";
import { withTheme } from 'styled-components';
import styled from "styled-components/native";
//relative import
import NewMessageCamera from './NewMessageCamera';
import AttachmentPopup from "../../shared/AttachmentPopup";
import ApplyButton from '../../styles/ApplyButton';
import CancelButton from '../../styles/CancelButton';
import ButtonText from '../../styles/ButtonText';
import Close from '../../styles/Close';
import NotifyUserList from "../../api/comments/notifyUserList";
import GetAsyncToken from '../../script/getAsyncToken';
import lodash from 'lodash';
import TouchableCancel from "../../styles/ToucaableCancel";
import TouchableApply from "../../styles/TouchableApply";
import SendNewMessage from '../../api/comments/sendNewMessage';
import Toast from 'react-native-root-toast';
import TextEditor from "./textEditor";
import {sortBy, orderBy} from 'lodash'




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
  flex-wrap: wrap;
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
  margin-bottom: 10px;
`;

const CancelNotify = styled.TouchableHighlight`
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
      notifySelected: [],
      textArea: "",
      modalVisible: false,
      cameraOn: false,
      notifyList: [],
      internal: false,
      otherUsers: [],
      attachment: '',
    };
  }
  componentDidMount = () => {
    GetAsyncToken()
      .then(token => {
        console.log('this. style id ', this.props.styleID);
        NotifyUserList(token, this.props.styleID)
          .then(res => {
            // console.log('successful notify', res);
            if (res.data.internalUsers.length > 0) {
              // console.log('adding internal users');
              // const sorted = sortBy(res.data.internalUsers, ["name"]);
              const sorted = orderBy(res.data.internalUsers, [user => user.name.toLowerCase()]);
              console.log('sorted users', res.data, sorted);
              this.setState({
                notifyList: sorted
              })
            }
            if (res.data.otherUsers.length > 0) {
              // console.log('adding other users');
              let internalUser = this.state.notifyList;
              let allUser = internalUser.concat(res.data.otherUsers);
              const sorted = orderBy(allUser, [user => user.name.toLowerCase()]);
              console.log('all user', allUser, sorted);
              this.setState(prevState => ({
                notifyList: sorted,
                otherUsers: res.data.otherUsers
              }))
              // this.setState(prevState => ({
              //   notifyList: [...prevState.notifyList, ...res.data.otherUsers],
              //   otherUsers: res.data.otherUsers
              // }))
            }
          })
      })

  }
  onValueChange2(value) {
    // console.log('list notify dd :',value, this.state.notifySelected);
    console.log('notify', value)
    this.setState(prevState => ({
      notifySelected: [...prevState.notifySelected, value]
    }), ()=> {console.log('notify data', this.state.notifySelected[this.state.notifySelected.length - 1])})
  }

  changeList = () => {
    this.setState({ internal: !this.state.internal }, () => {
      if (this.state.internal == true) {
        var Obj3 = lodash.differenceWith(this.state.notifyList, this.state.otherUsers, function (o1, o2) {
          return o1['id'] === o2['id']
        });
        this.setState({
          notifyList: Obj3,
        })
      };
      if (this.state.internal == false) {
        this.setState(prevState => ({
          notifyList: [...prevState.notifyList, ...this.state.otherUsers],
        }))
      }
    })
  }
  sendMessage = () => {
    // console.log('message sent');
    console.log('attachment state before send :',this.state.attachment, this.state.notifySelected)
    GetAsyncToken().then(token => {
      SendNewMessage(token, this.props.styleID, this.state.subject,
        this.state.textArea, this.state.notifySelected, this.state.internal,
        [this.state.attachment], this.props.parentId )
        .then(res => {
          // console.log('msg successfully send');
          let toast = Toast.show('msg successfully send', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true, animation: true,
            hideOnPress: true, delay: 0,
          })
          setTimeout(() =>{ Toast.hide(toast)}, 3000);
          this.props.closeMessage()
         
        })
    })
  }
  popUserId(id) {
    console.log('pop user',id, this.state.notifySelected);
    this.setState({
      notifySelected: this.state.notifySelected.filter(item => item.id != id)
    })
    console.log('after pop',this.state.notifySelected);
  }
  popAttachment(id) {
    console.log('remove image', id);
    this.setState({
      attachment : this.state.attachment.filter(imgObj => imgObj.id != id)
    })
  }
  render() {
    // console.log('attachment state :', this.state.attachment, typeof (this.state.attachment))
    // console.log('render in new msg', this.props.parentId)

    return (
      <View>
        <MessageBlock>
          <IconBox>
            <MsgImage
              resizeMode={"contain"}
              source={require("../../../assets/img/message-icon.png")} />
          </IconBox>
          <SubjectInput
            onChangeText={subject => this.setState({ subject })}
            value={this.state.subject}
          // autoFocus={true}
          />
          <Separator />
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
                selectedValue={this.state.notifySelected[this.state.notifySelected.length - 1]}
                onValueChange={this.onValueChange2.bind(this)}
              >
                {this.state.notifyList.map(u => {
                  return (
                    <Picker.Item label={u.name} value={u} />
                  )
                })}
              </StyledPicker>
            </StyledView>
          </Row>
          <Row>
            {
              this.state.notifySelected.length > 0 ?
                this.state.notifySelected.map(s => {
                  return (
                    <NotifySelector>
                      <CancelNotify underlayColor={"#bbb"} onPress={() => this.popUserId(s.id)}>
                        <Icon style={{ fontSize: 16 }} name="close" />
                      </CancelNotify>
                      <Text> {s.name}  </Text>
                    </NotifySelector>
                  )
                })
                : <Text></Text>
            }

          </Row>
          <Row>
            <CheckBox color="#aaa"
              checked={this.state.internal}
              style={{ left: 0, paddingLeft: 4 }}
              onPress={this.changeList}
            />
            <CheckBoxText> Only internal </CheckBoxText>
          </Row>
          {/* <TextArea
            multiline={true}
            numberOfLines={4}
            onChangeText={textArea => this.setState({ textArea })}
            // value={this.state.textArea}
            placeholder="Type your message"
            textAlignVertical="top"
          /> */}
          <TextEditor
            bodyHtml={(html) => this.setState({textArea : html})}
          />
          <Fragment>
            {
              typeof (this.state.attachment) == 'object' && (
                <AttachImageRow>
                  {this.state.attachment.map(d => {
                    console.log('attachment d :', d);
                    return (
                      <AttachBox>
                        <TouchableHighlight onPress={() => this.setState({ modalVisible: true })}
                          underlayColor={this.props.theme.overlayBlue}
                        >
                          <AttachmentImage
                            resizeMode={"contain"}
                            source={{ uri: d.url }}
                          />
                        </TouchableHighlight>
                        <Close underlayColor={"#bbb"} onPress={() => this.popAttachment(d.id)}>
                          <Icon style={{ fontSize: 16 }} name="close" />
                        </Close>
                      </AttachBox>
                    )
                  })}

                </AttachImageRow>
              )}
          </Fragment>
          <ButtonRow>
            <NewMessageCamera
              styleID={this.props.styleID}
              attachmentImage={(obj) => this.setState(prevState => ({
                attachment: [...prevState.attachment, obj]
              }))}
            />
            <ButtonSet>
              <CancelButton>
                <TouchableCancel
                  underlayColor="#8f8c86"
                  onPress={this.props.closeMessage}>
                  <ButtonText> CANCEL </ButtonText>
                </TouchableCancel>
              </CancelButton>
              <ApplyButton>
                <TouchableApply underlayColor="#354733" onPress={this.sendMessage}>
                  <ButtonText> Apply </ButtonText>
                </TouchableApply>
              </ApplyButton>
            </ButtonSet>
          </ButtonRow>
        </MessageBlock>
        {<AttachmentPopup
          modalVisible={this.state.modalVisible}
          close={() => this.setState({ modalVisible: false })}
        />}
      </View>
    );
  }
   onContentChange = (content) => {
    // Save this content
    this.setState({ content });
  };
}
export default withTheme(NewMessage);
