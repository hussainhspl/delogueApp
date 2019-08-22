import React from 'react';
import {View, Text, SafeAreaView, Modal, Alert, TouchableHighlight } from 'react-native';
import styled from 'styled-components';
import {Icon } from 'native-base';
import { RNCamera } from 'react-native-camera';

const Preview = styled(RNCamera)`
	flex: 1;
	justify-content: flex-end;
	align-items: center;
`;
const CameraContainer = styled.View`
	flex: 1;
	flex-direction: column;
	background-color: black;
`;
const Capture = styled.TouchableOpacity`
	flex: 0;
	background-color: #fff;
	padding: 0px 40px;
	align-self: center;
	margin: 20px;
	width: 80px;
	height: 80px;
	border-radius: 50px;
`;
const CloseBox = styled.View`
	padding: 10px;
	position: absolute;
	right: 10;
	top: 10;
	padding: 10px;
	z-index: 1;
	align-items: center;
	justify-content: center;
	background-color: #f00;
`;

class CameraComponent extends React.Component {
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
  render() {
		return(
			<Modal
				animationType="fade"
				transparent={false}
				visible={this.props.modalVisible}
				onRequestClose={() => {
					this.props.close
				}}>
					<SafeAreaView />
				<CameraContainer>
					<CloseBox>
						<TouchableHighlight
							onPress={
								this.props.close
							}>
								<Icon style={{color: '#fff', fontSize: 28}} name="ios-close" />
						</TouchableHighlight>
					</CloseBox>
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
				{/* </SafeAreaView> */}
			</Modal>
		)
	}
}

export default CameraComponent;