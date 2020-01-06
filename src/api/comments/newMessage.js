import axios from "axios";
import qs from "qs";

const NewMessage = (token) => {
  console.log('token styles messages', searchTerm, token, styleId)
  return new Promise(function(resolve, reject) {
    // let string = this.state.searchBrand;
    const data1 = {
      "styleId": 132,
      "message": "reply: 2test message from API",
      "internalOnly": 0,
      "subject": "reply: 2test subject",
      "parentLogId": 45466
    }
    axios({
      url: `${baseUrl}Messages/Style`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: data1,
    })
      .then(res => {
        console.log('success in style message', res);
        resolve(res);

      })
      .catch(function(error) {
        console.error("error in style message", error);
      });
  });
}
export default NewMessage;