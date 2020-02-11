import React, { Fragment } from "react";
import { View, Text, Dimensions, TouchableHighlight } from "react-native";
import styled from "styled-components";
import { Icon } from "native-base";
import { withTheme } from 'styled-components';
//Relative import
import ReplyComponent from './ReplyComponent';
import ImageCard from "../../shared/ImageCard";
import Subject from '../../styles/Subject';
import Title from '../../styles/SmallText';
import { format, parseISO } from 'date-fns';
import { WebView } from 'react-native-webview';
import AutoHeightWebView from "react-native-autoheight-webview";

const imgArr = [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }];
const CommentBox = styled.View`
  border: 1px solid #ddd;
  padding: 0px 10px;
  margin: 0px 10px 20px 20px;
  position: relative;
`;

const IconBox = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid #bbb;
  position: absolute;
  top: 15px;
  left: -15px;
  background-color: ${props => props.read ? '#fff' : props.theme.darkBlue};
  align-items: center;
  justify-content: center;
`;


const FirstRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px ;
  margin: 0px 10px;
  /* background-color: #ddd; */
  /* padding-bottom: 10px; */
`;

const NewButton = styled(View)`
  background-color: ${props => props.theme.blue};
  margin-left: 15;
  width: 100;
  margin-left: auto;
  padding: 0;
  flex-direction: row;
  align-items: center;
`;
const IconView = styled.View`
  width: 30;
  height: 30;
  background-color: ${props => props.theme.darkBlue};
  justify-content: center;
  align-items: center;
`;
const ButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  width: 70;
  text-align: center;
  font-family: ${props => props.theme.regular};
`;
const FromRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px 0px 0px 10px;
  flex-wrap: wrap;
  /* width: 35%; */
  /* background-color: #f00; */
`;
const HeaderText = styled.Text`
  color: #9b9b9b;
  /* line-height: 29px; */
  font-family: ${props => props.theme.regular};
  text-align: right;
  padding-top:10px;
`;
const MessageBody = styled.Text`
  padding: 20px 0px;
  line-height: 20;
  font-family: ${props => props.theme.regular};
  font-size: ${props => props.theme.large};
  width: 65%;
`;
const ImageRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 15px;
  padding: 0px 5px;
`;

const BackRow = styled.View`
  flex-direction: row;
  padding: 15px 0px 5px 15px;
  align-items: center;
`;
const BackText = styled.Text`
  color: #aaa;
  padding-left: 5px;
  font-size: 12px;
`;
const MsgImage = styled.Image`
  width: 20px;
  height: 15px;
`;
const BodyArea = styled.View`
  /* flex-direction: row; */
`;

const Name = styled.Text`
  color: #777;
  font-family: ${props => props.theme.bold};
  font-size: ${props => props.theme.small};
  padding-bottom: 3px;
  width: 100%;
  text-align: right;
`;
const Date = styled.Text`
  color: #777;
  font-size: 12;
  text-align: right;
`;
const InternalText = styled.Text`
  color: #aaa;
  padding-left: 5px;
  font-size: ${props => props.theme.small};
  font-family: ${props => props.theme.regular};
`;


const InternalView = styled.View`
  align-items: center;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  padding-top: 5px;
`;
const NotifyView = styled.View`
  padding: 6px 0px;
  align-items: flex-end;
`;

const ReplyBlock = styled.View`
  border-bottom-width: 1px;
  border-color: #ddd;
