import axios from "axios";
import qs from "qs";

const UnreadMessageList = (token, message, chat, pageNumber) => {
  console.log('unread message called', pageNumber);
  return new Promise(function(resolve, reject) {
    // let string = this.state.searchBrand;
    const data1 = {  
      "filterOptions": {
          "communicationMessages": message,
          "sampleComments": chat
        },
       "pageNumber":pageNumber
    }
    axios({
      url: `${baseUrl}Messages/Unread/Overview/Style`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: data1,
    })
      .then(res => {
        resolve(res);

      })
      .catch(function(error) {
        console.error("error in unread message", error);
      });
  });
}
export default UnreadMessageList;