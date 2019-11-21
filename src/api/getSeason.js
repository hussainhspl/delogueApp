import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";


const GetSeason = new Promise(function(resolve, reject) {

	resolve(
		console.log('in promise');
		// seasonList = async () => {
		// try {
		// 	const token = await AsyncStorage.getItem('@token');
		// 	if(token !== null){
		// 		console.log("season token", token);
		// 		console.log("string: ", searchSeason);
		// 		axios({
		// 			url: `http://test.delogue.com/api/v2.0/Seasons`,
		// 			method: "GET",
		// 			contentType: "application/json; charset=utf-8",
		// 			headers: { 
		// 				Authorization: `Bearer ${token}`,
		// 				responseType: 'json'
		// 			}
		// 		})
		// 			.then(res => {
		// 				console.log("response in season", res);
		// 				// callback(res)
		// 				return res;
		// 			})
		// 			.catch(function(error) {
		// 				console.error("error in season aa", error);
		// 			})
		// 	} 
		// } catch (error) {
		// 	if (error.response) {
		// 		console.log("Error while checking token in get season", error);
		// 	}
		// }
		// }
	)
})
// export default GetSeason;
