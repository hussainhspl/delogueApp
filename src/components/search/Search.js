import React, { Fragment } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  FlatList,
  ScrollView,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import { Icon } from "native-base";
// import SearchInput, { createFilter } from "react-native-search-filter";
import styled from "styled-components";
import Header from "../../Header";
import ItemDetail from "../../shared/ItemDetail";
import SearchFilter from "./searchFilter";
import SearchGridCard from "./searchGridCard";
import LoadMoreButton from "../../styles/LoadMoreButton";
import InfoView from "../../styles/InfoView";
import InfoText from "../../styles/InfoText";

import { connect } from "react-redux";
import SearchInput from '../../styles/SearchInput';
import GetStyles from '../../api/getStyles';
import AsyncStorage from "@react-native-community/async-storage";
import { styleList, generalTab, styleId } from '../../store/actions/index';
import GetSelectedStyle from '../../api/getStyle';
import GetAsyncToken from '../../script/getAsyncToken';
import SearchSuggestionView from '../../styles/SearchSuggestionView';
import SuggestionTerm from '../../styles/SuggestionTerm';
import SearchIconBox from "../../styles/SearchIconBox";

const SearchRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-color: #ddd;
  padding: 10px;
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

const GridView = styled.View`
  flex-direction: row;
  padding-left: 5px;
  flex-wrap: wrap;
`;

const MainView = styled.KeyboardAvoidingView
`
  flex: 1;
  position: relative;
  
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
      emptyResult: false,
      showSuggestion: false,
      suggestionArr: [],
      myStyle: false,
    };
  }
  componentDidMount = () => {
    // console.log('enter in style component did mount');
  }
  searchUpdated(term) {
    this.setState({
      searchTerm: term,
      renderSearch: "linear",
      showSuggestion: true
    }, this.getSuggestion());
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
    ;
    GetAsyncToken().then(token => {
      GetStyles(this.state.searchTerm, token, this.state.brandIds,
        this.state.seasonIds, this.state.myStyle)
        .then(res => {
          // console.log('response style', res);
          if (res.data.styles.length == 0) {
            this.setState({ emptyResult: true })
          }
          this.props.styleListFunction(res.data)
          this.setState({
            suggestionArr: [],
            showSuggestion: false
          })
        })
    })
  }
  getSuggestion = () => {
    GetAsyncToken().then(token => {
      GetStyles(this.state.searchTerm, token, this.state.brandIds,
        this.state.seasonIds)
        .then(res => {
          // console.log('suggest style', res.data.styles);
          this.setState({
            suggestionArr: res.data.styles
          })
        })
    })
  }

  redirectToCurrentStyle(id) {
    // console.log('style clicked', id);
    this.props.generalTabFunction()
    this.props.styleIdFunction(id)
    this.props.history.push({
      pathname: '/style',
      sid: id
    })
    // GetAsyncToken()
    //   .then(token => {
    //     GetSelectedStyle(token, id)
    //       .then(res => {
    //         this.props.styleFunction(res)
    //         console.log('got single style : ', res)
    //         this.props.generalTabFunction()
    //         this.props.history.push('/style')
    //       })
    //   })

  }

  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.filteredStyle !== prevState.filteredStyle) {
      // console.log("Entered nextProps");
      return {
        filteredStyle: nextProps.styleList,
      }
    }
    return null;
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.brandIds != nextState.brandIds) {
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
    // console.log('style data from store', this.state.filteredStyle);
    // console.log("search history:", history);
    // console.log("history on search page", this.props.history);
    return (
    
      <MainView enabled={Platform.OS === 'ios' ? true: false} behavior="padding">
        
        <Header history={this.props.history}>
          
          {/* <View style={{flex: 1}}> */}

          
            <SearchRow>
              <SearchIconBox>
                <Icon style={{ color: "#fff", fontSize: 25 }} name="ios-search" />
              </SearchIconBox>
              <Flex>
                <SearchInput
                  placeholder="SEARCH BY NAME OR NUMBER"
                  placeholderTextColor="#C9DBDB"
                  autoFocus
                  clearButtonMode='always'
                  // ref={input => { this.textInput = input }}
                  onChangeText={term => {
                    this.searchUpdated(term);
                  }}
                  onSubmitEditing={this.styles}
                />
                {
                this.state.showSuggestion && (
                  <SearchSuggestionView>
                    {this.state.suggestionArr.map(d => {
                      return (
                        <TouchableHighlight underlayColor={"#eee"} onPress={() => this.redirectToCurrentStyle(d.id)}>


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

              {
                this.state.filteredStyle != null ?
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
                  : null
              }
              
            </SearchRow>
            
            {this.state.showSuggestion == false ?
              this.state.currentView === "grid" && (
                
                <GridView>
                  {
                    this.state.filteredStyle != null ?
                      this.state.filteredStyle.styles.map(data => {
                        return (<ScrollView showsVerticalScrollIndicator={false}>
                          <SearchGridCard
                          key={data.styleNo}
                          data={data}
                          history={history}
                          GetStyleClicked={() => { this.redirectToCurrentStyle(data.id) }}
                        /></ScrollView>);
                      })
                      :
                      
                        <InfoView>
                          <Image
                            style={{ width: 64 }}
                            resizeMode={"contain"}
                            source={require("../../../assets/img/search-big.png")}
                          />
                          <InfoText>Search for a style by typing name or number</InfoText>
                        </InfoView>
                        
                  }
                  {this.state.emptyResult && (
                    <InfoView>
                      <InfoText> No result found </InfoText>
                    </InfoView>
                  )}
                </GridView>
            ) : null}
            
          
          {this.state.showSuggestion == false ?
            this.state.currentView === "linear" && (
            <FlatList
              data={this.state.filteredStyle.styles}
              renderItem={({ item }) =>
                <TouchableHighlight
                  underlayColor="#42546033"
                  onPress={() => { this.redirectToCurrentStyle(item.id) }
                  }
                >
                  <ItemDetail data={item} />
                </TouchableHighlight>}
              keyExtractor={item => item.id}
            />
          ):null}
          

          <SearchFilter
            BrandIdArr={(bid) => {
              // console.log("yipee", bid);
              this.setState({
                brandIds: bid
              }, () => this.styles)

            }}
            SeasonIdArr={(sid) => {
              this.setState({
                seasonIds: sid
              })
            }}
            myStyleStatus={(my)=> {
              this.setState({ myStyle: my})
            }}
            popBrand={
              (pid) => { this.removeBrand(pid) }
            }
          />
         
        </Header>
        
      </MainView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    styleListFunction: (s) => dispatch(styleList(s)),
    generalTabFunction: () => dispatch(generalTab()),
    styleIdFunction: (sid) => dispatch(styleId(sid)),
  }
}
const mapStateToProps = state => {
  return {
    styleList: state.styleList.styleListState
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
