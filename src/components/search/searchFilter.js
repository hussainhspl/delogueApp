import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  AppState,
  TouchableHighlight,
  Image
} from "react-native";
import { Icon, Button } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components";
import CommonModal from "../../shared/CommonModal";
import Capsule from "../../styles/Capsule";
import Title from "../../styles/CardText";
import SearchedItemBox from "../../styles/SearchedItem";
import Close from "../../styles/Close";
import SearchInput from "../../styles/SearchInput";
import axios from "axios";
import { connect } from "react-redux";
import GetSeason from "../../api/search/getSeason";
import GetAsyncToken from '../../script/getAsyncToken';
import SearchSuggestionView from '../../styles/SearchSuggestionView';
import SuggestionTerm from '../../styles/SuggestionTerm';
import SearchIconBox from "../../styles/SearchIconBox";
import GetBrands from '../../api/search/getBrands';

const StyledTouchableOpacity = styled.TouchableHighlight`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  /* margin-top: 10px; */
`;

const FilterButton = styled.View`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #425460;
  border-radius: 50px;
  right: 20px;
  bottom: 30px;
`;
const GrayButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  font-size: 12px;
  padding: 5px;
`;

const ResetBar = styled.View`
  padding: 10px 15px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const ResetButton = styled(Button)`
  justify-content: center;
  align-items: center;
  padding: 0px 5px;
  background-color: #c2beb6;
  height: 30px;
`;

const SearchBar = styled.View`
  padding: 10px 15px;
  height: ${props => (props.suggestion ? "400px" : 'auto')};
  max-height: 400px;
  flex: 1;
`;

const ItemName = styled.Text`
  color: #9b9b9b;
  font-weight: 300;
  padding: 2px 4px;
  font-family: ${props => props.theme.regular};
`;

const MainView = styled.View`
  flex: 1;
`;
const ClearIcon = styled(Icon)`
  font-size: 20px;
  color: #fff;
`;

const CloseView = styled.View`
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 20px;
  height: 20px;
  background-color: #a4a4a4;
`;

const FlexRow = styled.View`
  flex-direction: row;
  padding-top: 10px;
`;
const Separator = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;
const StyledItem = styled.View``;
const CapsuleView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px 0px;
  /* background-color: #d00; */
`;
const StyledScrollView = styled.ScrollView`
  max-height: 200px;
  padding: 0px;
  margin: 0px;
`;

const Flex = styled.View`
  flex: 1;
