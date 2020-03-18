import React, {Fragment} from "react";
import { View, Text, TouchableHighlight, Dimensions } from "react-native";
import styled from "styled-components";
import { withTheme } from 'styled-components';
import Title from "../../styles/SmallText";
import CardText from "../../styles/CardText";
import Subject from '../../styles/Subject';
import { format, parseISO } from 'date-fns';
import { connect } from "react-redux";
import {sampleTab, styleId, singleStyle} from '../../store/actions/index';
import AutoHeightWebView from "react-native-autoheight-webview";
import GetAsyncToken from "../../script/getAsyncToken";
import SpecificMessage from "../../api/message/specificMessage";
import GetSelectedStyle from '../../api/getStyle';

const MessageBox = styled.View`
  flex: 1;
  margin: 10px 5px 5px 20px;
  border: 1px solid #bbb;
  position: relative;
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
const MsgImage = styled.Image`
  width: 20px;
  height: 15px;
`;
const TitleRow = styled.View`
  margin: 10px 10px 10px 20px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-color: #ddd;
  padding-bottom: 5px;
`;
const Row = styled.View`
  padding: 0px 20px 10px 20px;
  flex-direction: row;
  justify-content: space-between;
`;
const MainContent = styled.View`
  width: 70%;
`;

const ContentText = styled.Text`
  color: ${props => props.theme.textColor};
  font-family: ${props => props.theme.regular};
  font-size: ${props => props.theme.large};
`;
const HighlightText = styled.Text`
  font-family: ${props => props.theme.bold};
  color: ${props => props.theme.textColor};

`;
const InternalView = styled.View`
  align-items: center;
  flex-direction: row;
  align-self: flex-start;
`;
const DetailsButton = styled.Text`
  background-color: #c2beb6;
  padding: 5px 10px;
  color: #fff;
  font-size: ${props => props.theme.small};
  margin-right: 10px;
  font-family: ${props => props.theme.regular};
`;
const Flex1 = styled.View`
  flex: 1;
`;
class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  redirectToSample() {
    console.log('goto sample', this.props.data);
    GetAsyncToken()
      .then(token => {
        GetSelectedStyle(token, this.props.data.styleId)
          .then(res => {
            this.props.singleStyleFunction(res.data)
          })
      })
    this.props.styleIdFunction(this.props.data.styleId);
    this.props.sampleTabFunction();
    this.props.history.push({
      pathname: '/style',
      SampleCommentData: this.props.data,
      sampleRequestOpen: true
    })
  }
  render() {
    // console.log('props in sample request', this.props.data)
    // console.log('enter in chat')
    let {styleName, loggedOn, styleNumber, loggedByUserName, 
      messageSubject, isRead, sampleTypeName, messageBody} = this.props.data;
    // let formatedDate = format(parseISO(loggedOn), "d-MMM-yyyy kk:mm");
    const date = new Date(loggedOn)
    let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
    let formatedDate = format(localDate, "d-MMM-yyyy kk:mm") 
    return (
      <MessageBox>
        <TouchableHighlight
          underlayColor="#42546033"
          onPress={() => this.redirectToSample()}
        >
          <Fragment>
            <ChatIconBox readChat={isRead}>
              <STouchableHighlight
                underlayColor={this.props.theme.overlayBlue}
                onPress={this.props.toggleAlertFunction}
                // {/* onPress={() => console.log("chat icon click")} */}
              >
                <MsgImage
                  resizeMode={"contain"}
                  source={require("../../../assets/img/comment.png")}
                />
              </STouchableHighlight>
            </ChatIconBox>
            <TitleRow>
              <Flex1>
                <Title>Style Name</Title>
                <CardText numberOfLines={1}>{styleName}</CardText>
              </Flex1>
              <Flex1>
                <Title>Style Number</Title>
                <CardText numberOfLines={1}>{styleNumber}</CardText>
              </Flex1>
              <Flex1>
                <Title>{formatedDate}</Title>
                <CardText numberOfLines={1}>{loggedByUserName}</CardText>
              </Flex1>
            </TitleRow>
            <Row>
              <MainContent>
                <Subject>{sampleTypeName !== null ? sampleTypeName : 'no subject'} </Subject>
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
                  source={{ html: `<html><head></head><body>${messageBody}</body></html>` }}
                  scalesPageToFit={false}
                  zoomable={false}
                  viewportContent={'width=device-width, user-scalable=no'}
                />

                {/* <ContentText numberOfLines={2}>
                  Has been <HighlightText> Planned </HighlightText>{" "}
                </ContentText>
                <ContentText numberOfLines={2}>
                  Has been <HighlightText> Requested </HighlightText>{" "}
                </ContentText>
                <ContentText numberOfLines={2}>
                  Status changed to <HighlightText> Confirmed</HighlightText>{" "}
                </ContentText>
                <Title>ETD: 13-oct-2019</Title>
                <Title>ETD was not added</Title>
                <ContentText numberOfLines={2}>
                  Status changed to <HighlightText> Sent</HighlightText>{" "}
                </ContentText>
                <Title>Tracking #: SWF7939248937498</Title>
                <Title>Tracking was not added </Title>
                <Title>ETD updated to : 13-oct-2019</Title>
                <Title>Tracking # updated to : SWF7939248937498</Title>
                <ContentText numberOfLines={2}>
                  Status changed to <HighlightText> Received</HighlightText>{" "}
                </ContentText>
                <ContentText numberOfLines={2}>
                  Status changed to <HighlightText> Commented</HighlightText>{" "}
                </ContentText> */}
              </MainContent>
              <InternalView>
                <DetailsButton> Show Details </DetailsButton>
              </InternalView>
            </Row>
          </Fragment>
        </TouchableHighlight>
      </MessageBox>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    sampleTabFunction: () => dispatch(sampleTab()),
    styleIdFunction: (sid) => dispatch(styleId(sid)),
    singleStyleFunction: (s) => dispatch(singleStyle(s))

  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(ChatMessage));
