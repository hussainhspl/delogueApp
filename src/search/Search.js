import React, {Fragment} from 'react';
import {Text, View, TouchableOpacity, Image, FlatList, Dimensions, ScrollView, BackHandler } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchFilter from './searchFilter';
import Header from '../Header';
import styled from 'styled-components';

const details = [
  {
    styleNo: 'sty2211',
    styleName: 'Casual Shirt',
    supplier: 'head textiles',
    season: 'summer'
  },
  {
    styleNo: 'sty2212',
    styleName: 'Formal Shirt',
    supplier: 'Pune textiles',
    season: 'Autumn'
  },
  {
    styleNo: 'sty2214',
    styleName: 'Casual Shirt',
    supplier: 'head textiles',
    season: 'Winter'
  },
  {
    styleNo: 'sty2217',
    styleName: 't shirt',
    supplier: 'Super textiles',
    season: 'summer'
  },
];
const GridImage = styled.Image`
  width: ${Dimensions.get('window').width / 3-30};
  height: ${Dimensions.get('window').width / 3};
  margin: 0px auto;
`;
const GirdImageView = styled.View`
  width: ${Dimensions.get('window').width / 3};
  height: ${Dimensions.get('window').width / 3+50};
  border: 1px solid #ddd;
  align-self: flex-start;
`;

