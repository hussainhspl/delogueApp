import React, { Component } from 'react';

class CommonImagePicker extends Component {
  selectPhotoTapped(folderId) {
    console.log('folder id in select picker', folderId, this.props.styleID);
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
  render() {
    return (
      <div> textInComponent </div>
    );
  }
}
export default CommonImagePicker;
