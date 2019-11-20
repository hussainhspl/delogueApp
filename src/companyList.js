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
import { withRouter } from "react-router";
import styled from "styled-components";
import Loader from "./shared/Loader";
import OfflineNotice from "./shared/OfflineNotice";
import CList from "../data/companyList";
import Title from "./styles/SmallText";
import CardText from './styles/CardText';


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
      : Dimensions.get("window").height / 2 - 155};
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
      : Dimensions.get("window").height / 2 - 165};
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
  height: 105px;
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

const LoaderView = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
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
      refreshing: false
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
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
    if (Dimensions.get("window").width > 568) {
      this.setState({ tablet: true }, () =>
        console.log("will mount", this.state.tablet)
      );
    }
    // console.log("will mount out" , this.state.tablet);
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
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

  render() {
    const history = this.props.history;
    console.log("company list tablet", this.state.tablet);
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
          content={<Menu close={this.toggle} history={history} />}
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
                {CList.map(data => {
                  return (
                    <Card tablet={this.state.tablet} key={data.key}>
                      <TouchableOpacity
                        underlayColor="rgba(245, 245, 245, 1)"
                        onPress={() => {
                          history.push("/search");
                        }}
                      >
                        <ImageView tablet={this.state.tablet}>
                          <GridImage
                            tablet={this.state.tablet}
                            resizeMode={"contain"}
                            source={require("../assets/img/shirt-static.png")}
                          />
                        </ImageView>
                        <CardInfo>
                          <View>
                            <Title>Company Name</Title>
                            <CardText numberOfLines={1}>{data.companyName}</CardText>
                          </View>
                          <View>
                            <Title>User Name</Title>
                            <CardText numberOfLines={1}>{data.userName}</CardText>
                          </View>
                          <View>
                            <Title>User Type</Title>
                            <CardText numberOfLines={1}>{data.userType}</CardText>
                          </View>
                        </CardInfo>
                      </TouchableOpacity>
                    </Card>
                  );
                })}
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

export default withRouter(CompanyList);
