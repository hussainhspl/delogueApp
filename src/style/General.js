import React from "react";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import styled from "styled-components";

const colorArray = [
  { color: "#ffeedd" },
  { color: "#fdafda" },
  { color: "#77aa22" }
];

const ImageView = styled.View`
  width: ${props =>
    props.tablet
      ? Dimensions.get("window").width / 2.4
      : Dimensions.get("window").width - 70};
  height: ${props =>
    props.tablet
      ? Dimensions.get("window").height / 2.6
      : Dimensions.get("window").width - 70};
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  margin: 20px auto;
`;
const StyleImage = styled.Image`
  width: ${props =>
    props.tablet
      ? Dimensions.get("window").width / 2.7
      : Dimensions.get("window").width - 120};
  height: ${props =>
    props.tablet
      ? Dimensions.get("window").height / 2.2
      : Dimensions.get("window").width - 90};
`;
const ColorBar = styled.View`
  border: 1px solid #ccc;
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;
`;
const ColorBox = styled.View`
  height: 30px;
  width: 30px;
  margin: 0px 5px;
  background-color: #ddd;
`;
const StyleInfo = styled.View`
  flex-direction: row;
  padding: 5px;
`;
const Title = styled.Text`
  width: 50%;
  text-align: right;
  color: #9b9b9b;
  text-transform: uppercase;
  padding-right: 5px;
  font-family: ${props => props.theme.bold};
`;
const SubTitle = styled.Text`
  text-align: left;
  width: 50%;
  color: #4a4a4a;
  padding-left: 5px;
  text-transform: capitalize;
  font-family: ${props => props.theme.regular};
`;
const Separator = styled.View`
  border: 1px solid #f6f6f6;
  margin: 15px;
`;

class General extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tablet: false,
      data: []
    };
    
  }
  static getDerivedStateFromProps(props, state) {
    if (props.styleData !== state.data) {
      console.log("enter in derived if", props.styleData)
      return {
        data: props.styleData,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  componentDidMount = () => {
    if (Dimensions.get("window").width > 568) {
      this.setState({ tablet: true }, () =>
        console.log("will mount", this.state.tablet)
      );
    }
    // getData = async () => {
    //   try {
    //     const value = await AsyncStorage.getItem('@token')
    //     if(value !== null) {
    //       console.log("async token in style", value);
    //     }
    //   }
    //   catch(error) {
    //     alert(error)
    //   }
    // }
    // console.log("will mount out" , this.state.tablet);
  };
  render() {
    // const data= this.props.styleData;
    console.log("render in general :", this.state.data);
    
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageView tablet={this.state.tablet}>
          <StyleImage
            tablet={this.state.tablet}
            resizeMode={"contain"}
            source={require("../../assets/img/shirt-static.png")}
          />
        </ImageView>
        <ColorBar>
          {/* {colorArray.map(item => {
            return (
              <ColorBox
                style={{ backgroundColor: item.color }}
                key={Math.random().toFixed(3)}
              />
            );
          })} */}
          {this.state.data.styleColors.map(item => {
            return (
              // <ColorBox
              //   style={{ backgroundColor: item.color }}
              //   key={Math.random().toFixed(3)}
              // />
              <Text style={{width: 100}}>{item.name} </Text>
            );
          })}
        </ColorBar>
        <StyleInfo>
          <Title>brand</Title>
          <SubTitle>{this.state.data.brandName}</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>contact person</Title>
          <SubTitle>{this.state.data.companyContactPersonName}</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>style name</Title>
          <SubTitle>{this.state.data.styleName}</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>style no</Title>
          <SubTitle>{this.state.data.id}</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>description</Title>
          <SubTitle>{this.state.data.description}</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>state</Title>
          <SubTitle>{this.state.data.styleState}</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>ready for export</Title>
          <SubTitle>yes</SubTitle>
        </StyleInfo>
        <Separator />
        <StyleInfo>
          <Title>supplier</Title>
          <SubTitle>{this.state.data.supplierName}</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>primary</Title>
          <SubTitle>{this.state.data.isPrimary? 'Yes' : 'No'}</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>contact person</Title>
          <SubTitle>{this.state.data.supplierContactPerson.name}</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>season</Title>
          <SubTitle>{this.state.data.seasonName}</SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>group</Title>
          <SubTitle>{this.state.data.groupName? this.state.data.groupName : '-'} </SubTitle>
        </StyleInfo>
        <StyleInfo>
          <Title>categories</Title>
          <SubTitle>{this.state.data.categories.length > 1 ? this.state.data.categories : '-'}</SubTitle>
        </StyleInfo>
      </ScrollView>
    );
  }
}
export default General;
