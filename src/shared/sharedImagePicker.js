import React, { Fragment } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import styled, { withTheme } from "styled-components/native";
import { Icon } from "native-base";
// relative import
import ImagePicker from 'react-native-image-picker';
import GetAsyncToken from '../script/getAsyncToken';

import ImageUpload from '../api/imageUpload';
import CameraView from '../styles/CameraView';
import Toast from 'react-native-root-toast';
import { connect } from "react-redux";
import Close from "../styles/Close";
import AttachmentPopup from "./AttachmentPopup";
import ImageCard from "./ImageCard";
import { relative } from "path";


const AttachImageRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0px 5px;
`;

const AttachBox = styled.View`
  width: 80px;
  height: 90px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 20px;
  margin-top: 20px;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const AttachmentImage = styled.Image`
  width: 70px;
  height: 80px;
  margin: 5px;
`;

const StyleFileTitle = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: ${props => props.theme.lightBrown};
	border: 1px solid #DCD7D4;
`;
const Capital = styled.Text`
	text-transform: uppercase;
`;

class SharedImagePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // attachment: null
      attachment: '',
      modalVisible: false,
    };
  }
  selectPhotoTapped(folderId) {
    console.log('folder id in select picker', folderId, this.props.StoreStyleId);
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        // console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = response.uri;
        GetAsyncToken()
          .then(token => {
            let toast1 = Toast.show('uploading', {
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
              shadow: false, animation: true,
              hideOnPress: true, delay: 0,
            })
            // console.log('sid', this.props.styleID);
            ImageUpload(token, source, response.fileName, 0, this.props.StoreStyleId)
              .then(res => {
                Toast.hide(toast1)
                let toast = Toast.show('image successfully attached', {
                  duration: Toast.durations.LONG,
                  position: Toast.positions.BOTTOM,
                  shadow: false, animation: true,
                  hideOnPress: true, delay: 0,
                })
                setTimeout(() => { Toast.hide(toast) }, 3000);
                console.log('response in upload success', res.data);
                let jsonObject = JSON.parse(res.data);
                console.log('convert', jsonObject.id, jsonObject, res.data);
                // this.props.attachmentImage(jsonObject)
                this.setState(prevState => ({
                  attachment: [...prevState.attachment, jsonObject]
                }), () => this.props.childData(this.state.attachment))
              })
          })
        console.log('source', source);
      }
    });
  }
  popAttachment(id) {
    // console.log('remove image', id);
    this.setState({
      attachment: this.state.attachment.filter(imgObj => imgObj.id != id)
    })
  }
  componentDidMount = () => {
    if (this.props.initialImages != null) {

      this.setState(prevState => ({
        attachment: [...prevState.attachment, ...this.props.initialImages]
      }), () => this.props.childData(this.state.attachment))
    }
  }
  render() {
    // console.log('shared picker ', this.props.initialImages, this.state.attachment);
    return (
      <Fragment>
        <StyleFileTitle>
          <Capital> Visual Comment </Capital>
          <View>
            <TouchableOpacity
              onPress={() => this.selectPhotoTapped()}
            >
              <CameraView>
                <Icon style={{ color: "white", fontSize: 20 }} name="camera" />
              </CameraView>
            </TouchableOpacity>
          </View>
        </StyleFileTitle>
        {
          typeof (this.state.attachment) == 'object' && (
            <AttachImageRow>
              {this.state.attachment.map(d => {
                // console.log('attachment d :', d);
                return (
                  <View style={{position: "relative", marginTop: 15, marginRight: 10}}>
                    <ImageCard
                      bigImgUrl={d.url}
                      imgPath={{ uri: d.url }}
                      fileName={d.name}
                    />
                    <Close underlayColor={"#bbb"} onPress={() => this.popAttachment(d.id)}>
                      <Icon style={{ fontSize: 16 }} name="ios-close" />
                    </Close>
                  </View>
                )
              })}
            </AttachImageRow>
          )}

      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    StoreStyleId: state.styleId.styleIdState
  };
};
export default connect(mapStateToProps)(withTheme(SharedImagePicker));
