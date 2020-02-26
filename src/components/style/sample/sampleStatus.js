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
import SharedImagePicker from '../../../shared/sharedImagePicker';
import CancelButton from '../../../styles/CancelButton';
import TouchableCancel from '../../../styles/ToucaableCancel';
import ApplyButton from '../../../styles/ApplyButton';
import TouchableApply from '../../../styles/TouchableApply';
import ButtonText from '../../../styles/ButtonText';
import UpdatePlanned from '../../../api/sample/updatePlanned';


const MainView = styled.View`
  margin: 15px;
`;

const FooterButtonRow = styled.View`
  padding: 15px;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  height: 50px;
`;

class SampleStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusData: null,
      textArea: "",
      selectedStyles: [],
      value: [getInitialObject()],
      images: [],
      imagesSupplier: [],

    }
  }
  componentDidMount = () => {
    GetAsyncToken()
      .then(token => {
        GetSampleStatus(token, this.props.id)
          .then(res => {
            console.log('sample status data from api', res, res.data.designerComment.text)
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
  visualData = (data) => {
    // console.log('visual data', data);
    this.setState({
      images: data,
    })
  }
  visualDataSupplier = (data) => {
    // console.log('visual data', data);
    this.setState({
      imagesSupplier: data,
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
              {/* <SmallText>Visual Comments</SmallText> */}

              <View>
                {
                  this.state.statusData.designerComment.visualComments.length > 0 ?
                    <SharedImagePicker
                      childData={this.visualData}
                      initialImages={this.state.statusData.designerComment.visualComments}
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
                source={{ html: `<html><head></head><body>${this.state.statusData.supplierComment.text}</body></html>` }}
                scalesPageToFit={false}
                viewportContent={'width=device-width, user-scalable=no'}
              />
              <Separator />
              {/* <SmallText>Visual Comments </SmallText> */}
              <View>
                {
                  this.state.statusData.supplierComment.visualComments.length > 0 ?
                    <SharedImagePicker
                      childData={this.visualDataSupplier}
                      initialImages={this.state.statusData.supplierComment.visualComments}
                    />
                    :
                    <SharedImagePicker
                      childData={this.visualDataSupplier}
                      initialImages={null}
                    />
                }

              </View>
            </Fragment>
            : null
        }
        {/* <FooterButtonRow>
          <CancelButton>
            <TouchableCancel
              underlayColor="#8f8c86"
              onPress={() => {console.log('cancel click')}}>
              <ButtonText>CANCEL</ButtonText>
            </TouchableCancel>
          </CancelButton>
          <ApplyButton>
            <TouchableApply onPress={() => {
              this.updateSampleRequest();
            }} underlayColor="#354733">
              <ButtonText>apply</ButtonText>
            </TouchableApply>

          </ApplyButton>
        </FooterButtonRow> */}
      </MainView>
    )
  }
}
export default SampleStatus;