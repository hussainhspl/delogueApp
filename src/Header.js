import React  from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import Menu from './Menu';
import Search from  './search/Search';

import { connect } from "react-redux";
import { searchButton, messageButton, styleButton} from './store/actions/index';

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
    console.log('header history: ', history);
    return(
      <View style={{flex: 1 }}>
        <Drawer
          type="overlay"
          ref={(ref) => this._drawer = ref}
          content={<Menu history = {history} />}
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
          <View style={container}>
            <View style={iconGroup}>
              <View>
                <TouchableOpacity style={icon}
                  onPress= {() => this.props.searchButtonFunction()}>
                  <Image resizeMode={"contain"} source={require('../img/search-icon.png')} /> 
                </TouchableOpacity>         
              </View>
              <View>
                <TouchableOpacity style={icon}
                  onPress= {() => this.props.messageButtFnunction()}
                  >
                  <Image resizeMode={"contain"} source={require('../img/message-icon.png')} />
                </TouchableOpacity>          
              </View>
              <View>
                <TouchableOpacity style={icon}
                onPress= {() => this.props.styleButtonFunction()}>
                  <Image resizeMode={"contain"} source={require('../img/style-icon.png')} />  
                </TouchableOpacity>        
              </View>
            </View>
            <View>
              <TouchableOpacity
                onPress={this.toggle}
              >
                <Icon style={{color: '#eee', fontSize: 28}} name="ios-menu" />
              </TouchableOpacity>
            </View>
          </View>
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
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#818181',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10
  },
  icon: {
    padding: 10,
    // backgroundColor: 'green'
    // height: 30
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
    messageButtFnunction: () => dispatch(messageButton()),
    styleButtonFunction: () => dispatch(styleButton()),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (Header);