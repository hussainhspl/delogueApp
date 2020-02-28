import React, { Fragment } from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import styled from 'styled-components';
// import GetAsyncToken from '../../../script/getAsyncToken';
// import GetDesign from '../../../api/sample/getDesign';
import { CheckBox } from "native-base";
import SmallText from '../../../styles/SmallText';
import ImageCard from '../../../shared/ImageCard';
import TextEditor from '../textEditor';
import CNRichTextEditor, {
  CNToolbar, getInitialObject, getDefaultStyles,
  convertToHtmlString
} from "react-native-cn-richtext-editor";
import Separator from '../../../styles/Separator';
import StyleRow from '../../../styles/StyleRow';
import AutoHeightWebView from 'react-native-autoheight-webview';
import SharedImageViewer from '../../../shared/sharedImageViewer';
import SharedImagePicker from '../../../shared/sharedImagePicker';
import { connect } from 'react-redux';
import { design } from '../../../store/actions/index';

const MainView = styled.View`
  margin: 15px;
`;
const CheckBoxText = styled.Text`
  padding-left: 10px;
  font-family: ${ props => props.theme.regular};
`;


class Design extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      designData: null,
      textArea: '',
      selectedStyles: [],
      value: [getInitialObject()],
      images: []
    }
  }
  componentDidMount = () => {
    console.log('design did mount', this.props.data)
    this.setState({
      designData: this.props.data,
      textArea: this.props.data.designCommentDetails.designerComment.text
    }, () => console.log('done text area'))
    // GetAsyncToken()
    //   .then(token => {
    //     GetDesign(token, this.props.id)
    //       .then(res => {
    //         console.log('design data from api', res)
    //         this.setState({
    //           designData: res.data,
    //           textArea: res.data.designCommentDetails.designerComment.text
    //         })
    //       })
    //   })

  }
  updateText () {
    this.setState({ textArea: html},

    )
  }
  visualData = (data) => {
    this.setState({ images: data })
  }

  render() {
    console.log('Text area state', this.state.textArea, this.state.designData);
    return (
      <MainView>
        {
          this.state.designData != null ?
            <Fragment>
              <SmallText>Design</SmallText>
              <StyleRow>
                <CheckBox color="#aaa"
                  checked={this.state.designData.designCommentDetails.approved}
                  style={{ left: 0, paddingLeft: 4 }}
                  onPress={this.changeList}
                />
                <CheckBoxText>Approved </CheckBoxText>
              </StyleRow>
              <Separator />
              <SmallText>Design</SmallText>
              <View style={{ height: 200, marginTop: 10 }}>
                {/* {
                  this.state.textArea !== null && ( */}
                <TextEditor
                  initialValue={this.state.textArea}
                  bodyHtml={(html) => this.updateText(html)}
                />
                {/* )} */}
              </View>
              <Separator />
              {/* <SmallText>Visual Comments</SmallText> */}
              <View>
                {
                  this.state.designData.designCommentDetails.designerComment.visualComments.length > 0 > 0 ?
                    <SharedImagePicker
                      childData={this.visualData}
                      initialImages={this.state.designData.designCommentDetails.designerComment.visualComments}
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
                source={{ html: `<html><head></head><body>${this.state.designData.designCommentDetails.supplierComment.text}</body></html>` }}
                scalesPageToFit={false}
                viewportContent={'width=device-width, user-scalable=no'}
              />
              <Separator />
              {/* <SmallText>Visual Comments </SmallText> */}
              <SharedImageViewer
                initialImages={this.state.designData.designCommentDetails.supplierComment.visualComments.length > 0 ?
                  this.state.designData.designCommentDetails.supplierComment.visualComments
                  : null
                }
              />
              
            </Fragment>
            : <Text> loading</Text>}
      </MainView>

    )
  }
}
const mapStateToProps = state => {
  return {
    // unreadList: state.unreadMessagesList.unreadMessagesListState
  };
};
const mapDispatchToProps = dispatch => {
  return {
    designFunction: (data) => dispatch(design(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Design);

