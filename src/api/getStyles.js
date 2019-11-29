import axios from "axios";
import qs from "qs";

const GetStyles = (string, token) => {
  console.log('token styles 12', token)
  return new Promise(function(resolve, reject) {
    // let string = this.state.searchBrand;
    const data1 = {
      "searchString": string,
      "brandIds": null,
      "seasonIds": null,
      "showOnlyMyStyles": false,
      "pageNumber":1
    }
    axios({
      url: `http://test.delogue.com/api/v2.0/Styles`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: data1,
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