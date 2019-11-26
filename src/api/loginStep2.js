import axios from 'axios';
import qs from "qs";

const LoginStep2 = (deisgnerID, userLoginId, uname, pass) => {
  return new Promise((resolve, reject) => {
    // console.log('login 2',deisgnerID, userLoginId, username, password);
    const data = {
      username: uname,
      password: pass,
      grant_type: "password"
    }
    axios({
      url: 'http://test.delogue.com/auth/token',
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
      data: qs.stringify(data)
    })
      .then( res => {
        resolve(res);
        console.log('auth 2 done', res);
      })
      .catch(function(error) {
        console.error('error in auth 2', error)
      })
  })
}
export default LoginStep2;