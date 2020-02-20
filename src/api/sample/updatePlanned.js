import axios from "axios";
import qs from "qs";

const UpdatePlanned = (token, sampleId, selectedType, newDate) => {
  // console.log('token alert messages', token, auditLogId, messageType)
  return new Promise(function(resolve, reject) {
    // let string = this.state.searchBrand;
    const data1 = {
      "Location": {
        "Id": "null"
      },
      "Comment": {
        "Text": "text template ABCD EFGH IJKL 1234",
        "VisualComments": [
          
        ]
      },
      "Id": 1513,
      "TrackingNumber": "",
      "Status": "6",
      "SampleTypeId": "71",
      "StyleId": 22157,
      "Deadline": "28-Dec-2019",
      "ETD": "",
      "Note": "",
      "requestedSampleSizesCommand": [
        {
          "Id": 73080,
          "SizeRangeSizeId": 23,
          "RequestedSampleSizeSpecCommands": [
            {
              "Available": true,
              "StyleColorId": "0",
              "Quantity": "1"
            }
          ]
        },
        {
          "Id": 73081,
          "SizeRangeSizeId": 24,
          "RequestedSampleSizeSpecCommands": [
            {
              "Available": true,
              "StyleColorId": "0",
              "Quantity": "2"
            }
          ]
        },
        {
          "Id": 73082,
          "SizeRangeSizeId": 26,
          "RequestedSampleSizeSpecCommands": [
            {
              "Available": true,
              "StyleColorId": "0",
              "Quantity": "3"
            }
          ]
        },
        {
          "Id": 73083,
          "SizeRangeSizeId": 27,
          "RequestedSampleSizeSpecCommands": [
            {
              "Available": true,
              "StyleColorId": "0",
              "Quantity": "40"
            }
          ]
        }
      ],
      "NotifiedUsers": null,
      "isQuickSave": false
    }
    
    axios({
      url: `${baseUrl}StyleSampleRequest/Planned`,
      method: 'PUT',
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
export default UpdatePlanned;