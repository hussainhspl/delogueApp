import React, { Fragment } from 'react';
import { View, Text, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Icon } from 'native-base';
import ClearAsync from '../src/script/clearAsync';
import CardText from '../src/styles/CardText';
import SmallText from '../src/styles/SmallText';
import Close from '../src/styles/Close';

const MenuContainer = styled.View`
  border-width: 1px;
  border-left-color: #ccc;
  flex: 1;
  background-color: #eee;
`;
const CompanyHighlight = styled.View`
  background-color: #C2BEB6;
  justify-content: center;
  margin-top: 5px;
  padding: 5px 10px;
  align-self: flex-start;
`;
const CompanyText = styled.Text`
  padding: 15px;
  color: white;
  text-transform: uppercase;
  font-size: 12px;
  padding: 5px;
  font-family: ${props => props.theme.regular};
`;
const CloseIcon = styled(Icon)`
  color: #333; 
  font-size: 15px; 
  /* padding: 0px 10px; */
`;
const CloseView = styled.View`
  width: 40px;
  margin-left: auto;
  /* background-color: #aaa; */
`;
const SidebarView = styled.View`
  padding: 15px;
  justify-content: space-between;
  flex: 1;
`;
const LoginTouchableHighlight = styled.TouchableHighlight`
  padding: 10px 5px 10px 0px;
  margin-bottom: 5px;
  align-self: flex-start;
  /* background-color: #ddd; */
`;
const Bottom = styled.View`
  padding: 0px 10px;
`;
// getUserName = async () => {
//   try {
//     const username = await Asy
//   }
// }
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    // this.checkNredirect = this.checkNredirect.bind(this)
  }
  checkNredirect = () => {
    const { history, close } = this.props;
    // const close = this.props.close;
    console.log("click demo", history.location.pathname)
    if (history.location.pathname == '/companyList') {
      console.log('same page', this.props.close);
      { close }
      close
      this.props.close()
      { this.props.close }
    }
    history.push("/companyList")
  }
  render() {
    const history = this.props.history;
    const close = this.props.close;
    return (
      <MenuContainer>
        <SidebarView>
          <View>
            <CloseView>
              {/* <TouchableOpacity
                  onPress={this.props.close}
                > */}
              <Close>
                <CloseIcon name="ios-close" />
              </Close>
              {/* </TouchableOpacity>        */}
            </CloseView>

            <SmallText>Switch Company</SmallText>
            <TouchableHighlight underlayColor='rgba(221, 221, 221, 0.4)'
              onPress={this.checkNredirect}>
              <CompanyHighlight>
                <CompanyText>demo company</CompanyText>
              </CompanyHighlight>
            </TouchableHighlight>
          </View>
          <Bottom>
            <LoginTouchableHighlight underlayColor='rgba(221, 221, 221, 0.4)'
              underlayColor="#ddd"
              onPress={() => {
                ClearAsync();
                console.log('login called');
                history.push("/login")
              }
              }>
              <CardText > Logout </CardText>

            </LoginTouchableHighlight>
            <SmallText>version 1.2 </SmallText>
          </Bottom>
        </SidebarView>
      </MenuContainer>
    )
  }
}
export default Menu;

