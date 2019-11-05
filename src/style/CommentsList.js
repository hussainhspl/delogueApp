import React, {Fragment} from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import {Icon} from 'native-base';
import styled from "styled-components";
import SearchInput from "../styles/SearchInput";
import SearchIcon from '../styles/SearchIcon';

let MsgData = [
  {
    key: 1,
    iconName:"mail",
  },
  {
    key: 2,
    iconName:"mail-open",
  },
  {
    key: 3,
    iconName:"mail",
  },
]
const SearchRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 10px 20px 20px;
`;
const MarkAllReadBox = styled.View`
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
const Subject = styled.Text`
  color: ${props => props.theme.darkBlue};
  font-weight: 700;
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
  color: #777;
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
const MailIcon= styled(Icon)`
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
    };
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SearchRow>
          <SearchIcon>
            <Icon style={{ color: "#fff" }} name="ios-search" />
          </SearchIcon>
          <SearchInput placeholder="SEARCH" placeholderTextColor="#C9DBDB" />
          <MarkAllReadBox>
            <StyleImage source={require("../../assets/img/glass.png")} />
          </MarkAllReadBox>
        </SearchRow>
        {
          MsgData.map(data => {
            // if(data.key == 2) {
            //   console.log("key match");
            //   ()=> this.setState({read: true})
            // }
            return(
              <MessageBox>
              <TouchableHighlight
                underlayColor="#42546033"
                onPress={
                  this.props.close
                }
              >
                <Row>
                <MainContent>
                  <IconBox read={data.key == 2 ? true : false }>
                    <MsgImage 
                      resizeMode={"contain"}
                      source={require("../../assets/img/message-icon.png")} />
                  </IconBox>
                  <Subject>Swatch samples </Subject>
                  <ContentText numberOfLines={2}>Dear nando, please find a new style and if you have any doubt or queries then please ask</ContentText>
                </MainContent>
                <InfoContent>
                  <Name>Richel Smith</Name>
                  <Date>13-oct-2019 13.42</Date>
                </InfoContent>
                </Row>
              </TouchableHighlight>
              </MessageBox>
            )
          })
        }
        {/* <Text> hello from comments list</Text> */}
      </View>
    );
  }
}
export default CommentsList;
