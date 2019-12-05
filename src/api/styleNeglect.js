import axios from 'axios';

const StyleNeglect =(token, styleId) => {
  return new Promise(function(resolve, reject) {
    if (token !== null) {
      axios({
        url: `${baseUrl}StyleFollow/${styleId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(res => {
          resolve(res);
          console.log('response in neglect', res);
        })
        .catch(function(error) {
          console.log("error in style", error);
        })
    }
  })
}
export default StyleNeglect;