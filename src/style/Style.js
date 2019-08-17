import React, {Fragment} from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import General from './General';
import {createStore} from 'redux'
import Comments from './Comments';
import Files from './Files';
import Sample from './sample';
import Pdf from './Pdf';

import { connect } from "react-redux";
// import { FooterTab } from 'native-base';
import FooterComponent from '../FooterComponent';

class Style extends React.Component {
  
  renderSelectedTab (params) {
    switch (params) {
      case 'general':
        return (<General />);
      case 'comments':
        return (<Comments />);
      case 'files':
        return (<Files />);
      case 'sample':
        return (<Sample />);
      case 'pdf':
        return (<Pdf />);
      default:
    }
    // console.log("printing from render: ", params);
  }
  render() {
    
    // step 2 create reducer: it needs state and action
    //payload = newState/ command
    console.log("store state: ",this.props.currentTab)
    const reducer = (state, action) => {
      if(action.type === "ATTACK"){
        return action.payload
      }
      return state;
    } 
    //step 1 create store: it requires reducer and state
    const store = createStore(reducer, "Peace");
    
    

    //step 3 Subscribe 
    store.subscribe( () => {
      console.log('store is now', store.getState())
    })

    //step 4 Dispatch action
    store.dispatch({type: "ATTACK", payload: "Iron Man"})
    return(
      <Fragment>
        { this.renderSelectedTab(this.props.currentTab)}
       <FooterComponent/>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.tab.now
  };
};

export default connect(mapStateToProps) (Style);