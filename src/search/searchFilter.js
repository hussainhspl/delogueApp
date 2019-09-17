import React, {Component, Fragment} from 'react';
import {Text, View, TouchableOpacity, AppState, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { Button } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CommonModal from '../shared/CommonModal';
import styled from 'styled-components'

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

const StyledTouchableOpacity = styled.TouchableOpacity`
  position: absolute;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  right: 20px;
  bottom: 30px;
`;

const FilterButton = styled.View`
  border: 1px solid #eee;
  align-items:center;
  justify-content:center;
  width:50px;
  height:50px;
  background-color:#818181;
  border-radius:50px;
  /* shadow-color: #aaa;
  shadow-offset: { width: 0; height: 3 };
  shadow-opacity: 0.8;
  shadow-radius: 2;  
  elevation: 5; */
  elevation: 5;
  /* box-shadow: 50px 15px #aaa; */
  z-index: 2;
  margin-top: 10px;
`;
const GrayButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  font-size: 12px;
  padding: 5px;
`;
const StyledSearchInput = styled(SearchInput)`
  padding: 11px;
  border: 1px solid #ccc;
  height: 40px;
  margin: 10px 0px;
`;
const ResetBar = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color:  #ccc;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
`;

const SearchBar = styled.View`
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

const StyledItem = styled.View`
  margin-right: 10px;
  border-radius: 15px;
  border: 1px solid #9b9b9b;
  background-color: #fff;
  align-self: flex-start;
  padding: 0px 5px 1px 0px;
  justify-content: center;
  margin-bottom:10px;
`;

const ItemName = styled.Text`
  color: #9b9b9b;
  font-weight: 300;
  padding: 2px 4px;
  font-family: ${props => props.theme.regular};
`;

const Capsule = styled.View`
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0px;
  flex-wrap: wrap;
  flex-direction: row;
`;
const Title = styled.Text`
  text-transform: uppercase;
  color: #8D8177;
`;

class searchFilter extends Component {
  state = {
    modalVisible: false,
    searchTerm: '',
    searchSeason: '',
    text: 'Useless Placeholder',
    appState: AppState.currentState,
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
  componentDidMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount= () => {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = (nextAppState) => {
 
    this.setState({ appState: nextAppState });
 
    if (nextAppState === 'background') {
      // console.log('bg state', this.state.appState)
      this.setState({modalVisible : false}, () => console.log(this.state.modalVisible));
    }
    if (nextAppState === 'active') {
      // console.log('bg state', this.state.appState)
    }
  }


  render() {
    
     const filteredStyle = styleArray.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
     const filteredSeason = seasonArray.filter(createFilter(this.state.searchSeason, SEASON_KEYS));
    // console.log("app state: ", this.state.appState);
     return (
      <Fragment>
        <StyledTouchableOpacity
          activeOpacity={0.7}
          // onPress={() => {
          //   this.setModalVisible(true);
          // }} 
          onPress={() => {
						this.setModalVisible(!this.state.modalVisible);
					}}
          >
            <FilterButton>
              <Image resizeMode={"contain"} source={require('../../assets/img/filter.png')} /> 
            </FilterButton>
        </StyledTouchableOpacity>
        {/* <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}> */}
          <CommonModal    
            title='filter'
            modalVisible={this.state.modalVisible}
            close={() => {this.setModalVisible(!this.state.modalVisible);
            }}
            // okButton = "notification"
            okClick = {() => this.redirectTo(history)}
            // bg='#fff'
          >
            <View style={{flex: 1}}>

          <KeyboardAwareScrollView>
              <ResetBar>
                <Button small style={{backgroundColor: '#C2BEB6'}}>
                  <GrayButtonText>
                    reset
                  </GrayButtonText>
                </Button>
              </ResetBar>
              
              <SearchBar>
                <Title>brand</Title>
                <StyledSearchInput 
                  onChangeText={(term) => { this.searchUpdated(term) }} 
                  placeholder="Enter Brand Name "
                />
                <Capsule>
                {
                  filteredStyle.map(item => {
                    return(
                      <StyledItem key={item.name}>
                        <ItemName>{item.name} </ItemName>
                      </StyledItem>
                    )
                  })
                }
                </Capsule>
              </SearchBar>

              <SearchBar>
                <Title>season</Title>
                <StyledSearchInput 
                  onChangeText={(term) => { this.seasonUpdated(term) }} 
                  placeholder="Enter Season"
                />
                <Capsule>
                  {
                    filteredSeason.map(item => {
                      return(
                        <StyledItem key={item.name}>
                          <ItemName>{item.name} 
                          </ItemName>
                        </StyledItem>
                      )
                    })
                  }
                </Capsule>
              </SearchBar>
          </KeyboardAwareScrollView>

            </View>
        </CommonModal>
      </Fragment>
    )
  }
}
export default searchFilter;