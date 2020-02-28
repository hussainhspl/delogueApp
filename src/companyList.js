import React, { Fragment } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  RefreshControl,
  SafeAreaView
} from "react-native";
import Menu from "./Menu";
import Drawer from "react-native-drawer";
import Icon from "react-native-vector-icons/Ionicons";
// import { withRouter } from "react-router";
import styled from "styled-components";
import {connect} from 'react-redux';
import AsyncStorage from "@react-native-community/async-storage";

import Loader from "./shared/Loader";
import OfflineNotice from "./shared/OfflineNotice";
import CList from "../data/companyList";
import Title from "./styles/SmallText";
import CardText from './styles/CardText';
import LoaderView from './styles/LoaderView'
import LoginStep2 from './api/loginStep2';
import Message from './components/message/message'


const Card = styled.View`
  width: ${props =>
    props.tablet
      ? Dimensions.get("window").width / 3 - 13.4
      : Dimensions.get("window").width / 2 - 15};
  height: ${props =>
    props.tablet
      ? Dimensions.get("window").height / 3 - 37
      : Dimensions.get("window").height / 2 - 50};
  margin: 5px;
  background-color: #fff;
`;

const ImageView = styled.View`
  width: ${props =>
    props.tablet
      ? Dimensions.get("window").width / 3 - 45
      : Dimensions.get("window").width / 2 - 25};
  height: ${props =>
    props.tablet
      ? Dimensions.get("window").height / 3 - 98
      : Dimensions.get("window").height / 2 -190};
  margin: 0 auto;
  /* background-color: #f66; */
`;

const GridImage = styled.Image`
  width: ${props =>
    props.tablet
      ? Dimensions.get("window").width / 3 - 60
      : Dimensions.get("window").width / 2 - 30};
  height: ${props =>
    props.tablet
      ? Dimensions.get("window").height / 3 - 120
      : Dimensions.get("window").height / 2 - 200};
  margin: auto;
  /* background-color: #ddd; */
`;
const SubHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
`;

const HeaderText = styled.Text`
  font-family: ${props => props.theme.bold};
`;

const CardInfo = styled.View`
  background-color: #f6f6f6;
  height: 140px;
  width: 100%;
  justify-content: space-between;
  padding: 2px 5px;
`;

const PageLayout = styled.View`
  background-color: #444;
  flex: 1;
`;

const HamburgerIcon = styled(Icon)`
  color: #000;
  font-size: 30px;
  padding: 10px 15px;
`;

const ParentView = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  padding: 5px;
`;


const MainView = styled.View`
  flex: 1;
`;

class CompanyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      tablet: false,
      loading: true,
      refreshing: false,
      companyData: null,
      token: "",
      imgSrc: null,
    };
    this.toggle = this.toggle.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  //refresh code
  onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 2000);
  };
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.companyData !== prevState.companyData) {
  //     // console.log("Entered nextProps");
  //     // console.log("Entered prevState", prevState);
  //     return {
  //       companyData: nextProps.userData,
  //     }
  //   }
  //   return null;
  // }
  getCompanyData = async () => {
    try {
      const userData = await AsyncStorage.getItem("@userData");
      const parseData = JSON.parse(userData);
      this.setState({
        companyData: parseData
      })
    }
    catch (error) {
      if(error)
        console.log('error fetching user data', error);
    }
  }
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
    if (Dimensions.get("window").width > 568) {
      this.setState({ tablet: true });
    }
    // console.log("will mount out" , this.state.tablet);
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    this.getCompanyData()
  };
  componentWillUnmount = () => {
    clearTimeout();
  };
  handleBackButtonClick() {
    this.props.history.goBack();
    return true;
  }
  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };
  toggle = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };
  getCredential = async () => {
    try {
      const username = await AsyncStorage.getItem("@username");
      const pass = await AsyncStorage.getItem("@password");

      if(username && pass)
        return [username, pass];
    }
    catch (error) {
      if(error)
        console.log('no username found', error);
    }
  }
  GetToken = (designerId, uid, organizationType)  => {
    this.getCredential()
      .then(cred =>{
        const [username, password] = cred;
        // console.log("async cred", cred, uname, pass, uid);
        LoginStep2(designerId, uid, username, password)
        .then(res => {
          console.log('data after successful login:', res);
          let tokenExp = new Date(res.headers.date);
          let seconds = res.data.expires_in;
          tokenExp.setSeconds(tokenExp.getSeconds() + seconds);
          let strUid = JSON.stringify(uid);
          let strDesignerId = JSON.stringify(designerId);
          console.log('strUid', strUid, strDesignerId);
          let strOrgType = JSON.stringify(organizationType)

          // console.log('coming here', strUid, uid, typeof(uid), typeof(designerId))
          AsyncStorage.multiSet([
            ["@designerId", strDesignerId],
            ["@userId", strUid],
            ["@organizationType",strOrgType]
          ])
          this.setState(
            {
              token: res.data.access_token,
            },
            () => this.storeToken(tokenExp)
          );
        })
      })
    // console.log('get token called', designerId, uid);
    
  }
  storeToken = async tokenExp => {
    let strTokenExp = JSON.stringify(tokenExp)
    console.log("Storing data in async function", tokenExp, this.state.token, typeof(this.state.token), strTokenExp, typeof(strTokenExp));
    try {
      // await AsyncStorage.setItem('@token', this.state.token)
      AsyncStorage.multiSet([
        ["@token", this.state.token],
        ["@tokenExpiry", strTokenExp]
      ]);
      console.log("data saved successfully");
      this.props.history.push({
        pathname:"/message"
      })
    } 
    catch (e) {
      console.log("Error while saving token 11", e);
    }
  };
  render() {
    const history = this.props.history;
    console.log("company list tablet", this.state.tablet);
    // console.log('user data from redux', this.props.userData)
    // const tablet = this.state.tablet;
    if (this.state.loading) {
      return (
        <LoaderView>
          <Loader />
        </LoaderView>
      );
    }
    return (
      <MainView>
        <Drawer
          type="overlay"
          ref={ref => (this._drawer = ref)}
          content={<Menu 
            close={this.toggle} 
            history={history}
          />}
          openDrawerOffset={0.4} // 20% gap on the right side of drawer
          panCloseMask={0.2}
          styles={drawerStyles}
          side="right"
          tweenHandler={ratio => ({
            main: { opacity: (2 - ratio) / 2 }
          })}
          open={this.state.isOpen}
          tapToClose={true}
        >
          <OfflineNotice />
          <SubHeader>
            <HeaderText> Please Select Company </HeaderText>
            <View>
              <TouchableOpacity onPress={this.toggle}>
                <HamburgerIcon name="ios-menu" />
              </TouchableOpacity>
            </View>
          </SubHeader>
          <PageLayout>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                  title="pull to refresh"
                />
              }
            >
              <ParentView>
                {this.state.companyData != null ? 
                  this.state.companyData.map((data, i) => {
                    this.state.imgSrc = null;
                    data.brands.some(img => {
                      if(img.logo !=null) {
                        this.state.imgSrc = img.logo.url
                        return true;
                      }
                      return false;
                    })
                  return (
                    <Card tablet={this.state.tablet} key={i}>
                      <TouchableOpacity
                        underlayColor="rgba(245, 245, 245, 1)"
                        onPress={() => { 
                          // history.push("/search");
                          this.GetToken(
                            data.designerOrganizationId, data.id, data.organizationType
                          )
                          // console.log('clicked on', data.designerOrganizationId, data.id, this.props.location.password)
                          // LoginStep2(
                          //   data.designerOrganizationId, data.id,
                          //   this.props.location.username,
                          //   this.props.location.password
                          // )
                        }}
                      >
                        <ImageView tablet={this.state.tablet}>
                          <GridImage
                            tablet={this.state.tablet}
                            resizeMode={"contain"}
                            // source={require("../assets/img/shirt-static.png")}
                            source={{uri: this.state.imgSrc ? this.state.imgSrc: noImage}}
                          />
                        </ImageView>
                        <CardInfo>
                          <View>
                            <Title>Company Name</Title>
                            <CardText numberOfLines={1}>{data.designerOrganizationName}</CardText>
                          </View>
                          <View>
                            <Title>Supplier Company</Title>
                            <CardText numberOfLines={1}>{data.organizationName}</CardText>
                          </View>
                          <View>
                            <Title>User Name</Title>
                            <CardText numberOfLines={1}>{data.name}</CardText>
                          </View>
                          <View>
                            <Title>User Type</Title>
                            {
                              data.organizationType == 1 ?
                                <CardText numberOfLines={1}>Designer User</CardText>
                              :
                                <CardText numberOfLines={1}>Supplier User</CardText>
                            }
                          </View>
                        </CardInfo>
                      </TouchableOpacity>
                    </Card>
                  );
                }) 
                : <Text style={{color: "#fff", padding: 20}}> loader</Text>}
              </ParentView>
            </ScrollView>
          </PageLayout>
        </Drawer>
      </MainView>
    );
  }
}
const drawerStyles = {
  drawer: { shadowColor: "#aaaaaa", shadowOpacity: 0.4, shadowRadius: 3 }
  // main: { flex: 1 },
};

const mapStateToProps = state => {
  return {
    userData: state.user.userState
  };
};
export default connect(mapStateToProps)(CompanyList);
