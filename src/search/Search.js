import React, { Fragment } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  BackHandler
} from "react-native";
import {Icon, Button} from 'native-base';
import SearchInput, { createFilter } from "react-native-search-filter";
// import Icon from "react-native-vector-icons/Ionicons";
import SearchFilter from "./searchFilter";
import Header from "../Header";
import styled from "styled-components";
import ItemDetail from "../shared/ItemDetail";

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
    styleNo: "sty2217",
    styleName: "t shirt",
    supplier: "Super textiles",
    season: "summer"
  },
  {
    styleNo: "sty2217",
    styleName: "t shirt",
    supplier: "Super textiles",
    season: "summer"
  },
  {
    styleNo: "sty2217",
    styleName: "t shirt",
    supplier: "Super textiles",
    season: "summer"
  },
  {
    styleNo: "sty2217",
    styleName: "t shirt",
    supplier: "Super textiles",
    season: "summer"
  },
  {
    styleNo: "sty2217",
    styleName: "t shirt",
    supplier: "Super textiles",
    season: "summer"
  }
];

const GirdCard = styled.View`
  width: ${Dimensions.get("window").width / 3};
  height: ${Dimensions.get("window").height / 3 - 50};
  border: 1px solid #ddd;
  align-self: flex-start;
`;

const GirdImageView = styled.View`
  width: ${Dimensions.get("window").width / 3};
  height: ${Dimensions.get("window").height / 3 - 100};
  /* margin: auto; */
  justify-content: center;
  align-items: center;
`;

const GridImage = styled.Image`
  width: ${Dimensions.get("window").width / 3 - 54};
  height: ${Dimensions.get("window").height / 3- 120};
`;

const SearchRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const Flex = styled.View`
  flex: 1;
`;
const CardText = styled.Text`
  font-family: ${props => props.theme.regular};
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

const ItemText = styled.Text`
  color: ${props => props.theme.TextColor};
`;

const Item = styled.TouchableOpacity`
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin: 0;
  border-width: 1;
  border-color: #ccc;
  height: ${Dimensions.get("window").width / numColumns + 50};
`;

const ImageView = styled.View`
  height: ${Dimensions.get("window").width / numColumns};
  align-items: center;
  justify-content: center;
  padding: 0px 5px;
  width: 100%;
`;

const GridView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
const StyledImage = styled.Image`
  max-height: ${Dimensions.get("window").width / numColumns - 30};
  max-width: 150px;
`;
// flatlist start
const formatData = (details, numColumns) => {
  const numberOfFullRows = Math.floor(details.length / numColumns);

  let numberOfElementsLastRow = details.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    details.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  return details;
};
const numColumns = 3;
// flat list end
const KEYS_TO_FILTERS = ["styleNo", "styleName", "supplier", "season"];
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.changeView = this.changeView.bind(this);
    this.state = {
      currentView: "grid",
      searchTerm: '',
      tablet: false,

    };
    // this.myTextInput = React.createRef();
  }
  componentWillMount() {
    if (Dimensions.get('window').width > 568) {
      this.setState({ tablet: true }, () => console.log("will mount", this.state.tablet))
    }
  }
  searchUpdated(term) {
    this.setState({
      searchTerm: term,
      renderSearch: 'linear'
    });
  }
  changeView = () => {
    if (this.state.currentView === "linear") {
      let self = this;
      this.setState({
        currentView: "grid",
        searchTerm: ""
      });
      this.searchUpdated("");
    } else {
      this.setState({
        currentView: "linear",
        searchTerm: ""
      });
      this.searchUpdated("");
      let term = this.state.searchTerm;
    }
  };

  renderGridView = ({ item, index }) => {
    if (item.empty === true) {
      return <View />;
    }
    const history = this.props.history;
    return (
      <Item
        onPress={() => {
          history.push("/style");
        }}
        key={item.key}
      >
        <ImageView>
          <StyledImage
            resizeMode={"center"}
            source={require("../../assets/img/shirt-static.png")}
          />
        </ImageView>
        <CardInfo>
          <ItemText> {item.styleName} </ItemText>
          <ItemText> {item.styleNo} </ItemText>
        </CardInfo>
      </Item>
    );
  };
  render() {
    const filteredStyle = details.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );
    if(this.state.currentView == 'linear' || 'grid'){
      console.log("render successful");
    }

    // console.log('current state', this.state.currentView);
    const history = this.props.history;
    // console.log("search history:", history);
    // console.log("history on search page", this.props.history);
    return (
      <View style={{ flex: 1 }}>
        <Header history={this.props.history}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <SearchRow>
              <Flex>
                <MainSearchInput
                  onChangeText={term => {
                    this.searchUpdated(term);
                  }}
                  placeholder="Type a message to search linear"
                  clearIcon={this.state.searchTerm!==''&&<Icon style={{fontSize: 28,color: '#777', paddingHorizontal: 10}} name="ios-close" />}
                  clearIconViewStyles={{position:'absolute',top: 1,right: 2, padding: 25}}
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
                  return (
                    <GirdCard key={data.styleNo}>
                      <TouchableOpacity
                        onPress={() => {
                          history.push("/style");
                        }}
                        key={data.key}
                      >
                        <GirdImageView>
                          <GridImage
                            resizeMode={"center"}
                            source={require("../../assets/img/shirt-static.png")}
                          />
                        </GirdImageView>
                        <CardInfo>
                          <CardText numberOfLines={1}> {data.styleName}</CardText>
                          <CardText numberOfLines={1}> {data.styleNo}</CardText>
                        </CardInfo>
                      </TouchableOpacity>
                    </GirdCard>
                  );
                })}
              </GridView>
            )}
          </ScrollView>
          <SearchFilter />
        </Header>
      </View>
    );
  }
}

export default Search;
