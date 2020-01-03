import axios from "axios";
import qs from "qs";

const GetStyleMessages = (searchTerm, token, styleId) => {
  console.log('token styles messages', searchTerm, token, styleId)
  return new Promise(function(resolve, reject) {
    // let string = this.state.searchBrand;
    const data1 = {  
      "styleId": styleId,
      "searchString": searchTerm,
       "pageNumber": 1 
    }
    axios({
      url: `${baseUrl}Messages/Search/Style`,
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
export default GetStyleMessages;