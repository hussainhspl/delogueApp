import React, { Fragment } from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import styled from 'styled-components';
// import GetAsyncToken from '../../../script/getAsyncToken';
// import GetCustomComment from '../../../api/sample/getCustomComment';
import { CheckBox, Segment } from "native-base";
import SmallText from '../../../styles/SmallText';
import ImageCard from '../../../shared/ImageCard';
import TextEditor from '../textEditor';
import CNRichTextEditor, {
  CNToolbar, getInitialObject, getDefaultStyles,
  convertToHtmlString
} from "react-native-cn-richtext-editor";
import Separator from '../../../styles/Separator';
import StyleRow from '../../../styles/StyleRow';
import CardText from '../../../styles/CardText';
import { get } from 'lodash'
import AutoHeightWebView from 'react-native-autoheight-webview';
import SharedImagePicker from '../../../shared/sharedImagePicker';
import SharedImageViewer from '../../../shared/sharedImageViewer';


const MainView = styled.View`
  margin: 15px;
`;

class CustomComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customData: null,
      textArea: "",
      selectedStyles: [],
      value: [getInitialObject()],
      images: [],
      imagesSupplier: [],

    }
  }
  componentDidMount = () => {
    console.log('custom did mount', this.props.data, this.props.data[0].designerComment);
    this.setState({
      customData: this.props.data[0],
      textArea: this.props.data[0].designerComment.text
    })
    // GetAsyncToken()
    //   .then(token => {
    //     console.log('custom id', this.props.commentFieldId);
    //     GetCustomComment(token, this.props.id, this.props.commentFieldId)
    //       .then(res => {
    //         console.log('custom comments data from api', res)
    //         this.setState({
    //           customData: res.data.styleSampleRequestCommentFields,
    //           textArea: res.data.styleSampleRequestCommentFields.designerComment.text
    //         })

    //       })
    //   })
  }

  visualData = (data) => {
    this.setState({ images: data })
  }
  visualDataSupplier = (data) => {
    this.setState({ imagesSupplier: data })
  }
  render() {
    console.log('custom comments : ', this.state.customData)
    return (
      <MainView>
        {
          this.state.customData != null ?
            <Fragment>
              <SmallText >comments by company</SmallText>
              <View style={{ height: 200, marginTop: 10 }}>
                <TextEditor
                  initialValue={this.state.textArea}
                  bodyHtml={(html) => this.setState({ textArea: html })}
                />

              </View>
              <Separator />
              <View>
                {
                  this.state.customData.designerComment.visualComments.length > 0 ?
                    <SharedImagePicker
                      childData={this.visualDataSupplier}
                      initialImages={this.state.customData.designerComment.visualComments}
                    />
                    :
                    <SharedImagePicker
                      childData={this.visualDataSupplier}
                      initialImages={null}
                    />
                }
              </View>
              {/* <SmallText>Visual Comments</SmallText>
              <StyleRow>
                {
                  this.state.customData.designerComment.visualComments.length > 0 ?
                    this.state.customData.designerComment.visualComments.map(d => {
                      console.log('map data', d);
                      return (
                        <ImageCard
                          bigImgUrl={d.url}
                          imgPath={{ uri: d.url }}
                          fileName={d.name}
                        />
                      )
                    })
                    : null
                }

              </StyleRow> */}
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
              {/* <View>
                {
                  this.state.customData.supplierComment.visualComments.length > 0 ?
                    <SharedImagePicker
                      childData={this.visualDataSupplier}
                      initialImages={this.state.customData.supplierComment.visualComments}
                    />
                    :
                    <SharedImagePicker
                      childData={this.visualDataSupplier}
                      initialImages={null}
                    />
                }
              </View> */}
              
            </Fragment>
            : <Text>loading</Text>
        }
      </MainView>
    )
  }
}
export default CustomComment;