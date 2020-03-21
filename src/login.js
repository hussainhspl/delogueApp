import React, {Fragment} from "react";
import {
  View,
  BackHandler,
  ToastAndroid,
  Alert
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components";
import axios from "axios";
import qs from "qs";
import AsyncStorage from "@react-native-community/async-storage";
import parse from "date-fns/parse";
import toDate from "date-fns/toDate";
import { connect } from "react-redux";

//Relative import
import OfflineNotice from "./shared/OfflineNotice";
import FailMessage from "./shared/failMessage";
import {token, userData} from "./store/actions/index";

import loginStep2 from './api/loginStep2';
import LoginStep1 from './api/loginStep1';

const Label = styled.Text`
  color: white;
  text-transform: capitalize;
  margin-bottom: 10px;
  margin-top: 30px;
  font-family: ${props => props.theme.regular};
`;
const Logo = styled.Image``;
const Container = styled.View`
  background-color: ${props => props.theme.primaryColor};
  flex: 1;
`;
const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  text-transform: uppercase;
  font-family: ${props => props.theme.regular};
`;
const LoginButton = styled.TouchableHighlight`
  width: 220px;
  height: 40px;
  background-color: #617f5d;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin: 20px 0px;
  border: 1px solid #546e50;
`;
const LogoView = styled.View`
  margin-top: 70px;
  margin-bottom: 50px;
`;
const InputBox = styled.TextInput`
  height: 40px;
  width: 220px;
  border-radius: 4;
  border-color: white;
  border-width: 1px;
  background-color: #fff;
  padding-left: 5px;
`;

const MainView = styled.View`
  align-items: center;
`;

let exitFlag = false;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "test@headfitted.com",
      password: "donttell",
      exit: false,
      token: "",
      loginFail: ""
    };
  }

  componentDidMount = () => {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };
  handleBackButtonClick() {
    // console.log("exit app");

    console.log("exit state", exitFlag);
    if (exitFlag == true) {
      exitFlag = false;
      return BackHandler.exitApp();
    } else {
      ToastAndroid.show("press back again to exit", ToastAndroid.SHORT);
      exitFlag = true;
    }
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  submitLogin = () => {
    // console.log("click on submit", this.props.history);
    // login code
    // this.checkToken();
    this.checkCredential()
  };
  
  checkCredential() {
    LoginStep1(this.state.username, this.state.password, this.props.tokenData)
      .then(res =>{
        console.log('login 1 response', res);
        // this.props.userFunction(res)
        // console.log('context', res.data)
        let strUserData = JSON.stringify(res.data.loginContexts)
        AsyncStorage.multiSet([
          ["@username", this.state.username],
          ["@password", this.state.password],
          ["@userData", strUserData]
        ])
        console.log('multiUser : ', res.data.isMultiselect)
        if(res.data.isMultiselect) {
          this.props.history.push({
            pathname:"/companyList",
          })
        }else {
          console.log('single user designerOrganizationId :', res.data.loginContexts[0].designerOrganizationId)
          console.log('single user id :', res.data.loginContexts[0].id)
          let designerId = res.data.loginContexts[0].designerOrganizationId;
          let id = res.data.loginContexts[0].id
          loginStep2(designerId, id, this.state.username, this.state.password)
            .then(() => {
              console.log('login step 2 response', res)
              let tokenExp = new Date(res.headers.date);
              let seconds = res.data.expires_in;
              tokenExp.setSeconds(tokenExp.getSeconds() + seconds);
              this.setState(
                {
                  token: res.data.access_token
                },
                () => this.storeToken(tokenExp)
              );
            })
        }
      }
      )
    // const data = {
    //   username: this.state.username,
    //   password: this.state.password,
    //   grant_type: "password"
    // };
    // const options = {
    //   url: `http://test.delogue.com/auth/token`,
    //   method: "POST",
    //   grant_type: "password",
    //   responseType: "json",
    //   headers: { "content-type": "application/x-www-form-urlencoded" },
    //   data: qs.stringify(data)
    // };
    // axios(options)
    //   .then(res => {
    //     let tokenExp = new Date(res.headers.date);
    //     let seconds = res.data.expires_in;
    //     tokenExp.setSeconds(tokenExp.getSeconds() + seconds);
    //     this.setState(
    //       {
    //         token: res.data.access_token
    //       },
    //       () => this.storeData(tokenExp)
    //     );
    //   })
    //   .catch(error => {
    //     if (error.response) {
    //       console.log("wrong credentials", error.response);
    //       console.log("error", error.response.data.error_description);
    //       this.setState({
    //         loginFail: error.response.data.error_description
    //       });
    //     }
    //   });
  }

  storeToken = async tokenExp => {
    let strTokenExp = JSON.stringify(tokenExp)
    console.log("Storing data in async function", tokenExp, typeof(this.state.token), strTokenExp, typeof(strTokenExp));
    try {
      AsyncStorage.multiSet([
        ["@token", this.state.token],
        ["@tokenExpiry", strTokenExp]
      ]);
      console.log("data saved successfully");
      this.props.history.push({
        pathname:"/message",
      })
    } 
    catch (e) {
      console.log("Error while saving token", e);
    }
  };

  // storeData = async tokenExp => {
  //   let strTokenExp = JSON.stringify(tokenExp)
  //   console.log("Storing data in async function", tokenExp, typeof(this.state.token), strTokenExp, typeof(strTokenExp));
  //   try {
  //     AsyncStorage.multiSet([
  //       ["@token", this.state.token],
  //       ["@tokenExpiry", strTokenExp]
  //     ]);
  //     console.log("data saved successfully");
  //     this.props.tokenFunction(this.state.token);
  //     this.props.history.push({
  //       pathname:"/companyList",
  //       username: this.state.username,
  //       password: this.state.password
  //     })
  //   } 
  //   catch (e) {
  //     console.log("Error while saving token", e);
  //   }
  // };

  render() {
    const history = this.props.history;
    // console.log("Enter in render",this.props.tokenData);
    return (
      <Container>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <OfflineNotice />
          <Fragment>
          { this.state.loginFail ?
            <FailMessage 
              message={this.state.loginFail} 
            />
            : null
          }
          </Fragment>
          <MainView>
            <LogoView>
              <Logo
                resizeMode={"contain"}
                source={require("../assets/img/logo-login.png")}
              />
            </LogoView>
            <View>
              <Label> user name </Label>
              <InputBox
                onChangeText={username => this.setState({ username })}
                value={this.state.username}
              />
              <Label> password </Label>
              <InputBox
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
            </View>
            <Label>forgot password?</Label>
            <LoginButton
              underlayColor="rgba(73, 95, 71, 0.4)"
              onPress={this.submitLogin}
            >
              <ButtonText>log in </ButtonText>
            </LoginButton>
          </MainView>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // tokenFunction : (data) => dispatch(token(data)),
    userFunction: (u) => dispatch(userData(u))
  }
}

const mapStateToProps = state => {
  return {
    tokenData: state.async.tokenState
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
