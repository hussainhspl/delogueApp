import React, {Fragment} from 'react';
import { View, Text } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';

import CompanyList from './companyList';
import Search from './search/Search';
import Header from './Header';
// import Header from './src/Header';

class mainTemplate extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Fragment>
        {/* <View style={{flex: 1}}>
          <Route exact path="/companyList" component={CompanyList} />
        </View> */}
        <Header>
          {this.props.children}
        </Header>
      </Fragment>
    )
  }
}
export default mainTemplate;