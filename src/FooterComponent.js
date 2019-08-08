import React from 'react';
import {View, Text} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import styled from 'styled-components';

import Comments from './style/Comments';

import { connect } from "react-redux";

const IconText = styled.Text`
  fontSize: 10
`


class FooterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // renderSelectedTab () {
  //   switch (path) {
  //     case 'welcome':
  //       return (<Welcome />);
  //       break;
  //     case 'profile':
  //       return (<Profile />);
  //       break;
  //     case 'login':
  //       return (<Login />);
  //       break;
  //     default:
  //   }
  // }
	render() {
    // const path = this.props.location.pathname;rrrr
		return(
			<View style={{height:53}}>
				<Container>
				<Footer>
          <FooterTab>
            <Button vertical active
              // onPress={() => this.setState({selectedTab: 'profile'})}
              onPress={() => history.push("/")}
            >
              <Icon active name="shirt" />
              <IconText>General</IconText>
            </Button>
            <Button vertical
              onPress={() => history.push("/Comments")}
            >
              <Icon name="mail" />
              <IconText>Comments</IconText>
            </Button>
            <Button vertical >
              <Icon name="document" />
              <IconText>Files</IconText>
            </Button>
            <Button vertical>
              <Icon name="folder-open" />
              <IconText>Sample</IconText>
            </Button>
            <Button vertical>
              <Icon name="document" />
              <IconText>PDF</IconText>
            </Button>
          </FooterTab>
        </Footer>
				</Container>
			</View>
		)
	}
}

const mapStateToProps = state => {
  return {
    currentTab: state.tab.now
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // counterAddFunction: () => dispatch(counterAdd()),
    // counterSubtractFunction: () => dispatch(counterSubtract()),
  };
};

export default FooterComponent;