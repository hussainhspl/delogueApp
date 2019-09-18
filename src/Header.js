import React  from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import Menu from './Menu';
import Search from  './search/Search';

import { connect } from "react-redux";
import { searchButton, messageButton, styleButton} from './store/actions/index';
import CompanyList from './companyList';
import styled from 'styled-components';

const Container = styled.View`
  flex-direction: row;
  height: 50px;
  background-color: #818181;
  justify-content: space-between;
  align-items: center;
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
    // console.log("toggle state");
    this.setState(prevState => ({ isOpen: !prevState.isOpen }),()=>console.log(this.state.isOpen));
  }
  render() {
    const {container, icon, iconGroup } = styles;
    const history= this.props.history;
    // const path = this.props.location.pathname;
    // console.log('header history: ', history);
    return(
      <View style={{flex: 1 }}>
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
            <View style={iconGroup}>
              <View>
                <TouchableOpacity style={[icon,{backgroundColor: history.location.pathname == '/search' ? '#666': '#818181'}]}
                  // onPress= {() => this.props.searchButtonFunction()}
                  onPress={() => {history.push("/search")}}
                  >
                  <Image resizeMode={"contain"} source={require('../assets/img/search-icon.png')} /> 
                </TouchableOpacity>         
              </View>
              <View>
                <TouchableOpacity style={[icon,{backgroundColor: history.location.pathname == '/message' ? '#666': '#818181'}]}
                  // onPress= {() => this.props.messageButtFunction()}
                  onPress={() => {history.push("/message")}}
                  >
                  <Image resizeMode={"contain"} source={require('../assets/img/message-icon.png')} />
                </TouchableOpacity>          
              </View>
              <View>
                <TouchableOpacity style={[icon,{backgroundColor: history.location.pathname == '/style' ? '#666': '#818181'}]}
                // onPress= {() => this.props.styleButtonFunction()}
                onPress={() => {history.push("/style")}}
                >
                  <Image resizeMode={"contain"} source={require('../assets/img/style-icon.png')} />  
                </TouchableOpacity>        
              </View>
            </View>
            <View>
              <TouchableOpacity
                onPress={this.toggle}
              >
                <Icon style={{color: '#eee', fontSize: 28, paddingHorizontal: 15, paddingVertical: 10}} name="ios-menu" />
              </TouchableOpacity>
            </View>
          </Container>
          {this.props.children}
        </Drawer>
      </View>
    )
  }
}
const drawerStyles = {
  drawer: { shadowColor: '#aaaaaa', shadowOpacity: 0.4, shadowRadius: 3},
  main: {flex: 1},
}
const styles= {
  container: {
    
  },
  icon: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 40
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center'
  }
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