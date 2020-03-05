import React, { Fragment } from 'react';
import { View, Text, Dimensions } from 'react-native';
import styled from 'styled-components';
// import GetAsyncToken from '../../../script/getAsyncToken';
// import GetCustomComment from '../../../api/sample/getCustomComment';
import { CheckBox, Segment } from "native-base";
import SmallText from '../../../styles/SmallText';
import TextEditor from '../textEditor';
import Separator from '../../../styles/Separator';
import { get } from 'lodash'
import AutoHeightWebView from 'react-native-autoheight-webview';
import SharedImagePicker from '../../../shared/sharedImagePicker';
import SharedImageViewer from '../../../shared/sharedImageViewer';
import { connect } from 'react-redux';
import { customComments } from '../../../store/actions/index';



const MainView = styled.View`
  margin: 15px;
`;

class CustomComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCustomData: null,
      allCustomData1 : null,
      customData: null,
      textArea: "",
      selectedStyles: [],
      images: [],
      imagesSupplier: [],

    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.allCustomData !== prevState.allCustomData) {
      console.log("Entered nextProps");
      return {
        allCustomData: nextProps.customCommentsStoreState,
      }
    }
    return null;
  }
  componentDidMount = () => {
    console.log('custom did mount', this.props.customCommentsStoreState );
    let currentCustomTab = this.state.allCustomData.filter(data => data.adminSampleRequestCommentField.id == this.props.sectionId)
    console.log('currentCustomTab', currentCustomTab)
    
    this.setState({
      customData: currentCustomTab[0],
      textArea: currentCustomTab[0].designerComment.text != "" ? currentCustomTab[0].designerComment.text : null
    })

    // GetAsyncToken()
    //   .then(token => {
    //     console.log('custom id', this.props.commentFieldId);
    //     Gets(token, this.props.id, this.props.commentFieldId)
    //       .then(res => {
    //         console.log('custom comments data from api', res)
    //         this.setState({
    //           customData: res.data.styleSampleRequestCommentFields,
    //           textArea: res.data.styleSampleRequestCommentFields.designerComment.text
    //         })

    //       })
    //   })
  }
  updateText(html) {
    console.log("entering updated state");
    this.setState({ textArea: html },
      () => this.updateRedux(html)
    )
  }
  updateRedux(text) {
    this.setState({allCustomData1: this.state.allCustomData})
    this.setState(prevState => ({
			allCustomData1: prevState.allCustomData1.map(
				(el) => el.id == this.state.customData.id ? {
					...el, designerComment: {
            "text": text,
            "visualComments": this.state.images
          }
				} : el
			)

    }), () => this.props.customCommentsFunction(this.state.allCustomData1))

  }
  visualData = (data) => {
    this.setState({ images: data })
  }
  visualDataSupplier = (data) => {
    this.setState({ imagesSupplier: data })
  }
  render() {
    console.log('custom comments : ', this.state.customData);
    return (
      <MainView>
        {
          this.state.customData != null ?
            <Fragment>
              <SmallText >comments by company</SmallText>
              <View style={{ height: 200, marginTop: 10 }}>
                <TextEditor
                  initialValue={this.state.textArea}
                  bodyHtml={(html) => this.updateText(html)}
                />

              </View>
              <Separator />
              <View>
                {
                  this.state.customData.designerComment.visualComments.length > 0 ?
                    <SharedImagePicker
                      childData={this.visualData}
                      initialImages={this.state.customData.designerComment.visualComments}
                    />
                    :
                    <SharedImagePicker
                      childData={this.visualData}
                      initialImages={null}
                    />
                }
              </View>
              
              <Separator />
              <SmallText>Comments by Supplier </SmallText>
              <AutoHeightWebView
                style={{ width: Dimensions.get('window').width - 45, marginTop: 5 }}
                customStyle={`
                    * {
                      font-family: ${props => props.theme.regular};
                      font-size: ${props => props.theme.large};
                      color: ${props => props.theme.textColor};
                    }`
                }
                source={{ html: `<html><head></head><body>${this.state.customData.supplierComment.text}</body></html>` }}
                scalesPageToFit={false}
                viewportContent={'width=device-width, user-scalable=no'}
              />
              <Separator />
                <SharedImageViewer 
                  initialImages={this.state.customData.supplierComment.visualComments}
                />
              
              
            </Fragment>
            : <Text>loading</Text>
        }
      </MainView>
    )
  }
}
const mapStateToProps = state => {
  return {
    
    customCommentsStoreState: state.sampleRequestTabs.customCommentsState
    
  };
};
const mapDispatchToProps = dispatch => {
	return {
		customCommentsFunction: (data) => dispatch(customComments(data)),
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomComment);