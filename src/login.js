import React from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, TouchableHighlight, BackHandler, ToastAndroid } from 'react-native';
import CompanyList from './companyList';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { withRouter } from 'react-router';
import styled from 'styled-components';

const Label = styled.Text`
  color: white;
  text-transform : capitalize;
  margin-bottom: 10px;
  margin-top: 30px;
  font-family: ${ props => props.theme.regular};
`;
const Logo = styled.Image`
   /* width: 98%; */
`;
const Container = styled.View`
  background-color: ${props =>props.theme.primaryColor};
  flex: 1;
  align-items: center;
`;
const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  text-transform: uppercase;
  font-family: ${ props => props.theme.regular};
`;
const LoginButton = styled.TouchableHighlight`
  width: 220px;
  height: 40px;
  background-color: #617F5D;
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

let exitFlag= false;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      text: '',
      password: '',
      exit: false,
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    // console.log("exit app");
    
    console.log("exit state", exitFlag);
    if(exitFlag == true) {
      exitFlag = false;
      return BackHandler.exitApp();
    } else { 
      ToastAndroid.show('press back again to exit', ToastAndroid.SHORT);
      exitFlag = true;

    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  render() {
    const history= this.props.history;
    // const path = this.props.location.pathname;
    // console.log(" login path: ", history);
    console.disableYellowBox = true;
    // console.log('login history', history);
    return(
      <Container>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <Container>
        <LogoView>
          <Logo 
          resizeMode={"contain"}
          source={require('../assets/img/logo-login.png')} />
        </LogoView>
        <View>
          <Label> user name </Label>
          <InputBox
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}   
          />
          <Label> password </Label>
          <InputBox
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}   
          />
        </View>
        <Label>
          forgot password?
        </Label>
        <LoginButton underlayColor='rgba(73, 95, 71, 0.4)' onPress={() => history.push("/companyList")}>
          <ButtonText>log in </ButtonText>
        </LoginButton>

      </Container>
      </KeyboardAwareScrollView>
      </Container>
    )
  }
}

export default Login;