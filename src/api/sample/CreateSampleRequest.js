import axios from "axios";
import qs from "qs";

const CreateSampleRequest = (
  token, deadline, etd, notifyUser
) => {
  token, deadline, etd, notifyUser
  console.log('new add sample', token, deadline, etd, notifyUser)
  let notifyId = notifyUser.map(value => value.id);   // will create  array of id's
  // let notifyId = notifyUser.map(value => value.id);
  // if (attachments == '') { attachments = [] }
  console.log('notify =============== :', notifyId);
  return new Promise(function (resolve, reject) {
    // let string = this.state.searchBrand;
    const data1 = {
      "Comment": {
        "Text": "Common message1234",
        "VisualComments": []
      },

      "Location": {
        "Id": "10003"
      },
      "StyleId": 31,
      "SizeRangeId": 51,
      "requestedSampleSizesCommand": [
        {
          "SizeRangeSizeId": 265,
          "RequestedSampleSizeSpecCommands": [
            {
              "Available": true,
              "StyleColorId": "-1",
              "Quantity": "20"
            },
            {
              "Available": false,
              "StyleColorId": "357",
              "Quantity": ""
            }
            
          ]
        },
        {
          "SizeRangeSizeId": 266,
          "RequestedSampleSizeSpecCommands": [
            {
              "Available": true,
              "StyleColorId": "-1",
              "Quantity": ""
            },
            {
              "Available": false,
              "StyleColorId": "357",
              "Quantity": "2"
            }
            
          ]
        }
      ],
      "Deadline": "08-Mar-2020",
      "ETD": "",
      "SampleTypeId": "30400",
      "Status": "Requested",
      "TrackingNumber": "123456",
      "Note": "",
      "isDashboardSampleRequest": false,
      "NotifiedUsers": []
    }
    axios({
      url: `${baseUrl}StyleSampleRequest`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: data1,
    })
      .then(res => {
        console.log('sample request added successfully', res);
        resolve(res);

      })
      .catch(function (error) {
        console.error("error while creating sample request", error);
      });
  });
}
export default CreateSampleRequest;


// {
//   "Comment": {
//     "Text": "Common message1234",
//     "VisualComments": [
//       {
//         "Id": "2ce50887-eea0-45a8-8f4c-bb0766240f65",
//         "FileIconUrl": "handlers/ThumbnailService.ashx?ResourceId=2ce50887-eea0-45a8-8f4c-bb0766240f65&Width=200&Height=168&ResourceType=samplerequest",
//         "Name": "lanzarote_5_luc_viatour_-_copy_(6)_-_copy.jpg",
//         "FileName": "lanzarote_5_luc_viatour_-_copy_(6)_-_copy.jpg",
//         "ResourceId": "2ce50887-eea0-45a8-8f4c-bb0766240f65",
//         "IsFileEditable": true,
//         "Status": 1,
//         "URL": "http://localhost:1105/FileResource/organization_2/style_22079/1458ab95-e258-4533-8da4-2a0b25711e18/lanzarote_5_luc_viatour_-_copy_(6)_-_copy.jpg",
//         "IsDeletedFromS3": false,
//         "IsLink": false,
//         "CreatedOn": "/Date(1577079928615)/",
//         "IsStyleColorActive": false,
//         "IsColorwayModuleAccessible": false,
//         "Provider": "DesignHub.Business.FileResource.LocalFileResource",
//         "StorageLocation": "organization_2/style_22079/1458ab95-e258-4533-8da4-2a0b25711e18"
//       }
//     ]
//   },
//   "Location": {
//     "Id": "null"
//   },
//   "StyleId": 22158,
//   "SizeRangeId": 91,
//   "requestedSampleSizesCommand": [
//     {
//       "SizeRangeSizeId": 485,
//       "RequestedSampleSizeSpecCommands": [
//         {
//           "Available": true,
//           "StyleColorId": "-1",
//           "Quantity": "20"
//         },
//         {
//           "Available": false,
//           "StyleColorId": "2702",
//           "Quantity": ""
//         }
//       ]
//     },
//     {
//       "SizeRangeSizeId": 486,
//       "RequestedSampleSizeSpecCommands": [
//         {
//           "Available": true,
//           "StyleColorId": "-1",
//           "Quantity": ""
//         },
//         {
//           "Available": false,
//           "StyleColorId": "2702",
//           "Quantity": "12"
//         }
//       ]
//     }
//   ],
//   "Deadline": "26-Dec-2020",
//   "ETD": "21-Dec-2020,
//   "SampleTypeId": "71",
//   "Status": "Requested",
//   "TrackingNumber": "123456",
//   "Note": "",
//   "isDashboardSampleRequest": false,
//   "NotifiedUsers": null
// }