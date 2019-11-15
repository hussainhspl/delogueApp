/**
 * Delogue App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  NetInfo
} from "react-native";

import RNBootSplash from "react-native-bootsplash";
import Template from "./src/Template";
import configStore from "./src/store/config_store";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components/native";
import Theme from "./data/theme";
import styled from "styled-components";

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
      <ThemeProvider theme={Theme}>
        <Fragment>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView />
          <MainView>
            <Template />
          </MainView>
          <SafeAreaView />
        </Fragment>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
