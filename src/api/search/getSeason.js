import axios from "axios";

const GetSeason = (string, token) => {
  return new Promise(function(resolve, reject) {
    // console.log("string", string);
    if (token !== null) {
      axios({
        url: `${baseUrl}Seasons/${string}`,
        method: "GET",
        contentType: "application/json; charset=utf-8",
        headers: {
          Authorization: `Bearer ${token}`,
          responseType: "json"
        }
      })
        .then(res => {
          resolve(res);
          console.log("response in season", res);
        })
        .catch(function(error) {
          console.error("error in season aa", error);
        });
    }
  });
};
export default GetSeason;
