import React, { Fragment } from "react";
import { View, Text, Image, ScrollView } from "react-native";
// import styled from "styled-components/native";
import { createStore } from "redux";
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import qs from "qs";


import General from "./General";
import Comments from "./Comments";
import Files from "./Files";
import Sample from "./sample";
import Pdf from "./Pdf";
import Header from "../Header";
import { connect } from "react-redux";
import FooterComponent from "../FooterComponent";
import {token} from "../store/actions/index";
import Loader from '../shared/Loader';

class Style extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styleData: []
    };
  }
  renderSelectedTab(params) {
    // console.log()
    switch (params) {
      case "general":
        return <General 
          history={this.props.history}
          styleData = {this.state.styleData}
        />;
      case "comments":
        return <Comments />;
      case "files":
        return <Files />;
      case "sample":
        return <Sample history={this.props.history} />;
      case "pdf":
        return <Pdf/>;
      default:
    }
    // console.log("printing from render: ", params);
  }
  componentDidMount = () => {
    console.log('did mount in style');
    this.getStyles();
  }

  getStyles() {
    // get style

    const AuthStr = `Bearer ${token}`;
    console.log("bearer token ", AuthStr)
 
    axios({
      url: "https://rc.delogue.com/export/style/16197",
      method: "GET",
      contentType: "application/json; charset=utf-8",
      headers: { 
        Authorization: `Bearer ${this.props.tokenData}`,
        responseType: 'json'
      }
    })
      .then(res => {
        console.log("response in style", res);
        this.setState({
          styleData : res.data,
        })
      })
      .catch(function(error) {
        console.error("error in style", error);
        // ADD THIS THROW error
        // throw error;
      });
  }

  render() {
    console.log("style data",this.state.styleData);
    // const history = this.props.history;
    // console.log("History on style page:", history)
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
    return (
      <Fragment>
        <Header history={this.props.history}>
          {
            this.state.styleData.length < 1 ?
            <View style={{flex: 1}}>
              <Loader />
            </View>
            :
            this.renderSelectedTab(this.props.currentTab)
          }
          <FooterComponent />
        </Header>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.tab.now,
    tokenData: state.async.tokenState
  };
};

export default connect(mapStateToProps)(Style);
