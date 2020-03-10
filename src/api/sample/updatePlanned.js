import axios from "axios";
import qs from "qs";

const UpdatePlanned = (token, sampleStatus, sampleId, selectedType, newDate) => {
  console.log('sample status planned update', token, sampleStatus, sampleStatus.requestedSampleSizes);
  // let newRequestedSampleSizes = [];
  // newRequestedSampleSizes = sampleStatus.requestedSampleSizes.map(
  //   (d) => [{"Id":d.id, "SizeRangeSizeId": d.sizeRangeSizeId, 
  //           "RequestedSampleSizeSpecCommands": [
  //             {"Available": d.requestedSampleSizeSpecCommands.available}
  //           ]
  //          }]);
  // console.log('newRequestedSampleSizes', newRequestedSampleSizes);
  // sampleStatus.RequestedSampleSizes.map(d => {
  //   "Id": 73080,
  //   "SizeRangeSizeId": 23,
  // })
  return new Promise(function (resolve, reject) {
    // let string = this.state.searchBrand;

    const data1 = {
      "Location": {
        "Id": "null"
      },
      "Comment": sampleStatus.designerComment,
      "Id": sampleStatus.id,
      "TrackingNumber": sampleStatus.trackingNumber,
      "Status": "6",
      "SampleTypeId": sampleStatus.typeOfSample.id,
      "StyleId": sampleStatus.style.id,
      "Deadline": sampleStatus.deadline,
      "ETD": sampleStatus.etd,
      "Note": sampleStatus.note,
      "requestedSampleSizesCommand": [sampleStatus.requestedSampleSizes],
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
        console.log('success in planned updated', res);
        resolve(res);

      })
      .catch(function (error) {
        console.error("error in planned updated", error);
      });
  });
}
export default UpdatePlanned;


// const data1 = {
//   "Location": {
//     "Id": "null"
//   },
//   "Comment": {
//     "Text": "text template ABCD EFGH IJKL 1234",
//     "VisualComments": [

//     ]
//   },
//   "Id": 1513,
//   "TrackingNumber": "",
//   "Status": "6",
//   "SampleTypeId": "71",
//   "StyleId": 22157,
//   "Deadline": "28-Dec-2019",
//   "ETD": "",
//   "Note": "",
//   "requestedSampleSizesCommand": [
//     {
//       "Id": 73080,
//       "SizeRangeSizeId": 23,
//       "RequestedSampleSizeSpecCommands": [
//         {
//           "Available": true,
//           "StyleColorId": "0",
//           "Quantity": "1"
//         }
//       ]
//     },
//     {
//       "Id": 73081,
//       "SizeRangeSizeId": 24,
//       "RequestedSampleSizeSpecCommands": [
//         {
//           "Available": true,
//           "StyleColorId": "0",
//           "Quantity": "2"
//         }
//       ]
//     },
//     {
//       "Id": 73082,
//       "SizeRangeSizeId": 26,
//       "RequestedSampleSizeSpecCommands": [
//         {
//           "Available": true,
//           "StyleColorId": "0",
//           "Quantity": "3"
//         }
//       ]
//     },
//     {
//       "Id": 73083,
//       "SizeRangeSizeId": 27,
//       "RequestedSampleSizeSpecCommands": [
//         {
//           "Available": true,
//           "StyleColorId": "0",
//           "Quantity": "40"
//         }
//       ]
//     }
//   ],
//   "NotifiedUsers": null,
//   "isQuickSave": false
// }