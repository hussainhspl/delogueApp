import React, { Fragment } from "react";
import {
  View, Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  Image
} from "react-native";
import { Icon } from "native-base";
import { withTheme } from 'styled-components';
import { connect } from "react-redux";
import { commentTab, unreadMessagesList, readAll, unreadAll, styleId, singleStyle } from "../../store/actions/index";
import styled from "styled-components";
import Header from "../../Header";
import Subject from '../../styles/Subject';
import Title from "../../styles/SmallText";
import CardText from "../../styles/CardText";
import ChatMessage from './ChatMessage';
import UnreadMessageList from '../../api/message/unreadMessageList';
import SpecificMessage from '../../api/message/specificMessage';

import GetAsyncToken from '../../script/getAsyncToken';
import { parseISO, format } from 'date-fns';
// import HTMLView from 'react-native-htmlview';
import { WebView } from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview'
import CreateAlert from "../../api/createAlert";
import DeleteAlert from "../../api/deleteAlert";
import IconView from "../../styles/IconView";
import ButtonOverlay from "../../styles/ButtonOverlay";
import { Appearance, useColorScheme } from 'react-native-appearance';
import { parseFromTimeZone, formatToTimeZone } from 'date-fns-timezone';
import DeviceInfo from 'react-native-device-info';
import * as RNLocalize from 'react-native-localize'
import LoadMoreView from "../../styles/LoadMoreView";
import LoadMoreButton from "../../styles/LoadMoreButton";
import InfoView from "../../styles/InfoView";
import InfoText from "../../styles/InfoText";
import GetSelectedStyle from '../../api/getStyle';

// let pageNumber = 1;

const IconRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0px;
  margin: 0px 15px;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #ddd;
`;

const IconBox = styled.TouchableOpacity`
  width: 50px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.currentView ? "#eeecea" : "#fff")};
  border: ${props => (props.currentView ? `1px solid #ccc` : `1px solid #ddd`)};
`;

const MainView = styled.View`
  flex: 1;
`;

const StyleImage = styled.Image`
  width: 30px;
  height: 20px;
`;

const TableView = styled.View`
  flex: 1;
  margin: 0px 10px;
`;
const Flex = styled.View`
  flex-direction: row;
`;

const ButtonRow = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
`;

const CommentedButton = styled(View)`
  background-color: ${props => props.theme.blue};
  margin: 15px auto;
  padding: 6px 0px;
  width: 100px;
  align-items: center;
  height: 30px;
`;

const ButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  text-align: center;
  font-family: ${props => props.theme.regular};
  font-size: ${props => props.theme.large};
`;

const MessageBox = styled.View`
  flex: 1;
  margin: 10px 5px 5px 20px;
  border: 1px solid #bbb;
  position: relative;
`;

const MainContent = styled.View`
  width: 70%;
`;

const MsgIconBox = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid #bbb;
  position: absolute;
  top: 5;
  left: -15;
  background-color: ${props => props.readMsg ? '#fff' : props => props.theme.darkBlue};
  align-items: center;
  justify-content: center;
`;

const STouchableHighlight = styled.TouchableHighlight`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid #bbb;
  align-items: center;
  justify-content: center;
`;
const Row = styled.View`
  padding: 0px 20px 10px 20px;
  flex-direction: row;
  justify-content: space-between;
`;

const InternalView = styled.View`
  align-items: center;
  flex-direction: row;
  align-self: flex-start;
`;

const TitleRow = styled.View`
  margin: 10px 10px 10px 20px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-color: #ddd;
  padding-bottom: 5px;
`;

const ContentText = styled(WebView)`
  color: ${props => props.theme.textColor};
  font-family: ${props => props.theme.regular};
  font-size: ${props => props.theme.large};
`;

const InternalText = styled.Text`
  color: #aaa;
  padding-left: 5px;
  font-size: ${props => props.theme.small};
  font-family: ${props => props.theme.regular};
`;

const MsgImage = styled.Image`
  width: 20px;
  height: 15px;
`;
const Flex1 = styled.View`
  flex: 1;
`;
const SImage = styled.Image`
  width: 30px;
`;


