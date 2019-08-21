import React from 'react';
import {View, Text, Image} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import styled from 'styled-components';

import Comments from './style/Comments';

import { connect } from "react-redux";
// import { counterAdd, counterSubtract } from '../store/actions/index';
import { generalTab, commentTab, filesTab, sampleTab, pdfTab } from './store/actions/index';
import { DebugInstructions } from 'react-native/Libraries/NewAppScreen';
// import console = require('console');

const IconText = styled.Text`
  font-size: 10px;
`;


class FooterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab2: 'general'
    };
  }
	render() {
    console.log("footer state active:", this.props.currentTab);
    const currentTab = this.props.currentTab
		return(
			<View style={{height:50}}>
				<Container>
				<Footer>
          <FooterTab>
            <Button vertical 
              active={this.props.currentTab === 'general'? true : false}
              onPress={() => this.props.generalTabFunction()}
            >
              <Image 
                resizeMode={"cover"}
                source={this.props.currentTab === 'general' ? require('../img/footer/style.png') :require('../img/footer/styleblack.png')}
              />
              <IconText style={{color: this.props.currentTab === 'general' ? '#fff' : '#444'}}>General </IconText>
            </Button>
            <Button vertical 
              active={this.props.currentTab === 'comments'? true : false}
              onPress={() => this.props.commentTabFunction()}
            >
              <Image 
                resizeMode={"cover"}
                source={this.props.currentTab === 'comments' ? require('../img/footer/message.png') :require('../img/footer/messageblack.png')}
              />
              <IconText style={{color: this.props.currentTab === 'comments' ? '#fff' : '#444'}}>Comments</IconText>
            </Button>
            <Button vertical
              active={this.props.currentTab === 'files'? true : false}
              onPress={() => this.props.filesTabFunction()}
            >
              <Image 
                resizeMode={"cover"}
                source={this.props.currentTab === 'files' ? require('../img/footer/files.png') :require('../img/footer/filesblack.png')}
              />
              <IconText style={{color: this.props.currentTab === 'files' ? '#fff' : '#444'}}>Files</IconText>
            </Button>
            <Button vertical
              active={this.props.currentTab === 'sample'? true : false}
              onPress={() => this.props.sampleTabFunction()}
            >
              <Image 
                resizeMode={"cover"}
                source={this.props.currentTab === 'sample' ? require('../img/footer/sample.png') :require('../img/footer/sampleblack.png')}
              />
              <IconText style={{color: this.props.currentTab === 'sample' ? '#fff' : '#444'}}>Sample</IconText>
            </Button>
            <Button vertical
              active={this.props.currentTab === 'pdf'? true : false}
              onPress={() => this.props.pdfTabFunction()}
            >
              <Image 
                resizeMode={"cover"}
                source={this.props.currentTab === 'pdf' ? require('../img/footer/pdf.png') :require('../img/footer/pdfblack.png')}
              />
              <IconText style={{color: this.props.currentTab === 'pdf' ? '#fff' : '#444'}}>PDF</IconText>
            </Button>
          </FooterTab>
        </Footer>
				</Container>
			</View>
		)
	}
}

const mapStateToProps = state => {
  console.log(" footer map state to props");
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