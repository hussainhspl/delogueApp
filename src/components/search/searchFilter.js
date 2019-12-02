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
// import {token} from "../../store/actions/index";
import GetSeason from "../../api/getSeason";
import AsyncStorage from "@react-native-community/async-storage";
// import { ScrollView } from "react-native-gesture-handler";
// S_sTlM_5rwnULiUcRx0pAhZGc4eF7AUqgnC299VIMJ021kj76D3o96ZHsSMKdPHchlll5VeL7bnBi7h2epLaedT9pLmxBwSomb8AErxn1czXZDhJM1_LoyILZyoJAqJl2hvy3aSAHwAMbdtij4B98z6nDO2y96wWTm87RBen29n3-eS3--E0e1r6238VbIS8P2nbqiTsR7UKyVjyrKCUBpeKPGmh4B94-6gYZlyjVG-WwYUJKC4-dvSLTNsDMyluco4zJ7NS7aNfn-PdZW6X83nPNbiO5lutlXxppUdhXdGzxqVQsbVmszNfJ9uZ4dbz
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

// const StyledSearchInput = styled(Searchinput)`
//   padding-left: 10px;
//   border-color: #425460;
//   border-width: 1px;
//   height: 40px;
//   margin-right: 10px;
//   position: relative;
//   padding-right: 40px;
//   flex: 1;
//   width: 100%;
//   font-family: ${props => props.theme.regular};
//   color: ${props => props.theme.textColor};
// `;
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
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
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

const SearchIcon = styled.View`
  width: 41px;
  height: 41px;
  background-color: #425460;
  justify-content: center;
  align-items: center;
`;
const FlexRow = styled.View`
  flex-direction: row;
  flex: 1;
  padding-top: 5px;
  padding-bottom: 10px;
  /* background-color: #f00; */
`;
const Flex = styled.View`
  flex: 1;
`;

const StyledItem = styled.View``;
const CapsuleView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px 0px;
  /* background-color: #d00; */
`;
const StyledScrollView = styled.ScrollView`
  /* min-height: 50px; */
  max-height: 200px;
  padding: 0px;
  margin: 0px;
  /* background-color: #0f0; */
`;
class searchFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      searchBrand: "",
      searchSeason: "",
      filteredBrand: null,
      filteredSeason: [],
      text: "Useless Placeholder",
      appState: AppState.currentState,
    }
  };
  Season = () => {
    this.getAsyncToken().then(token => {
      console.log("season called");
      GetSeason(this.state.searchSeason, token).then(res => {
        console.log("res", res);
        this.setState({ filteredSeason: res.data });
      });
    })
  };
  getAsyncToken = async () => {
    try {
      const token = await AsyncStorage.getItem("@token");
      if (token) return token;
    } catch (error) {
      if (error) {
        console.log("async token absent", error);
      }
    }
  };

  // getBrandx = () =>{
  //   this.getAsyncToken()
  //   .then(token => {
  //     axios.get('http://test.delogue.com/api/v2.0/Brands/',{
  //       headers : {
  //         Authorization :'Bearer ' + token
  //       }
  //     }).then((res)=>{
  //       console.log(res);
  //     })
  //   });
  // }

  getBrands = () => {
    this.getAsyncToken().then(token => {
      let string = this.state.searchBrand;
      axios({
        url: `${baseUrl}Brands/${string}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          if (this.state.filteredBrand != null) {
            this.setState(previousState =>({ 
              filteredBrand: [...previousState.filteredBrand, res.data] 
            }));
            // console.log("res", res);
          } else {
            this.setState({
              filteredBrand: res.data
            })
          }
        })
        .catch(function(error) {
          console.error("error in search", error);
        });
    });
  };
  searchUpdated(term) {
    this.setState({
      searchBrand: term
    });
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
      console.log("back clicked");
    }
    if (nextAppState === "background") {
      // console.log('bg state', this.state.appState)
      this.setState({ modalVisible: false }, () =>
        console.log(this.state.modalVisible)
      );
    }
    if (nextAppState === "active") {
      // console.log('bg state', this.state.appState)
    }
  };
  restFilter = () => {
    console.log("click on reset");
    this.setState({
      searchBrand: "",
      filteredBrand: null,
      filteredSeason: [],
      searchSeason: ""
    });
  };
  sendFilters () {
    console.log('getting data');
    if(this.state.filteredBrand != null) {
      let brandArray = [];
      let seasonArray = []
      this.state.filteredBrand.map(d => {
        let id = d.id
        console.log('filter present', d.id, id);
        brandArray.push(id)
      })
      console.log("array ",brandArray);
      if(brandArray != null) {
        console.log('Brand array present');
        this.props.BrandIdArr(brandArray)
      }
    }
    this.setModalVisible(!this.state.modalVisible);
    
  }
  render() {
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

              <SearchBar>
                <Title>brand</Title>
                <FlexRow>
                  <SearchIcon>
                    <Icon style={{ color: "#fff" }} name="ios-search" />
                  </SearchIcon>
                  <SearchInput
                    placeholder="SEARCH"
                    placeholderTextColor="#C9DBDB"
                    onChangeText={term => {
                      this.searchUpdated(term);
                    }}
                    onSubmitEditing={this.getBrands}
                  />
                </FlexRow>
                {this.state.filteredBrand != null ?
                this.state.filteredBrand && (
                  <StyledScrollView scrollToOverflowEnabled>
                    <CapsuleView>
                      {this.state.filteredBrand.map(brand => {
                        return (
                          // <Capsule key={item.name}>
                          //   <ItemName>{item.name} </ItemName>
                          // </Capsule>
                          <SearchedItemBox key={brand.id}>
                            <Close>
                              <Icon style={{ fontSize: 10 }} name="close" />
                            </Close>
                            <Text> {brand.name} </Text>
                            {/* <SearchedText>{item.name}</SearchedText> */}
                          </SearchedItemBox>
                        );
                      })}
                    </CapsuleView>
                  </StyledScrollView>
                ): null}
              </SearchBar>

              <SearchBar>
                <Title>season</Title>
                <FlexRow>
                  <SearchIcon>
                    <Icon style={{ color: "#fff" }} name="ios-search" />
                  </SearchIcon>
                  <SearchInput
                    placeholder="SEARCH"
                    placeholderTextColor="#C9DBDB"
                    onChangeText={term => {
                      // this.seasonUpdated(term);
                      this.setState({ searchSeason: term });
                    }}
                    onSubmitEditing={this.Season}
                  />
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
                {this.state.filteredSeason && (
                  <StyledScrollView scrollToOverflowEnabled>
                    <CapsuleView>
                      {this.state.filteredSeason.map(season => {
                        return (
                          // <Capsule key={item.name}>
                          //   <ItemName>{item.name} </ItemName>
                          // </Capsule>
                          <SearchedItemBox key={season.id}>
                            <Close>
                              <Icon style={{ fontSize: 10 }} name="close" />
                            </Close>
                            <Text> {season.name} </Text>
                            {/* <SearchedText>{item.name}</SearchedText> */}
                          </SearchedItemBox>
                        );
                      })}
                    </CapsuleView>
                  </StyledScrollView>
                )}
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
