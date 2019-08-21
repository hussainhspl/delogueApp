import React, {Component, Fragment} from 'react';
import {Text, View, TouchableOpacity, TouchableHighlight, Image, Modal, FlatList, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { Button } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const styleArray = [
  { name: "Superdry"}, 
  { name: "Benetton"},
  { name: "Adidas"},
  { name: "Superdry 1"}, 
  { name: "Benetton 1"},
  {name: "Adidas 1"},
]

const seasonArray = [
  { name: "Summer"}, 
  { name: "Winter"},
  { name: "Rainy"},
  { name: "Autumn"}, 
  { name: "Fall"},
]

const KEYS_TO_FILTERS = ['name'];
const SEASON_KEYS = ['name'];

class searchFilter extends Component {
  state = {
    modalVisible: false,
    searchTerm: '',
    searchSeason: '',
    text: 'Useless Placeholder'
  };
  searchUpdated(term) {
    this.setState({ 
      searchTerm: term,
    })
  }
  seasonUpdated(term) {
    this.setState({
      searchSeason: term
    })
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render() {
    const { filterButton, filterArea, closeBox, filterBar, 
      modalTitle, grayButton, grayButtonText, resetBar, upper, searchBar, skillView, styleItem, itemName, applyBar, applyText } = styles;
     const filteredStyle = styleArray.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
     const filteredSeason = seasonArray.filter(createFilter(this.state.searchSeason, SEASON_KEYS));
    return (
      <Fragment>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            this.setModalVisible(true);
          }} 
          style={styles.TouchableOpacityStyle}>
            <View style={filterButton}>
              <Image resizeMode={"contain"} source={require('../../img/filter.png')} /> 
            </View>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
            <View style={{flex: 1}}>
          <KeyboardAwareScrollView>
              <View style={filterBar}>
                <Text style={modalTitle}> filter </Text>
                <View style={closeBox}>
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                      <Icon style={{color: '#fff', fontSize: 28}} name="ios-close" />
                  </TouchableHighlight>
                </View>
              </View>
              
              <View style={resetBar}>
                <Button small style={{backgroundColor: '#C2BEB6'}}><Text style={grayButtonText}>reset</Text></Button>
              </View>
              
              <View style={searchBar}>
                <Text style={upper}>brand</Text>
                <SearchInput 
                  onChangeText={(term) => { this.searchUpdated(term) }} 
                  style={styles.searchInput}
                  placeholder="Enter Brand Name "
                />
                <View style={skillView}>
                {
                  filteredStyle.map(item => {
                    return(
                      <View style={styleItem} key={item.name}>
                        <Text style={itemName}>{item.name} </Text>
                      </View>
                    )
                  })
                }
                </View>
              </View>

              <View style={searchBar}>
                <Text style={upper}>season</Text>
                <SearchInput 
                  onChangeText={(term) => { this.seasonUpdated(term) }} 
                  style={styles.searchInput}
                  placeholder="Enter Season"
                />
                <View style={skillView}>
                  {
                    filteredSeason.map(item => {
                      return(
                        <View style={styleItem} key={item.name}><Text style={itemName}>{item.name}</Text></View>
                      )
                    })
                  }
                </View>
              </View>

              <View style={applyBar}>
                <Button bordered light small danger>
                  <Text style={[upper,{color: "#d9534e"}]}> cancel </Text> 
                </Button>
                <Button small style={{backgroundColor:"#849D7A", marginLeft: 15}} >
                  <Text style={applyText}>apply</Text>
                </Button>
              </View>
          </KeyboardAwareScrollView>

            </View>
        </Modal>
      </Fragment>
    )
  }
}
const styles = {
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 30,
  },
  filterButton: {
		borderWidth:1,
		borderColor: '#eee',
		alignItems:'center',
		justifyContent:'center',
		width:50,
		height:50,
		backgroundColor:'#818181',
		borderRadius:50,
		shadowColor: '#aaa',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.8,
		shadowRadius: 2,  
    elevation: 5,
    zIndex: 2,
    marginTop: 10
  },
  closeBox: {
		marginLeft: 'auto',
		paddingVertical: 5,
    paddingHorizontal: 10,
	},
  filterBar: {
    backgroundColor: '#415461',
    heigth: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalTitle: {
    color: 'white',
    paddingLeft: 10,
    fontSize: 16,
    textTransform :'uppercase'
  },
  grayButton: {
    backgroundColor: '#C2BEB6',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  grayButtonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 12,
    padding: 5,
  },
  resetBar: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  upper: {
    textTransform: 'uppercase',
    color: '#8D8177',
  },
  searchBar: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  applyBar: {
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'red'
    // zIndex:-1

  },
  searchInput:{
    padding: 11,
    borderColor: '#CCC',
    borderWidth: 1,
    height: 40,
    marginVertical: 10,
  },
  skillView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 20,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  styleItem: {
    marginRight: 10,
    borderRadius: 15,
    borderColor: '#9b9b9b',
    borderWidth: 1,
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    paddingBottom: 1,
    justifyContent: 'center',
    marginBottom:10,
  },
  itemName: {
    color: '#9b9b9b',
    fontWeight: '300',
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontFamily: "",
  },
  applyText: {
    color: 'white',
    textTransform: 'uppercase',
    padding: 5,
  }
}
export default searchFilter;