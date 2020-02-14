import axios from 'axios';
import {Platform, PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

// async function requestCameraPermission() {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       {
//         title: 'Cool Photo App Camera Permission',
//         message:
//           'Cool Photo App needs access to your camera ' +
//           'so you can take awesome pictures.',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('You can use the camera');
//     } else {
//       console.log('Camera permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// }

const ImageUpload = (token, imgSrc ,fileName, fId, sId) => {
  console.log('image upload input data:', token, imgSrc ,fileName, fId, sId)
  let newImgSrc ="";
  let newFId = fId.toString();
  let newSId = sId.toString();
  // let folderId = fId.length > 0 ? fId: ''}
  console.log('Platform.OS', Platform.OS)
  if (Platform.OS === 'ios') {
    newImgSrc = imgSrc.replace('file://', '');
    console.log('enter in ios: ', newImgSrc);
    }
  if (Platform.OS === 'android') {
    newImgSrc = imgSrc
    console.log('enter in android', typeof(newFId), typeof(newSId), fileName, newImgSrc)

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
        { name : 'FolderId', data : fId.toString()},
        { name : 'EntityType', data : 'Style'},
        { name : 'EntityTypeId', data : sId.toString()}

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