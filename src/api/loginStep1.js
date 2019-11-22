import axios from 'axios';
import qs from "qs";

const LoginStep1 = (username, password, token) => {
	return new Promise(function(resolve, reject) {
			console.log('user', username);
			const data = {
				Username: "test@headfitted.com",
    		Password: "donttell"
			};
			
			axios({
				url: 'http://test.delogue.com/api/v2.0/Login',
				method: "GET",
				contentType: "application/json;",
				// headers: { 'content-type': 'application/json'},
				params: data
			})
				.then(res => {
					resolve(res);
					console.log('response of login: ', res)
				})
				.catch(function(error) {
					console.error('error in login', error)
				})
	})
} 
export default LoginStep1;