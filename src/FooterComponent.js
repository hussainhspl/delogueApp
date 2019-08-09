import React from 'react';
import {View, Text} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import styled from 'styled-components';

import Comments from './style/Comments';

import { connect } from "react-redux";
// import { counterAdd, counterSubtract } from '../store/actions/index';
import { generalTab, commentTab, filesTab, sampleTab, pdfTab } from './store/acttions/index';
// import console = require('console');

const IconText = styled.Text`
  fontSize: 10
`


class FooterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab2: 'general'
    };
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
    console.log("footer state active:", this.props.currentTab);
    const currentTab = this.props.currentTab
		return(
			<View style={{height:53}}>
				<Container>
				<Footer>
          <FooterTab>
            <Button vertical 
              active={this.props.currentTab === 'general'? true : false}
              onPress={() => this.props.generalTabFunction()}
            >
              <Icon 
                active={this.props.currentTab === 'general'? true : false}
                name="shirt" />
              <IconText>General </IconText>
            </Button>
            <Button vertical 
              active={this.props.currentTab === 'comments'? true : false}
              onPress={() => this.props.commentTabFunction()}
            >
              <Icon 
                active={this.props.currentTab === 'comments'? true : false}
                name="mail" />
              <IconText>Comments</IconText>
            </Button>
            <Button vertical
              active={this.props.currentTab === 'files'? true : false}
              onPress={() => this.props.filesTabFunction()}
            >
              <Icon
                active={this.props.currentTab === 'files'? true : false}
                name="document" />
              <IconText>Files</IconText>
            </Button>
            <Button vertical
              active={this.props.currentTab === 'sample'? true : false}
              onPress={() => this.props.sampleTabFunction()}
            >
              <Icon 
                active={this.props.currentTab === 'sample'? true : false}
                name="folder-open" />
              <IconText>Sample</IconText>
            </Button>
            <Button vertical
              active={this.props.currentTab === 'pdf'? true : false}
              onPress={() => this.props.pdfTabFunction()}
            >
              <Icon
                active={this.props.currentTab === 'pdf'? true : false} 
                name="document" />
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
    generalTabFunction: () => dispatch(generalTab()),
    commentTabFunction: () => dispatch(commentTab()),
    filesTabFunction: () => dispatch(filesTab()),
    sampleTabFunction: () => dispatch(sampleTab()),
    pdfTabFunction: () => dispatch(pdfTab()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (FooterComponent);