import React, { Fragment } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  ScrollView
} from "react-native";
import { Icon } from "native-base";
import { withTheme} from 'styled-components';
import { connect } from "react-redux";
import { commentTab } from "../../store/actions/index";
import styled from "styled-components";
import Header from "../../Header";
import Subject from '../../styles/Subject';
import Title from "../../styles/SmallText";
import CardText from "../../styles/CardText";
import ChatMessage from './ChatMessage';
import UnreadMessageList from '../../api/message/unreadMessageList';
import GetAsyncToken from '../../script/getAsyncToken';
import { format, parseISO } from 'date-fns';
// import HTMLView from 'react-native-htmlview';
import { WebView } from 'react-native-webview';
import DWebView from "./DWebView";



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

const StyledText = styled.Text`
  font-family: ${props => props.theme.regular};
  color: #4a4a4a;
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
  background-color: ${props => props.readMsg ? '#fff': props => props.theme.darkBlue};
  align-items: center;
  justify-content: center;
`;

const ChatIconBox = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid #bbb;
  position: absolute;
  top: 5px;
  left: -15px;
  background-color: ${props => props.readChat ? '#fff': props => props.theme.darkBlue};
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
const jsString = `
  function post () {
    postMessage(
      Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight)
    );
  }
  setTimeout(post, 200);
// other custom js you may want
`
// 'window.ReactNativeWebView.postMessage(document.body.scrollHeight)'
const webViewScript = `
  setTimeout(function() { 
    window.ReactNativeWebView.postMessage(document.body.scrollHeight); 
  }, 500);
  true; // note: this is required, or you'll sometimes get silent failures
`;
const injectedScript = function() {
  function waitForBridge() {
    if (window.postMessage.length !== 1){
      setTimeout(waitForBridge, 200);
    }
    else {
      postMessage(
        Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight)
      )
    }
  }
  waitForBridge();
};

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
    GetAsyncToken()
      .then(token => {
        // console.log('script token', token, this.props.styleID)
        // if(this.state.fileArr.delogueFolderResponse != null){
        //   console.log('folder details', this.state.fileArr.delogueFolderResponse.id, this.props.styleID);
        // }
        
        UnreadMessageList(token)
          .then( res => {
            // console.log('response in unread message', res);
            this.setState({
              MessageList: res.data,
            })
            // this.props.styleFileListFunction(res.data)
          })
      })
  }
  find_dimesions(layout){
    const {x, y, width, height} = layout;
    console.warn(x);
    console.warn(y);
    console.warn(width);
    console.log("hright",height);
  }
  _onMessage = (event) => {
    // console.log('before render')
    let heightRaw = 0;
    heightRaw= Number(event.nativeEvent.data);
    let intHeight = parseInt(heightRaw)
    console.log('on message height', intHeight);
    // if(this.state.htmlHeight != null) {
      let list = [];
      console.log('before push state', this.state.htmlHeight);
      list = this.state.htmlHeight;
      console.log('list after copying state', list);
      list.push(intHeight);
      console.log('after push', list);
      // if(this.state.htmlHeight != intHeight) {
      console.log('html state', this.state.htmlHeight);
      this.setState({
        htmlHeight : list
      })
    // }else {
    //   this.setState({
    //     htmlHeight : intHeight
    //   })
    // }
    // // }
    // this.setState({
    //   webViewHeight: intHeight
    // },() => {console.log('callback', this.state.webviewHeight)});
    // this.setState(prevState => ({webViewHeight : [...prevState.webViewHeight, intHeight}))
  }
  // _onMessage = (e) => {
  //   this.setState({
  //     webviewHeight: parseInt(e.nativeEvent.data)
  //   });
  // }
  render() {
    // console.log("read state", this.state.read);
    history = this.props.history;
    // let numHeight = parseInt(this.state.webviewHeight);
    // console.log('in render')
    // arr = ['A','B','C','D'];
    console.log('webviewHeight', this.state.webViewHeight);
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
                onPress={() => {}}
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
            {this.state.message && (
              this.state.MessageList != null ? 
                this.state.MessageList.map( (m, index) => {
                  // if(index >0)
                  //   return
                  let formatedDate = format(parseISO(m.loggedOn),"d-MMM-yyyy kk:mm");
                  // console.log('Enter in map', this.state.webviewHeight, index);
                  const htmlContent = `${m.messageBody}`;
                  // console.log('index', index);
                  // console.log('height in map : ',this.state.htmlHeight[index])
                  return(
                    <MessageBox>
                      <TouchableHighlight
                        underlayColor={this.props.theme.overlayBlue}
                        onPress={() => {this.props.commentTabFunction(); history.push('/style')}}
                      >
                        <Fragment>
                          <MsgIconBox readMsg={m.isRead}>
                            <STouchableHighlight underlayColor={this.props.theme.overlayBlue} onPress={() => {this.setState({read : !this.state.read })}}>
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
                           {/* <DWebView  htmlStr = {"<div>"+ arr[index] + "</div>"} /> */}
                            <MainContent>
                              <Subject>
                                {m.messageSubject !== null ? m.messageSubject : 'no subject'}
                              </Subject>
    
                              <View 
                                // style = {{height: this.state.htmlHeight !== null ? this.state.htmlHeight : 30}}
                                onLayout={(event) => {
                                  var {x, y, width, height} = event.nativeEvent.layout;
                                  console.log('var height:', height);
                                  // this.setState({
                                  //   htmlHeight: height
                                  // }, () => console.log('response', this.state.htmlHeight))
                                  
                                }}
                              >
                              <ContentText
                                originWhitelist={['*']}
                                injectedJavaScript={webViewScript}
                                // javaScriptEnabled={true}
                                onMessage={this._onMessage} 
                                // automaticallyAdjustContentInsets={true}
                                // scalesPageToFit={true}
                                style={{fontSize: 26,
                                  // flex: 0, 
                                  // height: 200
                                  height: this.state.htmlHeight[index]
                                }}
                                source={{ html: `<head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><small>${m.messageBody}</small></body>` }}
                              />
                               </View>
                              {/* :null} */}
                            </MainContent>
                            {/* <InternalView>
                              <Icon style={{ color: "#ddd",fontSize: 18 }} name="home" />
                              <InternalText>Internal</InternalText>
                            </InternalView> */}
                          </Row>
                        </Fragment>
                      </TouchableHighlight>
                    </MessageBox>
                  )
                })
              : <Text>No Messages</Text>
            )}
            {this.state.chat && (
              <ChatMessage />
            )}
            
          </ScrollView>
        </Header>
        {/* <WebView 
          // source={{ uri: 'https://facebook.github.io/react-native/' }} 
          originWhitelist={['*']}
          injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'
          // onMessage={this._onMessage}
          containerStyle={{ flex: 0, height: this.state.webviewHeight}}
          source={{ html: "<head><meta name='viewport' content='width=device-width, initial-scale=1'></head><body><div><table class='CommentStyleCommentBlueBoxTable FixedTablewidth'><tr><td>Note:</td><td><span>&nbsp;uiuyyhjjn</span></td></tr><tr id='notifiedUsersRow'><td class='lightColor'>Notified Users:</td><td id='notifiedUsers'><span>-</span></td></tr></table></div><br/><div class='FixedPadding'></div></body>" }}
        /> */}
      </MainView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    commentTabFunction: () => dispatch(commentTab()),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(Message));
