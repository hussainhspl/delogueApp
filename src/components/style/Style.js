import React, { Fragment } from "react";
import { View, Text, Image, ScrollView } from "react-native";
// import styled from "styled-components/native";
import { createStore } from "redux";
import AsyncStorage from '@react-native-community/async-storage';
// relative import
import General from "./General";
import Comments from "./Comments";
import Files from "./Files";
import Sample from "./sample/sample";
import Pdf from "./pdf/Pdf";
import Header from "../../Header";
import FooterComponent from "../../FooterComponent";
import Loader from '../../shared/Loader';
import { connect } from "react-redux";
import InfoView from "../../styles/InfoView";
import InfoText from "../../styles/InfoText";

class Style extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styleData: null,
      loading: true,
    };
  }
  renderSelectedTab(params, StateData, locationData) {

    // console.log("params :", params, StateData)
    // console.log("switch data", data.id, {commentData});
    // console.log('style data', this.state.styleData)
    // let sdata = this.state.styleData;
    // let imgSrc = sdata.styleLogoThumbnails.some( s => {
    //   if(s[0].url != null){
    //     return s[0].url
    //   }
    //   return false
    // })
    // console.log("thumbnail :", sdata.data.styleLogoThumbnails[0])
    // let imgSrc = sdata.data.styleLogoThumbnails[0]
    // let floatingStyleObject = {
    //   logo : sdata.data.styleLogoThumbnails[0],
    //   userDefinedId : sdata.data.userDefinedId,
    //   styleName: sdata.data.name,
    //   supplier: sdata.data.supplier != null ? sdata.data.supplier.name :  "-",
    //   season: sdata.data.season != null ? sdata.data.season.name :  "-",
    // }
    // console.log('object created : ', floatingStyle);
    console.log('location props in style', locationData);
    console.log('this.props.StoreStyleId', this.props.StoreStyleId);
    switch (params) {
      case "general":
        return <General
          history={this.props.history}
          // styleData={StateData}
          styleID = {locationData.sid}
        />;
      case "comments":
        return <Comments
          history={this.props.history}
          dataMsg={locationData.data}
          openMessage={locationData.openMessage}
          styleData={StateData != null ? StateData.data : null}
          // styleID={StateData != null ? StateData.data.id : null}
          styleID = {this.props.StoreStyleId != null ? this.props.StoreStyleId: null}
        />;
      case "files":
        return <Files
          // styleID= {data.id}
          styleData={StateData != null ? StateData.data : null}
          styleID = {this.props.StoreStyleId != null ? this.props.StoreStyleId: null}
        />;
      case "sample":
        return <Sample
          history={this.props.history}
          dataFromMsg={locationData}
          styleData={StateData != null ? StateData.data : null}
          // data={locationData.SampleCommentData}
          // styleData={StateData != null ? StateData.data : null}
        />;
      case "pdf":
        return <Pdf
          styleID = {this.props.StoreStyleId != null ? this.props.StoreStyleId: null}
        />;
      default:
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.styleData !== prevState.styleData) {
      // console.log('entered style nextProps');
      return {
        styleData: nextProps.style,
      }
    }
  }

  componentDidMount = () => {
    // console.log('did mount in style');
    // this.getStyles();
    let history = this.props.history;
    if (this.state.styleData == null &&
      this.props.location.data == 'redirect') {
      // console.log('did mount style data null');
      setTimeout(() => {
        history.push("/search")
      }, 1000);
    }
    // if(this.props.currentTab == 'general'){
    //   if(this.state.styleData == null) {
    //     setTimeout(() => {
    //       history.push("/search")
    //     }, 3000);
    //   }
    // }
  }

  render() {
    console.log("style data", this.props);
    // step 2 create reducer: it needs state and action
    //payload = newState/ command
    // console.log("store state: ",this.props.currentTab)
    // const reducer = (state, action) => {
    //   if (action.type === "ATTACK") {
    //     return action.payload;
    //   }
    //   return state;
    // };
    //step 1 create store: it requires reducer and state
    // const store = createStore(reducer, "Peace");

    //step 3 Subscribe
    // store.subscribe(() => {
    // console.log('store is now', store.getState())
    // });

    //step 4 Dispatch action
    // store.dispatch({ type: "ATTACK", payload: "Iron Man" });
    // console.log("store state:", this.props.currentTab);
    // console.log('style array:', this.state.styleData);
    // console.log('single style from store', this.props.style);
    // console.log('props data style', this.props.location, this.state.styleData);

    return (
      <Fragment>
        <Header history={this.props.history}>
          {
            this.state.styleData != null
              ||
              this.props.location.data != "redirect"
              ?
              <Fragment>
                {
                  this.renderSelectedTab(
                    this.props.currentTab,
                    this.state.styleData,
                    this.props.location
                    // this.props.location.data,
                    // this.props.location.openMessage,
                    // this.props.location.SampleCommentData
                  )
                }
                <FooterComponent />
              </Fragment>
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
        </Header>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.tab.now,
    StoreStyleId: state.styleId.styleIdState
  };
};

export default connect(mapStateToProps)(Style);
