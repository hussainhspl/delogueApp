import React from "react";
import { View, Text, Image } from "react-native";
import { Container, Footer, FooterTab, Button } from "native-base";
import styled from "styled-components";

import { connect } from "react-redux";
// import { counterAdd, counterSubtract } from '../store/actions/index';
import {
  generalTab,
  commentTab,
  filesTab,
  sampleTab,
  pdfTab
} from "./store/actions/index";
import { DebugInstructions } from "react-native/Libraries/NewAppScreen";
// import console = require('console');

const IconText = styled.Text`
  font-size: 10px;
  font-family: ${props => props.theme.regular};
  color: ${props => (props.active ? "#fff" : "#eee")};
`;
const StyledFooterTab = styled(FooterTab)`
  background-color: #eee;
`;
const FooterRow = styled.View`
  height: 50px;
`;

const StyledButton = styled(Button)`
  background-color: ${props => (props.active ? "#333" : "#444")};
  height: 55px;
  border-radius: 0px;
`;

class FooterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab2: "general"
    };
  }
  static getDerivedStateFromProps(props, state) {
    return null;
  }

  render() {
    // console.log("footer state active:", this.props.currentTab);
    const currentTab = this.props.currentTab;
    return (
      <FooterRow>
        <Container>
          <Footer>
            <StyledFooterTab>
              <StyledButton
                vertical
                active={this.props.currentTab === "general" ? true : false}
                onPress={() => this.props.generalTabFunction()}
              >
                <Image
                  resizeMode={"cover"}
                  source={
                    this.props.currentTab === "general"
                      ? require("../assets/img/footer/style.png")
                      : require("../assets/img/footer/style.png")
                  }
                />
                <IconText
                  active={this.props.currentTab === "general" ? true : false}
                >
                  General
                </IconText>
              </StyledButton>
              <StyledButton
                vertical
                highlight={this.props.currentTab === "comments" ? true : false}
                active={this.props.currentTab === "comments" ? true : false}
                onPress={() => this.props.commentTabFunction()}
              >
                <Image
                  resizeMode={"cover"}
                  source={
                    this.props.currentTab === "comments"
                      ? require("../assets/img/footer/message.png")
                      : require("../assets/img/footer/message.png")
                  }
                />
                <IconText
                  active={this.props.currentTab === "comments" ? true : false}
                >
                  Comments
                </IconText>
              </StyledButton>
              <StyledButton
                vertical
                active={this.props.currentTab === "files" ? true : false}
                active={this.props.currentTab === "files" ? true : false}
                onPress={() => this.props.filesTabFunction()}
              >
                <Image
                  resizeMode={"cover"}
                  source={
                    this.props.currentTab === "files"
                      ? require("../assets/img/footer/files.png")
                      : require("../assets/img/footer/files.png")
                  }
                />
                <IconText
                  active={this.props.currentTab === "files" ? true : false}                  
                >
                  Files
                </IconText>
              </StyledButton>
              <StyledButton
                vertical
                active={this.props.currentTab === "sample" ? true : false}
                onPress={() => this.props.sampleTabFunction()}
              >
                <Image
                  resizeMode={"cover"}
                  source={
                    this.props.currentTab === "sample"
                      ? require("../assets/img/footer/sample.png")
                      : require("../assets/img/footer/sample.png")
                  }
                />
                <IconText
                  active={this.props.currentTab === "sample" ? true : false}
                >
                  Sample
                </IconText>
              </StyledButton>
              <StyledButton
                vertical
                active={this.props.currentTab === "pdf" ? true : false}
                onPress={() => this.props.pdfTabFunction()}
              >
                <Image
                  resizeMode={"cover"}
                  source={
                    this.props.currentTab === "pdf"
                      ? require("../assets/img/footer/pdf.png")
                      : require("../assets/img/footer/pdf.png")
                  }
                />
                <IconText
                  active={this.props.currentTab === "pdf" ? true : false}
                >
                  PDF
                </IconText>
              </StyledButton>
            </StyledFooterTab>
          </Footer>
        </Container>
      </FooterRow>
    );
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
    pdfTabFunction: () => dispatch(pdfTab())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FooterComponent);
