import React, { Fragment } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  FlatList,
  ScrollView
} from "react-native";
import { Icon } from "native-base";
// import SearchInput, { createFilter } from "react-native-search-filter";
import styled from "styled-components";
import Header from "../../Header";
import ItemDetail from "../../shared/ItemDetail";
import SearchFilter from "./searchFilter";
import SearchGridCard from "./searchGridCard";
import LoadMoreButton from "../../styles/LoadMoreButton";
import { connect } from "react-redux";
import SearchInput from '../../styles/SearchInput';
import GetStyles from '../../api/getStyles';
import AsyncStorage from "@react-native-community/async-storage";
import {styleList } from '../../store/actions/index';
import GetSelectedStyle from '../../api/getStyle'; 

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
  padding-left: 5px;
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
  padding: 10px;
`;
const Box = styled.View`
  margin-left: 10px;
`;
const KEYS_TO_FILTERS = ["styleNo", "styleName", "supplier", "season"];
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.changeView = this.changeView.bind(this);
    this.state = {
      currentView: "grid",
      searchTerm: "",
      tablet: false,
      filteredStyle: null,
      brandArrFilter: null,
      brandIds: null,
      SeasonIdArr: null,
      popBrandId: '',

    };
  }
  componentDidMount = () => {
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
  
  styles = () => {
    console.log("calling api again");
    this.getAsyncToken().then(token => {
      console.log('get style api')
      GetStyles(this.state.searchTerm, token, this.state.brandIds,
        this.state.seasonIds)
        .then(res => {
          console.log('response');
          this.props.styleListFunction(res)
        })
    })
  }
  getCurrentStyle (id) {
    console.log('style clicked', id)
    this.getAsyncToken()
      .then(token => {
        GetSelectedStyle(token, id)
          .then( res => {
            this.props.styleFunction(res)
            // console.log('got single style : ', res)
            this.props.history.push('/style')
          })
      })

  }
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
  static getDerivedStateFromProps(nextProps, prevState) {
    
    if (nextProps.filteredStyle !== prevState.filteredStyle) {
      console.log("Entered nextProps");
      return{
        filteredStyle: nextProps.styleList,
      }
    }
    return null;
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.brandIds != nextState.brandIds) {
      this.styles()
      return false;
    }
    else {
      return true;
    }
  }
  removeBrand = (pid) => {
    console.log('remove brand', pid);
    
  }
  
  render() {
    const history = this.props.history;
    console.log('style data from store', this.state.filteredStyle);
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
                <SearchInput
                  placeholder="SEARCH"
                  placeholderTextColor="#C9DBDB"
                  onChangeText={term => {
                    this.searchUpdated(term);
                  }}
                  onSubmitEditing={this.styles}
                />
              </Flex>
              <Box>
                <TouchableHighlight onPress={this.changeView} underlayColor="#42546033">
                  <ViewBox>
                    <Image
                      resizeMode={"contain"}
                      source={
                        this.state.currentView == "linear"
                          ? require("../../../assets/img/squares.png")
                          : require("../../../assets/img/lines.png")
                      }
                    />
                  </ViewBox>
                </TouchableHighlight>
              </Box>
            </SearchRow>
            
            {this.state.currentView === "grid" && (
              <Fragment>
              <GridView>
                {this.state.filteredStyle != null ?
                  this.state.filteredStyle.data.styles.map(data => {
                    return (<SearchGridCard 
                      key={data.styleNo} 
                      data={data} 
                      history={history} 
                      GetStyleClicked = {(id) => {this.getCurrentStyle(id)}}
                    />);
                  }) 
                  // <Text>entering</Text>
                  :
                  <Text style={{color: "#fff", padding: 20}}> loader</Text>
                }
              </GridView>
              <LoadMoreButton>
                <Text> Load More </Text>
              </LoadMoreButton>
              </Fragment>
            )}
          </ScrollView>
          {this.state.currentView === "linear" &&(
              
              <FlatList
                data={this.state.filteredStyle.data.styles}
                renderItem={({ item }) => 
                  <TouchableHighlight
                    underlayColor="#42546033"
                    onPress={() => {
                      history.push("/style");
                    }}
                  >
                    <ItemDetail data={item} />
                  </TouchableHighlight>}
                keyExtractor={item => item.id}
              />
            )}
          <SearchFilter 
            BrandIdArr= {(bid) => {
              console.log("yipee", bid);
              this.setState({
                brandIds : bid
              }, () => this.styles)
              
            }}
            SeasonIdArr= {(sid) => {
              this.setState({
                seasonIds: sid
              })
            }}
            popBrand={
              (pid) => {
                console.log("pop called", pid);
                this.removeBrand(pid)
              }
            }
          />
        </Header>
      </MainView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    styleListFunction :(s) => dispatch(styleList(s)),
    styleFunction : (s) => dispatch(singleStyle(s))

  }
}
const mapStateToProps = state => {
  return {
    styleList: state.styleList.styleListState
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
