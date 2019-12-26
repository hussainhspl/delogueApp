import React, { Fragment } from "react";
import {
  View, Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  ScrollView
} from "react-native";
import { Icon } from "native-base";
import { withTheme } from 'styled-components';
import { connect } from "react-redux";
import { commentTab, unreadMessagesList } from "../../store/actions/index";
import styled from "styled-components";
import Header from "../../Header";
import Subject from '../../styles/Subject';
import Title from "../../styles/SmallText";
import CardText from "../../styles/CardText";
import ChatMessage from './ChatMessage';
import UnreadMessageList from '../../api/message/unreadMessageList';
import SpecificMessage from '../../api/message/specificMessage';

import GetAsyncToken from '../../script/getAsyncToken';
import { format, parseISO } from 'date-fns';
// import HTMLView from 'react-native-htmlview';
import { WebView } from 'react-native-webview';
import DWebView from "./DWebView";
import CreateAlert from "../../api/createAlert";
import DeleteAlert from "../../api/deleteAlert";

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
const ButtonOverlay = styled.View`
  position: absolute;
  top: 15px;
  bottom: 15px;
  left: 0;
  right: 0;
  background-color: #dddddd33;
  z-index: 1;
`;

const CommentedButton = styled(View)`
  background-color: #99afaf;
  margin-left: 15px;
  margin: 15px auto;
  padding: 6px 10px;
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  height: 32px;
`;
const IconView = styled.View`
  width: 30px;
  height: 32px;
  background-color: #415461;
  justify-content: center;
  align-items: center;
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
  flex: 1
`;

