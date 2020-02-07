import React  from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import Menu from './Menu';
import { connect } from "react-redux";
import { searchButton, messageButton, styleButton} from './store/actions/index';
import styled from 'styled-components';
import GetAsyncToken from './script/getAsyncToken';
import UnreadMessageCount from './api/message/unreadMessageCount';

const Container = styled.View`
  flex-direction: row;
  height: 50px;
  background-color: #444;
  justify-content: space-between;
  align-items: center;
`;

const MainView = styled.View`
  flex: 1;
`;

const IconGroup = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MenuIcon = styled(Icon)`
  color: #eee;
  font-size: 34px; 
  padding: 5px 10px; 
`;
const TouchableIconView = styled.TouchableOpacity`
  padding: 10px;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  background-color:${ (props) => props.highlight ? '#333': '#444'};
`;
const SImage = styled.Image`
  width: 30px;
  height: 30px;
`;
const MsgIconView = styled.View`
  position: relative;
`;
const CountView = styled.View`
  position: absolute;
  top: 10px;
  right: 5px;
  padding: 2px;
  background-color: #f00;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;
const Number = styled.Text`
  color: #fff;
  line-height: 12px;
  font-size: 12px;
  font-family: ${props => props.theme.bold};
`;
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      count: 0
    };
  }
  componentDidMount = () => {
    GetAsyncToken()
      .then(token => {
        UnreadMessageCount(token)
        .then(res => {
          // console.log('count successful', res);
          this.setState({
            count: res.data
          })
        })
      })
    
  }
  // toggle = () =>  {
  //   console.log("toggle state");
  //   this.setState({ isOpen: true },()=>console.log(this.state.isOpen));
  // }
  closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };
  render() {
    const history= this.props.history;
    // const path = this.props.location.pathname;
    // console.log('header history: ', this.props);
    console.log('header reder called');
    return(
      <MainView>
        <Drawer
          type="overlay"
          ref={(ref) => this._drawer = ref}
          content={<Menu 
            close={this.toggle} 
            history = {history}
          />}
          openDrawerOffset={0.45} // 20% gap on the right side of drawer
          panCloseMask={0.9}
          styles={drawerStyles}
          side="right"
          tweenHandler={(ratio) => ({
            main: { opacity:(2-ratio)/2 }
          })}
          // open={this.state.isOpen}
          tapToClose={true}
        >
          <Container>
            <IconGroup>
              <View>
                <TouchableIconView highlight={ history.location.pathname == '/search' ? true: false }
                  onPress={() => {history.push("/search")}}
                  >
                  <SImage resizeMode={"contain"} source={require('../assets/img/header/ic_search.png')} /> 
                </TouchableIconView>         
              </View>
              <MsgIconView>
                <TouchableIconView highlight={ history.location.pathname == '/message' ? true : false}
                  onPress={() => {history.push("/message")}}
                  >
                    
                  <SImage resizeMode={"contain"} source={require('../assets/img/header/ic_message.png')} />
                  <CountView><Number>{this.state.count}</Number></CountView>
                </TouchableIconView>          
              </MsgIconView>
              <View>
                <TouchableIconView highlight={ history.location.pathname =='/style' ? true : false}
                // onPress= {() => this.props.styleButtonFunction()}
                onPress={() => history.push({
                  pathname: '/style',
                  data: 'redirect',
                })}
                >
                  <SImage resizeMode={"contain"} source={require('../assets/img/header/ic_general.png')} />  
                </TouchableIconView>        
              </View>
            </IconGroup>
            <View>
              <TouchableOpacity
                onPress={this.openControlPanel}
              >
                <MenuIcon name="ios-menu" />
              </TouchableOpacity>
            </View>
          </Container>
          {this.props.children}
        </Drawer>
      </MainView>
    )
  }
}
const drawerStyles = {
  drawer: { shadowColor: '#aaaaaa', shadowOpacity: 0.4, shadowRadius: 3},
  main: {flex: 1},
}

const mapStateToProps = state => {
  return {
    currentTab: state.header.now
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchButtonFunction: () => dispatch(searchButton()),
    messageButtFunction: () => dispatch(messageButton()),
    styleButtonFunction: () => dispatch(styleButton()),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (Header);