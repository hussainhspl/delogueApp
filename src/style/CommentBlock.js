import React, { Fragment } from "react";
import { View, Text, Dimensions, TouchableHighlight } from "react-native";
import styled from "styled-components";
import { Icon } from "native-base";
import ImageCard from "../shared/ImageCard";
import { withTheme } from 'styled-components';
import ReplyComponent from './ReplyComponent';

const imgArr = [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }];
const CommentBox = styled.View`
  border: 1px solid #ddd;
  padding: 10px 10px;
  margin: 0px 15px 10px 15px;
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
  align-items: center;
  justify-content: center;
`;


const FirstRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: #ddd;
  border-bottom-width: 1px;
  padding-bottom: 15px;
  margin: 0px 10px;
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
  width: 65%;
`;
const ImageRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 15px;
  /* background-color: #000; */
  padding: 0px 5px;
  border-bottom-width: 1px;
  border-color: #ddd;
`;

const ImageName = styled.Text`
  text-align: center;
  padding: 0px 10px 10px 10px;
  font-size: 12px;
  font-family: ${props => props.theme.regular};
  /* margin-bottom: 20px; */
`;
const Title = styled.Text`
  color: ${props => props.theme.darkBlue};
  font-weight: 700;
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
  font-weight: 700;
  text-align: right;
  font-size: 12;
`;
const Date =styled.Text`
  color: #777;
  font-size: 12;
  text-align: right;
`;
const InternalText = styled.Text`
  color: #aaa;
  padding-left: 5px;
`;


const InternalView = styled.View`
  align-items: center;
  flex-direction: row;
  align-self: flex-start;
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
              source={require("../../assets/img/message-icon.png")} />
          </IconBox>
          <FirstRow>
            <View style={{ flex: 1, paddingRight: 2 }}>
              <Title numberOfLines={1}> Swatch samples </Title>
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
                <Date>13-oct-2019 13.42</Date>
              <HeaderText> NOTIFIED: Hussain, Siya, Deepakshi </HeaderText>
              <InternalView>
                <Icon style={{color: '#ddd'}} name="home" />
                <InternalText>Internal</InternalText>
              </InternalView>
            </FromRow>
          </BodyArea>
          <ImageRow>
            {imgArr.map(data => {
              return (
                <Fragment>
                  {/* <TouchableHighlight
                    underlayColor= {this.props.theme.overlayBlue}
                  > */}
                  <ImageCard key={data.key} imgPath={require("../../assets/img/shirt-static.png")} >
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
