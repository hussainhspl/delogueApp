import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions
} from "react-native";
import styled from "styled-components";
import Title from "../../styles/SmallText";
import CardText from "../../styles/CardText";
import GridCard from "../../styles/GridCard";
import GridImageView from "../../styles/GridImageView";
import GridImage from "../../styles/GridImage";
import GridCardInfo from "../../styles/GridCardInfo";
import OpacityView from "../../styles/OpacityView";

class searchGridCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tablet: false,
      showOpacity: false,
      modalVisible: false
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
    // console.log('prop style data ', data);
    const history = this.props.history;
    return (
      <TouchableWithoutFeedback
        onPressIn={() => this.setState({ showOpacity: true })}
        onPressOut={() => this.setState({ showOpacity: false })}
        onPress={() => this.props.GetStyleClicked(data.id)}
      >
        <GridCard key={data.styleNo} tablet={this.state.tablet}>
          {this.state.showOpacity && <OpacityView />}
          <GridImageView tablet={this.state.tablet}>
            <GridImage
              tablet={this.state.tablet}
              resizeMode={"contain"}
              source={{uri: data.logo ? data.logo.url: 
                noImage
              }}
              // source={require("../../../assets/img/shirt-static.png")}
            />
          </GridImageView>
          <GridCardInfo>
            <View>
              <Title>Style Name</Title>
              <CardText numberOfLines={1}>{data.name}</CardText>
            </View>
            <View>
              <Title>Style No</Title>
              <CardText numberOfLines={1}>{data.userDefinedId}</CardText>
            </View>
          </GridCardInfo>
        </GridCard>
      </TouchableWithoutFeedback>
    );
  }
}

export default searchGridCard;
