import React, {Fragment} from 'react';
import { View, Text } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';

import CompanyList from './companyList';
import Search from './search/Search';
import Login from './login';
import Style from './style/Style'
import HeaderTemplate from './HeaderTemplate';



class Template extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // console.log("template", this.props.location.pathname);
    const path = this.props.location.pathname;
    const history = this.props.history;
    console.log("template history: ", history);
    console.disableYellowBox = true
    return(
      <Fragment>
        {
          path === '/' ?
            <Login history={this.props.history} />
          :
           <Fragment> 
              <Route exact path="/headerTemplate" component={HeaderTemplate}></Route>
              <Route exact path="/companyList" component={CompanyList}></Route>
              
          </Fragment>
        }
        {/* <Route exact path="/" component={Login}></Route> */}
      </Fragment>
    )
  }
}
export default Template;