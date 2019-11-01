import React, { Fragment } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Image
} from "react-native";
import Title from "../styles/SmallText";
import styled from "styled-components";
import OpacityView from "../styles/OpacityView";
import AttachmentPopup from "../shared/AttachmentPopup";

const GirdCard = styled.View`
  width: ${props =>
    props.tablet
      ? Dimensions.get("window").width / 4
      : Dimensions.get("window").width / 3 - 13.5};
  height: ${props =>
    props.tablet
      ? Dimensions.get("window").height / 4 - 30
      : Dimensions.get("window").height / 3 - 48};
  border: 1px solid #ccc;
  align-self: flex-start;
  margin: 10px 5px 0px 5px;
`;

const GirdImageView = styled.View`
  width: ${props =>
    props.tablet
      ? Dimensions.get("window").width / 4
      : Dimensions.get("window").width / 3 - 25};
  height: ${props =>
    props.tablet
      ? Dimensions.get("window").height / 4 - 80
      : Dimensions.get("window").height / 3 - 120};
  justify-content: center;
  align-items: center;
  align-self: center;
  /* background-color: #aaa; */
`;

const GridImage = styled.Image`
  width: ${props =>
    props.tablet
      ? Dimensions.get("window").width / 4 - 45
      : Dimensions.get("window").width / 3 - 34};
  height: ${props =>
    props.tablet
      ? Dimensions.get("window").height / 4 - 90
      : Dimensions.get("window").height / 3 - 115};
  /* background-color: #dedede; */
`;

const CardInfo = styled.View`
  border-top-width: 1px;
  border-color: #ddd;
  height: 70px;
  width: 100%;
  justify-content: space-between;
  /* align-items: space-between; */
  padding: 2px 5px;
  /* background-color: #ddd; */
`;

const InactiveColorBox = styled.View`
  background-color: #eee;
  opacity: 0.5;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
  /* border: 1px solid #ddd; */
`;

const CrossImage = styled.Image`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: #f00; */
`;
const CardText = styled.Text`
  font-family: ${props => props.theme.regular};
  font-size: ${props => props.theme.large};
  color: ${props => props.theme.textColor};
`;

class FileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOpacity: false,
      modalVisible: false
    };
  }
  showPopup = () => {
    console.log("Enter");
    this.setState({ modalVisible: true });
  };
  render() {
    console.log("show  popup: ", this.state.modalVisible);
    return (
      <View >
        <TouchableWithoutFeedback
          onPressIn={() => this.setState({ showOpacity: true })}
          onPressOut={() => this.setState({ showOpacity: false })}
          onPress={() => this.showPopup()}
        >
          <GirdCard tablet={this.state.tablet}>
            {this.state.showOpacity && <OpacityView />}
            {this.props.no == 2 ? (
              <Fragment>
                <InactiveColorBox>
                  <CrossImage
                    resizeMode={"stretch"}
                    source={require("../../assets/img/cross-icon2.png")}
                  />
                </InactiveColorBox>
              </Fragment>
            ) : null}

            <GirdImageView tablet={this.state.tablet}>
              <GridImage
                tablet={this.state.tablet}
                resizeMode={"contain"}
                source={{
                  uri:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Microsoft_Excel_2013_logo.svg/1043px-Microsoft_Excel_2013_logo.svg.png"
                }}
              />
            </GirdImageView>
            <CardInfo>
              <View>
                <Title>File Name</Title>
                <CardText numberOfLines={1}>{this.props.imageName}</CardText>
              </View>
              <View>
                <Title>Date</Title>
                <CardText numberOfLines={1}>13-oct-2019</CardText>
              </View>
            </CardInfo>
            <AttachmentPopup
              modalVisible={this.state.modalVisible}
              close={() => this.setState({ modalVisible: false })}
              path="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Microsoft_Excel_2013_logo.svg/1043px-Microsoft_Excel_2013_logo.svg.png"
            />
          </GirdCard>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
export default FileCard;
