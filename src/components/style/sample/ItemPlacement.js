import React, {Fragment} from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import styled from 'styled-components';
import GetAsyncToken from '../../../script/getAsyncToken';
import GetItemPlacement from '../../../api/sample/getItemPlacement';
import { CheckBox, Segment } from "native-base";
import SmallText from '../../../styles/SmallText';
import ImageCard from '../../../shared/ImageCard';
import TextEditor from '../textEditor';
import CNRichTextEditor, { CNToolbar, getInitialObject, getDefaultStyles, 
  convertToHtmlString } from "react-native-cn-richtext-editor";
import Separator from '../../../styles/Separator';
import StyleRow from '../../../styles/StyleRow';
import CardText from '../../../styles/CardText';
import {get} from 'lodash'
import AutoHeightWebView from 'react-native-autoheight-webview';

const MainView = styled.View`
  margin: 15px;
`;
const CheckBoxText = styled.Text`
  padding-left: 10px;
  font-family: ${ props => props.theme.regular};
`;

class ItemPlacement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: null,
      // textArea: "",
      selectedStyles : [],
      value: [getInitialObject()]

    }
  }
  componentDidMount = () => {
    GetAsyncToken()
      .then(token => {
        GetItemPlacement (token, this.props.id)
          .then(res => {
            console.log('item placement data from api',res)
            this.setState({
              itemData : res.data,
              
            })
            res.data.itemPlacementComments.map(d =>{
              this.setState({
                [d.designerComment.id]: d.designerComment.text
              })
            })
          })
      })
  }

  render() {
    // console.log('Text area state', this.state.textArea);
    return(
      <MainView>
        {
          this.state.itemData != null ?
            this.state.itemData.itemPlacementComments.map(d => {
              // console.log('dynamic state', this.state[d.designerComment.id])
              const context = get(d, 'styleItem');
              // console.log("context data", context,d.styleItem, get(context,'item'));
              return(
                <Fragment key={d.id}>
                <SmallText >Item</SmallText>
                <CardText> 
                  { get(context,'item.name')} - {get(context, 'item.userDefinedId')}
                </CardText>
                <CardText> Size: {get(context, 'selectedItemSize.name')} </CardText>
                <CardText> placement: {get(context, 'description')} </CardText>
                <Separator/>
                <SmallText >comments by company</SmallText>
                <View style={{height: 200, marginTop: 10}}>
                  <TextEditor
                    initialValue={this.state[d.designerComment.id]}
                    bodyHtml={(html) => this.setState({[d.designerComment.id] : html})}
                  />
                </View>
                <Separator/>
                <SmallText> Visual comments </SmallText>
                <StyleRow>
                {
                  d.supplierComment.visualComments.length > 0 ?
                  d.supplierComment.visualComments.map(v => {
                    console.log('map data',d);
                    return(
                      <ImageCard
                        bigImgUrl={v.url}
                        imgPath={{ uri: v.url }}
                        fileName={v.name}
                      />
                    )
                  })
                  :null
                }
                </StyleRow>
                <Separator/>
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
                  source={{html: `<html><head></head><body>${d.supplierComment.text}</body></html>`}}
                  scalesPageToFit={false}
                  viewportContent={'width=device-width, user-scalable=no'}
                />
                <Separator/>
                <SmallText> Visual comments </SmallText>
                <StyleRow>
                {
                  d.designerComment.visualComments.length > 0 ?
                  d.designerComment.visualComments.map(v => {
                    console.log('map data',d);
                    return(
                      <ImageCard
                        bigImgUrl={v.url}
                        imgPath={{ uri: v.url }}
                        fileName={v.name}
                      />
                    )
                  })
                  :null
                }
                </StyleRow>
                </Fragment>
              )
            })
          :
          null
        }  
      </MainView>
    )
  }
}
export default ItemPlacement;