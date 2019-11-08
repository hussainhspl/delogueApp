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
import styled from "styled-components";
// import { Col, Row, Grid } from "react-native-easy-grid";
import Header from "../Header";
import { Card, Icon } from "native-base";
import Title from "../styles/SmallText";
import CardText from "../styles/CardText";
import { withTheme } from 'styled-components';
import { connect } from "react-redux";
import { commentTab } from "../store/actions/index";


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
  margin-left: 15;
  /* width: 100; */
  margin: 15px auto;
  padding: 6px 10px;
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  height: 32px;
`;
const IconView = styled.View`
  width: 30;
  height: 32;
  background-color: #415461;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  /* width: 80px; */
  text-align: center;
  font-family: ${props => props.theme.regular};
`;

const MessageBox = styled.View`
  flex: 1;
  margin: 10px 5px 5px 20px;
  border: 1px solid #bbb;
  position: relative;
`;

const MainContent = styled.View`
  width: 70%;
  /* background-color: #ddd; */
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
  top: 5;
  left: -15;
  background-color: ${props => props.readChat ? '#fff': props => props.theme.darkBlue};
  align-items: center;
  justify-content: center;
`
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
  /* background-color: */
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

const Subject = styled.Text`
  color: ${props => props.theme.darkBlue};
  font-size: ${props => props.theme.xl};
  font-family: ${props => props.theme.bold};
  padding-bottom: 5px;
`;

const ContentText = styled.Text`
  color: #777;
  font-family: ${props => props.theme.regular};
  font-size: ${props => props.theme.large};

`;
const InternalText = styled.Text`
  color: #aaa;
  padding-left: 5px;
  font-size: ${props => props.theme.small};
  font-family: ${props => props.theme.regular};

`;
const DetailsButton = styled.Text`
  background-color: #c2beb6;
  padding: 5px 10px;
  color: #fff;
  font-size: 12px;
  margin-right: 10px;
  font-family: ${props => props.theme.regular};

`;

const MsgImage = styled.Image`
  width: 20px;
  height: 15px;
`;

const HighlightText = styled.Text`
  font-family: ${props => props.theme.bold};
`

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: true,
      message: false,
      showOpacity: false,
      read: false,
      chatRead: false
    };
  }
  render() {
    console.log("read state", this.state.read);
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
                    source={require("../../assets/img/messageblack.png")}
                  />
                </IconBox>
                <IconBox
                  currentView={this.state.chat == true ? true : false}
                  onPress={() => this.setState({ chat: !this.state.chat })}
                >
                  <StyleImage
                    resizeMode={"contain"}
                    source={require("../../assets/img/conversation.png")}
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
              <MessageBox>
                <TouchableHighlight
                  underlayColor={this.props.theme.overlayBlue}
                  onPress={() => {this.props.commentTabFunction(); history.push('/style')}}
                >
                  <Fragment>
                    <MsgIconBox readMsg={this.state.read}>
                      <STouchableHighlight underlayColor={this.props.theme.overlayBlue} onPress={() => {this.setState({read : !this.state.read })}}>
                        <MsgImage
                          resizeMode={"contain"}
                          source={require("../../assets/img/message-icon.png")}
                        />
                      </STouchableHighlight>
                    </MsgIconBox>
                    <TitleRow>
                      <View>
                        <Title>Style Name</Title>
                        <CardText numberOfLines={1}>Casual Shirt</CardText>
                      </View>
                      <View>
                        <Title>Style Number</Title>
                        <CardText numberOfLines={1}>Styl 2213</CardText>
                      </View>
                      <View>
                        <Title>13-oct-2019 13.49</Title>
                        <CardText numberOfLines={1}>Richel Smith</CardText>
                      </View>
                    </TitleRow>
                    <Row>
                      <MainContent>
                        <Subject>Swatch samples </Subject>
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
            )}
            {this.state.chat && (
              <MessageBox>
                <TouchableHighlight
                  underlayColor="#42546033"
                  onPress={() => console.log("click on message box")}
                >
                  <Fragment>
                    <ChatIconBox readChat={this.state.chatRead}>
                    <STouchableHighlight underlayColor={this.props.theme.overlayBlue} onPress={() => {this.setState({chatRead : !this.state.chatRead })}}>
                        <MsgImage
                          resizeMode={"contain"}
                          source={require("../../assets/img/comment.png")}
                        />
                      </STouchableHighlight>
                    </ChatIconBox>
                    <TitleRow>
                      <View>
                        <Title>Style Name</Title>
                        <CardText numberOfLines={1}>Casual Shirt</CardText>
                      </View>
                      <View>
                        <Title>Style Number</Title>
                        <CardText numberOfLines={1}>Styl 2213</CardText>
                      </View>
                      <View>
                        <Title>13-oct-2019 13.49</Title>
                        <CardText numberOfLines={1}>Richel Smith</CardText>
                      </View>
                    </TitleRow>
                    <Row>
                      <MainContent>
                        <Subject>Sales samples </Subject>
                        <ContentText numberOfLines={2}>
                          Has been{" "}
                          <HighlightText> Planned </HighlightText>{" "}
                        </ContentText>
                        <ContentText numberOfLines={2}>
                          Has been{" "}
                          <HighlightText> Requested </HighlightText>{" "}
                        </ContentText>
                        <ContentText numberOfLines={2}>
                          Status changed to{" "}
                          <HighlightText> Confirmed</HighlightText>{" "}
                        </ContentText>
                        <Title>ETD: 13-oct-2019</Title>
                        <Title>ETD was not added</Title>
                        <ContentText numberOfLines={2}>
                          Status changed to{" "}
                          <HighlightText> Sent</HighlightText>{" "}
                        </ContentText>
                        <Title>Tracking #: SWF7939248937498</Title>
                        <Title>Tracking was not added </Title>
                        <Title>ETD updated to : 13-oct-2019</Title>
                        <Title>Tracking # updated to : SWF7939248937498</Title>
                        <ContentText numberOfLines={2}>
                          Status changed to{" "}
                          <HighlightText> Received</HighlightText>{" "}
                        </ContentText>
                        <ContentText numberOfLines={2}>
                          Status changed to{" "}
                          <HighlightText> Commented</HighlightText>{" "}
                        </ContentText>
                      </MainContent>
                      <InternalView>
                        <DetailsButton> Show Details </DetailsButton>
                      </InternalView>
                    </Row>
                  </Fragment>
                </TouchableHighlight>
              </MessageBox>
            )}
          </ScrollView>
        </Header>
      </MainView>
    );
  }
}

const mapStateToProps = state => {
  // console.log(" footer map state to props");
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
