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
import GetAsyncToken from "../../script/getAsyncToken";
import GetSelectedStyle from '../../api/getStyle';
import { connect } from 'react-redux';
import { singleStyle } from '../../store/actions/index';

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
const TitleInactive = styled.Text`
  color: #ccc;
  text-transform: uppercase;
  font-family: ${props => props.theme.regular};
  font-size: ${props => props.theme.xs};
`;
const SubTitleInactive = styled.Text`
  font-family: ${props => props.theme.regular};
  font-size: ${props => props.theme.large};
  color: #ccc;
  text-transform: capitalize;
`
class General extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tablet: false,
      dataArray: null,
      imgSrc: null,
      styleID: null
    };
  }
  _renderPageHeader = (image, index, onClose) => {
    // Individual image object data.
    // console.log(image);
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
    // console.log(image);
    return <CloseMessage> Swipe Up or Down to go Back </CloseMessage>;
  };

  toggleFollow(id, follower) {
    // console.log('follow toggle', id, follower);
    GetAsyncToken().then(token => {
      if (follower === false) {
        StyleFollow(token, id)
          .then(res => {
            console.log('styled followed', this.state.dataArray.data.isFollower);
            this.setState(prevState => ({
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
            this.setState(prevState => ({
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
  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.style !== prevState.dataArray) {
      console.log('entered general nextProps');
      return {
        dataArray: nextProps.style,
      }
    }
    if (nextProps.styleId !== prevState.styleID) {
      console.log('entered general id nextProps');
      return {
        styleID: nextProps.styleId,
      }
    }
  }
  componentDidMount = () => {
    if (Dimensions.get("window").width > 568) {
      this.setState({ tablet: true }, () =>
        console.log("did mount", this.state.tablet)
      );
    }
    // console.log('component did mount called')
    this.getCurrentStyle()
    console.log('state status:', this.state.dataArray);
    // this.setState({
    //   dataArray: this.props.styleData
    // }, () => );

  };
  getCurrentStyle(id) {
    GetAsyncToken()
      .then(token => {
        console.log('id should be', this.props.styleID);
        sId = this.props.styleID == undefined ? this.props.styleId : this.props.styleID;
        console.log('hurray', sId);
        GetSelectedStyle(token, sId)
          .then(res => {
            console.log('got single style : ', res)
            this.props.singleStyleFunction(res)
          })
      })
  }

  onTap = () => { };
  pinZoomLayoutRef = React.createRef();

  getThumbnail = (thumbnails) => {
    console.log("get thumbnail called")
    if (thumbnails != null) {
      thumbnails.some(s => {
        if (s.size > 70000) {
          this.setState({
            imgSrc: s.url
          })
          console.log("perfect size:", s.size);
          return true;
        }
        else if (s.size > 40000) {
          this.setState({
            imgSrc: s.url
          })
          console.log("perfect size 4:", s.size);
          return true;
        }
        return false
      })
    }
  }
  shouldComponentUpdate(nextProps, prevState) {
    // console.log('calling setState', this.state.dataArray, prevState.dataArray);
    if (prevState.dataArray != null) {
      // console.log('should enter',this.state.imgSrc, prevState.imgSrc);
      if (prevState.imgSrc !== null) {
        // console.log('imgSrc', nextProps.imgSrc, prevState.imgSrc)
        return false
      }
      this.getThumbnail(prevState.dataArray.data.styleLogoThumbnails)
    }
    return true
  }
  render() {
    // console.log('store style id: ', this.state.styleID);
    console.log("render in general :", this.props);
    let state = null
    if (this.state.dataArray != null) {
      state = this.state.dataArray.data;
      // this.getThumbnail(this.state.dataArray.data.styleLogoThumbnails)
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
                  <SubTitle>{state.userDefinedId ? state.userDefinedId : "-"}</SubTitle>
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
                    {state.supplier ? `${state.supplier.userDefinedSupplierId} | ` : ' '}
                    {state.supplier ? state.supplier.name : " "}
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
                          <InactiveColorBox color={color.adminColor.rgb ? color.adminColor.rgb : "fff"} />
                          <XView1 />
                          <XView2 />
                          <TitleInactive numberOfLines={1}>
                            {color.adminColor.userDefinedId2 ? color.adminColor.userDefinedId2 : "-"}
                          </TitleInactive>
                          <SubTitleInactive numberOfLines={2}>{color.name ? color.name : '-'} </SubTitleInactive>
                        </Fragment>

                      ) : (
                          <Fragment>
                            <ColorBox color={color.adminColor.rgb ? color.adminColor.rgb : "fff"} />
                            <Title numberOfLines={1}>
                              {color.adminColor.userDefinedId2 ? color.adminColor.userDefinedId2 : "-"}
                            </Title>
                            <SubTitle numberOfLines={2}>{color.name ? color.name : '-'}</SubTitle>
                          </Fragment>

                        )}

                    </Block>
                  )
                })
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
const mapDispatchToProps = dispatch => {
  return {
    singleStyleFunction: (s) => dispatch(singleStyle(s))
  }
}
const mapStateToProps = state => {
  return {
    style: state.singleStyle.singleStyleState,
    styleId: state.styleId.styleIdState
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(General);
