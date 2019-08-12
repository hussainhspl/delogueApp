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


// import console = require('console');


class HeaderTemplate extends React.Component {
    constructor(props) {
      super(props);
		}
		renderSelectedTab (params) {
			switch (params) {
				case 'search':
					return (<Search />);
					break;
				case 'message':
					return (<Message />);
					break;
				case 'style':
					return (
							<Style />
					);
					break;
			//   case 'login':
			//     return (<Login />);
			//     break;
				default:
			}
			// console.log("printing from render: ", params);
		}
    render() {
			const path = this.props.location.pathname;
			console.log("header template path", path);
			return(
				<Header history={this.props.history}>
					
					{/* <Search /> */}
					{ this.renderSelectedTab(this.props.currentTab)}
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