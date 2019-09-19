import React from 'react';
import {View, Text, Dimensions, TouchableHighlight, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {Icon} from 'native-base';

const MenuText = styled.Text`
  padding: 15px;
  color: black;
  text-transform: uppercase;
  font-size: 12px;
  padding: 5px;
  font-family: ${props => props.theme.regular};
`;
const MenuContainer = styled.View`
  border-width: 1px;
  border-left-color: #ccc;
  flex: 1;
  background-color: #eee;
`;
const CompanyHighlight = styled.View`
  background-color: #C2BEB6;
  height: 40px;
  justify-content: center;
  margin-top: 10px;
`;
const CompanyText = styled.Text`
  padding: 15px;
  color: white;
  text-transform: uppercase;
  font-size: 12px;
  padding: 5px;
  font-family: ${props => props.theme.regular};
`;
const  CloseIcon = styled(Icon)`
  color: #C2BEB6; 
  font-size: 28px; 
  padding: 0px 10px;
  align-self: flex-end;
`;
const CloseView = styled.View`
  width: 40px;
  margin-left: auto;
  /* background-color: #aaa; */
`;
export default class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state={}
    // this.checkNredirect = this.checkNredirect.bind(this)
  }
  checkNredirect = () => {
    const { history, close } = this.props;
    // const close = this.props.close;
    console.log("click demo", history.location.pathname)
    if(history.location.pathname == '/companyList'){
      console.log('same page', this.props.close);
      {close}
      close
      this.props.close()
      {this.props.close}
    }
    history.push("/companyList")
  }
  render() {
    const history= this.props.history;
    const close = this.props.close;
    return (
      <MenuContainer>
        <View style={{paddingLeft: 15, paddingTop: 15,}}>
            <CloseView style={{}}>
              <TouchableOpacity
                  onPress={this.props.close}
                >
                  <CloseIcon name="ios-close" /> 
              </TouchableOpacity>       
            </CloseView>
          <TouchableHighlight underlayColor='rgba(221, 221, 221, 0.4)' 
            onPress={() => history.push("/")}>
            <MenuText > Logout </MenuText>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='rgba(221, 221, 221, 0.4)' 
            onPress={this.checkNredirect}>
              <CompanyHighlight style={{}}>
                <CompanyText>demo company</CompanyText>
              </CompanyHighlight>
          </TouchableHighlight>
          
        </View>
      </MenuContainer>
    )
  }
}


