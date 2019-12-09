import axios from "axios";

const GetStyleFiles = (token, styleID) => {
  console.log('token styles 12', token, styleID)
  return new Promise(function(resolve, reject) {
    axios({
      url: `${baseUrl}Styles/${styleID}/StyleFiles`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        resolve(res);
        console.log("response in style files", res);
      })
      .catch(function(error) {
        console.error("error in style files", error);
      });
  });
}

export default GetStyleFiles;