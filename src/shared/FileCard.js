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
import GridCard from '../styles/GridCard';
import GridImageView from '../styles/GridImageView';
import GridImage from '../styles/GridImage';
import GridCardInfo from '../styles/GridCardInfo';


const InactiveColorBox = styled.View`
  background-color: #eee;
  opacity: 0.5;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
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
    // console.log("show  popup: ", this.state.modalVisible);
    return (
      <View >
        <TouchableWithoutFeedback
          onPressIn={() => this.setState({ showOpacity: true })}
          onPressOut={() => this.setState({ showOpacity: false })}
          onPress={() => this.showPopup()}
        >
          <GridCard tablet={this.state.tablet}>
            {this.state.showOpacity && <OpacityView />}
            {this.props.status == 0 ? (
              <Fragment>
                <InactiveColorBox>
                  <CrossImage
                    resizeMode={"stretch"}
                    source={require("../../assets/img/cross-icon2.png")}
                  />
                </InactiveColorBox>
              </Fragment>
            ) : null}

            <GridImageView tablet={this.state.tablet}>
              <GridImage
                tablet={this.state.tablet}
                resizeMode={"contain"}
                source={{
                  uri: this.props.imgSrc
                }}
              />
            </GridImageView>
            <GridCardInfo>
              <View>
                <Title>File Name</Title>
                <CardText numberOfLines={1}>{this.props.imageName}</CardText>
              </View>
              <View>
                <Title>Date</Title>
              <CardText numberOfLines={1}>{this.props.date}</CardText>
              </View>
            </GridCardInfo>
            <AttachmentPopup
              modalVisible={this.state.modalVisible}
              close={() => this.setState({ modalVisible: false })}
              path="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Microsoft_Excel_2013_logo.svg/1043px-Microsoft_Excel_2013_logo.svg.png"
            />
          </GridCard>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
export default FileCard;
