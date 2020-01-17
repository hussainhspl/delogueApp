import axios from 'axios';

const GetStyle = (token, styleId) => {
  console.log('getting single style', styleId);
  return new Promise(function(resolve, reject) {
    if (token !== null) {
      axios({
        url: `http://test.delogue.com/api/v2.0/Styles/${styleId}/Overview`,
        method: "GET",
        contentType: "application/json; charset=utf-8",
        headers: {
          Authorization: `Bearer ${token}`,
          responseType: "json"
        }

      })
      .then(res => {
        resolve(res);
        // console.log("response in style", res);
      })
      .catch(function(error) {
        console.error("error in style", error);
      });
    }
  })
} 
export default GetStyle;