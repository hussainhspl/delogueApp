import axios from 'axios';

const GetPlannedSample = (token, id) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${baseUrl}StyleSampleRequest/${id}/Planned`,
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
      console.error("error in  get planned sample", error);
    })
  })
}
export default GetPlannedSample;