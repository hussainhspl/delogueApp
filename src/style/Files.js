import React from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import {Icon } from 'native-base';
import { RNCamera } from 'react-native-camera';

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
	width: ${Dimensions.get('window').width/ 5}
	padding-top: 2px;
`;
const SubTitle = styled.Text`
	font-size: 12;
	color: #222;
`;
const StyleFileTitle = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: #F1EFED;
	border: 1px solid #DCD7D4;
`;
const CameraView = styled.View`
	width: 40;
	height: 40;
	justify-content: center;
	align-items: center;
	background-color: #849d7a;
`;

const Preview = styled(RNCamera)`
	flex: 1;
	justifyContent: flex-end;
	alignItems: center;
`;
const CameraContainer = styled.View`
	flex: 1;
	flexDirection: column;
	backgroundColor: black;
`;

const Capture = styled.TouchableOpacity`
	flex: 0;
	background-color: #fff;
	
	padding-horizontal: 40px;
	align-self: center;
	margin: 20px;
	width: 80px;
	height: 80px;
	border-radius: 50px;
`;
class Files extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
			cameraOn: false,
		}
	}
	takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
	};
	handleOnPress = () => this.setState({ cameraOn: false })

  render() {
		console.log("camera:", this.state.cameraOn)
		return(
			<View style={{flex:1}}>
				<StyleDescriptionRow> 
					<ImageBox>
						<Image resizeMode={"contain"} source={require('../../img/styleblack.png')} /> 
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
					<Text> style files </Text>
					<TouchableOpacity onPress={() => this.setState({cameraOn: true})}>
						<CameraView>
							<Icon style={{color: 'white', fontSize: 20}} name="camera" />
						</CameraView>
					</TouchableOpacity>
				</StyleFileTitle>
				{
					this.state.cameraOn && 
						<CameraContainer>
							<Preview
								ref={ref => {
									this.camera = ref;
								}}
								// style={styles.preview}
								type={RNCamera.Constants.Type.back}
								flashMode={RNCamera.Constants.FlashMode.on}
								androidCameraPermissionOptions={{
									title: 'Permission to use camera',
									message: 'We need your permission to use your camera',
									buttonPositive: 'Ok',
									buttonNegative: 'Cancel',
								}}
								androidRecordAudioPermissionOptions={{
									title: 'Permission to use audio recording',
									message: 'We need your permission to use your audio',
									buttonPositive: 'Ok',
									buttonNegative: 'Cancel',
								}}
								onGoogleVisionBarcodesDetected={({ barcodes }) => {
									console.log(barcodes);
								}}
							/>
							<View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
								<Capture onPress={this.takePicture.bind(this)}>
									<Text style={{ fontSize: 14 }}> SNAP </Text>
								</Capture>
							</View>
						</CameraContainer>
				}
				
			</View>
		)
	}
}
export default Files;