import React, { Fragment } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import styled from "styled-components/native";
import General from "./General";
import { createStore } from "redux";
import Comments from "./Comments";
import Files from "./Files";
import Sample from "./sample";
import Pdf from "./Pdf";
import Header from "../Header";

import { connect } from "react-redux";
// import { FooterTab } from 'native-base';
import FooterComponent from "../FooterComponent";

class Style extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderSelectedTab(params) {
    // console.log()
    switch (params) {
      case "general":
        return <General history={this.props.history} />;
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
  render() {
    const history = this.props.history;
    // console.log("History on style page:", history)
    // step 2 create reducer: it needs state and action
    //payload = newState/ command
    // console.log("store state: ",this.props.currentTab)
    const reducer = (state, action) => {
      if (action.type === "ATTACK") {
        return action.payload;
      }
      return state;
    };
    //step 1 create store: it requires reducer and state
    const store = createStore(reducer, "Peace");

    //step 3 Subscribe
    store.subscribe(() => {
      // console.log('store is now', store.getState())
    });

    //step 4 Dispatch action
    store.dispatch({ type: "ATTACK", payload: "Iron Man" });
    console.log("store state:", this.props.currentTab);
    return (
      <Fragment>
        <Header history={this.props.history}>
          {this.renderSelectedTab(this.props.currentTab)}
        </Header>
        <FooterComponent 
          // currentTab={this.props.currentTab} 
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.tab.now
  };
};

export default connect(mapStateToProps)(Style);
