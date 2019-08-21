import React, {Fragment} from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, TouchableHighlight,  Image } from 'react-native';
import Menu from './Menu';
// import SideMenu from 'react-native-side-menu';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { withRouter } from 'react-router';
import styled from 'styled-components';

const data = [
  { 
    key: 'A',
    companyName: 'c name',
    userName: 'user name',
    userType: 'user type',
  },
  { 
    key: 'B',
    companyName: 'c name',
    userName: 'user name',
    userType: 'user type',
  }, 
  { 
    key: 'C',
    companyName: 'c name',
    userName: 'user name',
    userType: 'user type',
  }, 
  { 
    key: 'D',
    companyName: 'c name',
    userName: 'user name',
    userType: 'user type',
  }, 
  { 
    key: 'E',
    companyName: 'c name',
    userName: 'user name',
    userType: 'user type',
  }, 
  { 
    key: 'F',
    companyName: 'c name',
    userName: 'user name',
    userType: 'user type',
  }, 
  { 
    key: 'G',
    companyName: 'c name',
    userName: 'user name',
    userType: 'user type',
  }, 
  { 
    key: 'H',
    companyName: 'c name',
    userName: 'user name',
    userType: 'user type',
  }, 
  { 
    key: 'I',
    companyName: 'c name',
    userName: 'user name',
    userType: 'user type',
  }, 
  { 
    key: 'J',
    companyName: 'c name',
    userName: 'user name',
    userType: 'user type',
  },
  // { key: 'K' },
  // { key: 'L' },
];

const GridImage = styled.Image`
  width: ${Dimensions.get('window').width / 2-30};
  height: ${Dimensions.get('window').width / 2-30};
  margin: 15px;
`;

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
    numberOfElementsLastRow++;
  }
  return data;
};
const numColumns = 2;
class CompanyList extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
    };
  }
  closeControlPanel = () => {
    this._drawer.close();
    console.log("close function");
  };
  openControlPanel = () => {
    this._drawer.open()
  };

  toggle = () =>  {
    console.log("toggle state");
    this.setState(prevState => ({ isOpen: !prevState.isOpen }),()=>console.log(this.state.isOpen));
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    const history= this.props.history;
    console.log("company list render hist", this.props.history);
    return (
      // <View style={styles.item} key={item.key}>
      <TouchableHighlight 
        underlayColor='rgba(245, 245, 245, 1)' onPress={() => {history.push("/search"); 
        console.log(history);}}
        style={styles.item} key={item.key}
      >
        <Fragment>
          <View style={styles.imageView}>
            <GridImage 
              resizeMode={"center"}
              // source={require('../../img/shirt-static.png')}
              source={require('../img/shirt-static.png')}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.itemText}> {item.companyName} </Text>
            <Text style={styles.itemText}> {item.userName} </Text>
            <Text style={styles.itemText}> {item.userType} </Text>

          </View>
          </Fragment>
        </TouchableHighlight>
      // </View>
    );
  };
  render(){
    const { container, item, itemInvisible, itemText,} = styles;
    const history= this.props.history;
    return(
      
      <View style={{flex: 1}}>
      <Drawer
        type="overlay"
        ref={(ref) => this._drawer = ref}
        content={<Menu history={history} />}
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
          <View style={styles.subHeader}>
            <Text> Please Select Company </Text>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={this.toggle}
              >
                <Icon style={{color: '#000', fontSize: 28}} name="ios-menu" />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={formatData(data, numColumns)}
            style={styles.container}
            renderItem={this.renderItem}
            numColumns={numColumns}
          />
        </Drawer>
      </View>
    )
  }
}
const drawerStyles = {
  drawer: { shadowColor: '#aaaaaa', shadowOpacity: 0.4, shadowRadius: 3},
  main: {flex: 1},
}
const styles = {
  searchInput:{
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1
  },
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 40,
    backgroundColor: '#818181'
  },
  item: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    margin: 5,
    height: Dimensions.get('window').width / numColumns +60, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#000',
  },
  cardInfo:{
    backgroundColor: '#f6f6f6',
    height: 60,
    width: '100%',
    justifyContent: 'center',
    padding: 5
  },
  imageView: {
    height: Dimensions.get('window').width / numColumns,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    width: '100%',
  },
  button: {
    padding: 10
  },
  subHeader: {
    flexDirection: 'row',
    fleGrow: 1,
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  }

}
export default withRouter(CompanyList);