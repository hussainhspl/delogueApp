import React, { Fragment } from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import styled from 'styled-components';
import GetAsyncToken from '../../../script/getAsyncToken';
import GetItemPlacement from '../../../api/sample/getItemPlacement';
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
import GetSampleStatus from '../../../api/sample/get SampleStatus';

const MainView = styled.View`
  margin: 15px;
`;

class SampleStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusData: null,
      textArea: "",
      selectedStyles: [],
      value: [getInitialObject()]

    }
  }
  componentDidMount = () => {
    GetAsyncToken()
      .then(token => {
        GetSampleStatus(token, this.props.id)
          .then(res => {
            console.log('sample status data from api', res)
            this.setState({
              statusData: res.data,
              textArea: res.data.designerComment.text
            })
            // res.data.itemPlacementComments.map(d =>{
            //   this.setState({
            //     [d.designerComment.id]: d.designerComment.text
            //   })
            // })
          })
      })
  }
  render() {
    console.log('sample status : ', this.state.textArea)
    return (
      <MainView>
        {
          this.state.statusData != null ?
          <Fragment>
            <SmallText >comments by company</SmallText>
            <View style={{ height: 200, marginTop: 10 }}>
              <TextEditor
                initialValue={this.state.textArea}
                bodyHtml={(html) => this.setState({ textArea: html })}
              />

            </View>
            <Separator />
            <SmallText>Visual Comments</SmallText>
              <StyleRow>
                {
                  this.state.statusData.designerComment.visualComments.length > 0 ?
                    this.state.statusData.designerComment.visualComments.map(d => {
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

              </StyleRow>
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
                source={{ html: `<html><head></head><body>${this.state.statusData.supplierComment.text}</body></html>` }}
                scalesPageToFit={false}
                viewportContent={'width=device-width, user-scalable=no'}
              />
              <Separator />
              <SmallText>Visual Comments </SmallText>
              <StyleRow>
                {
                  this.state.statusData.supplierComment.visualComments.length > 0 ?
                    this.state.statusData.supplierComment.visualComments.map(d => {
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

              </StyleRow>
            </Fragment>
          : null
        }
      </MainView>
    )
  }
}
export default SampleStatus;