import React from "react";
import { View, Text, TouchableWithoutFeedback, Image, Dimensions } from "react-native";
import styled from "styled-components";
import Title from "../styles/SmallText";
import CardText from '../styles/CardText';
import GridCard from '../styles/GridCard';
import GridImageView from '../styles/GridImageView';
import GridImage from '../styles/GridImage';
import GridCardInfo from '../styles/GridCardInfo';
import OpacityView from "../styles/OpacityView";

class searchGridCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tablet: false,
      showOpacity: false,
      modalVisible: false 
    };
  }
  // showPopup = () => {
  //   console.log("Enter");
  //   this.setState({ modalVisible: true });
  // };
  componentDidMount = () => {
    if (Dimensions.get("window").width > 568) {
      this.setState({ tablet: true }, () =>
        console.log("tablet search", this.state.tablet)
      );
    }
  };
  render() {
    let data = this.props.data;
    const history = this.props.history;
    return (
        // <TouchableHighlight
        //   underlayColor="#42546033"
        //   onPress={() => {
        //     history.push("/style");
        //     // console.log('hey');
        //   }}
        //   key={data.key}
        // >
        <TouchableWithoutFeedback
          onPressIn={() => this.setState({ showOpacity: true })}
          onPressOut={() => this.setState({ showOpacity: false })}
          onPress={() => {history.push("/style");}}
        >
      <GridCard key={data.styleNo} tablet={this.state.tablet}>
          {this.state.showOpacity && <OpacityView />}
          <GridImageView tablet={this.state.tablet}>
            <GridImage
              tablet={this.state.tablet}
              resizeMode={"contain"}
              source={require("../../assets/img/shirt-static.png")}
            />
          </GridImageView>
          <GridCardInfo>
            <View>
              <Title>Style Name</Title>
              <CardText numberOfLines={1}>{data.styleName}</CardText>
            </View>
            <View>
              <Title>Style No</Title>
              <CardText numberOfLines={1}>{data.styleNo}</CardText>
            </View>
          </GridCardInfo>
      </GridCard>
        </TouchableWithoutFeedback>
    );
  }
}

export default searchGridCard;
