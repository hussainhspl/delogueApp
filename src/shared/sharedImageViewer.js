import React, { Fragment } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import styled, { withTheme } from "styled-components/native";
import AttachmentPopup from "./AttachmentPopup";
import ImageCard from "./ImageCard";

const AttachImageRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0px 15px;
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
  height: 38px;
`;
const Capital = styled.Text`
	text-transform: uppercase;
`;

class SharedImageViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attachment: '',
      modalVisible: false,
    };
  }

  render() {
    // console.log('shared picker ', this.props.initialImages, this.state.attachment);
    return (
      <Fragment>
        <StyleFileTitle>
          <Capital> Visual Comment </Capital>
        </StyleFileTitle>
        {
            <AttachImageRow>
              {this.props.initialImages != null ?
                this.props.initialImages.map(d => {
                // console.log('attachment d :', d);
                return (
                  // <Fragment>
                  //   <AttachBox>
                  //     <TouchableHighlight onPress={() => this.setState({ modalVisible: true })}
                  //       underlayColor={this.props.theme.overlayBlue}
                  //     >
                  //       <AttachmentImage
                  //         resizeMode={"contain"}
                  //         source={{ uri: d.url }}
                  //       />
                  //     </TouchableHighlight>
                  //   </AttachBox>
                  //   <AttachmentPopup
                  //     modalVisible={this.state.modalVisible}
                  //     close={() => this.setState({ modalVisible: false })}
                  //     path={d.url}
                  //     Name={d.name}
                  //     Date={""}
                  //     fileSrc={d.url}
                  //   />
                  // </Fragment>
                  <ImageCard
                    bigImgUrl={d.url}
                    imgPath={{ uri: d.url }}
                    fileName={d.name}
                  />
                )
              })
              :<View />
            }
            </AttachImageRow>
          }
      </Fragment>
    );
  }
}

export default withTheme(SharedImageViewer);
