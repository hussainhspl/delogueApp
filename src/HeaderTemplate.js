import React, {Fragement} from 'react';
import { View, Text } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';
import Header from './Header';
import FooterComponent from './FooterComponent';
import Style from "./style/Style";
import Search  from './search/Search';
import Message from './message/message';
// import FooterComponent from './FooterComponent'
import { connect } from "react-redux";
// import { NativeRouter, Switch, Route } from 'react-router-native';


// import console = require('console');


class HeaderTemplate extends React.Component {
    constructor(props) {
      super(props);
		}
		renderSelectedTab (params) {
			switch (params) {
				case 'search':
					return (<Search history={this.props.history} />);
					break;
				case 'message':
					return (<Message history={this.props.history} />);
					break;
				case 'style':π
					return (<Style history={this.props.history} />
					);
					break;
				default:
			}
		}
    render() {
			console.log("header template history", this.props.history);
			return(
				<Header history={this.props.history}>
					{ this.renderSelectedTab(this.props.currentTab)}
					<Route exact path="/style" component={Style}></Route>
				</Header>
			)
		}
}

const mapStateToProps = state => {
  return {
    currentTab: state.header.now
  };
};

export default connect(mapStateToProps) (HeaderTemplate);