import React from 'react';
import {View, Text, TouchableOpacity } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import Header from '../HeaderCommon';
import Icon from 'react-native-vector-icons/Ionicons';


// const ContentView = () => (
  // <View style={styles.container}>
  //   <Text style={styles.welcome}>
  //     Welcome to React Native!
  //   </Text>
  //   <TouchableOpacity
  //     onPress={this.toggle}
  //     style={styles.button}
  //   >
  //     <Text> he </Text>
  //   </TouchableOpacity>
  // </View>
// )



class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      // selectedItem: 'About',
    };
  }
  toggle() {
    console.log("toggle state");
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  // onMenuItemSelected = item =>
  //   this.setState({
  //     isOpen: false,
  //     selectedItem: item,
  //   });

  

  render() {
    const menu = <Menu 
    // onItemSelected={this.onMenuItemSelected}
    />;
    // console.log("menu", menu);
    return (
      <View style={{flex: 1}}>
        
        <Text>hello</Text>
        {/* <View style={{backgroundColor: '#ff0', flex: 1, zIndex: 1}}> */}
          <SideMenu 
            isOpen={this.state.isOpen}
            menu={menu}
            onChange={isOpen => this.updateMenuState(isOpen)}
          >
            <Header history={this.props.history} icon="arrow-back" title="Sidebar" />
            <View style={styles.container}>
            <TouchableOpacity
              onPress={this.toggle}
            >
              <View style={styles.button}>
                <Icon style={{color: '#000', fontSize: 28}} name="ios-menu" />
              </View>
            </TouchableOpacity>
            <Text style={styles.welcome}>
              Click on Menu Icon 
            </Text>
            </View>
          </SideMenu>
        {/* </View> */}
      </View>
    );
  }
}
const styles = {
  container:  {
    flex: 1,
    backgroundColor: '#fff',
    // ÷justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  welcome : {
    fontSize: 21,
    paddingTop: 10,
  },
  button: {
    // position: 'absolute',
    // top: 20,
    padding: 10,
  },
}
export default Sidebar;

// const Menu = () => (
//   <View>
//     <Text> menu </Text>
//   </View>
// )
