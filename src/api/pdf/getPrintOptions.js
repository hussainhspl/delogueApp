import axios from 'axios';

const GetPrintOptions = (token, id) => {
  console.log('print id', id);

  return new Promise((resolve, reject) => {
    axios({
      url: `${baseUrl}StylePrintOption/${id}`,
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
      console.error("error in print options", error);
    })
  })
}
export default GetPrintOptions;
