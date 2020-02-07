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
import ZoomImage from "./zoomImage";
import FollowComponent from "./followComponent";

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

// const FollowView = styled.View`
//   width: 40px;
//   height: 40px;
//   position: absolute;
//   bottom: 10;
//   left: 10;
//   background-color: #eeeeee6e;
//   border-radius: 20px;
//   justify-content: center;
//   align-items: center;
//   z-index: 1;
// `;
// const FollowTouchableHighlight = styled.TouchableHighlight`
//   width: 40px;
//   height: 40px;
//   border-radius: 20px;
//   justify-content: center;
//   align-items: center;
// `;
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
      styleID: null,
      currentState: null
    };
    this.getThumbnail = this.getThumbnail.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.style !== prevState.dataArray) {
      console.log('entered general nextProps', nextProps.style);
      // if(prevState.followState != nextProps.followState)
      return {
        dataArray: nextProps.style,
      }
    }
    if (nextProps.styleId !== prevState.styleID) {
      // this.getThumbnail(nextProps.style.data.styleLogoThumbnails)
      // console.log('entered general id nextProps',nextProps);
      
      return {
        styleID: nextProps.styleId,
      }
    }
    return null;
  }
  // UNSAFE_componentWillReceiveProps(nextProps, prevState) {
  //   // console.log('unsafe ')
  // }
  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   // console.log('get snapshot method called');
  //   // if (nextProps.style !== prevState.dataArray) {
  //   //   console.log('should component in update');
  //   //   this.getThumbnail(this.state.dataArray.data.styleLogoThumbnails)
  //   // }
  // }

  componentDidUpdate(prevProps, prevState) {
    // console.log('should component update', this.props, prevProps);

    if (prevProps.style == null) {
      // console.log('entered null')
      this.getThumbnail(this.props.style.data.styleLogoThumbnails)
    }
    if (prevProps.style != null) {
      // console.log('1');
      // console.log('should component update in', this.props.style.data.id, prevProps.style.data.id);
      if (this.props.style.data.id !== prevProps.style.data.id) {
        console.log('entered')
        this.getThumbnail(this.props.style.data.styleLogoThumbnails)
      }
    }


    // if (nextProps.style !== prevState.dataArray) {
    //   console.log('should component in update');
    //   this.getThumbnail(nextProps.style.data.styleLogoThumbnails)
    // }
    // if(nextProps.imgSrc !== prevState.imgSrc) {
    //   console.log('img src : ');
    //   this.getThumbnail(nextProps.style.data.styleLogoThumbnails)
    // }
  }

  componentDidMount = () => {
    if (Dimensions.get("window").width > 568) {
      this.setState({ tablet: true }, () =>
        console.log("did mount", this.state.tablet)
      );
    }
    // console.log('component did mount called')
    // if(this.state.dataArray == null){
      this.getCurrentStyle()
    // }
    
    // console.log('state status:', this.state.dataArray);
    // if(this.state.dataArray !=null)
    //   this.getThumbnail(this.state.dataArray.data.styleLogoThumbnails)
    // this.setState({
    //   dataArray: this.props.styleData
    // }, () => );

  };
  getCurrentStyle(id) {
    console.log('getting single style')
    GetAsyncToken()
      .then(token => {
        // console.log('id should be', this.props.styleID);
        sId = this.props.styleID == undefined ? this.props.styleId : this.props.styleID;
        console.log('hurray', sId);
        GetSelectedStyle(token, sId)
          .then(res => {
            console.log('got single style : ', res);
            this.props.singleStyleFunction(res)
            // debugger;
          })
      })
  }

  onTap = () => { };
  pinZoomLayoutRef = React.createRef();

  getThumbnail = (thumbnails) => {
    // console.log("get thumbnail called", thumbnails)
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
        // else if (s.size < 40000 && s.size > 20000) {
        //   this.setState({
        //     imgSrc: s.url
        //   })
        //   console.log("perfect size 2:", s.size);
        //   return true;
        // }
        return false
      })
    }
  }

  render() {
    // console.log('store style id: ', this.state.styleID);
    console.log("render in general :", this.state.dataArray);
    let state = null;
    if (this.state.dataArray != null) {
      state = this.state.dataArray.data;
      // console.log('general rendered');
      // if(state.styleLogoThumbnails != null) {
      //   return null
      // }
      // let styleState;
    }
    return (
      <Fragment>
        {state != null ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              // console.log('general id', this.state.imgSrc ? this.state.imgSrc : state.logo ? state.logo.url : noImage )
            }
            <View>
              {/* <Image style= {{height: 400}} source={{uri: this.state.imgSrc ? this.state.imgSrc : state.logo ? state.logo.url : noImage}} /> */}
              
                {/* <SImageLayout
                  renderPageHeader={this._renderPageHeader}
                  renderPageFooter={this._renderPageFooter}
                  imageContainerStyle={{ backgroundColor: "#eee" }}
                  pageScrollViewStyle={{ backgroundColor: "#000" }}
                  // imagePageComponent={ () => resizeMode: "contain"}
                  resizeMode={"contain"}
                  columns={1}
                  enableScale
                  rerender={true}
                  images={[
                    {
                      // uri: state.logo ? state.logo.url : noImage
                      uri: this.state.imgSrc ? this.state.imgSrc : state.logo ? state.logo.url : noImage
                    }
                  ]}
                />  */}
                {/* {
                  state.styleLogoThumbnails == null ?
                    <Image style= {{height: 400}} source={{uri: noImage}} />  
                    :
                    <ZoomImage
                      imgSource = {this.state.imgSrc ? this.state.imgSrc : state.logo ? state.logo.url : noImage }
                    />
                } */}
                {state.logo != null && (
                  state.styleLogoThumbnails.length > 0 ? 
                    <ZoomImage
                      src="thumbnail"
                      imgSource = {this.state.imgSrc}
                    />
                    :
                    <ZoomImage
                      src="logo"
                      imgSource = {state.logo.url}
                    />
                )}
                {state.logo == null && (
                  <ZoomImage
                  src="noLogo"
                  imgSource = {noImage}
                /> 
                )}
              <Icon
                style={{
                  position: "absolute",
                  right: 10,
                  bottom: 10,
                  color: "#999"
                }}
                name="expand"
              />
              {/* <FollowView>
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
              </FollowView> */}
              <FollowComponent
                id = {state.id} 
                isFollow = {state.isFollower}
                callSingleStyle={(id) => this.getCurrentStyle(id)}
              />
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
                  <SubTitle>{
                    state.state == 0 ? "unpublished" :
                    state.state == 1 ? "published" :
                    state.state == 2 ? "deleted":
                    state.state == 3 ? "delivered":
                    state.state == 4 ? "cancelled":
                    state.state == 1 ? "work in progress":
                    null}
                  </SubTitle>
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
                        return <SubTitle key={d.id}>{d.name}</SubTitle>;
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
                    <Block key={color.id}>
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
