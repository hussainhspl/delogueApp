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
const StyledImage = styled.Image`
  max-width: 30%;
`;
const IconText = styled.Text`
  font-size: 10px;
  font-family: ${props => props.theme.regular};
  color: ${props => (props.active ? "#fff" : "#eee")};
  padding-bottom: 10px;
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
  justify-content: space-between;

`;
const IconView = styled.View`
  height: 30px;
  justify-content: center;
  align-items: center;
  width: 100%;
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
                <IconView>
                  <StyledImage
                    resizeMode={"contain"}
                    // style={{maxWidth: '30%'}}
                    source={ require("../assets/img/footer/ic_information.png")}
                  />
                </IconView>
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
                <IconView>
                  <StyledImage
                    resizeMode={"contain"}
                    source={require("../assets/img/footer/ic_comments.png")}
                  />
                </IconView>
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
                <IconView>
                <StyledImage
                  resizeMode={"contain"}
                  source={require("../assets/img/footer/ic_files.png")
                  }
                />
                </IconView>
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
                <IconView>
                <StyledImage
                  resizeMode={"contain"}
                  source={require("../assets/img/footer/ic_sample.png")
                  }
                />
                </IconView>
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
                <IconView>
                <StyledImage
                  resizeMode={"contain"}
                  source={require("../assets/img/footer/ic_pdf.png")
                  }
                />
                </IconView>
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
