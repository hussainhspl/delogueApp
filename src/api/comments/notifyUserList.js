import axios from "axios";

const NotifyUserList = (token, id) => {
  console.log('token notify message 12', token, id)
  return new Promise(function(resolve, reject) {
    axios({
      url: `${baseUrl}Messages/Users/Style/${id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        resolve(res);
        console.log("success notify list", res);
      })
      .catch(function(error) {
        console.error("error in notify list", error);
      });
  });
}
export default NotifyUserList;