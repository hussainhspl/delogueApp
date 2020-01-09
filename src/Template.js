import React, { Fragment } from "react";
import { View, Text } from "react-native";
import { NativeRouter, Switch, Route } from "react-router-native";
import { connect } from "react-redux";
import {token} from "./store/actions/index";
import AsyncStorage from "@react-native-community/async-storage";
import isAfter from "date-fns/isAfter";
// relative import
import CompanyList from "./companyList";
import Search from "./components/search/Search";
import Message from "./components/message/message";
import Login from "./login";
import Style from "./components/style/Style";
import SampleRequest from "./components/style/SampleRequest";
import NotificationModal from "./components/style/NotificationModal";
import Loader from './shared/Loader';

import { withRouter } from "react-router";

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      token: '',
    }
    this.checkToken = this.checkToken.bind(this);
  }
  componentDidMount = () => {
    // this.clearAsyncStorage();
    this.checkToken();
  }
  checkToken() {
    let currentDate = new Date().toUTCString();
    // console.log("india date", currentDate);
    console.log('enter in check token');
    this.getToken()
      .then(token => {
        // console.log("hello",token);
        if (token) {
          // console.log("Token already exist");
          this.getTokenExpiry()
            .then(tokenExpiryTime => {
              // let tempDate = new Date(currentDate);
              // tempDate.setSeconds(tempDate.getSeconds() + 36000);
              // console.log(
              //   "expiry time :",
              //   new Date(currentDate),
              //   new Date(tokenExpiryTime)
              // );
              var result = isAfter(
                new Date(currentDate),
                new Date(tokenExpiryTime)
              );
              // console.log("result", result);
              if (result) {
                console.log("Invalid token (expired)");
                this.setState({
                  token: false,
                  loading: false
                })
                // this.checkCredential();
              } else {
                // console.log("Token is valid");
                // Alert.alert('ready to move to next page');
                this.setState({
                  token: true,
                  loading: false
                })
                // this.props.history.push("/companyList")
              }
            })
            .catch(function(error) {
              console.error(error);
            });
        } else {
          console.log("no token found");
          this.setState({
            token: false,
            loading: false
          })
          // Alert.alert('no prev token');
          // this.checkCredential();
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  getToken = async () => {
    console.log('enter in get token');
    try {
      const token = await AsyncStorage.getItem("@token");
      if (token !== null) {
        // console.log('token is ======', token);
        this.props.tokenFunction(token);
        return token;
      }
    } catch (error) {
      if (error.response) {
        console.log("Error while checking token", error);
      }
    }
  };

  getTokenExpiry = async () => {
    try {
      const strTokenExpiry = await AsyncStorage.getItem("@tokenExpiry");
      const tokenExpiry = JSON.parse(strTokenExpiry);
      if (tokenExpiry !== null) {
        return tokenExpiry;
      }
    } catch (error) {
      if (error.response) {
        console.log("Error while checking token expiry", error);
      }
    }
  };

  

  clearAsyncStorage = async () => {
    AsyncStorage.clear();
    console.log("async clear");
  };

  render() {
    console.disableYellowBox = true;
    return (
      <Fragment>
        {
          this.state.loading ?
            <Loader />
          :
          <NativeRouter>
            <Switch>
              {this.state.token ? (
                <Route exact path="/" component={Message}></Route>
              ) : (
                <Route exact path="/" component={Login}></Route>
              )}
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/search" component={Search}></Route>
              <Route exact path="/message" component={Message}></Route>
              <Route exact path="/style" component={Style}></Route>
              <Route
                exact
                path="/sampleRequest"
                component={SampleRequest}
              ></Route>
              <Route exact path="/companyList" component={CompanyList}></Route>
              <Route
                exact
                path="/notificationModal"
                component={NotificationModal}
              ></Route>
            </Switch>
          </NativeRouter>
        }
        {/* {
          path === '/' ?
            <Login history={this.props.history} />
          :
          path !== '/companyList' &&
           <Header history={this.props.history}> 
              <Route exact path="/search" component={Search}></Route>
              <Route exact path="/message" component={Message}></Route>
              <Route exact path="/style" component={Style}></Route>
              <Route exact path="/sampleRequest" component={SampleRequest}></Route> 
           </Header>
        }
        {
          path === '/companyList' &&
            <Route exact path="/companyList" component={CompanyList}></Route>
        } */}
        {/* <Route exact path="/" component={Login}></Route> */}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    tokenData: state.async.tokenState
  };
};


const mapDispatchToProps = dispatch => {
  return {
    tokenFunction : (data) => dispatch(token(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Template);
