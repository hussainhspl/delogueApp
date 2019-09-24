import React from 'react';
import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import styled from 'styled-components';


const GirdCard = styled.View`
  width: ${props =>
    props.tablet
      ? Dimensions.get("window").width / 4
      : Dimensions.get("window").width / 3};
  height: ${props =>
    props.tablet
      ? Dimensions.get("window").height / 4 -30
      : Dimensions.get("window").height / 3 - 50};
  border: 1px solid #ddd;
  align-self: flex-start;
  border-top-width: 0px;
  border-left-width: 0px;

`;

const GirdImageView = styled.View`
  width: ${props =>
    props.tablet
    ? Dimensions.get("window").width / 4
    : Dimensions.get("window").width / 3};
  height: ${props =>
    props.tablet
    ? Dimensions.get("window").height / 4 -80
    : Dimensions.get("window").height / 3 - 100};
  justify-content: center;
  align-items: center;
`;

const GridImage = styled.Image`
  width: ${props =>
    props.tablet
    ? Dimensions.get("window").width / 4 - 45 
    : Dimensions.get("window").width / 3 - 54};
  height: ${props =>
    props.tablet
    ? Dimensions.get("window").height / 4 - 90
    : Dimensions.get("window").height / 3 - 120};
`;

const CardInfo = styled.View`
  border-top-width: 1px;
  border-color: #eee;
  height: 50px;
  width: 100%;
  justify-content: center;
  padding: 5px;
`;

const CardText = styled.Text`
  font-family: ${props => props.theme.regular};
`;

class searchGridCard extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      tablet: false,
    }
  }
  componentDidMount = () => {
    if (Dimensions.get("window").width > 568) {
      this.setState({ tablet: true }, () =>
        console.log("tablet search", this.state.tablet)
      );
    }
  }
  render() {
    let data = this.props.data;
    const history = this.props.history;
    return(
      <GirdCard key={data.styleNo} tablet={this.state.tablet}>
        <TouchableOpacity
          onPress={() => {
            history.push("/style");
          }}
          key={data.key}
        >
          <GirdImageView tablet={this.state.tablet}>
            <GridImage
              tablet={this.state.tablet}
              resizeMode={"center"}
              source={require("../../assets/img/shirt-static.png")}
            />
          </GirdImageView>
          <CardInfo>
            <CardText numberOfLines={1}>
              {data.styleName}
            </CardText>
            <CardText numberOfLines={1}>{data.styleNo}</CardText>
          </CardInfo>
        </TouchableOpacity>
      </GirdCard>
    )
  }
}

export default searchGridCard;