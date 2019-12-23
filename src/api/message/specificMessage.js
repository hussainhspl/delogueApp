import axios from "axios";
import qs from "qs";

const SpecificMessage = (token) => {
  console.log('token specific message 12', token)
  return new Promise(function(resolve, reject) {
    axios({
      url: `${baseUrl}Messages/130344/Style`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        resolve(res);
        console.log("response in specific message", res);
      })
      .catch(function(error) {
        console.error("error in specific message", error);
      });
  });
}
export default SpecificMessage;