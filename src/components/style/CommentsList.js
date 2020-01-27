import React, { Fragment } from "react";
import { View, Text, Image, TouchableHighlight, Dimensions } from "react-native";
import { Icon } from 'native-base';
import { withTheme } from 'styled-components';
import styled from "styled-components";
import SearchInput from "../../styles/SearchInput";
import SearchIcon from '../../styles/SearchIcon';
import Subject from '../../styles/Subject';
import Title from '../../styles/SmallText';
import GetAsyncToken from '../../script/getAsyncToken';
import GetStyleMessages from "../../api/comments/getStyleMessages";
import { format, parseISO } from 'date-fns';
import { connect } from 'react-redux';
import { styleMessageList } from '../../store/actions/index'
import ReadAll from "../../api/comments/readAll";
import { WebView } from 'react-native-webview';
import CreateAlert from "../../api/createAlert";
import DeleteAlert from "../../api/deleteAlert";
import InfoView from "../../styles/InfoView";
import InfoText from "../../styles/InfoText";
import AutoHeightWebView from "react-native-autoheight-webview";
import Toast from 'react-native-root-toast';



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
  background-color: ${props => props.theme.darkGreen};\
  margin-left: 15px;
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
const STouchableHighlight = styled.TouchableHighlight`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid #bbb;
  align-items: center;
  justify-content: center;
`;
class CommentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      read: false,
      searchTerm: "",
      msgList: null,
      emptyResult: false
    };
    this.styleMessages = this.styleMessages.bind(this);
  }
  componentDidMount = () => {
    this.styleMessages()
  }
  searchUpdated(term) {
    this.setState({
      searchTerm: term,
      renderSearch: "linear"
    });
  }

  styleMessages = () => {
    // console.log("calling style messages api");
    GetAsyncToken().then(token => {
      // console.log('get style api')
      GetStyleMessages(this.state.searchTerm, token, this.props.styleID,
        this.state.seasonIds)
        .then(res => {
          console.log('response', res);
          // this.props.styleMessageListFunction(res.data)
          if (res.data.length == 0) {
            this.setState({ emptyResult: true })
          }
          this.setState({
            msgList: res.data
          })
        })
    })
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // console.log('before render', this.state.MessageList.isRead)
  //   if (nextProps.msgList !== prevState.msgList) {
  //     console.log("Entered nextProps style msg",prevState.msgList);
  //     return{
  //       msgList: nextProps.storeMsgList,
  //     }
  //   }
  //   return null;
  // }
  toggleAlert(auditLogId, messageType) {
    console.log('enter in toggle alert', auditLogId);
    let currentAlert = '';
    GetAsyncToken()
      .then(token => {

        this.state.msgList.map(d => {
          if (d.auditLogId == auditLogId) {
            console.log('click state', d.isRead);
            currentAlert = d.isRead;
          }
        })
        console.log('if', currentAlert);
        if (currentAlert == false) {
          console.log('auditLogId', auditLogId);
          DeleteAlert(token, auditLogId)
            .then(res => {
              console.log('alert deleted successfully');
              this.styleMessages()
              // this.props.updateReadFunction(auditLogId)   

            })
        } else {
          console.log('auditLogId', auditLogId);
          CreateAlert(token, auditLogId, messageType)
            .then(res => {
              console.log('successfully marked unread', res);
              this.styleMessages()
              // this.props.updateUnReadFunction(auditLogId)
            })
        }
      })
  }
  markRead = () => {
    console.log('click mark all', this.props.styleID);
    GetAsyncToken().then(token => {
      ReadAll(token, this.props.styleID)
        .then(res => {
          console.log('read all messages');
          this.styleMessages()
          let toast = Toast.show('All Messages marked as Read', {
						duration: Toast.durations.LONG,
						position: Toast.positions.BOTTOM,
						shadow: true, animation: true,
						hideOnPress: true, delay: 0,
					})
        })
    })
  }
  render() {
    console.log('this.state.msgList', this.state.msgList);
    return (
      <View style={{ flex: 1 }}>
        <SearchRow>
          <SearchIcon>
            <Icon style={{ color: "#fff" }} name="ios-search" />
          </SearchIcon>
          <SearchInput
            placeholder="SEARCH"
            placeholderTextColor="#C9DBDB"
            clearButtonMode='always'
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
          this.state.msgList != null ?
            this.state.msgList.map(data => {
              let formatedDate = format(parseISO(data.loggedOn), "d-MMM-yyyy kk:mm");
              let msgId = data.parentLogId != null ? data.parentLogId : data.auditLogId
              return (
                <MessageBox>
                  <TouchableHighlight
                    underlayColor="#42546033"
                    // onPress={() => console.log('style msg click')}
                    onPress={() => this.props.closeList(msgId)}
                  >
                    <Row>
                      <MainContent>
                        <IconBox read={data.isRead}>
                          <STouchableHighlight underlayColor={this.props.theme.overlayBlue}
                            onPress={() => this.toggleAlert(data.auditLogId, data.messageType)}>
                            <MsgImage
                              resizeMode={"contain"}
                              source={require("../../../assets/img/message-icon.png")} />
                          </STouchableHighlight>
                        </IconBox>
                        <Subject>
                          {data.messageSubject != null ? data.messageSubject.length > 0 ? data.messageSubject : 'no subject' : 'no subject'}
                        </Subject>
                        {/* <ContentText numberOfLines={2}>Dear nando, please find a new style and if you have any doubt or queries then please ask</ContentText> */}
                        <AutoHeightWebView
                          style={{ width: Dimensions.get('window').width - 45, height: 72 }}
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
                          source={{
                            html: `${data.messageBody}`
                          }}
                          scalesPageToFit={false}
                          zoomable={false}
                          viewportContent={'width=device-width, user-scalable=no'}

                        />
                        {/* <WebView
                          originWhitelist={['*']}
                          injectedJavaScript='window.ReactNativeWebView.postMessage(JSON.stringify(document.body.scrollHeight), "*")'
                          scrollEnabled={false}
                          style={{height: 72}}
                          source={{
                            html: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head>
                            <body><small>${data.messageBody}</small></body></html>`
                          }}
                        /> */}
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
            : <InfoView>
              <InfoText> </InfoText>
            </InfoView>
        }
        {this.state.emptyResult && (
          <InfoView>
            <InfoText> No result found </InfoText>
          </InfoView>
        )}
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    styleMessageListFunction: (li) => dispatch(styleMessageList(li))
  }
};
const mapStateToProps = state => {
  return {
    storeMsgList: state.styleMessageList.styleMessageListState
  }
};
export default connect(mapStateToProps, mapDispatchToProps)
  (withTheme(CommentsList));
