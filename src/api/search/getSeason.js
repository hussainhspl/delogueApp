import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

//  let getToken = async()=> {
// 	console.log('function token')
// 	const token = await AsyncStorage.getItem('@token');
// 	console.log("get token in season api: ", token);
// 	return token;
// }

const GetSeason = (string, token) => {
  return new Promise(function(resolve, reject) {
    // console.log("string", string);
    // console.log("Promise token", token);
    if (token !== null) {
      // console.log("url", `${baseUrl}Seasons/${string}`);
      axios({
        url: `http://test.delogue.com/api/v2.0/Seasons/${string}`,
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
