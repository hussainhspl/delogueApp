import React, { Fragment } from "react";
import { Text, View, TextInput, TouchableOpacity, Image, TouchableHighlight } from "react-native";
import {
  Button,
  Icon,
  CheckBox,
  Item,
  Picker,
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
      selected2: [],
      textArea: "",
      modalVisible: false,
      cameraOn: false,
      notifyList: [],
      internal: false,
      otherUsers: []
    };
  }
  componentDidMount = () => {
    GetAsyncToken()
      .then(token => {
        NotifyUserList(token, this.props.styleID)
          .then(res => {
            console.log('successful notify', res);

            if (res.data.internalUsers.length > 0) {
              console.log('adding internal users');
              this.setState({
                notifyList: res.data.internalUsers
              })
            }
            if (res.data.otherUsers.length > 0) {
              console.log('adding other users');
              this.setState(prevState => ({
                notifyList: [...prevState.notifyList, ...res.data.otherUsers],
                otherUsers: res.data.otherUsers
              }))
            }


            // if()   
          })
      })

  }
  onValueChange2(value) {
    // console.log('list notify dd :',value, this.state.selected2);
    this.setState(prevState => ({
      selected2: [...prevState.selected2, value]
    }))
  }

  changeList = () => {


    console.log('calling')
    //     let key = 2;
    // this.setState(prevState => ({

    //   todoItems: prevState.todoItems.map(
    //     el => el.key === key? { ...el, status: 'done' }: el
    //   )

    // }))
    this.setState({ internal: !this.state.internal }, () => {
      if (this.state.internal == true) {
        console.log('internal true');
        // let allUser = this.state.notifyList;
        // let otherUsers = this.state.otherUsers;
        console.log('all user',this.state.notifyList, this.state.otherUsers)
        var Obj3 = lodash.differenceWith(this.state.notifyList, this.state.otherUsers, function (o1, o2) {
          return o1['id'] === o2['id']
        });
        this.setState({
          notifyList: Obj3,
        })
        console.log("Obj3",Obj3);
      };
      if(this.state.internal == false) {
        // this.setState({
        //   notifyList: Obj3,
        // })
        this.setState(prevState => ({
          notifyList: [...prevState.notifyList, ...this.state.otherUsers],
        }))
      }
    })
  }
  render() {
    console.log('list notify state :', this.state.otherUsers)

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
                selectedValue={this.state.selected2[this.state.selected2.length - 1]}
                onValueChange={this.onValueChange2.bind(this)}
              >
                {this.state.notifyList.map(u => {
                  return (
                    <Picker.Item label={u.name} value={u.name} />
                  )
                })}

              </StyledPicker>
            </StyledView>
          </Row>
          <Row>
            {
              this.state.selected2.length > 0 ?

                this.state.selected2.map(s => {
                  return (
                    <NotifySelector>
                      <CancelNotify>
                        <Icon style={{ fontSize: 12 }} name="close" />
                      </CancelNotify>
                      <Text> {s}  </Text>
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
              <TouchableHighlight onPress={() => this.setState({ modalVisible: true })}
                underlayColor={this.props.theme.overlayBlue}
              >
                <AttachmentImage
                  resizeMode={"contain"}
                  source={require("../../../assets/img/shirt-static.png")}
                />
              </TouchableHighlight>
              <Close>
                <Icon style={{ fontSize: 15 }} name="close" />
              </Close>
            </AttachBox>
            <AttachBox>
              <AttachmentImage
                resizeMode={"contain"}
                source={require("../../../assets/img/shirt-static.png")}
              />
              <Close>
                <Icon style={{ fontSize: 15 }} name="close" />
              </Close>
            </AttachBox>
          </AttachImageRow>s
          <ButtonRow>
            <NewMessageCamera />
            <ButtonSet>
              <CancelButton onPress={this.props.closeMessage}>
                <ButtonText>
                  cancel
                  </ButtonText>
              </CancelButton>
              <ApplyButton onPress={this.props.s}>
                <ButtonText>apply</ButtonText>
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
}
export default withTheme(NewMessage);
