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
  top: 15;
  left: -15;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;


const FirstRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: #ddd;
  border-bottom-width: 1px;
  padding: 10px 0px ;
  margin: 0px 10px;
  /* background-color: #ddd; */
  /* padding-bottom: 10px; */
`;

const NewButton = styled(View)`
  background-color: #99afaf;
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
  width: 35%;
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
  /* background-color: #000; */
  padding: 0px 5px;
  /* border-bottom-width: 1px;
  border-color: #ddd; */
`;

const ImageName = styled.Text`
  text-align: center;
  padding: 0px 10px 10px 10px;
  font-size: ${props => props.theme.small};
  font-family: ${props => props.theme.regular};
  /* margin-bottom: 20px; */
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
  flex-direction: row;
`;

const Name = styled.Text`
  color: #777;
  font-family: ${props => props.theme.bold};
  font-size: ${props => props.theme.small};
  padding-bottom: 3px;
`;
const Date =styled.Text`
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
class CommentBlock extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      reply: false,
    }
  }
  render() {
    return (
      <Fragment>
        <CommentBox>
          <IconBox>
            <MsgImage 
              resizeMode={"contain"}
              source={require("../../../assets/img/message-icon.png")} />
          </IconBox>
          {
            this.state.reply === false && (
            <FirstRow>
              <View style={{ flex: 1, paddingRight: 2 }}>
                <Subject numberOfLines={1}> Swatch samples </Subject>
              </View>
              <TouchableHighlight 
                onPress={() => this.setState({reply: true})}
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
          <BodyArea>
            <MessageBody>
              Laboris consectetur id tempor do nostrud enim laboris exercitation
              exercitation ad. Deserunt incididunt tempor sit cillum veniam officia
              eu esse laboris quis aliqua ex cupidatat eu. Ad et tempor proident
              velit et nulla Lorem. Mollit ut magna aliqua ex mollit aute in Lorem.
              Voluptate esse ut exercitation deserunt excepteur eu. Id laborum culpa
              pariatur anim dolor ipsum ullamco exercitation.
            </MessageBody>
            <FromRow>
                <Name>Richel Smith</Name>
                <Title>13-oct-2019 13.42</Title>
                <NotifyView>
                  <Title> NOTIFIED</Title>
                  <Title> Hussain, Siya, Rikke</Title>
                <InternalView>
                  <Icon style={{color: '#ddd', fontSize: 15}} name="home" />
                  <InternalText>Internal</InternalText>
                </InternalView>
                </NotifyView>
            </FromRow>
          </BodyArea>
          <ImageRow>
            {imgArr.map(data => {
              return (
                <Fragment>
                  {/* <TouchableHighlight
                    underlayColor= {this.props.theme.overlayBlue}
                  > */}
                  <ImageCard key={data.key} imgPath={require("../../../assets/img/shirt-static.png")} >
                    <ImageName numberOfLines={1}> sample.jpg </ImageName>
                  </ImageCard>
                  {/* </TouchableHighlight> */}
                </Fragment>
              );
            })}
          </ImageRow>
        </CommentBox>
      </Fragment>
    );
  }
}
export default withTheme(CommentBlock);
