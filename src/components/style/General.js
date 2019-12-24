import React, { Fragment } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import styled from "styled-components";
import ImageLayout from "react-native-image-layout";
import Title from "../../styles/SmallText";
import { Icon } from "native-base";
import SubTitle from "../../styles/CardText";
import AsyncStorage from "@react-native-community/async-storage";
import StyleFollow from '../../api/styleFollow';
import StyleNeglect from '../../api/styleNeglect';


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
  opacity: 0.5;
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
  text-align: center;
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
  bottom: 10;
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
      imgSrc: null,
    };
  }
  _renderPageHeader = (image, index, onClose) => {
    // Individual image object data.
    console.log(image);
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            onClose();
          }}
          underlayColor="#777"
        >
          <Icon name="arrow-back" style={{ color: "#ccc", padding: 20 }} />
        </TouchableOpacity>
      </View>
    );
  };
  _renderPageFooter = (image, index, onClose) => {
    // Individual image object data.
    console.log(image);
    return <CloseMessage> Swipe Up or Down to go Back </CloseMessage>;
  };
  getAsyncToken = async () => {
    try {
      const token = await AsyncStorage.getItem("@token");
      if (token) return token;
    } catch (error) {
      if (error) {
        console.log("async token absent", error);
      }
    }
  };
  toggleFollow(id, follower) {
    console.log('follow toggle', id, follower);
    this.getAsyncToken().then(token => {
      if(follower === false) {
        StyleFollow(token, id)
          .then(res => {
            console.log('styled followed', this.state.dataArray.data.isFollower);
            this.setState(prevState =>({
              ...prevState,
              dataArray: {
                ...prevState.dataArray,
                data: {
                  ...prevState.dataArray.data,
                  isFollower: true
                }
              }
            }))
          })
      }
      else {
        StyleNeglect(token, id)
          .then(res => {
            console.log("style deleted");
            this.setState(prevState =>({
              ...prevState,
              dataArray: {
                ...prevState.dataArray,
                data: {
                  ...prevState.dataArray.data,
                  isFollower: false
                }
              }
            }))
          })
      }
    })
  }

  componentDidMount = () => {
    if (Dimensions.get("window").width > 568) {
      this.setState({ tablet: true }, () =>
        console.log("will mount", this.state.tablet)
      );
    }
    console.log('component did mount called')
    this.setState({
      dataArray: this.props.styleData
    }, () => this.getThumbnail(this.state.dataArray.data.styleLogoThumbnails));
    
  };

  onTap = () => {};
  pinZoomLayoutRef = React.createRef();

  getThumbnail = (thumbnails) => {
    console.log("get thumbnail called")
    if(thumbnails != null) {
      thumbnails.some(s => {
        if(s.size > 70000) {
          this.setState({
            imgSrc : s.url
          })
          console.log("perfect size:", s.size);
          return true;
        }
        else if (s.size > 40000) {
          this.setState({
            imgSrc : s.url
          })
          console.log("perfect size 4:", s.size);
          return true;
        }
        return false
      })
    }
  }
  render() {
    console.log("render in general :", this.state.dataArray);
    let state = null
    if(this.state.dataArray != null) {
      state = this.state.dataArray.data;
    }
    return (
      <Fragment>
        {state != null ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              //  console.log('thumbnail found', this.state.imgSrc)
            }
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
                    // uri: state.logo ? state.logo.url : 
                    // noImage
                    uri: this.state.imgSrc ? this.state.imgSrc : state.logo ? state.logo.url : noImage
                  }
                ]}
              />
              <Icon
                style={{
                  position: "absolute",
                  right: 10,
                  bottom: 10,
                  color: "#999"
                }}
                name="expand"
              />
              <FollowView>
                <FollowTouchableHighlight underlayColor="#42546033" onPress={() => this.toggleFollow(state.id, state.isFollower)}>
                <Icon
                  style={{
                    color:
                      state.isFollower === false
                        ? "#ccc"
                        : "#f00"
                  }}
                  name="heart"
                />
                </FollowTouchableHighlight>
              </FollowView>
            </View>
            <ItemInfoRow>
              <View style={{ width: "50%" }}>
                <StyleInfo>
                  <Title>brand</Title>
                  <SubTitle>
                    {state.brand
                      ? state.brand.name
                      : "-"}
                  </SubTitle>
                </StyleInfo>
                <StyleInfo>
                  <Title>contact person</Title>
                  <SubTitle>
                    {state.companyContactPerson
                      ? state.companyContactPerson.name
                      : "-"}
                  </SubTitle>
                </StyleInfo>
                <StyleInfo>
                  <Title>style name</Title>
                  <SubTitle>
                    {state.name
                      ? state.name
                      : "-"}
                  </SubTitle>
                </StyleInfo>
                <StyleInfo>
                  <Title>style no</Title>
                  <SubTitle>{state.userDefinedId ? state.userDefinedId: "-"}</SubTitle>
                </StyleInfo>
                <StyleInfo>
                  <Title>description</Title>
                  <SubTitle>{state.description ? state.description : "-"}</SubTitle>
                </StyleInfo>
                <StyleInfo>
                  <Title>state</Title>
                  <SubTitle>{state.state ? state.state : "-"}</SubTitle>
                </StyleInfo>
                <StyleInfo>
                  <Title>ready for export</Title>
                  <SubTitle>
                    {state.readyForExport == false
                      ? "No"
                      : "Yes"}
                  </SubTitle>
                </StyleInfo>
              </View>
              <View style={{ width: "50%" }}>
                <StyleInfo>
                  <Title>supplier</Title>
                  <SubTitle>
                    {state.supplier ? `${state.supplier.userDefinedSupplierId} | `: ' '}
                    {state.supplier? state.supplier.name : " "}
                  </SubTitle>
                </StyleInfo>
                <StyleInfo>
                  <Title>primary</Title>
                  <SubTitle>
                    {state.IsPrimary == false
                      ? "No"
                      : "Yes"}
                  </SubTitle>
                </StyleInfo>
                <StyleInfo>
                  <Title>contact person</Title>
                  <SubTitle>
                    {state.supplierContactPerson ? state.supplierContactPerson.name : "-"}
                  </SubTitle>
                </StyleInfo>
                <StyleInfo>
                  <Title>season</Title>
                  <SubTitle>
                    {state.season ? state.season.name : " "} - {" "}
                    {state.season.projectName ? state.season.projectName : " "}
                  </SubTitle>
                </StyleInfo>
                <StyleInfo>
                  <Title>group</Title>
                  <SubTitle>
                    {state.group
                      ? state.group.name
                      : "-"}
                  </SubTitle>
                </StyleInfo>
                <StyleInfo>
                  <Title>categories</Title>
                  {
                    state.categories ?
                    state.categories.map(d => {
                      return <SubTitle>{d.name}</SubTitle>;
                    })
                    : <SubTitle> - </SubTitle>
                  }
                </StyleInfo>
              </View>
            </ItemInfoRow>
            <SizeBox>
              <StyleInfo>
                <Title>sizes</Title>
                <SubTitle>{state.styleSizes ? state.styleSizes : "-"}</SubTitle>
              </StyleInfo>
            </SizeBox>
            <ColorContainer>
              {state.styleColors ?
                state.styleColors.map(color => {
                  return (
                    <Block>
                      {color.adminColor.isActive == false ? (
                        <Fragment>
                          <InactiveColorBox color={color.adminColor.rgb ? color.adminColor.rgb: "fff"} />
                          <XView1 />
                          <XView2 />
                        </Fragment>
                      ) : (
                        <ColorBox color={color.adminColor.rgb ? color.adminColor.rgb: "fff"} />
                      )}
                      <Title numberOfLines={1}>
                        {color.adminColor.userDefinedId2 ? color.adminColor.userDefinedId2 : "-"}
                      </Title>
                      <SubTitle numberOfLines={2}>{color.name ? color.name : '-'}</SubTitle>
                    </Block>
                  )})
                :
                <SubTitle> - </SubTitle>
              }
            </ColorContainer>
          </ScrollView>
        ) : (
          <Text>loading</Text>
        )}
      </Fragment>
    );
  }
}
export default General;
