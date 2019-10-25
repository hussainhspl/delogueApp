import React from "react";
import { View, Text, TouchableHighlight, Image, Dimensions } from "react-native";
import styled from "styled-components";
import Title from "../styles/SmallText";

const GirdCard = styled.View`
  width: ${props =>
    props.tablet
      ? Dimensions.get("window").width / 4
      : Dimensions.get("window").width / 3};
  height: ${props =>
    props.tablet
      ? Dimensions.get("window").height / 4 - 30
      : Dimensions.get("window").height / 3 - 48};
  border: 1px solid #aaa;
  align-self: flex-start;
  /* align-items: center; */
  /* justify-content: center; */
  border-top-width: 0px;
  border-left-width: 0px;
`;

const GirdImageView = styled.View`
  width: ${props =>
    props.tablet
      ? Dimensions.get("window").width / 4
      : Dimensions.get("window").width / 3-24};
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

const CardText = styled.Text`
  font-family: ${props => props.theme.regular};
  /* padding-bottom: 4px; */
  color: ${props => props.theme.textColor};
`;

class searchGridCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tablet: false
    };
  }
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
        <TouchableHighlight
          underlayColor="#42546033"
          onPress={() => {
            history.push("/style");
            // console.log('hey');
          }}
          key={data.key}
        >
      <GirdCard key={data.styleNo} tablet={this.state.tablet}>
          <GirdImageView tablet={this.state.tablet}>
            <GridImage
              tablet={this.state.tablet}
              resizeMode={"contain"}
              source={require("../../assets/img/shirt-static.png")}
            />
          </GirdImageView>
          <CardInfo>
            <View>
              <Title>Style Name</Title>
              <CardText numberOfLines={1}>{data.styleName}</CardText>
            </View>
            <View>
              <Title>Style No</Title>
              <CardText numberOfLines={1}>{data.styleNo}</CardText>
            </View>
          </CardInfo>
      </GirdCard>
        </TouchableHighlight>
    );
  }
}

export default searchGridCard;
