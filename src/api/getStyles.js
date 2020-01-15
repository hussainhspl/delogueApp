import axios from "axios";
import qs from "qs";

const GetStyles = (string, token, brand, season, myStyle) => {
  console.log('token styles 12', token, myStyle)
  return new Promise(function(resolve, reject) {
    // let string = this.state.searchBrand;
    const data1 = {
      "searchString": string,
      "brandIds": brand,
      "seasonIds": season,
      "showOnlyMyStyles": myStyle,
      "pageNumber":1
    }
    axios({
      url: `${baseUrl}Styles`,
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