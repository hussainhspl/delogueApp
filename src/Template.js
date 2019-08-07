import React, {Fragment} from 'react';
import { View, Text } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';

import CompanyList from './companyList';
import Search from './search/Search';
import Login from './login';
import Header from './Header';



class Template extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("template", this.props.location.pathname);
    const path = this.props.location.pathname;
    return(
      <Fragment>
        {
          path === '/' ?
            <Login history={this.props.history} />
          :
           <Fragment> 
            {
              path !== '/companyList'? 
              <Header>
                <Route exact path="/search" component={Search}></Route>
              </Header>
              : 
              <View/>
            }
            <Route exact path="/companyList" component={CompanyList}></Route>
          </Fragment>
        }
        {/* <Route exact path="/" component={Login}></Route> */}
      </Fragment>
    )
  }
}
export default Template;