import axios from "axios";
import qs from "qs";

const ReadAll = (token, id) => {
  // console.log('token specific message 12', token)
  return new Promise(function(resolve, reject) {
    axios({
      url: `${baseUrl}Messages/ReadAll/Style/${id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        resolve(res);
        console.log("success read all", res);
      })
      .catch(function(error) {
        console.error("error in specific message", error);
      });
  });
}
export default ReadAll;