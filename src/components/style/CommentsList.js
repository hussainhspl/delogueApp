import React, { Fragment } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { Icon } from 'native-base';
import styled from "styled-components";
import SearchInput from "../../styles/SearchInput";
import SearchIcon from '../../styles/SearchIcon';
import Subject from '../../styles/Subject';
import Title from '../../styles/SmallText';
import GetAsyncToken from '../../script/getAsyncToken';
import GetStyleMessages from "../../api/message/getStyleMessages";
import { format, parseISO } from 'date-fns';
import ReadAll from "../../api/message/readAll";
import { WebView } from 'react-native-webview';

let MsgData = [
  {
    key: 1,
    iconName: "mail",
  },
  {
    key: 2,
    iconName: "mail-open",
  },
  {
    key: 3,
    iconName: "mail",
  },
]
const SearchRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 10px 20px 20px;
`;
const MarkAllReadBox = styled.TouchableHighlight`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.darkGreen};
`;
const StyleImage = styled.Image`
  width: 25px;
  height: 20px;
`;
const MessageBox = styled.View`
  flex: 1;
  margin: 0px 10px 20px 20px;
  border: 1px solid #bbb;
  position: relative;
`;
const Row = styled.View`
  padding: 10px 20px;
  flex-direction: row;
  justify-content: space-between;
  /* background-color: */
`;
const MainContent = styled.View`
  width: 60%;
`;
const InfoContent = styled.View`
  width: 35%;
  /* justify-content: flex-end; */
  align-items: flex-end;
  /* background-color: #ddd; */
  flex-direction: column;
`;
const ContentText = styled.Text`
  color: ${props => props.theme.textColor};
  font-family: ${props => props.theme.regular};
  font-size: ${props => props.theme.large};

`;
const Name = styled.Text`
  color: #777;
  font-family: ${props => props.theme.bold};
  font-size: ${props => props.theme.small};
`;

const IconBox = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid #bbb;
  position: absolute;
  top: 5;
  left: -35;
  background-color: ${props => props.read ? '#fff' : props.theme.darkBlue};
  align-items: center;
  justify-content: center;
`;
const MailIcon = styled(Icon)`
  /* font-size: 12; */
  color: #ddd;
`;
const MsgImage = styled.Image`
  width: 20px;
  height: 15px;
`;

class CommentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      read: false,
      searchTerm: "",
      styleMessageList: null
    };
  }
  searchUpdated(term) {
    this.setState({
      searchTerm: term,
      renderSearch: "linear"
    });
  }

  styleMessages = () => {
    console.log("calling style messages api");
    GetAsyncToken().then(token => {
      console.log('get style api')
      GetStyleMessages(this.state.searchTerm, token, this.props.styleID,
        this.state.seasonIds)
        .then(res => {
          console.log('response', res);
          this.setState({
            styleMessageList: res.data,
          })
        })
    })
  }
  markRead = () => {
    console.log('click mark all', this.props.styleID);
    GetAsyncToken().then(token => {
      ReadAll(token, this.props.styleID)
        .then(res => {
          console.log('read all messages');
        })
    })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SearchRow>
          <SearchIcon>
            <Icon style={{ color: "#fff" }} name="ios-search" />
          </SearchIcon>
          <SearchInput
            placeholder="SEARCH"
            placeholderTextColor="#C9DBDB"
            onChangeText={term => {
              this.searchUpdated(term);
            }}
            onSubmitEditing={this.styleMessages}
          />
          <MarkAllReadBox
            onPress={this.markRead}
            underlayColor="#222e21"
          >
            <StyleImage source={require("../../../assets/img/glass.png")} />
          </MarkAllReadBox>
        </SearchRow>
        {/* <Fragment> */}
        {
          this.state.styleMessageList != null ?
            this.state.styleMessageList.map(data => {
              let formatedDate = format(parseISO(data.loggedOn), "d-MMM-yyyy kk:mm");
              return (
                <MessageBox>
                  <TouchableHighlight
                    underlayColor="#42546033"
                    onPress={
                      this.props.close
                    }
                  >
                    <Row>
                      <MainContent>
                        <IconBox read={data.isRead}>
                          <MsgImage
                            resizeMode={"contain"}
                            source={require("../../../assets/img/message-icon.png")} />
                        </IconBox>
                        <Subject>{data.sampleTypeName != null ? data.sampleTypeName : ''} </Subject>
                        {/* <ContentText numberOfLines={2}>Dear nando, please find a new style and if you have any doubt or queries then please ask</ContentText> */}
                        <WebView
                          originWhitelist={['*']}
                          injectedJavaScript='window.ReactNativeWebView.postMessage(JSON.stringify(document.body.scrollHeight), "*")'
                          scrollEnabled={false}
                          style={{height: 52}}
                          source={{
                            html: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head>
                            <body><small>${data.messageBody}</small></body></html>`
                          }}
                        />
                      </MainContent>
                      <InfoContent>
                        <Name>{data.loggedByUserName}</Name>
                        <Title>{formatedDate}</Title>
                      </InfoContent>
                    </Row>
                  </TouchableHighlight>
                </MessageBox>
              )
            })
            : <Text> Enter String to search </Text>
        }
      </View>
    );
  }
}
export default CommentsList;
