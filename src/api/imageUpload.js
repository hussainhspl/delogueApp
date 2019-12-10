import axios from 'axios';

const ImageUpload = (token) => {
  // console.log('token in upload');
  const data1 = new FormData();
  data1.append('photo', {
    uri: "file:///storage/emulated/0/Pictures/image-2f224ef7-5ba4-4159-8b8f-1be23289f1cb.jpg",
    type: 'image/jpeg', // or photo.type
    name: 'image-2f224ef7-5ba4-4159-8b8f-1be23289f1cb.jpg',
  })
  data1.append("FolderId", "43745");
  data1.append("EntityType", "Style");
  data1.append("EntityTypeId", "26");
  return new Promise(function(resolve, reject) {
    axios({
      url: `${baseUrl}fileupload`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: data1,
      
    })
      .then(res => {
        resolve(res);
        console.log("response in upload", res);
      })
      .catch(function(error) {
        console.error("error in upload", error);
      });
  })
}
export default ImageUpload;