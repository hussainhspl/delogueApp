import React, {Fragment} from "react";
import { View, Text, Image, ScrollView, Dimensions, Modal,TouchableOpacity, TouchableHighlight } from "react-native";
import styled from "styled-components";
import ImageLayout from "react-native-image-layout";
import Title from "../../styles/SmallText";
import {Icon} from 'native-base';
import SubTitle from '../../styles/CardText';

const colorArray = [
  { color: "#ffeedd" },
  { color: "#fdafda" },
  { color: "#77aa22" }
];

const colorArr = [
  {id: "color id 2"},
  {id: "color id 2"},
  {id: "color id 2"},
  {id: "color id 2"},
  {id: "color id 2"},
  {id: "color id 2"},
  {id: "color id 2"},
]
const ImageView = styled.View`
  width: ${props =>
    props.tablet
      ? Dimensions.get("window").width / 2.4
      : Dimensions.get("window").width - 70};
  height: ${props =>
    props.tablet
      ? Dimensions.get("window").height / 2.6
      : Dimensions.get("window").width - 70};
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
const StyleInfo = styled.View`
  padding: 5px;
`;

const SizeBox = styled.View`
  border: 1px solid #ddd;
  padding: 10px 20px;
  
`;
const ColorContainer = styled.View`
  flex-direction: row;
  padding: 10px 20px;
  flex-wrap: wrap;
`;

const ItemInfoRow = styled.View`
  flex-direction: row;
  padding: 10px 20px;
  border-top-width: 1px;
  border-color: #ddd;
`;

const Block = styled.View`
  width: 60px;
  margin-bottom: 20px;
  padding-right: 10px;
`;

const ColorBox = styled.View`
  width: 50px;
  height: 50px;
  background-color: #${props => props.color};
  margin-bottom: 10px;
`;

const InactiveColorBox = styled.View`
  width: 50px;
  height: 50px;
  background-color: #${props => props.color};
  opacity:0.5;
  margin-bottom: 10px;
  position: relative;
  border: 1px solid #ddd;
`;
const XView1 = styled.View`
  border-left-width: 1px;
  border-color: #ddd;
  position: absolute;
  width: 70px;
  height: 70px;
  bottom: 0px;
  top: 15px;
  right: 0px;
  left: 15px;
  transform: rotate(45deg);
`;
const XView2 = styled.View`
  border-right-width: 1px;
  border-color: #ddd;
  position: absolute;
  width: 70px;
  height: 70px;
  bottom: 0px;
  top: 15px;
  right: 45px;
  left: -35px;
  transform: rotate(-45deg);
`;

const CloseMessage = styled.Text`
  color: #aaa;
  font-size: 14px;
  text-align:center;
  padding: 5px;
  bottom: 20;
`;

const SImageLayout = styled(ImageLayout)`
  position: relative;
`;
const FollowView = styled.View`
  width: 40px;
  height: 40px;
  position: absolute;
  bottom : 10;
  left: 10;
  background-color: #eeeeee6e;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
