import React, {Fragment} from 'react';
import { View, Text } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';

import CompanyList from './companyList';
import Search from './search/Search';
import Message from './message/message';
// import Search from './style/Style';
import Login from './login';
import Style from './style/Style'
import HeaderTemplate from './HeaderTemplate';
import Header from './Header';
import SampleRequest from './style/SampleRequest';



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
          path !== '/companyList' &&
           <Header history={this.props.history}> 
              {/* // <Route exact path="/headerTemplate" component={HeaderTemplate}></Route> */}
              <Route exact path="/search" component={Search}></Route>
              <Route exact path="/message" component={Message}></Route>
              <Route exact path="/style" component={Style}></Route>
              <Route exact path="/sampleRequest" component={SampleRequest}></Route> 
           </Header>
        }
        {
          path === '/companyList' &&
            <Route exact path="/companyList" component={CompanyList}></Route>
        }
        {/* <Route exact path="/" component={Login}></Route> */}
      </Fragment>
    )
  }
}
export default Template;