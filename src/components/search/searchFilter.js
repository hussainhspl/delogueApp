import React, { Component, Fragment } from "react";
import { Text, View, TouchableOpacity, AppState, TouchableHighlight, Image } from "react-native";
import { Icon, Button } from "native-base";
import SearchInput, { createFilter } from "react-native-search-filter";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components";
import CommonModal from "../../shared/CommonModal";

const styleArray = [
  { name: "Superdry" },
  { name: "Benetton" },
  { name: "Adidas" },
  { name: "Superdry 1" },
  { name: "Benetton 1" },
  { name: "Adidas 1" }
];

const seasonArray = [
  { name: "Summer" },
  { name: "Winter" },
  { name: "Rainy" },
  { name: "Autumn" },
  { name: "Fall" }
];

const KEYS_TO_FILTERS = ["name"];
const SEASON_KEYS = ["name"];

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

const StyledSearchInput = styled(SearchInput)`
  padding-left: 10px;
  border-color: #425460;
  border-width: 1px;
  height: 40px;
  margin-right: 10px;
  position: relative;
  padding-right: 40px;
  flex: 1;
  width: 100%;
  font-family: ${props => props.theme.regular};
  color: ${props => props.theme.textColor};
`;
const ResetBar = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
`;

const ResetButton = styled(Button)`
  justify-content: center;
  align-items: center;
  padding: 0px 5px;
  margin-left: 15px;
  margin-left: 15px;
  background-color: #c2beb6;
  height: 30px;
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
  margin-bottom: 10px;
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
  color: #8d8177;
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
  justify-content:center;
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
  padding-top: 15px;
  /* background-color: #f00; */
`;
const Flex = styled.View`
  flex: 1;
`;
class searchFilter extends Component {
  state = {
    modalVisible: false,
    searchBrand: "",
    searchSeason: "",
    text: "Useless Placeholder",
    appState: AppState.currentState
  };
  searchUpdated(term) {
    this.setState({
      searchBrand: term
    });
    console.log("called again");
  }
  seasonUpdated(term) {
    this.setState({
      searchSeason: term
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
      searchSeason: ""
    });
    this.searchUpdated("");
    this.forceUpdate();
  };

  render() {
    const filteredStyle = styleArray.filter(
      createFilter(this.state.searchBrand, KEYS_TO_FILTERS)
    );
    const filteredSeason = seasonArray.filter(
      createFilter(this.state.searchSeason, SEASON_KEYS)
    );
    console.log("rendered again");
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
          okClick={() => this.redirectTo(history)}
        >
          <MainView>
            <KeyboardAwareScrollView>
              <ResetBar>
                <ResetButton onPress={this.restFilter}>
                  <GrayButtonText>reset</GrayButtonText>
                </ResetButton>
              </ResetBar>

              <SearchBar>
                <Title>brand</Title>
                <FlexRow>
                <SearchIcon>
                <Icon style={{color:"#fff"}} name="ios-search"/>
              </SearchIcon>
                <Flex>
                <StyledSearchInput
                  placeholderTextColor="#C9DBDB"
                  onChangeText={term => {
                    this.searchUpdated(term);
                  }}
                  placeholder="Enter Brand Name"
                  clearIcon={
                    this.state.searchBrand !== "" && (
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
                </Flex>
                </FlexRow>
                <Capsule>
                  {filteredStyle.map(item => {
                    return (
                      <StyledItem key={item.name}>
                        <ItemName>{item.name} </ItemName>
                      </StyledItem>
                    );
                  })}
                </Capsule>
              </SearchBar>

              <SearchBar>
                <Title>season</Title>
                <FlexRow>
                <SearchIcon>
                <Icon style={{color:"#fff"}} name="ios-search"/>
              </SearchIcon>
              <Flex>
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
                </Flex>
                </FlexRow>
                <Capsule>
                  {filteredSeason.map(item => {
                    return (
                      <StyledItem key={item.name}>
                        <ItemName>{item.name}</ItemName>
                      </StyledItem>
                    );
                  })}
                </Capsule>
              </SearchBar>
            </KeyboardAwareScrollView>
          </MainView>
        </CommonModal>
      </Fragment>
    );
  }
}
export default searchFilter;
