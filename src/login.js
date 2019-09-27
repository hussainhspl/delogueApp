import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  BackHandler,
  ToastAndroid
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components";
import axios from "axios";
import qs from "qs";
//Relative import
import OfflineNotice from "./shared/OfflineNotice";

const Label = styled.Text`
  color: white;
  text-transform: capitalize;
  margin-bottom: 10px;
  margin-top: 30px;
  font-family: ${props => props.theme.regular};
`;
const Logo = styled.Image`
  /* width: 98%; */
`;
const Container = styled.View`
  background-color: ${props => props.theme.primaryColor};
  flex: 1;
  /* align-items: center; */
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
`;

const MainView = styled.View`
  align-items: center;
`;

let exitFlag = false;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      password: "",
      exit: false,
      token: '',
    };
  }

  componentDidMount = () => {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };

  submitLogin = () => {
    console.log("click on submit");
    const data = {
      username: "profiler@headfitted.com",
      password: "donttell",
      grant_type: "password"
    };
    // login code
    const options = {
      url: "http://test.delogue.com/auth/token",
      method: "POST",
      grant_type: "password",
      responseType: "json",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data)
    };
    axios(options)
      .then(res => {
        console.log("response", res);
        this.setState({
          token: res.data.access_token,
        },() => console.log("token state", this.state.token))
      })
      .catch(function(error) {
        console.error(error);
      });

    // get style
    const options1 = {
      url: "https://rc.delogue.com/export/style/16197",
      method: "GET",
      headers: { 'Authorization': `bearer ${this.state.token}` },
    };
    axios(options1)
      .then(res => {
        console.log("response", res);
        
      })
      .catch(function(error) {
        console.error(error);
      });
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
  render() {
    const history = this.props.history;
    return (
      <Container>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <OfflineNotice />
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
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
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

export default Login;
