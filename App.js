
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  NetInfo
} from 'react-native';

// import {

//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
import { NativeRouter, Switch, Route } from 'react-router-native';
import RNBootSplash from "react-native-bootsplash";
// import NetInfo from "@react-native-community/netinfo";

import Login from './src/login';
import CompanyList from './src/companyList';
import Header from './src/Header';
import Search from './src/search/Search';
// import MainTemplate from './src/mainTemplate';
import Template from './src/Template';
import Footer from './src/FooterComponent';
import Message from './src/message/message';
import NotificationModal from './src/style/NotificationModal';
// import NewSampleRequest from './src/style/NewSampleRequest'


import Style from './src/style/Style';
import SampleRequest from './src/style/SampleRequest';
import Sample from './src/style/sample'
import Pdf from './src/style/Pdf'

import configStore from './src/store/config_store';
import { Provider } from 'react-redux';
import Files from './src/style/Files';
import SampleComponent from './src/style/sampleComponent';

import { ThemeProvider } from 'styled-components/native';
import Theme from './data/theme';
import OfflineNotice from './src/shared/OfflineNotice';
import styled from 'styled-components';


const store = configStore();

const MainView = styled.View`
  flex: 1;
`;
const App = () => {
  let init = async () => {
    // …do multiple async tasks
  };
  useEffect(() => {
    init().finally(() => {
      // without fadeout: RNBootSplash.hide()
      RNBootSplash.hide({ duration: 250 });
    });
  }, []);

  return (
    <Provider store={store}>
      {/* <NativeRouter> */}
        <ThemeProvider theme={Theme}>
          <Fragment>
            <StatusBar barStyle="dark-content" />
              {/* <OfflineNotice /> */}
            <SafeAreaView />
            <MainView>
              <Template />
              {/* <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route exact path="/search" component={Search}></Route>
                <Route exact path="/message" component={Message}></Route>
                <Route exact path="/style" component={Style}></Route>
                <Route exact path="/sampleRequest" component={SampleRequest}></Route>
                <Route exact path="/companyList" component={CompanyList}></Route>
                <Route exact path="/notificationModal" component={NotificationModal}></Route>

              </Switch> */}
            </MainView>
            <SafeAreaView />
          </Fragment>
        </ThemeProvider>
      {/* </NativeRouter> */}
    </Provider>
  );
};

export default App;
