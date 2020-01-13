import axios from "axios";

const GetBrands = (string, token) => {
  return new Promise(function(resolve, reject) {
    // console.log("string", string);
    if (token !== null) {
      axios({
        url: `${baseUrl}Brands/${string}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          resolve(res);
          console.log("response in brands", res);
        })
        .catch(function(error) {
          console.error("error in brands aa", error);
        });
    }
  });
};
export default GetBrands;