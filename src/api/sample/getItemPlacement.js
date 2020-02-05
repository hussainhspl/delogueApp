import axios from 'axios';

const GetItemPlacement = (token, id) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${baseUrl}StyleSampleRequest/${id}/ItemPlacement/Comment`,
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
      console.error("error in  get sample Item placement", error);
    })
  })
}
export default GetItemPlacement;
