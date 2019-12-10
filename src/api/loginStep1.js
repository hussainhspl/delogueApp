import axios from 'axios';
import qs from "qs";

const LoginStep1 = (username, password, token) => {
	return new Promise(function(resolve, reject) {
			// console.log('user', username);
			const data = {
				Username: username,
    			Password: password
			};
			
			axios({
				url: `${baseUrl}Login`,
				method: "POST",
				headers: { 'Content-Type': 'application/json'},
				data: data
			})
				.then(res => {
					resolve(res);
					// console.log('response of login: ', res)
				})
				.catch(function(error) {
					console.error('error in login', error)
				})
	})
} 
export default LoginStep1;