import React from "react";
import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView
} from "react-native";
import styled from "styled-components";
import { Icon } from "native-base";
import { RNCamera } from "react-native-camera";
import StyleModal from "./StyleModal";
import CameraComponent from '../shared/CameraComponent'; 
import CommonModal from '../shared/CommonModal';


const styArr = [
  {
    fileName: 'File Name',
    imgInfo: 'Image Info',
    date: 'dd-mmm-yyyy',
  },
  {
    fileName: 'File Name',
    imgInfo: 'Image Info',
    date: 'dd-mmm-yyyy',
  },
  {
    fileName: 'File Name',
    imgInfo: 'Image Info',
    date: 'dd-mmm-yyyy',
  }
]
const StyleDescriptionRow = styled.View`
  padding: 5px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  margin-bottom: 5px;
`;

const ImageBox = styled.View`
  height: 40px;
  width: 40px;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

const Flex = styled.View`
  flex: 1;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 11px;
  padding-right: 5px;
  color: #7b7b7b;
  text-transform: uppercase;
  text-align: right;
  width: ${Dimensions.get("window").width / 5};
  padding-top: 2px;
  font-family: ${ props => props.theme.bold};

`;
const SubTitle = styled.Text`
  font-size: 12;
  color: #222;
  font-family: ${ props => props.theme.regular};

`;
const StyleFileTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f1efed;
  border: 1px solid #dcd7d4;
`;
const CameraView = styled.View`
  width: 40;
  height: 40;
  justify-content: center;
  align-items: center;
  background-color: #849d7a;
`;

const Capital = styled.Text`
  text-transform: uppercase;
  font-family: ${ props => props.theme.regular};

`;
const Card = styled.TouchableOpacity`
  width: ${Dimensions.get("window").width / 3};
  height: ${Dimensions.get("window").width / 3 + 100};
  border: 1px solid #ccc;
  justify-content: space-between;
  align-items: center;
`;
const ImageView = styled.View`
  width: ${Dimensions.get("window").width / 3 - 20};
  height: ${Dimensions.get("window").width / 3 + 20};
  border: 1px solid #ddd;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
const StyleImage = styled.Image`
  width: ${Dimensions.get("window").width / 3 -40};
  height: ${Dimensions.get("window").width / 3};
`;
const ImageInfo = styled.View`
  padding: 5px 10px;
`;
const ImageRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 15px; numberOfLines={1}
`;

const CardText = styled.Text`
  font-family: ${ props => props.theme.regular};
`;
class Files extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraFileOn: false,
      cameraCommOn: false,
      modalVisible : false,
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
    this.setState({modalVisible: visible});
  }
  render() {
    // console.log("camera:", this.state.cameraOn);
    // console.log("style modal", this.state.modalVisible);
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <StyleDescriptionRow>
            <ImageBox>
              <Image
                resizeMode={"contain"}
                source={require("../../assets/img/styleblack.png")}
              />
            </ImageBox>
            <Flex>
              <Row>
                <Title numberOfLines={1}>style no</Title>
                <Flex>
                  <SubTitle numberOfLines={1}>sty1100</SubTitle>
                </Flex>
                {/* <Text>hello</Text> */}
              </Row>
              <Row>
                <Title numberOfLines={1}>style name</Title>
                <Flex>
                  <SubTitle numberOfLines={1}>sty1100uyuyyhkghgjgg</SubTitle>
                </Flex>
              </Row>
            </Flex>

            <Flex>
              <Row>
                <Title numberOfLines={1}>supplier</Title>
                <Flex>
                  <SubTitle numberOfLines={1}>sty1100</SubTitle>
                </Flex>
              </Row>
              <Row>
                <Title numberOfLines={1}>season</Title>
                <Flex>
                  <SubTitle numberOfLines={1}>sty1100uyuyyhkghgjgg</SubTitle>
                </Flex>
              </Row>
            </Flex>
          </StyleDescriptionRow>
          <StyleFileTitle>
            <Capital numberOfLines={1}> style files </Capital>
            <TouchableOpacity onPress={() => this.setState({ cameraFileOn: true })}>
              <CameraView>
                <Icon style={{ color: "white", fontSize: 20 }} name="camera" />
              </CameraView>
            </TouchableOpacity>
          </StyleFileTitle>
          {this.state.cameraFileOn && (
            <CameraComponent 
							close={() => this.setState({cameraFileOn: false})}
						/>
          )}
          <View>
            <ImageRow>
              {
                styArr.map(data => {
                  return(
                    <Card
                      key={Math.random().toFixed(3)}
                      onPress={() => {
                        this.setModalVisible(true);
                      }}
                    >
                      <ImageView>
                        <StyleImage
                          resizeMode={"center"}
                          source={require("../../assets/img/shirt-static.png")}
                        />
                      </ImageView>
                      <ImageInfo>
                        <CardText numberOfLines={1}>{data.fileName}</CardText>
                        <CardText numberOfLines={1}>{data.imgInfo}</CardText>
                        <CardText numberOfLines={1}>{data.date}</CardText>
                      </ImageInfo>
                    </Card>
                  )
                })
              }
            </ImageRow>
            <CommonModal
              title="Style File"
              modalVisible={this.state.modalVisible}
              close={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              hideButton={true}
            >
              <StyleModal/>
            </CommonModal>
          </View>
          <StyleFileTitle>
            <Capital> Communication files </Capital>
            <TouchableOpacity onPress={() => this.setState({ cameraCommOn: true })}>
              <CameraView>
                <Icon style={{ color: "white", fontSize: 20 }} name="camera" />
              </CameraView>
            </TouchableOpacity>
          </StyleFileTitle>
          {this.state.cameraCommOn && (
            <CameraComponent 
							close={() => this.setState({cameraCommOn: false})}
						/>
          )}
          <View>
          <ImageRow>
              {
                styArr.map(data => {
                  return(
                    <Card
                      key={Math.random().toFixed(3)}
                      onPress={() => {
                        this.setModalVisible(true);
                      }}
                    >
                      <ImageView>
                        <StyleImage
                          resizeMode={"center"}
                          source={require("../../assets/img/shirt-static.png")}
                        />
                      </ImageView>
                      <ImageInfo>
                        <CardText numberOfLines={1}>{data.fileName}</CardText>
                        <CardText numberOfLines={1}>{data.imgInfo}</CardText>
                        <CardText numberOfLines={1}>{data.date}</CardText>
                      </ImageInfo>
                    </Card>
                  )
                })
              }
            </ImageRow>
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default Files;
