import axios from 'axios';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const ImageUpload = (token, imgSrc ,fileName, fId, sId) => {
  let newImgSrc ="";
  // let folderId = fId.length > 0 ? fId: ''}
  
  if (Platform.OS === 'ios') {
    newImgSrc = imgSrc.replace('file://', '')
    } else {
      newImgSrc = imgSrc
  }
  // console.log('source in upload', newImgSrc, fileName);
  
  return new Promise(function(resolve, reject) {

    // console.log('enter in fetch', RNFetchBlob.wrap(newImgSrc), "======", imgSrc );

    RNFetchBlob.fetch('POST', `${baseUrl}fileupload`, {
      "Authorization" : `Bearer ${token}`,
      'Content-Type' : 'multipart/form-data',
    }, [
        {
          name : 'avatar123',
          filename : fileName,
          data: RNFetchBlob.wrap(newImgSrc)
        },
        { name : 'FolderId', data : fId},
        { name : 'EntityType', data : 'Style'},
        { name : 'EntityTypeId', data : sId}

    ]).then((resp) => {
      console.log('success');
      resolve(resp);
      console.log('success blob', resp);
    }).catch((err) => {
      console.log('failure', err);
    })
  })
}
export default ImageUpload;
// { name : 'FolderId', data : fId},
//         { name : 'EntityType', data : 'Style'},
//         { name : 'EntityTypeId', data : sId}