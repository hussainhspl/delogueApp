import React, {Fragment} from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import styled from 'styled-components';
import GetAsyncToken from '../../../script/getAsyncToken';
import GetDesign from '../../../api/sample/getDesign';
import { CheckBox } from "native-base";
import SmallText from '../../../styles/SmallText';
import ImageCard from '../../../shared/ImageCard';
import TextEditor from '../textEditor';
import Separator from '../../../styles/Separator';
import StyleRow from '../../../styles/StyleRow';
import GetFinish from '../../../api/sample/getFinish';
import CardText from '../../../styles/CardText';
import AutoHeightWebView from 'react-native-autoheight-webview';

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
      finishData : null,
      textAreaOutside: "",
      textAreaInside: "",
    }
  }
  componentDidMount = () => {
    GetAsyncToken()
      .then(token => {
        GetFinish(token, this.props.id)
          .then(res => {
            console.log('finish data from api',res)
            this.setState({
              finishData : res.data,
              textAreaOutside: res.data.finishOutsideDesignerComment.text,
              textAreaInside: res.data.finishInsideDesignerComment.text,

            })
          })
      })
  }
  render() {
    console.log('finish text', this.state.textAreaInside);
    return(
      <MainView>
        {
          this.state.finishData != null ? 
          <Fragment>
          <SmallText>Finish Outside</SmallText>
          <StyleRow>
            <CheckBox color="#aaa"
              checked={true}
              style={{ left: 0, paddingLeft: 4 }}
              onPress={this.changeList}
            />
            <CheckBoxText>Approved </CheckBoxText>
          </StyleRow>
          <Separator />
          <SmallText>Comments by Company</SmallText>
          <View style={{height: 200, marginTop: 10}}>
            <TextEditor
              initialValue={this.state.textAreaOutside}
              bodyHtml={(html) => this.setState({textAreaOutside : html})}
            />
          </View>
          <Separator />
          <SmallText>Visual Comments</SmallText>
          <StyleRow>
            {
              this.state.finishData.finishOutsideDesignerComment.visualComments.length > 0 ?
              this.state.finishData.finishOutsideDesignerComment.visualComments.map(d => {
                console.log('map data',d);
                return(
                  <ImageCard
                    bigImgUrl={d.url}
                    imgPath={{ uri: d.url }}
                    fileName={d.name}
                  />
                )
              })
              :null
            }
          
          </StyleRow>
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
            source={{html: `<html><head></head><body>${this.state.finishData.finishOutsideSupplierComment.text}</body></html>`}}
            scalesPageToFit={false}
            viewportContent={'width=device-width, user-scalable=no'}
          />
          <Separator />
          <SmallText>Visual Comments</SmallText>
          <StyleRow>
            {
              this.state.finishData.finishOutsideSupplierComment.visualComments.length > 0 ?
              this.state.finishData.finishOutsideSupplierComment.visualComments.map(d => {
                console.log('map data',d);
                return(
                  <ImageCard
                    bigImgUrl={d.url}
                    imgPath={{ uri: d.url }}
                    fileName={d.name}
                  />
                )
              })
              :null
            }
          
          </StyleRow>
          <Separator />
          <SmallText>Finish Inside</SmallText>
          <StyleRow>
            <CheckBox color="#aaa"
              checked={false}
              style={{ left: 0, paddingLeft: 4 }}
              onPress={this.changeList}
            />
            <CheckBoxText>Approved </CheckBoxText>
          </StyleRow>
          <Separator />
          <SmallText>Comments by Company</SmallText>
          <View style={{height: 200, marginTop: 10}}>
            <TextEditor
              initialValue={this.state.textAreaInside}
              bodyHtml={(html) => this.setState({textAreaInside : html})}
            />
          </View>
          <Separator />
          <SmallText>Visual Comments</SmallText>
          <StyleRow>
            {
              this.state.finishData.finishInsideDesignerComment.visualComments.length > 0 ?
              this.state.finishData.finishInsideDesignerComment.visualComments.map(d => {
                console.log('map data',d);
                return(
                  <ImageCard
                    bigImgUrl={d.url}
                    imgPath={{ uri: d.url }}
                    fileName={d.name}
                  />
                )
              })
              :null
            }
          
          </StyleRow>
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
            source={{html: `<html><head></head><body>${this.state.finishData.finishInsideSupplierComment.text}</body></html>`}}
            scalesPageToFit={false}
            viewportContent={'width=device-width, user-scalable=no'}
          />
          <Separator />
          <SmallText>Visual Comments</SmallText>
          <StyleRow>
            {
              this.state.finishData.finishInsideSupplierComment.visualComments.length > 0 ?
              this.state.finishData.finishInsideSupplierComment.visualComments.map(d => {
                console.log('map data',d);
                return(
                  <ImageCard
                    bigImgUrl={d.url}
                    imgPath={{ uri: d.url }}
                    fileName={d.name}
                  />
                )
              })
              :null
            }
          
          </StyleRow>
          </Fragment >
          :null
        }
      </MainView>
    )
  }
}

export default Finish;
