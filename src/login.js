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
`;
const Logo = styled.Image`
   width: 100%;
`;
const Container = styled.View`
  background-color: ${props =>props.theme.primaryColor};
  flex: 1;
  align-items: center;
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
    const { container, logo, logoView, label, input, loginButton, loginText} = styles;
    const history= this.props.history;
    // const path = this.props.location.pathname;
    // console.log(" login path: ", history);
    console.disableYellowBox = true;
    // console.log('login history', history);
    return(
      <Container>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <Container>
        <View style={logoView}>
          <Logo source={require('../img/logo-login.png')} />
        </View>
        <View>
          <Label> user name </Label>
          <TextInput
            style={input}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}   
          />
          <Label> password </Label>
          <TextInput
            style={input}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}   
          />
        </View>
        <Label>
          forgot password?
        </Label>

        {/* <TouchableOpacity style={loginButton}>
          <Text style={loginText}>log in </Text>
        </TouchableOpacity> */}
        <TouchableHighlight underlayColor='rgba(221, 221, 221, 0.4)' style={loginButton} onPress={() => history.push("/companyList")}>
          <Text style={loginText}>log in </Text>
        </TouchableHighlight>

      </Container>
      </KeyboardAwareScrollView>
      </Container>
    )
  }
}
const styles = {
  
  logoView: {
    // height: 80, 
    marginTop: 70,
    marginBottom: 50,
    width: 235,
  },
 
  
  input: {
    height: 40, 
    width: 200, 
    borderRadius: 4,
    borderColor: 'white', 
    borderWidth: 1, 
    backgroundColor: '#fff',
  },
  loginButton: {
    width: 200,
    height: 40,
    backgroundColor: '#617F5D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginVertical: 20

  },
  loginText: {
    color: 'white',
    fontSize: 18,
    textTransform: 'uppercase',
    
  }
}
export default Login;