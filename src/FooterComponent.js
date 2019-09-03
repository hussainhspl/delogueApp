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
  font-family: ${ props => props.theme.regular};

`;
const StyledFooterTab = styled(FooterTab)`
  background-color: #eee;
  :active {
    background-color: '#f00';
  }
`;

class FooterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab2: 'general'
    };
  }
  componentWillReceiveProps = (nextProps) => {
    if(JSON.stringify(nextProps.currentTab) != JSON.stringify(this.props.currentTab)) {
      // console.log('content change', this.props.currentTab, nextProps.currentTab);
    }
  }
	render() {
    // console.log("footer state active:", this.props.currentTab);
    const currentTab = this.props.currentTab
		return(
			<View style={{height:50}}>
				<Container>
				<Footer>
          <StyledFooterTab>
            <Button vertical 
              style={{backgroundColor:this.props.currentTab === 'general' ? '#818181' : '#eee', height: 55}}
              active={this.props.currentTab === 'general'? true : false}
              onPress={() => this.props.generalTabFunction()}
            >
              <Image 
                resizeMode={"cover"}
                source={this.props.currentTab === 'general' ? require('../assets/img/footer/style.png') :require('../assets/img/footer/styleblack.png')}
              />
              <IconText style={{color: this.props.currentTab === 'general' ? '#fff' : '#444'}}>General </IconText>
            </Button>
            <Button vertical 
              style={{backgroundColor:this.props.currentTab === 'comments' ? '#818181' : '#eee', height: 55}}
              active={this.props.currentTab === 'comments'? true : false}
              onPress={() => this.props.commentTabFunction()}
            >
              <Image 
                resizeMode={"cover"}
                source={this.props.currentTab === 'comments' ? require('../assets/img/footer/message.png') :require('../assets/img/footer/messageblack.png')}
              />
              <IconText style={{color: this.props.currentTab === 'comments' ? '#fff' : '#444'}}>Comments</IconText>
            </Button>
            <Button vertical
              style={{backgroundColor:this.props.currentTab === 'files' ? '#818181' : '#eee', height: 55}}
              active={this.props.currentTab === 'files'? true : false}
              onPress={() => this.props.filesTabFunction()}
            >
              <Image 
                resizeMode={"cover"}
                source={this.props.currentTab === 'files' ? require('../assets/img/footer/files.png') :require('../assets/img/footer/filesblack.png')}
              />
              <IconText style={{color: this.props.currentTab === 'files' ? '#fff' : '#444'}}>Files</IconText>
            </Button>
            <Button vertical
              style={{backgroundColor:this.props.currentTab === 'sample' ? '#818181' : '#eee', height: 55}}
              active={this.props.currentTab === 'sample'? true : false}
              onPress={() => this.props.sampleTabFunction()}
            >
              <Image 
                resizeMode={"cover"}
                source={this.props.currentTab === 'sample' ? require('../assets/img/footer/sample.png') :require('../assets/img/footer/sampleblack.png')}
              />
              <IconText style={{color: this.props.currentTab === 'sample' ? '#fff' : '#444'}}>Sample</IconText>
            </Button>
            <Button vertical
              style={{backgroundColor:this.props.currentTab === 'pdf' ? '#818181' : '#eee', height: 55}}
              active={this.props.currentTab === 'pdf'? true : false}
              onPress={() => this.props.pdfTabFunction()}
            >
              <Image 
                resizeMode={"cover"}
                source={this.props.currentTab === 'pdf' ? require('../assets/img/footer/pdf.png') :require('../assets/img/footer/pdfblack.png')}
              />
              <IconText style={{color: this.props.currentTab === 'pdf' ? '#fff' : '#444'}}>PDF</IconText>
            </Button>
          </StyledFooterTab>
        </Footer>
				</Container>
			</View>
		)
	}
}

const mapStateToProps = state => {
  // console.log(" footer map state to props");
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