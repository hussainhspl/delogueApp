import React, { Fragment } from 'react';
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components';
import ImageLayout from "react-native-image-layout";
import { Icon } from "native-base";

const CloseMessage = styled.Text`
  color: #aaa;
  font-size: 14px;
  text-align: center;
  padding: 5px;
  bottom: 20;
`;

// const SImageLayout = styled(ImageLayout)`
//   position: relative;
// `;

class ZoomImage extends React.Component {
  _renderPageHeader = (image, index, onClose) => {
    // Individual image object data.
    // console.log(image);
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            onClose();
          }}
          underlayColor="#777"
        >
          <Icon name="arrow-back" style={{ color: "#ccc", padding: 20 }} />
        </TouchableOpacity>
      </View>
    );
  };
  _renderPageFooter = (image, index, onClose) => {
    // Individual image object data.
    // console.log(image);
    return <CloseMessage> Swipe Up or Down to go Back </CloseMessage>;
  };

  render() {
    console.log("this.props.imgSource", this.props.imgSource, this.props.src);
    return (
      <Fragment>
        {
        this.props.src == "logo" &&(
          <ImageLayout
          renderPageHeader={this._renderPageHeader}
          renderPageFooter={this._renderPageFooter}
          imageContainerStyle={{ backgroundColor: "#eee" }}
          pageScrollViewStyle={{ backgroundColor: "#000" }}
          // imagePageComponent={ () => resizeMode: "contain"}
          resizeMode={"contain"}
          columns={1}
          enableScale
          rerender={true}
          images={[
            {
              // uri: state.logo ? state.logo.url : noImage
              uri: this.props.imgSource
            }
          ]}
        />
        )}
        {this.props.src == 'thumbnail' &&(
          <ImageLayout
            renderPageHeader={this._renderPageHeader}
            renderPageFooter={this._renderPageFooter}
            imageContainerStyle={{ backgroundColor: "#eee" }}
            pageScrollViewStyle={{ backgroundColor: "#000" }}
            // imagePageComponent={ () => resizeMode: "contain"}
            resizeMode={"contain"}
            columns={1}
            enableScale
            rerender={true}
            images={[
              {
                // uri: state.logo ? state.logo.url : noImage
                uri: this.props.imgSource
              }
            ]}
          />
        )}
        {this.props.src == 'noLogo' &&(
          <ImageLayout
            renderPageHeader={this._renderPageHeader}
            renderPageFooter={this._renderPageFooter}
            imageContainerStyle={{ backgroundColor: "#eee" }}
            pageScrollViewStyle={{ backgroundColor: "#000" }}
            // imagePageComponent={ () => resizeMode: "contain"}
            resizeMode={"contain"}
            columns={1}
            enableScale
            rerender={true}
            images={[
              {
                // uri: state.logo ? state.logo.url : noImage
                uri: this.props.imgSource
              }
            ]}
          />
        )}
      
      </Fragment>
      
      
    )
  }
}
export default ZoomImage;
