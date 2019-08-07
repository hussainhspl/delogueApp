import React from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
import CompanyList from './companyList';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



class Login extends React.Component {
  state= {
    text: '',
    password: '',
  }
  render() {
    const { container, logo, logoView, label, input, loginButton, loginText} = styles;
    const history= this.props.history;
    console.log("history: ", history)
    return(
      <View style={container}>
      <KeyboardAwareScrollView>
      <View style={container}>
        <View style={logoView}>
          <Image style={logo} source={require('../img/logo-login.png')} />
        </View>
        <View>
          <Text style={label}> user name </Text>
          <TextInput
            style={input}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}   
          />
          <Text style={label}> password </Text>
          <TextInput
            style={input}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}   
          />
        </View>
        <Text style={label}>
          forgot password?
        </Text>

        {/* <TouchableOpacity style={loginButton}>
          <Text style={loginText}>log in </Text>
        </TouchableOpacity> */}
        <TouchableHighlight underlayColor='rgba(221, 221, 221, 0.4)' style={loginButton} onPress={() => history.push("/companyList")}>
          <Text style={loginText}>log in </Text>
        </TouchableHighlight>

      </View>
      </KeyboardAwareScrollView>
      </View>
    )
  }
}
const styles = {
  container: {
    backgroundColor: '#818181',
    flex: 1,
    alignItems: 'center',
  },
  logoView: {
    // height: 80, 
    marginTop: 70,
    marginBottom: 50,
    width: 235,
  },
  logo: {
    width: '100%'
  },
  label: {
    color: 'white',
    textTransform : 'capitalize',
    marginBottom: 10,
    marginTop: 30
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
    marginTop: 20

  },
  loginText: {
    color: 'white',
    fontSize: 18,
    textTransform: 'uppercase',
    
  }
}
export default Login