class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: true,
      message: true,
      MessageList: [],
      showOpacity: false,
      read: false,
      chatRead: false,
      webViewHeight: null,
      htmlHeight1: [],
      hideRead: false,
      pageNumber: 1
    };
  }
  componentDidMount = () => {
    console.log('component did mount');
    if (this.props.unreadList.length == 0) {
      this.getNewData()
    }

  }
  getNewData = () => {
    GetAsyncToken()
      .then(token => {
        UnreadMessageList(token, this.state.message, this.state.chat, this.state.pageNumber)
          .then(res => {
            console.log('message list', res.data)
            // this.setState({
            //   MessageList: res.data,
            // })
            this.props.unreadMessagesListFunction(res.data)
          })
      })
  }
  updateMessage = () => {
    this.setState({ message: !this.state.message },
      () => this.getNewData())
  }
  updateChat = () => {
    this.setState({ chat: !this.state.chat },
      () => this.getNewData())
  }
  updatePage = () => {
    // pageNumber: 1
    this.setState({ pageNumber: this.state.pageNumber + 1 })
    this.getNewData()
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('before render', this.state.MessageList.isRead)
    // console.log('enter in derived', prevState.MessageList)
    if (nextProps.MessageList !== prevState.MessageList) {
      // console.log("Entered nextProps messages",prevState.MessageList);
      return {
        MessageList: nextProps.unreadList,
      }
    }
    return null;
  }

  redirectToComment(id) {
    // console.log('enter in redirect', id);
    GetAsyncToken()
      .then(token => {
        
        SpecificMessage(token, id)
          .then(res => {
            console.log('resp in specific message when clicked :', res);
            this.props.styleIdFunction(res.data.styleId);
            this.props.commentTabFunction();
            GetSelectedStyle(token, res.data.styleId)
              .then(res => {
                // console.log('got single style : ', res);
                this.props.singleStyleFunction(res.data)
              })
            this.props.history.push({
              pathname: '/style',
              data: res.data,
              openMessage: true,
            })
          })
        
          
      })

  }

  toggleAlert(auditLogId, messageType) {
    // console.log('enter in toggle alert', auditLogId);
    let currentAlert = '';
    GetAsyncToken()
      .then(token => {
        this.state.MessageList.map(d => {
          if (d.auditLogId == auditLogId) {
            // console.log('click state', d.isRead);
            currentAlert = d.isRead;
          }
        })
        // console.log('if', currentAlert);
        if (currentAlert == false) {
          // console.log('auditLogId', auditLogId);
          DeleteAlert(token, auditLogId)
            .then(res => {
              // console.log('alert deleted successfully');

              this.props.updateReadFunction(auditLogId)

            })
        } else {
          // console.log('auditLogId', auditLogId);
          CreateAlert(token, auditLogId, messageType)
            .then(res => {
              // console.log('successfully marked unread', res);
              this.props.updateUnReadFunction(auditLogId)
            })
        }
      })
  }
  toggleMessages = () => {
    // console.log('toggle messages')
    this.setState({
      hideRead: !this.state.hideRead
    })
  }

  render() {
    console.log('render in msg');
    history = this.props.history;
    let color = Appearance.getColorScheme();

    let CurrentTimeZone = RNLocalize.getTimeZone();
    // console.log('color: ', color, CurrentTimeZone);
    // console.log('html height in render: ', this.state.htmlHeight1);
    // if(this.state.MessageList != null)
    // console.log("message list render", this.state.MessageList);
    // let numHeight = parseInt(this.state.webviewHeight);
    // console.log('webviewHeight', this.state.webViewHeight);
    // let chat = this.state.MessageList.filter(m => m.messageType == "Style sample request")
    return (
      <MainView>
        <Header
          history={this.props.history}
        >
          <ScrollView>
            <IconRow>
              <Flex>
                <IconBox
                  currentView={this.state.message == true ? true : false}
                  onPress={this.updateMessage}
                >
                  <StyleImage
                    resizeMode={"contain"}
                    source={require("../../../assets/img/messageblack.png")}
                  />
                </IconBox>
                <IconBox
                  currentView={this.state.chat == true ? true : false}
                  onPress={this.updateChat}
                >
                  <StyleImage
                    resizeMode={"contain"}
                    source={require("../../../assets/img/conversation.png")}
                  />
                </IconBox>
              </Flex>
              <TouchableWithoutFeedback
                onPressIn={() => this.setState({ showOpacity: true })}
                onPressOut={() => this.setState({ showOpacity: false })}
                onPress={this.toggleMessages}
              >
                <ButtonRow>
                  {this.state.showOpacity && <ButtonOverlay />}
                  <IconView>
                    <SImage
                      resizeMode={"contain"}
                      source={this.state.hideRead ? require("../../../assets/img/show-read.png") : require("../../../assets/img/hide-read.png")}
                    />
                    {/* <Icon style={{ color: "#fff", fontSize: 15 }} name="eye" /> */}
                  </IconView>
                  <CommentedButton>
                    <ButtonText> {this.state.hideRead ? 'show read' : 'hide read'} </ButtonText>
                  </CommentedButton>
                </ButtonRow>
              </TouchableWithoutFeedback>
            </IconRow>
            {
              this.state.MessageList.length > 0 ?
                this.state.MessageList.map((m, index) => {
                  if (this.state.hideRead)
                    if (m.isRead)
                      return
                  // let formatedDate = format(parseISO(m.loggedOn), "d-MMM-yyyy kk:mm");
                  // console.log('DeviceInfo', DeviceInfo);

                  // console.log('m', m, m.loggedOn);
                  const date = new Date(m.loggedOn)
                  // console.log('date.setMinutes(date.getMinutes()', )
                  let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
                  // console.log('localDate', localDate);
                  
                  let formatedDate = format(localDate, "d-MMM-yyyy kk:mm")
                  // console.log('current time ', formatedDate)

                  let newMsgBody = m.messageBody.replace(/class='commAttachmentsContainer/g, "style='display: none' class='")
                  let msgId = m.parentLogId != null ? m.parentLogId : m.auditLogId
                  // console.log('new msg : ', newMsgBody);
                  if (m.messageType == "StyleCommunicationMessage") {
                    return (
                      <Fragment key={index}>
                        {this.state.message && (
                          <MessageBox >
                            <TouchableHighlight
                              underlayColor={this.props.theme.overlayBlue}
                              onPress={() => this.redirectToComment(msgId)}
                            >
                              <Fragment>
                                <MsgIconBox readMsg={m.isRead}>
                                  <STouchableHighlight underlayColor={this.props.theme.overlayBlue}
                                    onPress={() => this.toggleAlert(m.auditLogId, m.messageType)}>
                                    <MsgImage
                                      resizeMode={"contain"}
                                      source={require("../../../assets/img/message-icon.png")}
                                    />
                                  </STouchableHighlight>
                                </MsgIconBox>
                                <TitleRow>
                                  <Flex1>
                                    <Title>Style Name</Title>
                                    <CardText numberOfLines={1}>{m.styleName}</CardText>
                                  </Flex1>
                                  <Flex1>
                                    <Title>Style Number</Title>
                                    <CardText numberOfLines={1}>{m.styleNumber}</CardText>
                                  </Flex1>
                                  <Flex1>
                                    <Title>{formatedDate}</Title>
                                    <CardText numberOfLines={1}>{m.loggedByUserName}</CardText>
                                  </Flex1>
                                </TitleRow>
                                <Row>
                                  <MainContent>
                                    <Subject>
                                      {m.messageSubject !== null ? m.messageSubject : 'no subject'}
                                    </Subject>

                                    <View
                                    // onLayout={(event) => {
                                    //   var { x, y, width, height } = event.nativeEvent.layout;
                                    //   console.log('var height:', height);
                                    // }}
                                    >
                                      <AutoHeightWebView
                                        style={{ width: Dimensions.get('window').width - 45, marginTop: 15, height: 40 }}
                                        customStyle={`
                                        * {
                                          font-family: ${props => props.theme.regular};
                                        }
                                        .fr-emoticon {
                                          width: 15px;
                                          height: 15px;
                                          display: inline-block;
                                        }  
                                      `}
                                        source={{ html: `<html><head></head><body>${newMsgBody}</body></html>` }}
                                        scalesPageToFit={false}
                                        zoomable={false}
                                        viewportContent={'width=device-width, user-scalable=no'}
                                      />
                                    </View>
                                    {/* :null} */}
                                  </MainContent>
                                  <InternalView>
                                    <Icon style={{ color: "#ddd", fontSize: 18 }} name="home" />
                                    <InternalText>Internal</InternalText>
                                  </InternalView>
                                </Row>
                              </Fragment>
                            </TouchableHighlight>
                          </MessageBox>
                        )}

                      </Fragment>

                    )
                  }

                  else if (m.messageType == "Style sample request") {
                    return (
                      <Fragment key={m.auditLogId}>
                        {this.state.chat && (
                          <ChatMessage
                            history={this.props.history}
                            data={m}
                            toggleAlertFunction={() => this.toggleAlert(m.auditLogId, m.messageType)}
                          />
                        )}
                      </Fragment>

                    )
                  }

                  else {
                    return (
                      <Text> other message type </Text>
                    )
                  }
                })


                : <Text> Loading Messages</Text>
            }
            {this.state.MessageList.length > 0 ?
              this.state.MessageList.length == 10 ?

                <LoadMoreView>
                  <LoadMoreButton
                    onPress={this.updatePage}
                    underlayColor={this.props.theme.overlayBlue}
                  >
                    <Text>Load More</Text>
                  </LoadMoreButton>
                </LoadMoreView>

                : null
              : null
            }

            {/* // }
                        // : <InfoView>
                        //   <InfoText> That's all for now Folks </InfoText>
                        // </InfoView> */}
            {!this.state.message && !this.state.chat ? <Text> Select at least one icon </Text> : null}

          </ScrollView>
        </Header>
      </MainView>
    );
  }
}

const mapStateToProps = state => {
  return {
    unreadList: state.unreadMessagesList.unreadMessagesListState
  };
};
const mapDispatchToProps = dispatch => {
  return {
    //calling action
    commentTabFunction: () => dispatch(commentTab()),
    unreadMessagesListFunction: (unread) => dispatch(unreadMessagesList(unread)),

    updateReadFunction: (auditLogId) => dispatch(readAll(auditLogId)),
    updateUnReadFunction: (auditLogId) => dispatch(unreadAll(auditLogId)),

    styleIdFunction: (sid) => dispatch(styleId(sid)),
    singleStyleFunction: (s) => dispatch(singleStyle(s))



  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(Message));
