import axios from 'axios';

const GetSampleOverview = (token, id) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${baseUrl}StyleSampleRequest/${id}/Overview`,
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
      console.error("error in  get sample overview", error);
    })
  })
}
export default GetSampleOverview;