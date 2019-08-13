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


import Style from './src/style/Style';
import SamlpeRequest from './src/style/SampleRequest';

import configStore from './src/store/config_store';
import { Provider } from 'react-redux';

const store = configStore();

const App = () => {
  componentDidMount = () => {
    // const history = this.props.history
    console.log("app", this.props.location.pathname);
  }
  return (
    <Provider store={ store }>
    <NativeRouter>
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
        <View style={{flex: 1}}>
            <Switch>
              {/* <Route exact path="/" component={Template}></Route> */}
              <Header>
                <Route exact path="/" component={SamlpeRequest}></Route>
          
              </Header>
              <Template  />              
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
