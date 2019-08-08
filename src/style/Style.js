import React, {Fragment} from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import General from './General';
import {createStore} from 'redux'
import Comments from './Comments';

class Style extends React.Component {
  
  // renderSelectedTab () {
  //   switch (path) {
  //     case 'welcome':
  //       return (<Welcome />);
  //       break;
  //     case 'profile':
  //       return (<Profile />);
  //       break;
  //     case 'login':
  //       return (<Login />);
  //       break;
  //     default:
  //   }
  // }
  render() {
    
    // step 2 create reducer: it needs state and action
    //payload = newState/ command
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
        {/* <General /> */}
        <Comments />
      </Fragment>
    )
  }
}

export default Style;