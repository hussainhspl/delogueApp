import React, { Component, Fragment } from "react";
import { Text, View, TouchableOpacity, AppState, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SearchInput, { createFilter } from "react-native-search-filter";
import { Button } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CommonModal from "../shared/CommonModal";
import styled from "styled-components";

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
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #818181;
  border-radius: 50px;
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
class searchFilter extends Component {
  state = {
    modalVisible: false,
    searchTerm: "",
    searchSeason: "",
    text: "Useless Placeholder",
    appState: AppState.currentState
  };
  searchUpdated(term) {
    this.setState({
      searchTerm: term
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
      searchTerm: "",
      searchSeason: ""
    });
    this.searchUpdated("");
    this.forceUpdate();
  };

  render() {
    const filteredStyle = styleArray.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );
    const filteredSeason = seasonArray.filter(
      createFilter(this.state.searchSeason, SEASON_KEYS)
    );
    console.log("rendered again");
    return (
      <Fragment>
        <StyledTouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <FilterButton>
            <Image
              resizeMode={"contain"}
              source={require("../../assets/img/filter.png")}
            />
          </FilterButton>
        </StyledTouchableOpacity>
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
                <StyledSearchInput
                  onChangeText={term => {
                    this.searchUpdated(term);
                  }}
                  placeholder="Enter Brand Name"
                />
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
                <StyledSearchInput
                  onChangeText={term => {
                    this.seasonUpdated(term);
                  }}
                  placeholder="Enter Season"
                />
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
