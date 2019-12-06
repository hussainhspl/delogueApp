import axios from "axios";

const GetStyleFiles = (token) => {
  console.log('token styles 12', token)
  return new Promise(function(resolve, reject) {
    axios({
      url: `${baseUrl}Styles/44/StyleFiles`,
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