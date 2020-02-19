import axios from "axios";
import qs from "qs";

const UnreadMessageList = (token) => {
  // console.log('token styles 12', token)
  return new Promise(function(resolve, reject) {
    // let string = this.state.searchBrand;
    const data1 = {  
      "filterOptions": {
          "communicationMessages": true,
          "sampleComments": true
        },
       "pageNumber":1 
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