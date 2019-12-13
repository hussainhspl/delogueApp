import axios from 'axios';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const ImageUpload = (token, imgSrc ,fileName, fId, sId) => {
  let newImgSrc ="";
  if (Platform.OS === 'ios') {
    newImgSrc = imgSrc.replace('file://', '')
    } else {
      newImgSrc = imgSrc
  }
  console.log('source in upload', newImgSrc, fileName, fId, sId);
  // let data1 = new FormData();
  // data1.append("FolderId", "43745");
  // data1.append("EntityType", "Style");
  // data1.append("EntityTypeId", "26");
  // data1.append('photo', {
  //   uri: "file:///storage/emulated/0/Pictures/image-2f224ef7-5ba4-4159-8b8f-1be23289f1cb.jpg",
  //   type: 'image/jpg', // or photo.type
  //   name: "image-2f224ef7-5ba4-4159-8b8f-1be23289f1cb.jpg",
  // })
  
  return new Promise(function(resolve, reject) {

    console.log('enter in fetch', RNFetchBlob.wrap(newImgSrc), "======", imgSrc );

    RNFetchBlob.fetch('POST', `${baseUrl}fileupload`, {
      "Authorization" : `Bearer ${token}`,
      'Content-Type' : 'multipart/form-data',
    }, [
      
        // append field data from file path
        {
          name : 'avatar123',
          filename : fileName,
          data: RNFetchBlob.wrap(newImgSrc)
        },
        // elements without property `filename` will be sent as plain text
        { name : 'FolderId', data : fId},
        { name : 'EntityType', data : 'Style'},
        { name : 'EntityTypeId', data : sId}
      
      // { 
      //   data : {
      //     FolderId : '43745',
      //     EntityType : "Style",
      //     EntityTypeId: "26",
      //     photo: {
      //       url: "file:///storage/emulated/0/Pictures/image-2f224ef7-5ba4-4159-8b8f-1be23289f1cb.jpg",
      //       type: 'image/jpg', // or photo.type
      //       name: "image-2f224ef7-5ba4-4159-8b8f-1be23289f1cb.jpg",
      //     }
      //   }
      // },
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