`;
class SpecificStyleMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: false,
    }
  }
  render() {
    console.log('this. specific style block data', this.props.data)
    const { isRead, loggedInUser, loggedOn, notifiedUsers, internalOnly,
      subject, logMessage, id, replyList, fileList } = this.props.data.styleAuditLog;
    console.log('time : ', format(parseISO(loggedOn), "d-MMM-yyyy kk:mm"))
    // console.log('is read : ', isRead, this.props.data.styleAuditLog);
    // let formatedDate = format(parseISO(loggedOn), "d-MMM-yyyy kk:mm");
    const date = new Date(loggedOn)
    let localDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
    let formatedDate = format(localDate, "d-MMM-yyyy kk:mm") 
    let mainMsgBody = logMessage.replace(/class='commAttachmentsContainer/g, "style='display: none' class='")
      console.log('main msg body', mainMsgBody);
    return (
      <Fragment>
        <CommentBox>
          <IconBox read={isRead}>
            <MsgImage
              resizeMode={"contain"}
              source={require("../../../assets/img/message-icon.png")} />
          </IconBox>
          {
            this.state.reply === false && (
              <FirstRow>
                <View style={{ flex: 1, paddingRight: 2 }}>
                  <Subject numberOfLines={1}> {subject != null ? subject : 'no subject'} </Subject>
                </View>
                <TouchableHighlight
                  // onPress={() => this.setState({ reply: true })}
                  onPress={() => this.props.createReply(id)}
                  underlayColor={this.props.theme.overlayBlue}
                >
                  <NewButton small >
                    <IconView>
                      <Icon style={{ color: "#fff", fontSize: 15 }} name="undo" />
                    </IconView>
                    <ButtonText> reply </ButtonText>
                  </NewButton>
                </TouchableHighlight>
              </FirstRow>
            )}
          {
            this.state.reply && (
              <ReplyComponent />
            )
          }
          {
            replyList != null ?
              replyList.map(d => {
                let newMsgBody = d.logMessage.replace(/class='commAttachmentsContainer/g, "style='display: none' class='")
                let formatedDate = format(parseISO(d.loggedOn), "d-MMM-yyyy kk:mm");
                console.log('reply msg text', newMsgBody);
                return (
                  <ReplyBlock>
                    <FromRow>
                      <Name>{d.loggedInUser.name} </Name>
                      <Title>{formatedDate}</Title>
                      <NotifyView>
                        <Title> NOTIFIED</Title>
                        {
                          notifiedUsers.length > 0 ?
                            notifiedUsers.map(d => (
                              <Title> {d.name} </Title>
                            ))
                            : null
                        }
                        {d.internalOnly != null && (
                          <InternalView>
                            <Icon style={{ color: '#ddd', fontSize: 15 }} name="home" />
                            <InternalText>Internal</InternalText>
                          </InternalView>
                        )}

                      </NotifyView>
                    </FromRow>
                    <AutoHeightWebView
                      style={{ width: Dimensions.get('window').width - 55, marginTop: 15, marginBottom: 0 }}
                      // source={{ html: `<p style=" font-weight: 400;font-style: normal;font-size: 21px;line-height: 1.58;letter-spacing: -.003em;">Tags are great for describing the essence of your story in a single word or phrase, but stories are rarely about a single thing. <span style="background-color: transparent !important;background-image: linear-gradient(to bottom, rgba(146, 249, 190, 1), rgba(146, 249, 190, 1));">If I pen a story about moving across the country to start a new job in a car with my husband, two cats, a dog, and a tarantula, I wouldn’t only tag the piece with “moving”. I’d also use the tags “pets”, “marriage”, “career change”, and “travel tips”.</span></p>` }}
                      source={{html: `${newMsgBody}`}}
                      customStyle={`
                        * {
                          font-family: ${props => props.theme.regular};
                          // background-color: #f66;
                        }
                        .fr-emoticon {
                          width: 15px;
                          height: 15px;
                          display: inline-block;
                        }
                        pre {
                          white-space: pre-wrap;
                          }                 
                      `}
                      scalesPageToFit={false}
                      viewportContent={'width=device-width, user-scalable=no'}
                    />
                    {
                      d.fileList != null ?
                        <ImageRow>
                          {d.fileList.map(data => {
                            let url = `http://test.delogue.com/api/v2.0/resource/thumbnail?ResourceId=${data.fileId}&Width=117&Height=113`
                            let bigUrl = `${baseUrl}resource/thumbnail?ResourceId=${data.fileId}&Width=1000&Height=500`
                            return (
                              <Fragment>

                                <ImageCard key={data.key}
                                  msgTitle={subject}
                                  bigImgUrl={bigUrl}
                                  imgPath={{ uri: url }}
                                  fileName={data.fileName}

                                >

                                </ImageCard>

                              </Fragment>
                            );
                          })}
                        </ImageRow>
                        : nul
                    }
                  </ReplyBlock>
                )
              })
              : null
          }
          <BodyArea>
            {/* <MessageBody> */}
            <FromRow>
              <Name>{loggedInUser.name} </Name>
              <Title>{formatedDate}</Title>
              <NotifyView>
                <Title> NOTIFIED</Title>
                {
                  notifiedUsers.length > 0 ?
                    notifiedUsers.map(d => (
                      <Title> {d.name} </Title>
                    ))
                    : null

                }
                {internalOnly != null && (
                  <InternalView>
                    <Icon style={{ color: '#ddd', fontSize: 15 }} name="home" />
                    <InternalText>Internal</InternalText>
                  </InternalView>
                )}

              </NotifyView>
            </FromRow>
            <AutoHeightWebView
              style={{ width: Dimensions.get('window').width - 15, marginTop: 15 }}
              source={{ html: `${mainMsgBody}` }}
              customStyle={`
              *{
                font-family: ${props => props.theme.regular};
                // background-color: #f66;
                width: 100%;
              }
              pre {
                white-space: pre-wrap;
                } 
              .fr-emoticon {
                width: 15px;
                height: 15px;
                display: inline-block;
              }`}
              scalesPageToFit={true}
              zoomable={false}
              viewportContent={'width=device-width, user-scalable=no'}
            />
          </BodyArea>
          {
            fileList != null ?
              <ImageRow>
                {fileList.map(data => {
                  let url = `${baseUrl}resource/thumbnail?ResourceId=${data.fileId}&Width=117&Height=113`
                  let bigUrl = `${baseUrl}resource/thumbnail?ResourceId=${data.fileId}&Width=1000&Height=500`
                  return (
                    <Fragment>
                      <ImageCard
                        key={data.key}
                        msgTitle={subject}
                        bigImgUrl={bigUrl}
                        imgPath={{ uri: url }}
                        fileName={data.fileName}
                      >
                        <ImageName numberOfLines={1}> {data.fileName} </ImageName>
                      </ImageCard>
                    </Fragment>
                  );
                })}
              </ImageRow>
              : nul
          }
        </CommentBox>
      </Fragment>
    );
  }
}
export default withTheme(SpecificStyleMessage);