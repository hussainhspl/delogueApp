import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  AppState,
  TouchableHighlight,
  TouchableWithoutFeedback,
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
import ButtonOverlay from "../../styles/ButtonOverlay";
import IconView from "../../styles/IconView";

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
  border-radius: 0px;
`;

const SearchBar = styled.View`
  padding: 10px 15px;
  height: ${props => (props.suggestion ? "420px" : 'auto')};
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
  margin-bottom: 10px;
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

const ButtonRow = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
`;
const ViewStyleButton = styled(View)`
  background-color: ${props => props.theme.blue};
  margin: 15px auto;
  padding: 6px 0px;
  width: 170px;
  align-items: center;
  height: 30px;
`;
const ButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  text-align: center;
  font-family: ${props => props.theme.regular};
  font-size: ${props => props.theme.large};
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
      showOpacity: false,
      myStyleState: false,
      showSuggestion: false,
      suggestionArr: [],
      showSeasonSuggestion: false,
      suggestionSeasonArr: [],
    }
  };
  Season  (obj) {
    console.log('season name:', obj)
    
      if(obj != null) {
        this.setState(prevState => ({ 
          filteredSeason: prevState.filteredSeason.concat(obj),
          showSeasonSuggestion: false,
          suggestionSeasonArr: [],
        }));
      }
      else {
        GetAsyncToken().then(token => {
        GetSeason(this.state.searchSeason, token).then(res => {
          console.log("res season", res);
          this.setState(prevState => ({ 
            filteredSeason: prevState.filteredSeason.concat(res.data),
            showSeasonSuggestion: false,
            suggestionSeasonArr: [],
          }));
        })
        .catch(function (error) {
          console.error("error in get season", error);
        });
      })
      }
  };

  Brands = (obj) => {
    console.log('season name:', obj)
    
      if(obj != null) {
        this.setState(prevState => ({ 
          filteredBrand: prevState.filteredBrand.concat(obj),
            showSuggestion: false,
            suggestionArr: []
        }));
      }
      else {
    GetAsyncToken().then(token => {
      GetBrands(this.state.searchBrand, token)
        .then(res => {
          console.log('filter brand:', res.data)
          this.setState(prevState => ({
            filteredBrand: prevState.filteredBrand.concat(res.data),
            showSuggestion: false,
            suggestionArr: []
          }))
        })
        .catch(function (error) {
          console.error("error in search", error);
        });
    });
  }
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
    })
  }
  getSeasonSuggestion = () => {
    GetAsyncToken().then(token => {
      GetSeason(this.state.searchSeason, token).then(res => {
        console.log("res in suggestion season", res);
        this.setState({ 
          suggestionSeasonArr: res.data,
        });
      })
      .catch(function (error) {
        console.error("error in get suggestion season", error);
      });
    })
  }
  searchUpdated(term) {
    this.setState({
      searchBrand: term,
      showSuggestion: true
    }, () => this.getBrandSuggestion());
  }
  seasonUpdated(term) {
    this.setState({ 
      searchSeason: term,
      showSeasonSuggestion: true
    }, () => this.getSeasonSuggestion());
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
      searchSeason: "",
      suggestionArr: [],
      suggestionSeasonArr: [],
    });
  };
  sendFilters() {
    // console.log('getting data');
    if (this.state.filteredSeason != null) {
      let seasonArray = [];
      this.state.filteredSeason.map(s => {
        let id = s.id
        seasonArray.push(id)
      })
      if (seasonArray != null) {
        this.props.SeasonIdArr(seasonArray)
      }
    }
    if (this.state.filteredBrand != null) {
      let brandArray = [];
      // console.log('this.state.filteredBrand',this.state.filteredBrand);
      this.state.filteredBrand.map(d => {
        let id = d.id
        // console.log('filter present', d.id, id);
        brandArray.push(id)
      })
      // console.log("array ",brandArray);
      if (brandArray != null) {
        // console.log('Brand array present');
        this.props.BrandIdArr(brandArray)
      }
    }
    this.props.myStyleStatus(this.state.myStyleState);
    this.setModalVisible(!this.state.modalVisible);
  }
  popBrandId(pid) {
    // console.log('pid', pid, this.state.filteredBrand);
    let filteredArray = this.state.filteredBrand.filter(item => item.id !== pid)
    // console.log('after filter', filteredArray);
    this.setState({ filteredBrand: filteredArray });
  }
  popSeasonId(pid) {
    let filteredArray = this.state.filteredSeason.filter(item => item.id !== pid)
    this.setState({ filteredSeason: filteredArray });
  }
  toggleStyles = () => {
    console.log('toggle messages')
    this.setState({
      myStyleState: !this.state.myStyleState
    })
  }
  render() {
    console.log('suggestionArr', this.state.filteredBrand, this.state.suggestionSeasonArr.length)
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
            
              <ResetBar>
                {/* <ResetButton>
                  <GrayButtonText>show only my styles </GrayButtonText>
                </ResetButton> */}
                <TouchableWithoutFeedback
                  onPressIn={() => this.setState({ showOpacity: true })}
                  onPressOut={() => this.setState({ showOpacity: false })}
                  onPress={this.toggleStyles}
                >
                  <ButtonRow>
                    {this.state.showOpacity && <ButtonOverlay />}
                    <IconView>
                      <Image
                        resizeMode={"center"}
                        source={require("../../../assets/img/show-read.png")}
                      />
                      {/* <Icon style={{ color: "#fff", fontSize: 15 }} name="eye" /> */}
                    </IconView>
                    <ViewStyleButton>
                      <ButtonText> {this.state.myStyleState ? 'show only my styles' : 'show all styles'} </ButtonText>
                    </ViewStyleButton>
                  </ButtonRow>
                </TouchableWithoutFeedback>


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
                  {/* <KeyboardAwareScrollView> */}
                    <SearchInput
                      placeholder="SEARCH"  
                      placeholderTextColor="#C9DBDB"
                      value={this.state.searchBrand}
                      clearButtonMode='always'
                      onChangeText={term => {
                        this.searchUpdated(term);
                      }}
                      onSubmitEditing={() => this.Brands(null)}
                    />
                    {/* </KeyboardAwareScrollView> */}
                    {
                      this.state.showSuggestion && this.state.suggestionArr.length > 0 &&(
                         
                        <SearchSuggestionView>
                          {this.state.suggestionArr.map(d => {
                            return (
                              <TouchableHighlight underlayColor={"#eee"} 
                                onPress={() => this.Brands(d)}>
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
                  this.state.filteredBrand.length > 0 ?
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
                                  <Text> {brand.name} </Text>
                                </SearchedItemBox>
                              );
                            })}
                          </CapsuleView>
                        </StyledScrollView>
                      </View>
                    ) : null : null}
              </SearchBar>
              {this.state.suggestionArr.length < 1 ?

                <SearchBar suggestion={this.state.suggestionSeasonArr.length > 0 ? true : false}>
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
                        clearButtonMode='always'
                        value={this.state.searchSeason}
                        onChangeText={term => {
                          this.seasonUpdated(term);
                          
                        }}
                        onSubmitEditing={() => this.Season(null)}
                      />
                      {
                        this.state.showSeasonSuggestion && this.state.suggestionSeasonArr.length > 0 && (
                          <SearchSuggestionView>
                            {this.state.suggestionSeasonArr.map(d => {
                              return (
                                <TouchableHighlight underlayColor={"#eee"} 
                                  onPress={() => this.Season(d)}>
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
                  { this.state.suggestionSeasonArr.length <= 0 ?
                    this.state.filteredSeason.length > 0 ?
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
                    ) : null: null}
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
                : null}
            {/* </KeyboardAwareScrollView> */}
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