// const INJECTED_JAVASCRIPT = `(function() {
//   window.ReactNativeWebView.postMessage(document.body.scrollHeight);
// })();`;

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: false,
      message: true,
      MessageList: null,
      showOpacity: false,
      read: false,
      chatRead: false,
      webViewHeight: null,
      htmlHeight: []
    };
  }
  componentDidMount = () => {
    console.log('message component did mount', this.props.unreadList);
    if(this.props.unreadList == null) {
      GetAsyncToken()
      .then(token => {
        UnreadMessageList(token)
          .then(res => {
            console.log('message list', res.data)
            // this.setState({
            //   MessageList: res.data,
            // })
            this.props.unreadMessagesListFunction(res.data)
          })
      })
    }
    
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('before render', this.state.MessageList.isRead)
    if (nextProps.MessageList !== prevState.MessageList) {
      console.log("Entered nextProps messages",prevState.MessageList);
      return{
        MessageList: nextProps.unreadList,
      }
    }
    return null;
  }

  redirectToComment(id) {
    console.log('enter in redirect', id);
    GetAsyncToken()
      .then(token => {
        SpecificMessage(token, id)
          .then(res => {
            console.log('resp in message :', res);
            this.props.commentTabFunction();
            this.props.history.push({
              pathname: '/style',
              data: res.data,
              openMessage: true
            })
          })
      })

  }

  find_dimesions(layout) {
    const { x, y, width, height } = layout;
    console.warn(x);
    console.warn(y);
    console.warn(width);
    console.log("hright", height);
  }
  _onMessage = (event, index) => {
    // console.log(index);
    // console.log('event111', event.nativeEvent, Number(event.nativeEvent.data));
    let con = JSON.parse(event.nativeEvent.data)

    let heightRaw = 0;
    // heightRaw= Number();
    let intHeight = parseInt(con)

    let list = [];

    list = this.state.htmlHeight;

    list.push(intHeight);
    // console.log(list);
    // this.state.htmlHeight = list;
    // setTimeout(function() { //Start the timer
    // this.setState({
    //   htmlHeight: list
    // }, () => console.log('state set successfully', this.state.htmlHeight))//After 1 second, set render to true
    // }.bind(this), 1000)


  }

  toggleAlert = (auditLogId, messageType) => {
    console.log('enter in toggle alert', auditLogId);
    GetAsyncToken()
      .then(token => {
        DeleteAlert(token, auditLogId)
          .then(res => {
            console.log('alert deleted successfully');
            this.setState(prevState => ({
              MessageList : prevState.MessageList.map(
                el => el.auditLogId == auditLogId ? 
                  {...el, isRead: true} : el
              )
            }))   
            this.props.unreadMessagesListFunction(this.state.MessageList)        
            // this.state.MessageList.map(d => {
            //   console.log('read state :', d.isRead)
            //   if(d.auditLogId == auditLogId) {
            //     console.log("matched id", d.auditLogId);
                
            //   }
            // })
          })
          // 118051 isRead: false DeleteAlert
          // 118046
        // CreateAlert(token, auditLogId, messageType)
        //   .then(res => {
        //     console.log('successfully marked unread', res);
        //   })
      })
  }

  render() {

    history = this.props.history;
    if(this.state.MessageList != null)
      console.log("message list render", this.state.MessageList.isRead);
    // let numHeight = parseInt(this.state.webviewHeight);
    // console.log('webviewHeight', this.state.webViewHeight);
    // let chat = this.state.MessageList.filter(m => m.messageType == "Style sample request")
    return (
      <MainView>
        <Header history={this.props.history}>
          <ScrollView>
            <IconRow>
              <Flex>
                <IconBox
                  currentView={this.state.message == true ? true : false}
                  onPress={() =>
                    this.setState({ message: !this.state.message })
                  }
                >
                  <StyleImage
                    resizeMode={"contain"}
                    source={require("../../../assets/img/messageblack.png")}
                  />
                </IconBox>
                <IconBox
                  currentView={this.state.chat == true ? true : false}
                  onPress={() => this.setState({ chat: !this.state.chat })}
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
                onPress={() => { }}
              >
                <ButtonRow>
                  {this.state.showOpacity && <ButtonOverlay />}
                  <IconView>
                    <Icon style={{ color: "#fff", fontSize: 15 }} name="eye" />
                  </IconView>
                  <CommentedButton>
                    <ButtonText> hide read </ButtonText>
                  </CommentedButton>
                </ButtonRow>
              </TouchableWithoutFeedback>
            </IconRow>
            {
              this.state.MessageList != null ?
                this.state.MessageList.map((m, index) => {
                  // if (index > 5)
                  //   return
                  let formatedDate = format(parseISO(m.loggedOn), "d-MMM-yyyy kk:mm");
                  // console.log('Enter in map', this.state.webviewHeight, index);

                  if (m.messageType == "StyleCommunicationMessage") {
                    return (
                      <Fragment>
                        {this.state.message && (
                          <MessageBox>
                            <TouchableHighlight
                              underlayColor={this.props.theme.overlayBlue}
                              onPress={() => this.redirectToComment(m.auditLogId)}
                            >
                              <Fragment>
                                <MsgIconBox readMsg={m.isRead}>
                                  <STouchableHighlight underlayColor={this.props.theme.overlayBlue} 
                                    onPress={this.toggleAlert(m.auditLogId, m.messageType)}>
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
                                    // style = {{height: this.state.htmlHeight !== null ? this.state.htmlHeight[index] : 30}}
                                    // onLayout={(event) => {
                                    // var {x, y, width, height} = event.nativeEvent.layout;
                                    // console.log('var height:', height);
                                    // this.setState({
                                    //   htmlHeight: height
                                    // }, () => console.log('response', this.state.htmlHeight))

                                    // }}
                                    >
                                      <ContentText
                                        originWhitelist={['*']}
                                        injectedJavaScript='window.ReactNativeWebView.postMessage(JSON.stringify(document.body.scrollHeight), "*")'
                                        onMessage={(event) => this._onMessage(event, index)}
                                        scrollEnabled={false}
                                        cacheEnabled={false}
                                        style={{
                                          fontSize: 26,
                                          height: 200,
                                          // height: this.state.htmlHeight[index]
                                        }}
                                        source={{
                                          html: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head>
                                    <body><small>${m.messageBody}</small></body></html>`
                                        }}
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
                      <Fragment>
                        {this.state.chat && (
                          <ChatMessage
                            data={m}
                            toggleAlertFunction = {() => this.toggleAlert(m.auditLogId, m.messageType)}
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
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(Message));
