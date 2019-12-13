import React, { Fragment } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Image
} from "react-native";
import Title from "../styles/SmallText";
import styled from "styled-components";
import OpacityView from "../styles/OpacityView";
import AttachmentPopup from "../shared/AttachmentPopup";
import GridCard from '../styles/GridCard';
import GridImageView from '../styles/GridImageView';
import GridImage from '../styles/GridImage';
import GridCardInfo from '../styles/GridCardInfo';
import { format, parseISO } from 'date-fns';


const InactiveColorBox = styled.View`
  background-color: #eee;
  opacity: 0.5;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
`;

const CrossImage = styled.Image`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: #f00; */
`;
const CardText = styled.Text`
  font-family: ${props => props.theme.regular};
  font-size: ${props => props.theme.large};
  color: ${props => props.theme.textColor};
`;

class FileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOpacity: false,
      modalVisible: false,
      imgSrc: null,
    };
  }
  showPopup = () => {
    // console.log("Enter");
    this.setState({ modalVisible: true });
  };
  checkExtension (url) {
    // console.log('enter in check extensions', url);
    let ext = url.split('.').pop()
    if(ext == 'xls' || ext == 'XLS' || ext == 'xlsx' || ext == 'XLSX') {
      src = "http://test.delogue.com/images/Excel-Icon.png"
      return src;
    }
    else if(ext == 'doc' || ext == 'DOC' || ext == 'docx' || ext == 'DOCX') {
      src = "http://test.delogue.com/images/Word-Icon.png"
      return src;
    }
    else if(ext == 'txt' || ext == 'TXT') {
      src = "http://test.delogue.com/images/File-Icon.png"
      return src;
    }
    else {
      return null;
    }
  }
  getThumbnail = (thumbnails) => {
    // console.log("get thumbnail called")
    if(thumbnails != null) {
      thumbnails.some(s => {

          if(s.size > 70000) {
            this.setState({
              imgSrc : s.url
            })
            // console.log("perfect size:", s.size);
            return true;
          }
          else if (s.size > 40000) {
            this.setState({
              imgSrc : s.url
            })
            // console.log("perfect size 4:", s.size);
            return true;
          }
          return false
      })
    }
  }
  componentDidMount = () => {
    let newUrl = this.checkExtension(this.props.url)
    if(newUrl == null) {
      if(this.props.thumbnails.length > 0) {
        this.getThumbnail(this.props.thumbnails)
      }
    }
    else {
      // newUrl = this.props.url;
      this.setState({
        imgSrc : newUrl
      })
    }
  }
  render() {
    let formatedDate = format(parseISO(this.props.date),"d-MMM-yyyy");
    let src = this.props.thumbnails.length > 0 ? 
      this.props.thumbnails[0].url : 
      this.props.url != null ? 
        this.props.url : 
          noImage
      let ext = src.split('.').pop()
      if(ext == 'xls' || ext == 'XLS' || ext == 'xlsx' || ext == 'XLSX') {
        src = "http://test.delogue.com/images/Excel-Icon.png"
      }
      if(ext == 'doc' || ext == 'DOC' || ext == 'docx' || ext == 'DOCX') {
        src = "http://test.delogue.com/images/Word-Icon.png"
      }
      if(ext == 'txt' || ext == 'TXT') {
        src = "http://test.delogue.com/images/File-Icon.png"
      }


    // console.log('hey source : ', src, ext);
    return (
      <View>
        <TouchableWithoutFeedback
          onPressIn={() => this.setState({ showOpacity: true })}
          onPressOut={() => this.setState({ showOpacity: false })}
          onPress={() => this.showPopup()}
        >
          <GridCard tablet={this.state.tablet}>
            {this.state.showOpacity && <OpacityView />}
            {this.props.status == 0 ? (
              <Fragment>
                <InactiveColorBox>
                  <CrossImage
                    resizeMode={"stretch"}
                    source={require("../../assets/img/cross-icon2.png")}
                  />
                </InactiveColorBox>
              </Fragment>
            ) : null}

            <GridImageView tablet={this.state.tablet}>
              <GridImage
                tablet={this.state.tablet}
                resizeMode={"contain"}
                source={{
                  uri: src
                }}
              />
            </GridImageView>
            <GridCardInfo>
              <View>
                <Title>File Name</Title>
                <CardText numberOfLines={1}>{this.props.imageName}</CardText>
              </View>
              <View>
                <Title>Date</Title>
              <CardText numberOfLines={1}>{formatedDate}</CardText>
              </View>
            </GridCardInfo>
            <AttachmentPopup
              modalVisible={this.state.modalVisible}
              close={() => this.setState({ modalVisible: false })}
              path={this.state.imgSrc ? this.state.imgSrc : this.props.url}
              Name= {this.props.imageName}
              Date = {formatedDate}
              fileSrc = {this.props.url}
            />
          </GridCard>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
export default FileCard;
