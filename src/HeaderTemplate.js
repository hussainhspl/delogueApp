import React, {Fragement} from 'react';
import { View, Text } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';
import Header from './Header';
import FooterComponent from './FooterComponent';
import Style from "./style/Style";
import Search  from './components/search/Search';
import Message from './components/message/message';
// import FooterComponent from './FooterComponent'
import { connect } from "react-redux";
import SampleRequest from "./style/SampleRequest";
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
				case 'style':
					return (<Style history={this.props.history} />
					);
					break;
				default:
			}
		}
    render() {
			const history = this.props.history;
			// console.log("header template history", this.props.history);
			return(
				<Header history={this.props.history}>
					<Route exact path="/search" component={Search}></Route>
					<Route exact path="/message" component={Message}></Route>
					<Route exact path="/style" component={Style}></Route>
					<Route exact path="/sampleRequest" component={SampleRequest}></Route>
					{this.renderSelectedTab(this.props.currentTab)}

					{/* { this.props.children ? this.props.children :this.renderSelectedTab(this.props.currentTab)} */}
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