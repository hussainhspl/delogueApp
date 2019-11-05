import React, { Fragment } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  ScrollView
} from "react-native";
import { Icon } from "native-base";
import SearchInput, { createFilter } from "react-native-search-filter";
import SearchFilter from "./searchFilter";
import Header from "../Header";
import styled from "styled-components";
import ItemDetail from "../shared/ItemDetail";
import SearchGridCard from "./searchGridCard";

const details = [
  {
    styleNo: "sty2211",
    styleName: "Casual Shirt",
    supplier: "head textiles",
    season: "summer"
  },
  {
    styleNo: "sty2212",
    styleName: "Formal Shirt",
    supplier: "Pune textiles",
    season: "Autumn"
  },
  {
    styleNo: "sty2214",
    styleName: "Casual Shirt",
    supplier: "head textiles",
    season: "Winter"
  },
  {
    styleNo: "sty2218",
    styleName: "t shirt",
    supplier: "Super textiles",
    season: "summer"
  },
  {
    styleNo: "sty2219",
    styleName: "t shirt",
    supplier: "Super textiles",
    season: "summer"
  },
  {
    styleNo: "sty2220",
    styleName: "t shirt",
    supplier: "Super textiles",
    season: "summer"
  },
  {
    styleNo: "sty2221",
    styleName: "t shirt",
    supplier: "Super textiles",
    season: "summer"
  },
  {
    styleNo: "sty2222",
    styleName: "t shirt",
    supplier: "Super textiles",
    season: "summer"
  }
];

const SearchRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-color: #ddd;
  padding: 10px;
  /* height: 70px; */
`;
const Flex = styled.View`
  flex: 1;
`;

const MainSearchInput = styled(SearchInput)`
  padding-left: 10px;
  border-color: #425460;
  border-width: 1px;
  height: 40px;
  margin-right: 10px;
  position: relative;
  padding-right: 40px;
  font-family: ${props => props.theme.regular};
  color: ${props => props.theme.textColor};
`;

const ViewBox = styled.View`
  height: 40px;
  width: 40px;
  border-width: 1px;
  border-color: #999;
  justify-content: center;
  align-items: center;
`;

const CardInfo = styled.View`
  border-top-width: 1px;
  border-color: #eee;
  height: 50px;
  width: 100%;
  justify-content: center;
  padding: 5px;
`;

const GridView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
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
  width: 40px;
  height: 40px;
  background-color: #425460;
  justify-content: center;
  align-items: center;
`;
const KEYS_TO_FILTERS = ["styleNo", "styleName", "supplier", "season"];
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.changeView = this.changeView.bind(this);
    this.state = {
      currentView: "grid",
      searchTerm: "",
      tablet: false
    };
    // this.myTextInput = React.createRef();
  }

  searchUpdated(term) {
    this.setState({
      searchTerm: term,
      renderSearch: "linear"
    });
  }
  changeView = () => {
    if (this.state.currentView === "linear") {
      this.setState({
        currentView: "grid"
      });
    } else {
      this.setState({
        currentView: "linear"
      });
    }
  };
 
  render() {
    const filteredStyle = details.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );
    if (this.state.currentView == "linear" || "grid") {
      // console.log("render successful");
    }
    // console.log('current state', this.state.currentView);
    const history = this.props.history;
    // console.log("search history:", history);
    // console.log("history on search page", this.props.history);
    return (
      <MainView>
        <Header history={this.props.history}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <SearchRow>
              <SearchIcon>
                <Icon style={{color:"#fff"}} name="ios-search"/>
              </SearchIcon>
              <Flex>
                <MainSearchInput
                  onChangeText={term => {
                    this.searchUpdated(term);
                  }}
                  placeholder="SEARCH"
                  placeholderTextColor="#C9DBDB"
                  clearIcon={
                    this.state.searchTerm !== "" && (
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
              <TouchableHighlight onPress={this.changeView} underlayColor="#42546033">
                <ViewBox>
                  <Image
                    resizeMode={"contain"}
                    source={
                      this.state.currentView == "linear"
                        ? require("../../assets/img/squares.png")
                        : require("../../assets/img/lines.png")
                    }
                  />
                </ViewBox>
              </TouchableHighlight>
            </SearchRow>
            {this.state.currentView === "linear" &&
              filteredStyle.map(data => {
                return (
                  <TouchableHighlight
                    underlayColor="#42546033"
                    onPress={() => {
                      history.push("/style");
                    }}
                    key={data.styleNo}
                  >
                    <ItemDetail data={data} />
                  </TouchableHighlight>
                );
              })}
            {this.state.currentView === "grid" && (
              <GridView>
                {filteredStyle.map(data => {
                  return <SearchGridCard key={data.styleNo} data={data} history={history} />;
                })}
              </GridView>
            )}
          </ScrollView>
          <SearchFilter />
        </Header>
      </MainView>
    );
  }
}

export default Search;
