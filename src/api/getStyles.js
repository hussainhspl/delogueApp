import axios from "axios";
import qs from "qs";

const GetStyles = (string, token) => {
  console.log('token styles 12', token)
  return new Promise(function(resolve, reject) {
    const data1 = {
      "searchString": null,
      "brandIds": null,
      "seasonIds": null,
      "showOnlyMyStyles": false,
      "pageNumber":1
    }
    axios.post('http://test.delogue.com/api/v2.0/Styles',{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: data1,
    })
      .then(res => {
        resolve(res);
        console.log("response in styles", res);
      })
      .catch(function(error) {
        console.error("error in styles", error);
      });
  });
}
export default GetStyles;