import React, {Fragment} from "react";
import { View, Text, TouchableHighlight } from "react-native";
import styled from "styled-components";
import { withTheme } from 'styled-components';
import Title from "../../styles/SmallText";
import CardText from "../../styles/CardText";
import Subject from '../../styles/Subject';
import { format, parseISO } from 'date-fns';


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

class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log('props in sample request', this.props.data)
    let {styleName, loggedOn, styleNumber, loggedByUserName, 
      messageSubject, isRead} = this.props.data;
    let formatedDate = format(parseISO(loggedOn), "d-MMM-yyyy kk:mm");
    return (
      <MessageBox>
        <TouchableHighlight
          underlayColor="#42546033"
          onPress={() => console.log("click on message box")}
        >
          <Fragment>
            <ChatIconBox readChat={isRead}>
              <STouchableHighlight
                underlayColor={this.props.theme.overlayBlue}
                onPress={() => {
                  this.setState({ chatRead: !this.state.chatRead });
                }}
              >
                <MsgImage
                  resizeMode={"contain"}
                  source={require("../../../assets/img/comment.png")}
                />
              </STouchableHighlight>
            </ChatIconBox>
            <TitleRow>
              <View>
                <Title>Style Name</Title>
                <CardText numberOfLines={1}>{styleName}</CardText>
              </View>
              <View>
                <Title>Style Number</Title>
                <CardText numberOfLines={1}>{styleNumber}</CardText>
              </View>
              <View>
                <Title>{formatedDate}</Title>
                <CardText numberOfLines={1}>{loggedByUserName}</CardText>
              </View>
            </TitleRow>
            <Row>
              <MainContent>
                <Subject>{messageSubject !== null ? messageSubject : 'no subject'} </Subject>
                <ContentText numberOfLines={2}>
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
                </ContentText>
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
export default withTheme(ChatMessage);
