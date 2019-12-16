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

const ContentText = styled.Text`
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

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: false,
      message: true,
      MessageList: null,
      showOpacity: false,
      read: false,
      chatRead: false
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
            console.log('response in unread message', res);
            this.setState({
              MessageList: res.data,
            })
            // this.props.styleFileListFunction(res.data)
          })
      })
  }
  render() {
    // console.log("read state", this.state.read);
    history = this.props.history;
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
                this.state.MessageList.map( m => {
                  let formatedDate = format(parseISO(m.loggedOn),"d-MMM-yyyy kk:mm");
                  console.log('formatted date', formatedDate);
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
                            <View>
                              <Title>Style Name</Title>
                              <CardText numberOfLines={1}>{m.styleName}</CardText>
                            </View>
                            <View>
                              <Title>Style Number</Title>
                              <CardText numberOfLines={1}>{m.styleNumber}</CardText>
                            </View>
                            <View>
                              <Title>{formatedDate}</Title>
                              <CardText numberOfLines={1}>{m.loggedByUserName}</CardText>
                            </View>
                          </TitleRow>
                          <Row>
                            <MainContent>
                              <Subject>
                                jkh
                              </Subject>
                              <ContentText numberOfLines={2}>
                                Dear nando, please find a new style and if you have
                                any doubt or queries then please ask
                              </ContentText>
                            </MainContent>
                            <InternalView>
                              <Icon style={{ color: "#ddd",fontSize: 18 }} name="home" />
                              <InternalText>Internal</InternalText>
                            </InternalView>
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
