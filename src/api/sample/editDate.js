import axios from "axios";
import qs from "qs";

const EditDate = (token, sampleId, selectedType, newDate) => {
  console.log('edit date', selectedType)
  return new Promise(function(resolve, reject) {
    // let string = this.state.searchBrand;
    const data1 = {
      "Id": sampleId,
      "SampleRequestDateType": selectedType,
      SampleRequestDate: newDate
    }
    axios({
      url: `${baseUrl}StyleSampleRequest/EditDate`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: data1,
    })
      .then(res => {
        console.log('success in edit date', res);
        resolve(res);

      })
      .catch(function(error) {
        console.error("error in edit date", error);
      });
  });
}
export default EditDate;