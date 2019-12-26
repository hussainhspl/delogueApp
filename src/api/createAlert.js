import axios from "axios";
import qs from "qs";

const CreateAlert = (token, auditLogId, messageType) => {
  console.log('token alert messages', token, auditLogId, messageType)
  return new Promise(function(resolve, reject) {
    // let string = this.state.searchBrand;
    const data1 = {
      "AuditLogId":auditLogId,
      "Icon":messageType
    }
    axios({
      url: `${baseUrl}Alert/Create`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: data1,
    })
      .then(res => {
        console.log('success in alert unread', res);
        resolve(res);

      })
      .catch(function(error) {
        console.error("error in alert unread", error);
      });
  });
}
export default CreateAlert;