import React from "react";
import { View, Text, Modal, TouchableHighlight, TouchableOpacity, Platform, Linking } from "react-native";
import styled from "styled-components";
import { Icon } from "native-base";
import ImageLayout from "react-native-image-layout";
import Title from '../styles/SmallText';
import RNFetchBlob from 'rn-fetch-blob';
// import Share from 'react-native-share';

const StyledModal = styled.Modal`
  /* height: 100px;
  background-color: #ff0; */
`;
const BgView = styled.View`
  background-color: #77777766;
  flex: 1;
  justify-content: flex-end;
`;
const ModalView = styled.View`
  height: 75%;
  background-color: #fff;
`;
const ModalTitle = styled.View`
  background-color: #415461;
  flex-direction: row;
  align-items: center;
`;
const CloseBox = styled.View`
  margin-left: auto;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;
const HeaderText = styled.Text`
  color: white;
  padding: 10px;
  font-size: 16px;
  text-transform: uppercase;
  line-height: 25px;
`;
const FooterBar = styled.View`
  padding: 15px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border-top-width: 1px;
  border-color: #ccc;
  background-color: ${props => (props.bg ? props.bg : props.theme.lightBrown)};
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
`;
const InfoText = styled.Text`
  font-family: ${props => props.theme.regular};
  padding-bottom: 5px;
`;

const CloseMessage = styled.Text`
  color: #aaa;
  font-size: 14px;
  text-align:center;
  padding: 5px;
  bottom: 20;
`;

const SImageLayout = styled(ImageLayout)`
  position: relative;
`;
let PictureDir = RNFetchBlob.fs.dirs.PictureDir
let fileNo = Math.random().toFixed(5)
class AttachmentPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  // shareSingleImage = async (filePath) => {
  //   console.log('hey', filePath)
  //   let finalPath = Platform.OS === 'android' ? 'file://' + filePath : filePath
  //   console.log('final path', Platform.OS === 'android' ? 'file://' + filePath : filePath, finalPath)
  //   let shareOptions = {
  //     title: 'Share file',
  //     url: finalPath,
  //     failOnCancel: false,
  //   };
  //   try {
  //     await Share.open(shareOptions);
  //   } catch (error) {
  //     console.log('Error =>', error);
  //   }
  // };
  handleFile (fileUrl) {
    console.log('file url', fileUrl);
    Linking.canOpenURL(fileUrl)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + fileUrl);
        } else {
          return Linking.openURL(fileUrl);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  }
  handleDownload = () => {
    RNFetchBlob
    .config({
      fileCache: true,
      path: RNFetchBlob.fs.dirs.DocumentDir+'/'+fileNo+'.png',
      // path: RNFetchBlob.fs.dirs.DocumentDir + '/delogue/'+ fileNo + '.png',

      // appendExt : 'png',
      // addAndroidDownloads : {
      //   useDownloadManager : true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
      //   notification : false,
      //   path:  PictureDir + "/me_"+fileNo, // this is the path where your downloaded file will live in
      //   description : 'Downloading image.',
      // }
    })
    .fetch('GET', 'https://s3-eu-west-1.amazonaws.com/designhubtest/organization_2/style_26/b3674f45-cb80-4618-a32a-cc75a242e685/bold_thumb_2.png')
    .then(res => {
      console.log('the file saved to', res.data);
    
      // this.shareSingleImage(filePath)
      // let filePath = RNFetchBlob.fs.dirs.DocumentDir + '/Delogue/' + fileNo + '.png';
      // /storage/emulated/0/Pictures/delogue/0.15383.png
      // fileUri is a string like "file:///var/mobile/Containers/Data/Application/9B754FAA-2588-4FEC-B0F7-6D890B7B4681/Documents/filename"
      // let fileUri = res.data;
      // if (Platform.OS === 'ios') {
      //   let arr = fileUri.split('/')
      //   const dirs = RNFetchBlob.fs.dirs
      //   filePath = `${dirs.DocumentDir}/${arr[arr.length - 1]}`
      // } else {
      //   filePath = audioDataUri
      // }
    })
    .catch(function(error) {
      console.error("error in download file", error);
    });
  }

  

  _renderPageHeader = (image, index, onClose) => {
    // Individual image object data.
    console.log(image);
    return (
        <View>
          <TouchableOpacity 
            onPress={() => {onClose();}} 
            underlayColor="#777">
            <Icon name='arrow-back' style={{color: '#ccc', padding: 20}} />
          </TouchableOpacity>
        </View>
    )
  }
  _renderPageFooter = (image, index, onClose) => {
    // Individual image object data.
    console.log(image);
    return (
      <CloseMessage> Swipe Up or Down to go Back </CloseMessage>
    )
  }
  render() {
    // console.log('path', this.props.path)
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}
        // style={{height: 200}}
        onRequestClose={() => {
          // this.props.close÷
          // {this.closeModal(this.props.close)}
        }}
      >
        <BgView>
          <ModalView>
            <ModalTitle>
              <HeaderText>{this.props.title}</HeaderText>
              <CloseBox>
                <TouchableHighlight
                  underlayColor="rgba(221, 221, 221, 0.4)"
                  onPress={this.props.close}
                >
                  <Icon
                    style={{
                      color: "#fff",
                      fontSize: 28,
                      paddingHorizontal: 10
                    }}
                    name="ios-close"
                  />
                </TouchableHighlight>
              </CloseBox>
            </ModalTitle>
            <ImageLayout
              renderPageHeader={this._renderPageHeader}
              renderPageFooter={this._renderPageFooter}
              imageContainerStyle={{ backgroundColor: "#fff", position: 'relative'}}
              pageScrollViewStyle={{ backgroundColor: "#000" }}
              resizeMode={"center"}
              columns={1}
              enableScale
              images={[
                {
                  uri: this.props.path,
                }
              ]}
            />
            <Icon  style={{position: 'absolute', right: 10, bottom: 105, color: '#999' }} name="expand" />
            <FooterBar>
              <View>
                <Title>File Name</Title>
                <InfoText numberOfLines={1}>{this.props.Name}</InfoText>
                <Title>Attached</Title>
            <InfoText numberOfLines={1}>{this.props.Date}</InfoText>
              </View>
              <TouchableHighlight onPress={() => this.handleFile(this.props.fileSrc)}>
                <Icon style={{color: '#999', padding: 10}} name="download" />
              </TouchableHighlight>
            </FooterBar>
            {/* <Text>popup13 </Text> */}
          </ModalView>
        </BgView>
      </Modal>
    );
  }
}
export default AttachmentPopup;