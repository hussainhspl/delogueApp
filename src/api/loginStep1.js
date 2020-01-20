import axios from 'axios';
import Toast from 'react-native-root-toast';


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
					console.log('error', error.msg);
					let toast = Toast.show('Invalid Username or Password', {
						duration: Toast.durations.LONG,
						position: Toast.positions.BOTTOM,
						shadow: true, animation: true,
						hideOnPress: true, delay: 0,
					})
					// console.error('error in login', error)
					
				})
	})
} 
export default LoginStep1;