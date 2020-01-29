import axios from 'axios';

const GetSamples = (token, id) => {
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
      resolve(res);
    })
    .catch(error => {
      console.error("error in  get samples", error);
    })
  })
}
export default GetSamples;