import axios from 'axios';

const DeleteAlert =(token, auditLogId) => {
  return new Promise(function(resolve, reject) {
    if (token !== null) {
      axios({
        url: `${baseUrl}Alert/Delete/${auditLogId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(res => {
          resolve(res);
          console.log('response in alert delete', res);
        })
        .catch(function(error) {
          console.log("error in alert delete", error);
        })
    }
  })
}
export default DeleteAlert;