`;
class searchFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      searchBrand: "",
      searchSeason: "",
      filteredBrand: [],
      filteredSeason: [],
      text: "Useless Placeholder",
      appState: AppState.currentState,
      showSuggestion: false,
      suggestionArr: []
    }
  };
  Season = () => {
    GetAsyncToken().then(token => {
      GetSeason(this.state.searchSeason, token).then(res => {
        console.log("res season", res);
        let res1 = res.data;
        temp = [...this.state.filteredSeason];
        temp1 = temp.concat(res1);
        this.setState({ filteredSeason: temp1 });
      });
    })
  };

  Brands = () => {
    // console.log(this.state.filteredBrand);
    GetAsyncToken().then(token => {
      GetBrands(this.state.searchBrand, token)
        .then(res => {
          console.log('filter brand:' , res.data)
          let res1 = res.data;
          temp = [...this.state.filteredBrand];
          temp1 = temp.concat(res1);
          this.setState({ 
            filteredBrand:temp1,
            showSuggestion: false,
            suggestionArr: [],
          });
          
        })
        .catch(function(error) {
          console.error("error in search", error);
        });
    });
  };
  getBrandSuggestion = () => {
    GetAsyncToken().then(token => {
      GetBrands(this.state.searchBrand, token)
        .then(res => {
          console.log('hello;', res)
          this.setState({
            suggestionArr: res.data
          })
        })
      // GetStyles(this.state.searchTerm, token, this.state.brandIds,
      //   this.state.seasonIds)
      //   .then(res => {
      //     console.log('suggest style', res.data.styles);
      //     this.setState({
      //       suggestionArr : res.data.styles
      //     })
      //   })
    })
  }
  searchUpdated(term) {
    this.setState({
      searchBrand: term,
      showSuggestion: true
    },() => this.getBrandSuggestion());
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentDidMount = () => {
    AppState.addEventListener("change", this._handleAppStateChange);
  };
  componentWillUnmount = () => {
    AppState.removeEventListener("change", this._handleAppStateChange);
  };
  _handleAppStateChange = nextAppState => {
    this.setState({ appState: nextAppState });
    if (this.state.modalVisible === true) {
      // console.log("back clicked");
    }
    if (nextAppState === "background") {
      // console.log('bg state', this.state.appState)
     
    }
    if (nextAppState === "active") {
      // console.log('bg state', this.state.appState)
    }
  };
  restFilter = () => {
    // console.log("click on reset");
    this.setState({
      searchBrand: "",
      filteredBrand: [],
      filteredSeason: [],
      searchSeason: ""
    });
  };
  sendFilters () {
    // console.log('getting data');
    if(this.state.filteredSeason != null) {
      let seasonArray = [];
      this.state.filteredSeason.map(s => {
        let id = s.id
        seasonArray.push(id)
      })
      if(seasonArray != null){
        this.props.SeasonIdArr(seasonArray)
      }
    }
    if(this.state.filteredBrand != null) {
      let brandArray = [];
      // console.log('this.state.filteredBrand',this.state.filteredBrand);
      this.state.filteredBrand.map(d => {
        let id = d.id
        // console.log('filter present', d.id, id);
        brandArray.push(id)
      })
      // console.log("array ",brandArray);
      if(brandArray != null) {
        // console.log('Brand array present');
        this.props.BrandIdArr(brandArray)
      }
    }
    this.setModalVisible(!this.state.modalVisible);  
  }
  popBrandId (pid) {
    // console.log('pid', pid, this.state.filteredBrand);
    let filteredArray = this.state.filteredBrand.filter(item => item.id !== pid)
    // console.log('after filter', filteredArray);
    this.setState({filteredBrand: filteredArray});
  }
  popSeasonId (pid) {
    let filteredArray = this.state.filteredSeason.filter(item => item.id !== pid)
    this.setState({filteredSeason: filteredArray});
  }
  render() {
    console.log('suggestionArr', this.state.filteredBrand, this.state.suggestionArr.length)
    return (
      <Fragment>
        <FilterButton>
          <StyledTouchableOpacity
            underlayColor="#32414A"
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
          >
            <Image
              resizeMode={"contain"}
              source={require("../../../assets/img/filter.png")}
            />
          </StyledTouchableOpacity>
        </FilterButton>
        <CommonModal
          title="filter"
          modalVisible={this.state.modalVisible}
          close={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
          okClick={() => this.sendFilters()}
        >
          <MainView>
            <KeyboardAwareScrollView>
              <ResetBar>
                <ResetButton>
                  <GrayButtonText>show only my styles </GrayButtonText>
                </ResetButton>
                <ResetButton onPress={this.restFilter}>
                  <GrayButtonText>reset</GrayButtonText>
                </ResetButton>
              </ResetBar>

              <SearchBar suggestion={this.state.suggestionArr.length > 0 ? true : false}>
                <Title>brand</Title>
                <FlexRow>
                  <SearchIconBox>
                    <Icon style={{ color: "#fff" }} name="ios-search" />
                  </SearchIconBox>
                  <Flex>
                  <SearchInput
                    placeholder="SEARCH"
                    placeholderTextColor="#C9DBDB"
                    onChangeText={term => {
                      this.searchUpdated(term);
                    }}
                    onSubmitEditing={this.Brands}
                  />
                  {
                  this.state.showSuggestion && (
                    <SearchSuggestionView>
                      {this.state.suggestionArr.map(d => {
                        return (
                          <TouchableHighlight underlayColor={"#eee"} onPress={() => this.getCurrentStyle(d.id)}>
                          <SuggestionTerm>
                            {d.name}
                        </SuggestionTerm>
                        </TouchableHighlight>
                        )
                      })}
                    </SearchSuggestionView>
                  )
                }
                </Flex>
                </FlexRow>
                
                {this.state.suggestionArr.length <= 0 ?
                  this.state.filteredBrand != null ?
                this.state.filteredBrand && (
                  <View>
                  <StyledScrollView scrollToOverflowEnabled>
                    <CapsuleView>
                      {this.state.filteredBrand.map(brand => {
                        return (
                          <SearchedItemBox key={brand.id}>
                            <Close underlayColor={"#362119"} onPress={() => this.popBrandId(brand.id)}>
                              <Icon style={{ fontSize: 13 }} name="close" />
                            </Close>
                            <Text> {brand.name} aa </Text>
                          </SearchedItemBox>
                        );
                      })}
                    </CapsuleView>
                  </StyledScrollView>
                  </View>
                  // <Text> loading </Text>
                ): null : null}
              </SearchBar>
              {this.state.suggestionArr.length<1 ? 
                       
              <SearchBar>
                <Separator />
                <Title>season</Title>
                <FlexRow>
                  <SearchIconBox>
                    <Icon style={{ color: "#fff" }} name="ios-search" />
                  </SearchIconBox>
                  <Flex>
                  <SearchInput
                    placeholder="SEARCH"
                    placeholderTextColor="#C9DBDB"
                    onChangeText={term => {
                      // this.seasonUpdated(term);
                      this.setState({ searchSeason: term });
                    }}
                    onSubmitEditing={this.Season}
                  />
                  {
                  this.state.showSuggestion && (
                    <SearchSuggestionView>
                      {this.state.suggestionArr.map(d => {
                        return (
                          <TouchableHighlight underlayColor={"#eee"} onPress={() => this.getCurrentStyle(d.id)}>


                          <SuggestionTerm>
                            hey
                            {/* {d.name} */}
                        </SuggestionTerm>
                        </TouchableHighlight>
                        )
                      })}
                    </SearchSuggestionView>
                  )
                }
                  </Flex>
                  {/* <Flex>
                <StyledSearchInput
                  placeholderTextColor="#C9DBDB"
                  onChangeText={term => {
                    this.seasonUpdated(term);
                  }}
                  placeholder="Enter Season"
                  clearIcon={
                    this.state.searchSeason !== "" && (
                      <CloseView>
                        <ClearIcon name="ios-close" />
                      </CloseView>
                    )
                  }
                  clearIconViewStyles={{
                    position: "absolute",
                    top: 10,
                    right: 20,
                    bottom: 20,
                    borderRadius: 10,
                  }}
                />
                </Flex> */}
                </FlexRow>
                {this.state.filteredBrand != null ?
                  this.state.filteredSeason && (
                  <StyledScrollView scrollToOverflowEnabled>
                    <CapsuleView>
                      {this.state.filteredSeason.map(season => {
                        return (
                          // <Capsule key={item.name}>
                          //   <ItemName>{item.name} </ItemName>
                          // </Capsule>
                          <SearchedItemBox key={season.id}>
                            <Close underlayColor={"#362119"} onPress={() => this.popSeasonId(season.id)}>
                              <Icon style={{ fontSize: 13 }} name="close" />
                            </Close>
                            <Text> {season.name} </Text>
                            {/* <SearchedText>{item.name}</SearchedText> */}
                          </SearchedItemBox>
                        );
                      })}
                    </CapsuleView>
                  </StyledScrollView>
                ): null}
                {/* <CapsuleView>
                  {filteredSeason.map(item => {
                    return (
                      <Capsule key={item.name}>
                        <ItemName>{item.name} </ItemName>
                      </Capsule>
                    );
                  })}
                </CapsuleView> */}
              </SearchBar>
              : null }
            </KeyboardAwareScrollView>
          </MainView>
        </CommonModal>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentTab: state.tab.now
    // tokenData: state.async.tokenState
  };
};
export default connect(mapStateToProps)(searchFilter);
