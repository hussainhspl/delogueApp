import React, { Fragment } from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import styled from 'styled-components';
// import GetAsyncToken from '../../../script/getAsyncToken';
// import GetFinish from '../../../api/sample/getFinish';
import { CheckBox } from "native-base";
import SmallText from '../../../styles/SmallText';
import ImageCard from '../../../shared/ImageCard';
import TextEditor from '../textEditor';
import Separator from '../../../styles/Separator';
import StyleRow from '../../../styles/StyleRow';
import CardText from '../../../styles/CardText';
import AutoHeightWebView from 'react-native-autoheight-webview';
import SharedImagePicker from '../../../shared/sharedImagePicker';
import SharedImageViewer from '../../../shared/sharedImageViewer';
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from 'react-redux';
import { finishOutside, finishInside, finish } from '../../../store/actions/index';

// import sharedImageViewer from '../../../shared/sharedImageViewer';

const MainView = styled.View`
  margin: 15px;
`;
const CheckBoxText = styled.Text`
  padding-left: 10px;
  font-family: ${ props => props.theme.regular};
`;

class Finish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finishData: null,
      finishData1: null,
      finishData2: null,
      textAreaOutside: null,
      textAreaInside: "",
      imagesInside: [],
      imagesOutside: [],

    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.finishData !== prevState.finishData) {
      console.log("Entered nextProps");
      return {
        finishData: nextProps.finishStoreState,
        textAreaOutside: nextProps.finishStoreState.finishOutsideDesignerComment.text != "" ? nextProps.finishStoreState.finishOutsideDesignerComment.text : null,
        textAreaInside: nextProps.finishStoreState.finishInsideDesignerComment.text != "" ? nextProps.finishStoreState.finishInsideDesignerComment.text : null,
      }
    }
    return null;
  }
  componentDidMount = () => {
    console.log('this.props finishOutsideState ', this.props.finishStoreState);
    // this.setState({
    //   finishData: this.props.data,
    //   textAreaOutside: this.props.data.finishOutsideDesignerComment.text != "" ? this.props.data.finishOutsideDesignerComment.text : null,
    //   textAreaInside: this.props.data.finishInsideDesignerComment.text != "" ? this.props.data.finishInsideDesignerComment.text : null,
    // })

    this.getUserType()

    // GetAsyncToken()
    //   .then(token => {
    //     GetFinish(token, this.props.id)
    //       .then(res => {
    //         console.log('finish data from api',res)
    //         this.setState({
    //           finishData : res.data,
    //           textAreaOutside: res.data.finishOutsideDesignerComment.text,
    //           textAreaInside: res.data.finishInsideDesignerComment.text,

    //         })
    //       })
    //   })
  }
  getUserType = async () => {
    try {
      const organizationType = await AsyncStorage.getItem("@organizationType");
      const parseData = JSON.parse(organizationType);
      console.log('async parse data :', parseData)

      // this.setState({
      //   companyData: parseData
      // })
    }
    catch (error) {
      if (error)
        console.log('error fetching user data', error);
    }
  }
  updateOutsideText(html) {
    console.log("entering updated state");
    this.setState({ textAreaOutside: html },
      () => this.updateOutsideRedux(html)
    )
  }
  updateOutsideRedux(text) {
    console.log('this.state.textArea',text, this.state.finishData);
    this.setState({finishData1: this.state.finishData});
    this.setState(prevState => ({    
      finishData1: {
        ...prevState.finishData1,
        finishOutsideDesignerComment: {
            "text": text,
            "visualComments": this.state.imagesOutside
          }
      }
    }), () => this.props.finishFunction(this.state.finishData1))
    // () => this.props.finishFunction(this.state.finishData1)
  }
  updateInsideRedux(text) {
    console.log('this.state.textArea',text, this.state.finishData);
    this.setState({finishData2: this.state.finishData});
    this.setState(prevState => ({    
      finishData2: {
        ...prevState.finishData2,
        finishInsideDesignerComment: {
            "text": text,
            "visualComments": this.state.imagesInside
          }
      }
    }), () => this.props.finishFunction(this.state.finishData2))
    // () => this.props.finishFunction(this.state.finishData2)
  }
  updateInsideText(html) {
    console.log('inside text')
    this.setState({ textAreaInside: html },
      () => this.updateInsideRedux(html)
    )
  }
  
  visualDataInside = (data) => {
    this.setState({ imagesInside: data },
      () => this.updateInsideRedux(this.state.textAreaInside)
    )
  }
  visualDataOutside = (data) => {
    this.setState({ imagesOutside: data },
      () =>  this.updateOutsideRedux(this.state.textAreaOutside)
    )
  }
 
  render() {
    console.log('in render 111', this.state.finishData);
    // this.state.finishData != null ?
    //   console.log('hey', this.state.finishData.finishInsideSupplierComment.visualComments)
    // : null
    // // console.log('finish text in render', this.state.finishData, this.state.textAreaInside);
    // console.log('text Area outside in render', this.state.textAreaOutside)
    return (
      <MainView>
        {
          this.state.finishData != null ?
            <Fragment>
              <SmallText>Finish Outside</SmallText>
              {/* <StyleRow>
                <CheckBox color="#aaa"
                  checked={true}
                  style={{ left: 0, paddingLeft: 4 }}
                  onPress={this.changeList}
                />
                <CheckBoxText>Approved </CheckBoxText>
              </StyleRow> */}
              <Separator />
              <SmallText>Comments by Company</SmallText>
              <View style={{ height: 200, marginTop: 10 }}>
                {/* {this.state.textAreaOutside != null && ( */}
                <TextEditor
                  initialValue={this.state.textAreaOutside}
                  bodyHtml={(html) => this.updateOutsideText(html)}
                />
                {/* )} */}

              </View>
              <Separator />
              <View>
                {
                  this.state.finishData.finishOutsideDesignerComment.visualComments.length > 0 > 0 ?
                    <SharedImagePicker
                      childData={this.visualDataOutside}
                      initialImages={this.state.finishData.finishOutsideDesignerComment.visualComments}
                    />
                    :
                    <SharedImagePicker
                      childData={this.visualDataOutside}
                      initialImages={null}
                    />
                }
              </View>

              <Separator />
              <SmallText>Comments by Supplier</SmallText>
              <AutoHeightWebView
                style={{ width: Dimensions.get('window').width - 45, marginTop: 5 }}
                customStyle={`
              * {
                font-family: ${props => props.theme.regular};
                font-size: ${props => props.theme.large};
                color: ${props => props.theme.textColor};
              }`
                }
                source={{ html: `<html><head></head><body>${this.state.finishData.finishOutsideSupplierComment.text}</body></html>` }}
                scalesPageToFit={false}
                viewportContent={'width=device-width, user-scalable=no'}
              />
              <Separator />
              <SharedImageViewer
                initialImages={this.state.finishData.finishOutsideSupplierComment.visualComments.length > 0 ?
                  this.state.finishData.finishOutsideSupplierComment.visualComments
                  : null }
              />

              <Separator />
              <SmallText>Finish Inside</SmallText>
              {/* <StyleRow>
                <CheckBox color="#aaa"
                  checked={false}
                  style={{ left: 0, paddingLeft: 4 }}
                  onPress={this.changeList}
                />
                <CheckBoxText>Approved </CheckBoxText>
              </StyleRow> */}
              <Separator />
              <SmallText>Comments by Company</SmallText>
              <View style={{ height: 200, marginTop: 10 }}>
                <TextEditor
                  initialValue={this.state.textAreaInside}
                  bodyHtml={(html) => this.updateInsideText(html)}
                />
              </View>
              <Separator />
              <View>
                {
                  this.state.finishData.finishInsideDesignerComment.visualComments.length > 0 > 0 ?
                    <SharedImagePicker
                      childData={this.visualDataInside}
                      initialImages={this.state.finishData.finishInsideDesignerComment.visualComments}
                    />
                    :
                    <SharedImagePicker
                      childData={this.visualDataInside}
                      initialImages={null}
                    />
                }
              </View>
              <Separator />
              <SmallText>Comments by Supplier</SmallText>
              <AutoHeightWebView
                style={{ width: Dimensions.get('window').width - 45, marginTop: 5 }}
                customStyle={`
              * {
                font-family: ${props => props.theme.regular};
                font-size: ${props => props.theme.large};
                color: ${props => props.theme.textColor};
              }`
                }
                source={{ html: `<html><head></head><body>${this.state.finishData.finishInsideSupplierComment.text}</body></html>` }}
                scalesPageToFit={false}
                viewportContent={'width=device-width, user-scalable=no'}
              />
              <Separator />
              <SharedImageViewer
                initialImages={this.state.finishData.finishInsideSupplierComment.visualComments.length > 0 ?
                  this.state.finishData.finishInsideSupplierComment.visualComments
                  : null }
              />
              
            </Fragment >
            : <Text>loading</Text>
        }
      </MainView>
    )
  }
}
const mapStateToProps = state => {
  return {
    // unreadList: state.unreadMessagesList.unreadMessagesListState
    // designState: state.sampleRequestTabs.designState,
    finishStoreState: state.sampleRequestTabs.finishState,

  };
};
const mapDispatchToProps = dispatch => {
  return {
    finishOutsideFunction: (data) => dispatch(finishOutside(data)),
    finishInsideFunction: (data) => dispatch(finishInside(data)),
    finishFunction: (data) => dispatch(finish(data)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Finish);
