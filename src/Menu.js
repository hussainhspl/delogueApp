import React, { Fragment } from 'react';
import { View, Text, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Icon } from 'native-base';
import ClearAsync from '../src/script/clearAsync';
import CardText from '../src/styles/CardText';
import SmallText from '../src/styles/SmallText';
import Close from '../src/styles/Close';
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-community/async-storage";

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
  margin-top: 30px;
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
const Top = styled.View`
  padding-top: 50px;
`;
const SText = styled.Text`
  padding-bottom: 20px;
`;
// getUserName = async () => {
//   try {
//     const username = await Asy
//   }
// }
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      currentCompany: null,
      userIdState: null,
      designerIdState: null,
      companyData: null
    }
    // this.checkNredirect = this.checkNredirect.bind(this)
  }
  checkNredirect = () => {
    const { history, close } = this.props;
    // const close = this.props.close;
    // console.log("click demo", history.location.pathname)
    if (history.location.pathname == '/companyList') {
      // console.log('same page', this.props.close);
      { close }
      close
      this.props.close()
      { this.props.close }
    }
    history.push("/companyList")
  }
  componentDidMount = () => {
    
    this.getUsername()
    // console.log('enter in component did mount menu',this.state.companyData);
    // console.log('this.props.userData');
  //   if(this.state.companyData != null) {
  //   this.state.companyData.some(user => {
  //     if(user.id == this.state.userIdState) {
  //       this.setState({
  //         currentCompany: user.organizationName
  //       })
  //       return true;
  //     }
  //     return false;
  //   })
  // }
  }
 
  getUsername = async () => {
    try {
      const username = await AsyncStorage.getItem("@username")
      const designerId = await AsyncStorage.getItem("@designerId")
      const userId = await AsyncStorage.getItem("@userId")
      const parseUserId = JSON.parse(userId);
      const userData = await AsyncStorage.getItem("@userData");
      const parseData = JSON.parse(userData);
      // console.log('parse data', parseData);
      this.setState({
        currentUser: username,
        designerIdState: designerId,
        userIdState: parseUserId,
        companyData: parseData
      },() => this.getCompanyName())
    }
    catch (error) {
      if(error)
        console.log('no username found in sidebar', error);
    }
  }
  getCompanyName () {
    // console.log('get company name',this.state.companyData);
    // if (this.state.companyData != nextState.companyData) {
      this.state.companyData.some(user => {
        if(user.id == this.state.userIdState) {
          // console.log('compare menu', user.id, this.state.userIdState)
          this.setState({
            currentCompany: user.organizationName
          })
          return true;
        }
        return false;
      })
    // }
  }
  render() {
    const history = this.props.history;
    const close = this.props.close;
    // console.log('data in menu', this.state.companyData, 
      // this.state.designerIdState, this.state.userIdState, this.state.currentCompany);
    return (
      <MenuContainer>
        <SidebarView>
          <View>
            {/* <CloseView>
              <TouchableOpacity
                  onPress={this.props.close}
                >
              <Close>
                <CloseIcon name="ios-close" />
              </Close>
              </TouchableOpacity>       
            </CloseView> */}
          <Top>
            <SmallText>username:</SmallText>
            <SText>{this.state.currentUser}</SText>
            <SmallText>you are currently logged into:</SmallText>
            <SText>{this.state.currentCompany}</SText>

            <TouchableHighlight underlayColor='rgba(221, 221, 221, 0.4)'
              onPress={this.checkNredirect}>
              <CompanyHighlight>
                <CompanyText>switch company</CompanyText>
              </CompanyHighlight>
            </TouchableHighlight>
          </Top>
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
            <SmallText>version 1.3.2 </SmallText>
          </Bottom>
        </SidebarView>
      </MenuContainer>
    )
  }
}
const mapStateToProps = state => {
  return {
    userData: state.user.userState
  };
};
export default connect(mapStateToProps)(Menu);

