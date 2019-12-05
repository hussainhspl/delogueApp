import axios from 'axios';

const StyleFollow =(token, styleId) => {
  return new Promise(function(resolve, reject) {
    if (token !== null) {
      axios({
        url: `${baseUrl}StyleFollow`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type' : 'application/json',
        },
        data: {
          "Id":styleId
        }
      })
        .then(res => {
          resolve(res);
          console.log('response in follow', res);
        })
        .catch(function(error) {
          console.log("error in style", error);
        })
    }
  })
}
export default StyleFollow;