/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

// import {

//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
import { NativeRouter, Switch, Route } from 'react-router-native';

import Login from './src/login';
import CompanyList from './src/companyList';
import Header from './src/Header';
import Search from './src/search/Search';
// import MainTemplate from './src/mainTemplate';
import Template from './src/Template';
import Footer from './src/FooterComponent';
import Message from './src/message/message';


import Style from './src/style/Style';
import SampleRequest from './src/style/SampleRequest';
import Sample from './src/style/sample'
import Pdf from './src/style/Pdf'

import configStore from './src/store/config_store';
import { Provider } from 'react-redux';
import Files from './src/style/Files';


const store = configStore();

const App = () => {
  componentDidMount = () => {
    // const history = this.props.history
    console.log("app", this.props.location.pathname);
  }
  // const path = this.props.location.pathname;
  // console.log('app:', path);
  return (
    <Provider store={ store }>
    <NativeRouter>
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
        <View style={{flex: 1}}>
            <Switch>
              {/* <Route exact path="/" component={Sample}></Route> */}
              <Route exact path="/" component={Template}></Route>
              <Route exact path="/search" component={Search}></Route>
              <Route exact path="/message" component={Message}></Route>
              <Route exact path="/style" component={Style}></Route>
              <Route exact path="/sampleRequest" component={SampleRequest}></Route> 
              <Route exact path="/companyList" component={CompanyList}></Route>
              
            </Switch>
        </View>
      <SafeAreaView/>
    </Fragment>
    </NativeRouter>
    </Provider>
  );
};

const styles = StyleSheet.create({
  // scrollView: {
  //   backgroundColor: Colors.lighter,
  // },
  // engine: {
  //   position: 'absolute',
  //   right: 0,
  // },
  // body: {
  //   backgroundColor: Colors.white,
  // },
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  //   color: Colors.black,
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  //   color: Colors.dark,
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
  // footer: {
  //   color: Colors.dark,
  //   fontSize: 12,
  //   fontWeight: '600',
  //   padding: 4,
  //   paddingRight: 12,
  //   textAlign: 'right',
  // },
});

export default App;
