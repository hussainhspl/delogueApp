import React, {Fragment} from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, TouchableHighlight, BackHandler, ScrollView} from 'react-native';
import Menu from './Menu';
// import SideMenu from 'react-native-side-menu';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { Grid, Section, Block } from 'react-native-responsive-layout';

const CList = [
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
  width: ${(props) => props.tablet ? Dimensions.get('window').width / 3- 50: Dimensions.get('window').width / 2- 50};
  height: ${(props) => props.tablet ? Dimensions.get('window').width / 3 -45: Dimensions.get('window').width / 2 -30};
  margin: auto;
`;

const ImageView = styled.View`
  width: ${(props) => props.tablet ? Dimensions.get('window').width / 3- 45: Dimensions.get('window').width / 2- 45};
  height: ${(props) => props.tablet ? Dimensions.get('window').width / 3 -30 : Dimensions.get('window').width / 2 -15};
  margin: 0 auto;
`;
const Card = styled.View`
  width: ${(props) => props.tablet ? Dimensions.get('window').width / 3 -15: Dimensions.get('window').width / 2 -15};
  height: ${(props) => props.tablet ? Dimensions.get('window').width / 3 + 30 : Dimensions.get('window').width / 2 + 45};
  margin: 5px;
  background-color: #fff;
  /* align-items: space-between; */
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
    this.state = {
      isOpen: false,
      tablet: false,
    };
    this.toggle = this.toggle.bind(this)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  checkDevice() {
    
  }
  componentWillMount() {
    if(Dimensions.get('window').width >568) {
      this.setState({tablet: true},() =>console.log("will mount" , this.state.tablet))
    }
    // console.log("will mount out" , this.state.tablet);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    this.props.history.goBack();
    return true;
  }
  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open()
  };
  toggle = () =>  {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }
 
  render(){
    const { container, item, itemInvisible, itemText,} = styles;
    const history= this.props.history;
    // console.log("dimension",this.state.tablet);
    // const tablet = this.state.tablet;
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
                <Icon style={{color: '#000', fontSize: 28, paddingHorizontal: 15, paddingVertical: 10}} name="ios-menu" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{backgroundColor: '#818181'}}>
            <ScrollView>
              <View style={{flexWrap: 'wrap', flexDirection: 'row', padding: 5}}>
              {
                CList.map(data => {
                  return(
                    
                    <Card tablet={this.state.tablet} key={data.key}>
                    <TouchableOpacity 
                      underlayColor='rgba(245, 245, 245, 1)' onPress={() => {history.push("/search"); 
                      }}
                    >
                        <ImageView tablet={this.state.tablet} >
                          <GridImage 
                            tablet={this.state.tablet}
                            resizeMode={"center"}
                            source={require('../img/shirt-static.png')}
                          />
                        </ImageView>
                        <View style={styles.cardInfo}>
                          <Text style={styles.itemText}> {data.companyName} </Text>
                          <Text style={styles.itemText}> {data.userName} </Text>
                          <Text style={styles.itemText}> {data.userType} </Text>
                        </View>
                    </TouchableOpacity>
                      </Card>
                  )
                })
              }
              </View>
            </ScrollView>
          </View>
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
  button: {
    // padding: 10
  },
  subHeader: {
    flexDirection: 'row',
    fleGrow: 1,
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10
  }

}
export default withRouter(CompanyList);