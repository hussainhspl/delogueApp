import React, {Fragment} from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
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
import {token} from "./store/actions/index";


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
  /* width: 200px; */
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
      username: "profiler@headfitted.com",
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
    console.log("click on submit", this.props.history);
    // login code

    // this.checkToken();
    this.checkCredential()
  };
  
  checkCredential() {
    console.log("username : ", this.state.username, this.state.password);
    const data = {
      // username: "profiler@headfitted.com",
      // password: "donttell",
      username: this.state.username,
      password: this.state.password,
      grant_type: "password"
    };
    const options = {
      url: "https://rc.delogue.com/auth/token",
      method: "POST",
      grant_type: "password",
      responseType: "json",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data)
    };
    axios(options)
      .then(res => {
        let tokenExp = new Date(res.headers.date);
        let seconds = res.data.expires_in;
        tokenExp.setSeconds(tokenExp.getSeconds() + seconds);
        this.setState(
          {
            token: res.data.access_token
            // tokenExpiry: res.headers.date
          },
          () => this.storeData(tokenExp)
        );
      })
      .catch(error => {
        if (error.response) {
          console.log("wrong credentials", error.response);
          console.log("error", error.response.data.error_description);
          this.setState({
            loginFail: error.response.data.error_description
          });
        }
      });
  }

  storeData = async tokenExp => {
    let strTokenExp = JSON.stringify(tokenExp)
    console.log("Storing data in async function", tokenExp, typeof(this.state.token), strTokenExp, typeof(strTokenExp));
    try {
      // await AsyncStorage.setItem('@token', this.state.token)
      AsyncStorage.multiSet([
        ["@token", this.state.token],
        ["@tokenExpiry", strTokenExp]
      ]);
      console.log("data saved successfully");
      this.props.tokenFunction(this.state.token);
      // Alert.alert('token stored successfully and redirect')
      this.props.history.push("/companyList")
    } 
    catch (e) {
 
        console.log("Error while saving token", e);
        // throw error;

      //error
      // alert("error 11", e);
    }
  };

  render() {
    const history = this.props.history;
    console.log("Enter in render",this.props.tokenData);
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
              // onPress={() => history.push("/companyList")}
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
    tokenFunction : (data) => dispatch(token(data)),
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
