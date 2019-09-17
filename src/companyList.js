import React, { Fragment } from 'react';
import { Text, View, FlatList, Dimensions, TouchableOpacity, BackHandler, 
  ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import Menu from './Menu';
// import SideMenu from 'react-native-side-menu';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import Loader from './shared/Loader';
import { Grid, Section, Block } from 'react-native-responsive-layout';

const CList = [
  {
    key: 'A',
    companyName: 'c textiles',
    userName: 'John Doe',
    userType: 'user type',
  },
  {
    key: 'B',
    companyName: 'c textiles',
    userName: 'John Doe',
    userType: 'Wholesaler',
  },
  {
    key: 'C',
    companyName: 'c textiles',
    userName: 'John Doe',
    userType: 'Wholesaler',
  },
  {
    key: 'D',
    companyName: 'c textiles',
    userName: 'John Doe',
    userType: 'Wholesaler',
  },
  {
    key: 'E',
    companyName: 'c textiles',
    userName: 'John Doe',
    userType: 'Wholesaler',
  },
  {
    key: 'F',
    companyName: 'c textiles',
    userName: 'John Doe',
    userType: 'Wholesaler',
  },
  {
    key: 'G',
    companyName: 'c textiles',
    userName: 'John Doe',
    userType: 'Wholesaler',
  },
  {
    key: 'H',
    companyName: 'c textiles',
    userName: 'John Doe',
    userType: 'Wholesaler',
  },
  {
    key: 'I',
    companyName: 'c textiles',
    userName: 'John Doe',
    userType: 'Wholesaler',
  },
  {
    key: 'J',
    companyName: 'c textiles',
    userName: 'John Doe',
    userType: 'Wholesaler',
  },
  // { key: 'K' },
  // { key: 'L' },
];

const Card = styled.View`
  width: ${(props) => props.tablet ? Dimensions.get('window').width / 3 - 13.4 : Dimensions.get('window').width / 2 - 15};
  height: ${(props) => props.tablet ? Dimensions.get('window').height / 3 - 37 : Dimensions.get('window').height / 2 - 50};
  margin: 5px;
  background-color: #fff;
`;

const ImageView = styled.View`
  width: ${(props) => props.tablet ? Dimensions.get('window').width / 3 - 45 : Dimensions.get('window').width / 2 - 45};
  height: ${(props) => props.tablet ? Dimensions.get('window').height / 3 - 98 : Dimensions.get('window').height / 2 - 110};
  margin: 0 auto;
`;

const GridImage = styled.Image`
  width: ${(props) => props.tablet ? Dimensions.get('window').width / 3 - 60 : Dimensions.get('window').width / 2 - 50};
  height: ${(props) => props.tablet ? Dimensions.get('window').height / 3 - 120 : Dimensions.get('window').height / 2 - 130};
  margin: auto;
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
const CardText = styled.Text`
  font-family: ${props => props.theme.regular};
  color: ${props => props.theme.textColor};
`;

const CardInfo = styled.View`
   background-color: #f6f6f6;
    height: 60px;
    width: 100%;
    justify-content: center;
    padding: 5px;
`;

const PageLayout = styled.View`
  background-color: #818181;
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
// const formatData = (data, numColumns) => {
//   const numberOfFullRows = Math.floor(data.length / numColumns);

//   let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
//   while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
//     data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
//     numberOfElementsLastRow++;
//   }
//   return data;
// };
// const numColumns = 2;


class CompanyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      tablet: false,
      loading: false,
      refreshing: false,
    };
    this.toggle = this.toggle.bind(this)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  //refresh code
  onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    },2000);
  };
  componentWillMount() {
    if (Dimensions.get('window').width > 568) {
      this.setState({ tablet: true }, () => console.log("will mount", this.state.tablet))
    }
    // console.log("will mount out" , this.state.tablet);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    this.props.history.goBack();
    return true;
  }
  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open()
  };
  toggle = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    const history = this.props.history;
    // console.log("dimension",this.state.tablet);
    // const tablet = this.state.tablet;
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: "center" }}>
          <Loader />
        </View>
      )
    }
    return (
      <Fragment>
        {/* <SafeAreaView/> */}
        <View style={{ flex: 1 }}>
          <Drawer
            type="overlay"
            ref={(ref) => this._drawer = ref}
            content={<Menu history={history} />}
            openDrawerOffset={0.4} // 20% gap on the right side of drawer
            panCloseMask={0.2}
            styles={drawerStyles}
            side="right"
            tweenHandler={(ratio) => ({
              main: { opacity: (2 - ratio) / 2 }
            })}
            open={this.state.isOpen}
            tapToClose={true}
          >
            <SubHeader>
              <HeaderText> Please Select Company </HeaderText>
              <View>
                <TouchableOpacity
                  onPress={this.toggle}
                >
                  <HamburgerIcon name="ios-menu" />
                </TouchableOpacity>
              </View>
            </SubHeader>
            <PageLayout>
              {/* <Text>hello</Text> */}
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
                  {
                    CList.map(data => {
                      return (

                        <Card tablet={this.state.tablet} key={data.key}>
                          <TouchableOpacity
                            underlayColor='rgba(245, 245, 245, 1)' onPress={() => {
                              history.push("/search");
                            }}
                          >
                            <ImageView tablet={this.state.tablet} >
                              <GridImage
                                tablet={this.state.tablet}
                                resizeMode={"center"}
                                source={require('../assets/img/shirt-static.png')}
                              />
                            </ImageView>
                            <CardInfo>
                              <CardText numberOfLines={1}> {data.companyName} </CardText>
                              <CardText numberOfLines={1}> {data.userName} </CardText>
                              <CardText numberOfLines={1}> {data.userType} </CardText>
                            </CardInfo>
                          </TouchableOpacity>
                        </Card>
                      )
                    })
                  }
                </ParentView>
              </ScrollView>
            </PageLayout>
          </Drawer>
        </View>
        {/* <SafeAreaView/> */}
        {/* <SafeAreaView/> */}
        
      </Fragment>
    )
  }
}
const drawerStyles = {
  drawer: { shadowColor: '#aaaaaa', shadowOpacity: 0.4, shadowRadius: 3 },
  // main: { flex: 1 },
}

export default withRouter(CompanyList);