const CardText = styled.Text`
  font-family: ${props => props.theme.regular};
`;
// flatlist start
const formatData = (details, numColumns) => {
  const numberOfFullRows = Math.floor(details.length / numColumns);

  let numberOfElementsLastRow = details.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    details.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
    numberOfElementsLastRow++;
  }
  return details;
};
const numColumns = 3;
// flat list end
const KEYS_TO_FILTERS = ['styleNo','styleName', 'supplier', 'season'];
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.changeView = this.changeView.bind(this);
    this.state = {
      currentView: 'grid',
      searchTerm: '',
    };
    this.myTextInput = React.createRef();
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    // this.goBack = this.goBack.bind(this);
  }
  // componentWillMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }
  // handleBackButtonClick() {
  //   // this.props.navigation.goBack(null);
  //   console.log("back button press");
  //   this.props.history.goBack();
  //   return true;
  // }
  // componentWillUnmount() {
  //   console.log("unmount search");
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }
  searchUpdated(term) {
    // console.log("serach term called", term)
    this.setState({ 
      searchTerm: term,
    })
  }
  changeView = () => {
    if(this.state.currentView === 'linear') {
      let self = this;
      this.setState({
        currentView: 'grid',
        searchTerm: '',
      });
      this.searchUpdated('');
    }
    else {
      this.setState({
        currentView: 'linear',
        searchTerm: '',
      });
      this.searchUpdated('');
      // this.myTextInput.val('');
      let term=this.state.searchTerm;
      // var username= this.refs.username._lastNativeText;
    }
  }

  renderGridView = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    const history= this.props.history;
    return (
      <TouchableOpacity onPress={() => {history.push("/style")}} style={styles.item} key={item.key}>
        <View style={styles.imageView}>
          <Image 
            resizeMode={"center"}
            style={{maxHeight: Dimensions.get('window').width / numColumns -30, maxWidth: 150}}
            source={require('../../assets/img/shirt-static.png')}
          />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.itemText}> {item.styleName} </Text>
          <Text style={styles.itemText}> {item.styleNo} </Text>
          {/* <Text style={styles.itemText}> {item.userType} </Text> */}

        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const { imageBox, row } = styles;
    const filteredStyle = details.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    // console.log('current state', this.state.currentView);
    const history = this.props.history;
    // console.log("search history:", history);
    // console.log("history on search page", this.props.history);
    return(
      <View style={{flex: 1}}>
        
        <Header history ={this.props.history}>
        <ScrollView 
        showsVerticalScrollIndicator={false}
      >
        <View style={[row,{justifyContent:'space-between'}]}>
          <View style={styles.Flex}>
            <SearchInput 
              onChangeText={(term) => { this.searchUpdated(term) }} 
              style={styles.mainSearchInput}
              placeholder="Type a message to search"
              ref= {(el) => { this.term = el; }}
              value={this.state.searchTerm}
            />
          </View>
          <TouchableOpacity onPress={this.changeView}>
          <View style={styles.ViewBox}>
            <Image resizeMode={"contain"} 
              source={this.state.currentView === 'linear' ? require('../../assets/img/squares.png') : require('../../assets/img/lines.png')} 
            /> 
          </View>
          </TouchableOpacity>
        </View>
        {this.state.currentView === 'linear' &&
          filteredStyle.map(data => {
            
            return(
              // <Fragment>
              
              <TouchableOpacity onPress={() => {history.push("/style")}} key={data.styleNo} style={styles.touchableRow}>
                <View style={imageBox}>
                  <Image resizeMode={"contain"} source={require('../../assets/img/styleblack.png')} /> 
                </View>
                <View style={styles.Flex}>
                  <View style={styles.row}>
                    <Text numberOfLines={1} style={styles.title}>style no</Text>
                    <View style={styles.Flex}>
                      <Text numberOfLines={1} style={styles.subtitle}>{data.styleNo}</Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.title}>style name</Text>
                    <View style={styles.Flex}>
                      <Text numberOfLines={1} style={styles.subtitle}>{data.styleName}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.Flex}>
                  <View style={styles.row}>
                    <Text numberOfLines={1} style={styles.title}>supplier</Text>
                    <View style={styles.Flex}>
                      <Text numberOfLines={1} style={styles.subtitle}>{data.supplier}</Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <Text numberOfLines={1} style={styles.title}> season</Text>
                    <View style={styles.Flex}>
                      <Text numberOfLines={1} style={styles.subtitle}>{data.season}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              // {/* </Fragment> */}
            )
          })
        }
        {this.state.currentView === 'grid' &&
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          
          {filteredStyle.map(data => {
            return(
                
                <GirdImageView key={data.styleNo}>
                  <TouchableOpacity onPress={() => {history.push("/style")}} key={data.key}>
                    <GridImage 
                      resizeMode={"center"}
                      source={require('../../assets/img/shirt-static.png')}
                    />
                    <View style={styles.cardInfo}>
                      <CardText numberOfLines={1}> {data.styleName} </CardText>  
                      <CardText numberOfLines={1}> {data.styleNo} </CardText>
                    </View>
                    
                  </TouchableOpacity>
                </GirdImageView>
                )
              }) 
            }
            </View>
        }
        </ScrollView>
        <SearchFilter />
        </Header>
      </View>
    )
  }
}

const styles = {
  imageBox: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  Flex: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 11,
    paddingRight: 5,
    color: '#9b9b9b',
    textTransform: 'uppercase',
    textAlign: 'right',
    width: 80,
    paddingTop: 2
  },
  subtitle: {
    fontSize: 12,
    color: '#4A4A4A',
    // Width: '100%',
  },
  iconView: {
    width: 50,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput:{
    padding: 11,
    borderColor: '#CCC',
    borderWidth: 1,
    height: 50,
    margin: 15,
  },
  touchableRow:{
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewBox: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainSearchInput: {
    padding: 11,
    borderColor: '#CCC',
    borderWidth: 1,
    height: 50,
    margin: 15,
    // width: '100%',
    marginRight: 10,
  },

  // grid style
    item: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    margin: 0,
    borderWidth: 1,
    borderColor: '#ccc',
    height: Dimensions.get('window').width / numColumns +50, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    borderColor: '#f6f6f6'
  },
  itemText: {
    color: '#000',
  },
  cardInfo:{
    // backgroundColor: '#f6f6f6',
    borderTopWidth: 1,
    borderColor: '#eee',
    height: 50,
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

}

export default Search;