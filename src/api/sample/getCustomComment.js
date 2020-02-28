import axios from 'axios';

const GetSampleStatus = (token, sampleReqId, SampleReqCommentFieldId) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${baseUrl}StyleSampleRequest/${sampleReqId}/SampleReqCommentField/${SampleReqCommentFieldId}/Comment`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      resolve(res);
    })
    .catch(error => {
      console.error("error in get custom comments", error);
    })
  })
}
export default GetSampleStatus;