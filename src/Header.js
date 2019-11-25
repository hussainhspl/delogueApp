import React  from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import Menu from './Menu';
import { connect } from "react-redux";
import { searchButton, messageButton, styleButton} from './store/actions/index';
import styled from 'styled-components';

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
  font-size: 28px; 
  padding: 10px 15px; 
`;
const TouchableIconView = styled.TouchableOpacity`
  padding: 10px;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  background-color:${ (props) => props.highlight ? '#333': '#444'};
`;
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      
    };
  }
  toggle = () =>  {
    console.log("toggle state");
    this.setState(prevState => ({ isOpen: !prevState.isOpen }),()=>console.log(this.state.isOpen));
  }
  render() {
    const history= this.props.history;
    // const path = this.props.location.pathname;
    // console.log('header history: ', history);
    return(
      <MainView>
        <Drawer
          type="overlay"
          ref={(ref) => this._drawer = ref}
          content={<Menu close={this.toggle} history = {history} />}
          openDrawerOffset={0.4} // 20% gap on the right side of drawer
          panCloseMask={0.2}
          styles={drawerStyles}
          side="right"
          tweenHandler={(ratio) => ({
            main: { opacity:(2-ratio)/2 }
          })}
          open={this.state.isOpen}
          tapToClose={true}
        >
          <Container>
            <IconGroup>
              <View>
                <TouchableIconView highlight={ history.location.pathname == '/search' ? true: false }
                  onPress={() => {history.push("/search")}}
                  >
                  <Image resizeMode={"contain"} source={require('../assets/img/header/ic_search.png')} /> 
                </TouchableIconView>         
              </View>
              <View>
                <TouchableIconView highlight={ history.location.pathname == '/message' ? true : false}
                  onPress={() => {history.push("/message")}}
                  >
                  <Image resizeMode={"contain"} source={require('../assets/img/header/ic_message.png')} />
                </TouchableIconView>          
              </View>
              <View>
                <TouchableIconView highlight={ history.location.pathname =='/style' ? true : false}
                // onPress= {() => this.props.styleButtonFunction()}
                onPress={() => {history.push("/style")}}
                >
                  <Image resizeMode={"contain"} source={require('../assets/img/header/ic_style.png')} />  
                </TouchableIconView>        
              </View>
            </IconGroup>
            <View>
              <TouchableOpacity
                onPress={this.toggle}
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