import React, { Fragment } from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import styled from 'styled-components';
// import GetAsyncToken from '../../../script/getAsyncToken';
// import GetItemPlacement from '../../../api/sample/getItemPlacement';
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
import CancelButton from '../../../styles/CancelButton';
import TouchableCancel from '../../../styles/ToucaableCancel';
import ApplyButton from '../../../styles/ApplyButton';
import TouchableApply from '../../../styles/TouchableApply';
import ButtonText from '../../../styles/ButtonText';
import { connect } from 'react-redux'
import { itemPlacement } from '../../../store/actions/index';
import SharedImageViewer from '../../../shared/sharedImageViewer';



const MainView = styled.View`
  margin: 15px;
`;
const CheckBoxText = styled.Text`
  padding-left: 10px;
  font-family: ${ props => props.theme.regular};
`;

const FooterButtonRow = styled.View`
  padding: 15px;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  height: 50px;
`;

class ItemPlacement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: null,
      // textArea: "",
      selectedStyles: [],
      value: [getInitialObject()],
      images: [],
      imagesSupplier: [],

    }
  }
  componentDidMount = () => {
    console.log('in item placement', this.props.data);
    this.props.data.itemPlacementComments.map((d, idx) => {
      console.log('in map', d.designerComment.text, d.id)
      this.setState({
        [d.id]: d.designerComment.text
      }, () => this.getInitialComments(this.props.data))
    })
    // GetAsyncToken()
    //   .then(token => {
    //     GetItemPlacement(token, this.props.id)
    //       .then(res => {
    //         console.log('item placement data from api', res)
    //         res.data.itemPlacementComments.map((d, idx) => {
    //           console.log('in map', d.designerComment.text, d.id)
    //           this.setState({
    //             [d.id] : d.designerComment.text
    //           }, () => this.getInitialComments(res.data))
    //         })


    //       })
    //   })
  }
  getInitialComments(resData) {
    console.log('initial data', resData)
    this.setState({
      itemData: resData,
    }, () => this.props.itemPlacementFunction(this.state.itemData))
  }
  visualData = (data) => {
    console.log('visual data', data);
    // let result = [...data]
    // console.log('foo', result);
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
    console.log('item placement render', this.state.idx);
    return (
      <MainView>
        {
          this.state.itemData != null ?
            this.state.itemData.itemPlacementComments.map((d, idx) => {
              // console.log('inside', this.state.d.id)
              // console.log('dynamic state', this.state[d.designerComment.id])
              const context = get(d, 'styleItem');
              // console.log("context data", context,d.styleItem, get(context,'item'));
              return (
                <Fragment key={d.id}>
                  <SmallText >Item</SmallText>
                  <CardText>
                    {get(context, 'item.name')} - {get(context, 'item.userDefinedId')}
                  </CardText>
                  <CardText> Size: {get(context, 'selectedItemSize.name')} </CardText>
                  <CardText> placement: {get(context, 'description')} </CardText>
                  <Separator />
                  <SmallText > comments by company </SmallText>
                  <View style={{ height: 200, marginTop: 10 }}>
                    <TextEditor
                      initialValue={this.state[d.id]}
                      bodyHtml={(html) => this.setState({ [d.designerComment.id]: html })}
                    />
                  </View>
                  <Separator />
                  <View>
                    {
                      d.designerComment.visualComments.length > 0 ?
                        <SharedImagePicker
                          childData={this.visualData}
                          initialImages={d.designerComment.visualComments}
                        />
                        :
                        <SharedImagePicker
                          childData={this.visualData}
                          initialImages={null}
                        />
                    }
                  </View>
                  <Separator />
                  <SmallText> Comments by Supplier </SmallText>
                  <AutoHeightWebView
                    style={{ width: Dimensions.get('window').width - 45, marginTop: 5 }}
                    customStyle={`
                    * {
                      font-family: ${props => props.theme.regular};
                      font-size: ${props => props.theme.large};
                      color: ${props => props.theme.textColor};
                    }`
                    }
                    source={{ html: `<html><head></head><body>${d.supplierComment.text}</body></html>` }}
                    scalesPageToFit={false}
                    viewportContent={'width=device-width, user-scalable=no'}
                  />
                  <Separator />
                  {/* <SmallText> Visual comments </SmallText> */}
                  <SharedImageViewer 
                    initialImages={d.supplierComment.visualComments}
                  />
                  {/* <View>
                    {
                      d.supplierComment.visualComments.length > 0 ?
                        <SharedImagePicker
                          childData={this.visualDataSupplier}
                          initialImages={d.supplierComment.visualComments}
                        />
                        :
                        <SharedImagePicker
                          childData={this.visualDataSupplier}
                          initialImages={null}
                        />
                    }
                  </View> */}

                </Fragment>
              )
            })
            :
            null
        }
        {/* <FooterButtonRow>
          <CancelButton>
            <TouchableCancel
              underlayColor="#8f8c86"
              onPress={() => { this.props.cancel() }}>
              <ButtonText>CANCEL</ButtonText>
            </TouchableCancel>
          </CancelButton>
          <ApplyButton>
            <TouchableApply onPress={() => {
              this.redirectTo(this.props.apply);
            }} underlayColor="#354733">
              <ButtonText>apply</ButtonText>
            </TouchableApply>

          </ApplyButton>
        </FooterButtonRow> */}
      </MainView>
    )
  }
}
const mapStateToProps = state => {
  return {
    // style: state.singleStyle.singleStyleState,
    // styleId: state.styleId.styleIdState

  }
}
const mapDispatchToProps = dispatch => {
  return {
    itemPlacementFunction: (data) => dispatch(itemPlacement(data))
    // styleIdFunction: (sid) => dispatch(styleId(sid)),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemPlacement);