const FollowTouchableHighlight = styled.TouchableHighlight`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;
class General extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tablet: false,
      dataArray: null,
    };
  }
  _renderPageHeader = (image, index, onClose) => {
    // Individual image object data.
    console.log(image);
    return (
        <View>
          <TouchableOpacity 
            onPress={() => {onClose();}} 
            underlayColor="#777">
            <Icon name='arrow-back' style={{color: '#ccc', padding: 20}} />
          </TouchableOpacity>
        </View>
    )
  }
  _renderPageFooter = (image, index, onClose) => {
    // Individual image object data.
    console.log(image);
    return (
      <CloseMessage> Swipe Up or Down to go Back </CloseMessage>
    )
  }
  // static getDerivedStateFromProps(props, state) {
  //   if (props.styleData !== state.data) {
  //     return {
  //       data: props.styleData
  //     };
  //   }
  //   return null;
  // }

  componentDidMount = () => {
    if (Dimensions.get("window").width > 568) {
      this.setState({ tablet: true }, () =>
        console.log("will mount", this.state.tablet)
      );
    }
    this.setState({
      dataArray: this.props.styleData
    })
  };

  onTap = () => {};
  pinZoomLayoutRef = React.createRef();
  render() {
    
    console.log("render in general :", this.state.dataArray);
    let no = 0;
    return (
      <Fragment>
        {
          this.state.dataArray != null ?
          <ScrollView showsVerticalScrollIndicator={false}>
            {console.log('this.state.dataArray.data.brandName', this.state.dataArray.data.brandName)}
            <View>
              <SImageLayout
                renderPageHeader={this._renderPageHeader}
                renderPageFooter={this._renderPageFooter}
                imageContainerStyle={{ backgroundColor: "#eee" }}
                pageScrollViewStyle={{ backgroundColor: "#000" }}
                // imagePageComponent={ () => resizeMode: "contain"}
                resizeMode={"contain"}
                columns={1}
                enableScale
                images={[
                  {
                    uri: this.state.dataArray.data.logo.url
                  }
                ]}
              />
              <Icon  style={{position: 'absolute', right: 10, bottom: 10, color: '#999' }} name="expand" />
              <FollowView>
                {/* <FollowTouchableHighlight underlayColor="#42546033" onPress={() => console.log('style followed')}> */}
                  <Icon style={{color: this.state.dataArray.data.isFollower === false ? '#ccc':'#f00'}} name="heart" />
                {/* </FollowTouchableHighlight> */}
              </FollowView>
            </View>
            <ItemInfoRow>
              <View style={{width: '50%'}}>
                <StyleInfo>
                  <Title>brand</Title>
                  <SubTitle>{this.state.dataArray.data.brand.name}</SubTitle>
                </StyleInfo>
                <StyleInfo>
                  <Title>contact person</Title>
                  <SubTitle>{this.state.dataArray.data.companyContactPerson.name}</SubTitle>
                </StyleInfo>
                <StyleInfo>
                  <Title>style name</Title>
                  <SubTitle>{this.state.dataArray.data.name}</SubTitle>
                </StyleInfo>
                <StyleInfo>
                  <Title>style no</Title>
                  <SubTitle>{this.state.dataArray.data.userDefinedId}</SubTitle>
                </StyleInfo>
                <StyleInfo>
                  <Title>description</Title>
                  <SubTitle>{this.state.dataArray.data.description}</SubTitle>
                </StyleInfo>
                <StyleInfo>
                  <Title>state</Title>
                  <SubTitle>{this.state.dataArray.data.state}</SubTitle>
                </StyleInfo>
                <StyleInfo>
                  <Title>ready for export</Title>
                  <SubTitle>{this.state.dataArray.data.readyForExport == false ? "No" : "Yes"}</SubTitle>
                </StyleInfo>
              </View>
              <View style={{width: '50%'}}>
              <StyleInfo>
              <Title>supplier</Title>
              <SubTitle>{this.state.dataArray.data.supplier.userDefinedSupplierId} | {this.state.dataArray.data.supplier.name}</SubTitle>
            </StyleInfo>
            <StyleInfo>
              <Title>primary</Title>
              <SubTitle>{this.state.dataArray.data.IsPrimary == false ? "No" : "Yes"}</SubTitle>
            </StyleInfo>
            <StyleInfo>
              <Title>contact person</Title>
              <SubTitle>{this.state.dataArray.data.supplierContactPerson.name}</SubTitle>
            </StyleInfo>
            <StyleInfo>
              <Title>season</Title>
              <SubTitle>{this.state.dataArray.data.season.name} - {this.state.dataArray.data.season.projectName}</SubTitle>
            </StyleInfo>
            <StyleInfo>
              <Title>group</Title>
              <SubTitle>
                {this.state.dataArray.data.group.name? this.state.dataArray.data.group.name : "-"}
              </SubTitle>
            </StyleInfo>
            <StyleInfo>
              <Title>categories</Title>
              {
                this.state.dataArray.data.categories.map( d=> {
                  return(
                    <SubTitle>
                      {d.name}
                    </SubTitle>
                  )
                })
              }
            </StyleInfo>
              </View>
            </ItemInfoRow>
            <SizeBox>
              <StyleInfo>
                <Title>sizes</Title>
                <SubTitle>
                  {this.state.dataArray.data.styleSizes}
                </SubTitle>
              </StyleInfo>
            </SizeBox>
            <ColorContainer>
              { 
                this.state.dataArray.data.styleColors.map(color => {
                  no = no+1;
                  // console.log("number", no)
                  return(
                    <Block>
                      {
                        color.adminColor.isActive == false ?
                        <Fragment>
                          <InactiveColorBox color= {color.adminColor.rgb} />
                          <XView1 />
                          <XView2 />
                        </Fragment>
                        :
                        <ColorBox color= {color.adminColor.rgb} />
                      }
                      <Title numberOfLines={1}>{color.id}</Title>
                      <SubTitle numberOfLines={2}>
                        {color.name}
                      </SubTitle>
                    </Block>
                  )
                })
              }
            </ColorContainer>
      </ScrollView>
      : <Text>loading</Text>
      }
      </Fragment>
    );
  }
}
export default General;
