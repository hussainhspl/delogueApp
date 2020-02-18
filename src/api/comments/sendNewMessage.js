import axios from "axios";
import qs from "qs";

const SendNewMessage = (token, styleId, subject, message, notifyUser, internal, attachments, parentId) => {
  console.log('new send messages', token, styleId, subject, message, notifyUser, internal, attachments, parentId)
  let notifyId = notifyUser.map(value => value.id);   // will create  array of id's
  console.log('notifyId', notifyId);
    if(attachments == '' ){ attachments =[] }
  // console.log('notify :', notifyId);
  return new Promise(function(resolve, reject) {
    // let string = this.state.searchBrand;
    const data1 = {
      "styleId": styleId,
      "message": message,
      "internalOnly": internal,
      "subject": subject,
      "Attachments": attachments,
      "NotifyUsers": notifyId,
      "InternalOnly": internal,
      "parentLogId": parentId
    }
    axios({
      url: `${baseUrl}Messages/Style`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: data1,
    })
      .then(res => {
        console.log('message send successfully', res);
        resolve(res);

      })
      .catch(function(error) {
        console.error("error while sending message", error);
      });
  });
}
export default SendNewMessage;