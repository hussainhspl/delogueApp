import React, { Fragment } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView
} from "react-native";
import { Icon } from "native-base";
import SearchInput, { createFilter } from "react-native-search-filter";
import GridList from 'react-native-grid-list';
import { FlatGrid } from 'react-native-super-grid';

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
  background-color: #efefef;
  border-bottom-width: 1px;
  border-color: #ddd;
`;
const Flex = styled.View`
  flex: 1;
`;

const MainSearchInput = styled(SearchInput)`
  padding: 11px;
  border-color: #ccc;
  border-width: 1px;
  height: 50px;
  margin: 15px;
  margin-right: 10px;
`;

const ViewBox = styled.View`
  height: 50px;
  width: 50px;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 4px;
  margin: 15px;
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
  font-size: 28px;
  color: #777;
  padding: 0px 10px;
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
              <Flex>
                <MainSearchInput
                  onChangeText={term => {
                    this.searchUpdated(term);
                  }}
                  placeholder="Type a message to search"
                  clearIcon={
                    this.state.searchTerm !== "" && (
                      <ClearIcon name="ios-close" />
                    )
                  }
                  clearIconViewStyles={{
                    position: "absolute",
                    top: 1,
                    right: 2,
                    padding: 25
                  }}
                />
              </Flex>
              <TouchableOpacity onPress={this.changeView}>
                <ViewBox>
                  <Image
                    resizeMode={"contain"}
                    source={
                      this.state.currentView === "linear"
                        ? require("../../assets/img/squares.png")
                        : require("../../assets/img/lines.png")
                    }
                  />
                </ViewBox>
              </TouchableOpacity>
            </SearchRow>
            {this.state.currentView === "linear" &&
              filteredStyle.map(data => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      history.push("/style");
                    }}
                    key={data.styleNo}
                  >
                    <ItemDetail data={data} />
                  </TouchableOpacity>
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
