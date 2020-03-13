import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  AppState
} from "react-native";
import styled from "styled-components";
import { Icon } from "native-base";
import StyleModal from "./StyleModal";
import CameraComponent from "../../shared/CameraComponent";
import CommonModal from "../../shared/CommonModal";
import ItemDetail from "../../shared/ItemDetail";
import CameraView from "../../styles/CameraView";
import ImageCard from "../../shared/ImageCard";
import FileCard from "../../shared/FileCard";
import GetStyleFiles from '../../api/getStyleFiles';
import GetAsyncToken from '../../script/getAsyncToken';
import { connect } from 'react-redux';
import { styleFileList } from '../../store/actions/index';
import ImagePicker from 'react-native-image-picker';
import ImageUpload from '../../api/imageUpload';
import Toast from 'react-native-root-toast';
// import format from 'date-fns/format'
const data = {
  styleNo: "sty2211",
  styleName: "Casual Shirt",
  supplier: "head textiles",
  season: "summer"
};

const StyleFileTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.lightBrown};
  border: 1px solid #dcd7d4;
  /* width: ${Dimensions.get("window").width -10}; */
  flex: 1;
`;

const Capital = styled.Text`
  text-transform: uppercase;
  font-family: ${props => props.theme.regular};
  font-size: ${props => props.theme.large};
  color: ${props => props.theme.textColor};
  padding: 0px 5px;
  flex: 1;
`;

const ImageInfo = styled.View`
  padding: 5px 10px;
`;
const ImageRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
  padding: 0px 5px;
`;

class Files extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraFileOn: false,
      cameraCommOn: false,
      modalVisible: false,
      appState: AppState.currentState,
      tablet: false,
      fileArr: null,
      avatarSource: null
    };
  }
  selectPhotoTapped(folderId) {
    // console.log('folder id in select picker', folderId, this.props.styleID);
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
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = response.uri;
        // let type = {type: response.type}
        // console.log('response from picker', response)
        GetAsyncToken()
          .then(token => {

            ImageUpload(token, source, response.fileName, folderId, this.props.styleID)
              .then(res => {
                console.log('response in upload success', res);
                let toast = Toast.show('Image uploaded successfully', {
                  duration: Toast.durations.LONG,
                  position: Toast.positions.BOTTOM,
                  shadow: true, animation: true,
                  hideOnPress: true, delay: 0,
                })
                setTimeout(() => { Toast.hide(toast) }, 3000);
                GetAsyncToken()
                  .then(token => {
                    GetStyleFiles(token, this.props.styleID)
                      .then(res => {
                        this.props.styleFileListFunction(res.data)
                      })
                  })
              })
          })
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log('source', source);
        // this.setState({
        //   avatarSource: source,
        // });
      }
    });
  }
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      // console.log(data.uri);
    }
  };
  handleOnPress = () => this.setState({ cameraOn: false });
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentDidMount = () => {
    AppState.addEventListener("change", this._handleAppStateChange);
    if (Dimensions.get("window").width > 568) {
      this.setState({ tablet: true }
      );
    }
    // console.log('enter in files did mount')
    if (this.state.fileArr) {
      // console.log("hurray")
    }
    GetAsyncToken()
      .then(token => {
        // console.log('script token', token, this.props.styleID)
        // if(this.state.fileArr.delogueFolderResponse != null){
        //   console.log('folder details', this.state.fileArr.delogueFolderResponse.id, this.props.styleID);
        // }

        GetStyleFiles(token, this.props.styleID)
          .then(res => {
            // console.log('response', res);
            this.props.styleFileListFunction(res.data)
          })
      })

  };
  componentWillUnmount = () => {
    AppState.removeEventListener("change", this._handleAppStateChange);
  };
  _handleAppStateChange = nextAppState => {
    if (nextAppState === "background") {
      this.setState({ modalVisible: false }
      );
    }
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.fileArr !== prevState.fileArr){}
      // console.log("Entered file nextProps");
    return {
      fileArr: nextProps.styleFileList,
    }
  }
  render() {
    // console.log("file state", this.state.fileArr);
    // if(this.state.fileArr.delogueFolderResponse != null) {

    // }
    // console.log("style modal", this.state.modalVisible);
    let no = 0;
    return (
      <View style={{ flex: 1 }}>
        <ItemDetail />

        <ScrollView showsVerticalScrollIndicator={false}>
          {
            this.state.fileArr != null ?
              this.state.fileArr.map(data => {
                return (
                  <View key={data.delogueFolderResponse.id}>
                    <StyleFileTitle>
                      <Capital numberOfLines={1}>
                        {data.delogueFolderResponse.name}
                      </Capital>
                      <TouchableOpacity
                        // onPress={() => this.setState({ cameraFileOn: true })}
                        onPress={() => this.selectPhotoTapped(data.delogueFolderResponse.id)}
                      >
                        <CameraView>
                          <Icon style={{ color: "white", fontSize: 20 }} name="camera" />
                        </CameraView>
                      </TouchableOpacity>
                    </StyleFileTitle>
                    <ImageRow>
                      {data.delogueFileResponse.length > 0 ?
                        data.delogueFileResponse.map(d => {
                          no = no + 1;
                          // console.log('file card images', d);
                          return (
                            <FileCard
                              imageName={d.fileName}
                              // imgSrc={src}
                              date={d.createdOn}
                              no={d.status}
                              url={d.url}
                              thumbnails={d.existingThumbnails}
                              key={Math.random().toFixed(3)}
                            />
                          );
                        })
                        : null
                      }
                    </ImageRow>
                  </View>
                )
              })
              : null
          }
          <View>
            <ImageRow>
              {/* {
                styArr.map(data => {
                  return(
                    <Tex> hey </Text>
                  )
                })
              } */}
            </ImageRow>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    styleFileListFunction: (s) => dispatch(styleFileList(s))
  }
}
const mapStateToProps = state => {
  return {
    styleFileList: state.styleFileList.styleFileListState,
    style: state.singleStyle.singleStyleState,
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Files);
