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

const data = {
  styleNo: "sty2211",
  styleName: "Casual Shirt",
  supplier: "head textiles",
  season: "summer"
};
const styArr = [
  {
    fileName: "File Name",
    imgInfo: "Image Info",
    date: "dd-mmm-yyyy"
  },
  {
    fileName: "File Name",
    imgInfo: "Image Info",
    date: "dd-mmm-yyyy"
  },
  {
    fileName: "File Name",
    imgInfo: "Image Info",
    date: "dd-mmm-yyyy"
  },
  {
    fileName: "File Name",
    imgInfo: "Image Info",
    date: "dd-mmm-yyyy"
  }
];

const StyleFileTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.lightBrown};
  border: 1px solid #dcd7d4;
`;

const Capital = styled.Text`
  text-transform: uppercase;
  font-family: ${props => props.theme.regular};
  font-size: ${props => props.theme.large};
  color: ${props => props.theme.textColor};
`;
const Card = styled.TouchableOpacity`
  width: ${props =>
    props.tablet
      ? Dimensions.get("window").width / 4
      : Dimensions.get("window").width / 3};
  height: ${props =>
    props.tablet
      ? Dimensions.get("window").height / 4 + 20
      : Dimensions.get("window").height / 3 + 20};
  border-bottom-width: 1px;
  border-right-width: 1px;
  border-color: #dcd7d4;
  justify-content: space-between;
  align-items: center;
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
      tablet: false
    };
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
  };
  componentWillUnmount = () => {
    AppState.removeEventListener("change", this._handleAppStateChange);
  };
  _handleAppStateChange = nextAppState => {
    if (nextAppState === "background") {
      this.setState({ modalVisible: false }, () =>
        console.log(this.state.modalVisible)
      );
    }
  };
  componentDidMount = () => {
    if (Dimensions.get("window").width > 568) {
      this.setState({ tablet: true }, () =>
        console.log("tablet search", this.state.tablet)
      );
    }
  };
  render() {
    // console.log("camera:", this.state.cameraOn);
    // console.log("style modal", this.state.modalVisible);
    let no = 0;
    return (
      <View style={{ flex: 1 }}>
        <ItemDetail data={data} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <StyleFileTitle>
            <Capital numberOfLines={1}> style files </Capital>
            <TouchableOpacity
              onPress={() => this.setState({ cameraFileOn: true })}
            >
              <CameraView>
                <Icon style={{ color: "white", fontSize: 20 }} name="camera" />
              </CameraView>
            </TouchableOpacity>
          </StyleFileTitle>
          {this.state.cameraFileOn && (
            <CameraComponent
              close={() => this.setState({ cameraFileOn: false })}
            />
          )}
          <View>
            <ImageRow>
              {styArr.map(data => {
                no = no + 1;
                return (
                  <FileCard
                    imageName="test.xls"
                    no={no}
                    key={Math.random().toFixed(3)}
                  />
                );
              })}
            </ImageRow>
            <CommonModal
              title="Style File"
              modalVisible={this.state.modalVisible}
              close={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              hideButton={true}
            >
              <StyleModal />
            </CommonModal>
          </View>
          <StyleFileTitle>
            <Capital> Custom Folder </Capital>
            <TouchableOpacity
              onPress={() => this.setState({ cameraCommOn: true })}
            >
              <CameraView>
                <Icon style={{ color: "white", fontSize: 20 }} name="camera" />
              </CameraView>
            </TouchableOpacity>
          </StyleFileTitle>
          {this.state.cameraCommOn && (
            <CameraComponent
              close={() => this.setState({ cameraCommOn: false })}
            />
          )}
          <ImageRow />
          <StyleFileTitle>
            <Capital> Communication files </Capital>
            <TouchableOpacity
              onPress={() => this.setState({ cameraCommOn: true })}
            >
              <CameraView>
                <Icon style={{ color: "white", fontSize: 20 }} name="camera" />
              </CameraView>
            </TouchableOpacity>
          </StyleFileTitle>
          {this.state.cameraCommOn && (
            <CameraComponent
              close={() => this.setState({ cameraCommOn: false })}
            />
          )}
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
          <StyleFileTitle>
            <Capital> Internal files </Capital>
            <TouchableOpacity
              onPress={() => this.setState({ cameraCommOn: true })}
            >
              <CameraView>
                <Icon style={{ color: "white", fontSize: 20 }} name="camera" />
              </CameraView>
            </TouchableOpacity>
          </StyleFileTitle>
          {this.state.cameraCommOn && (
            <CameraComponent
              close={() => this.setState({ cameraCommOn: false })}
            />
          )}
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
export default Files;
