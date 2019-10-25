import React from "react";
import { View, Text, Modal, TouchableHighlight } from "react-native";
import styled from "styled-components";
import { Icon } from "native-base";
import ImageLayout from "react-native-image-layout";
import Title from '../styles/SmallText';


const StyledModal = styled.Modal`
  /* height: 100px;
  background-color: #ff0; */
`;
const BgView = styled.View`
  background-color: #77777766;
  /* height: 50px; */
  flex: 1;
  /* height: 250px; */
  /* align-self: flex-end; */
  justify-content: flex-end;
  /* position : absolute; */
`;
const ModalView = styled.View`
  height: 70%;
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
  /* background-color: green; */
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
  /* height: 50px; */
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
`;

class AttachmentPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  _renderPageHeader = (image, index, onClose) => {
    // Individual image object data.
    console.log(image);
    return (
        <View>
          {/* <TouchableHighlight onPress={() => {onClose();}}>
            <Text style={{color:'#f00'}}> x </Text>
          </TouchableHighlight> */}
          <CloseMessage> Swipe Up or Down to go Back </CloseMessage>
        </View>
    )
  }
  render() {
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
              <HeaderText>Swatch</HeaderText>
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
              imageContainerStyle={{ backgroundColor: "#eee", position: 'relative'}}
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
            <Icon  style={{position: 'absolute', right: 10, top: 360, color: '#999' }} name="expand" />
            <FooterBar>
              <View>
                <Title>File Name</Title>
                <InfoText numberOfLines={1}>Sample.jpg</InfoText>
                <Title>Attached</Title>
                <InfoText numberOfLines={1}>13-Oct-2019</InfoText>
              </View>
              <TouchableHighlight onPress={() => console.log("hey")}>
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
