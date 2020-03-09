import axios from 'axios';

const GetAllSamples = (token, id) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${baseUrl}Style/${id}/StyleSampleRequest`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      console.log("here");
      resolve(res);
    })
    .catch(error => {
      console.error("error in  get samples", error);
    })
  })
}
export default GetAllSamples;