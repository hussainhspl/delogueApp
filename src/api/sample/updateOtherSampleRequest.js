import axios from "axios";
import qs from "qs";

const UpdateOtherSampleRequest = (
  token, sampleDataState, itemPlacement, finish, finishOutside, finishInside, design, custom, 
  status, measurement, sampleSizes
  ) => {
  console.log('token ', token, sampleDataState, finishOutside, finish, finishInside, design, custom, status.deadline);
  console.log('new', status);
  return new Promise(function (resolve, reject) {

    
    let fitApproved = design.designCommentDetails.approved;
    let fitComment = design.designCommentDetails.designerComment;
    let measurementData = measurement;

    let updatedMeasurementArray = [];
		measurement.map(data => {
			let { id, designerComment, approved, measurementLineMeasurements } = data;
			let fields = {
				"Comment": designerComment,
				"id": id,
				"Approved": approved,
				"MeasurementLineCommentUpdateCommands": measurementLineMeasurements
			};
			updatedMeasurementArray.push(fields);
		})
    console.log('updatedMeasurementArray', updatedMeasurementArray);

    let newItemPlacementArray = [];
    newItemPlacementArray = itemPlacement.itemPlacementComments.map(d => [{
      "Id" : d.id,
      "Approved" : d.approved,
      "Comment" : d.designerComment
    }])
    let finalItemPlacementArray = [];
    for(i=0; i<newItemPlacementArray.length; i++){
      // console.log('hey', ...newItemPlacementArray[i]);
      finalItemPlacementArray.push(...newItemPlacementArray[i])
    }
    let finishInsideData= finish.finishInsideDesignerComment;
    let finishOutsideData= finish.finishOutsideDesignerComment;

    let updatedCustomCommentsArray = [];
    custom.map(d=> {
      let {id,approved, designerComment, adminSampleRequestCommentField} = d;
      let requiredCustom= {
        "Id" : id,
        "Approved" : approved,
        "Comment" : designerComment,
        "AdminSampleRequestCommentFieldId" : adminSampleRequestCommentField.id
      }
      updatedCustomCommentsArray.push(requiredCustom);
      console.log('d', requiredCustom);
    })

    let updatedSampleSizesArray = [];
    sampleSizes.map( d => {
      let fieldInner=[];
      let {id, sizeRangeSizeId, requestedSampleSizeSpecs} = d;
      requestedSampleSizeSpecs.map(q => {
        field1 = {
          "Available": q.available,
          "StyleColorId": q.styleColorId,
          "Quantity": q.quantity
          
        };
        fieldInner.push(field1)
      })
      let fields = {
        "id" : id,
        "SizeRangeSizeId": sizeRangeSizeId,
        "RequestedSampleSizeSpecCommands": fieldInner
      }
      updatedSampleSizesArray.push(fields);
      console.log('sizes', updatedSampleSizesArray, requestedSampleSizeSpecs);

    })

    // let final = newItemPlacementArray.map((d, idx) => ({...{...d[idx]}}))
    // console.log('updated custom', updatedCustomCommentsArray);
    const data1 =
    {
      "IsQuickSave":false,
      "IsUpdated":true,
      "Comment": status.designerComment,
      // {
      //   "Text":"",
      //   "VisualComments":[
    
      //   ]
      // },
      "Id":status.id,
      "CancelComment":{
    
      },
      "ItemPlacementCommentUpdateCommands": finalItemPlacementArray,
      "FitApproved":fitApproved,
      "FitComment":fitComment,
      "SizeMeasurementCommentUpdateCommands":updatedMeasurementArray,
      // [
      //   {
      //     "Comment":{
      //       "Text":"",
      //       "VisualComments":[
    
      //       ]
      //     },
      //     "Id":"50775",
      //     "Approved":false,
      //     "MeasurementLineCommentUpdateCommands":[
      //       {
      //         "Id":85616,
      //         "SizeMeasurementApprovalId":50775,
      //         "SupplierMeasurement":null,
      //         "LineId":1113,
      //         "Name":"aaaaa",
      //         "RequestedMeasurement":"553",
      //         "CompanyMeasurement":null,
      //         "SupplierDiscrepancy":0,
      //         "CompanyDiscrepancy":0,
      //         "NewMeasurement":"553",
      //         "Tolerance":20,
      //         "Changes":[
    
      //         ],
      //         "sampleRequestStatus":0
      //       },
      //       {
      //         "Id":85617,
      //         "SizeMeasurementApprovalId":50775,
      //         "SupplierMeasurement":null,
      //         "LineId":1116,
      //         "Name":"bb",
      //         "RequestedMeasurement":"2",
      //         "CompanyMeasurement":null,
      //         "SupplierDiscrepancy":0,
      //         "CompanyDiscrepancy":0,
      //         "NewMeasurement":"2",
      //         "Tolerance":5.2,
      //         "Changes":[
    
      //         ],
      //         "sampleRequestStatus":0
      //       },
      //       {
      //         "Id":85618,
      //         "SizeMeasurementApprovalId":50775,
      //         "SupplierMeasurement":null,
      //         "LineId":1117,
      //         "Name":"cc",
      //         "RequestedMeasurement":"0",
      //         "CompanyMeasurement":null,
      //         "SupplierDiscrepancy":0,
      //         "CompanyDiscrepancy":0,
      //         "NewMeasurement":"0",
      //         "Tolerance":null,
      //         "Changes":[
    
      //         ],
      //         "sampleRequestStatus":0
      //       },
      //       {
      //         "Id":85619,
      //         "SizeMeasurementApprovalId":50775,
      //         "SupplierMeasurement":null,
      //         "LineId":1153,
      //         "Name":"r",
      //         "RequestedMeasurement":"33",
      //         "CompanyMeasurement":null,
      //         "SupplierDiscrepancy":0,
      //         "CompanyDiscrepancy":0,
      //         "NewMeasurement":"33",
      //         "Tolerance":null,
      //         "Changes":[
    
      //         ],
      //         "sampleRequestStatus":0
      //       },
      //       {
      //         "Id":85620,
      //         "SizeMeasurementApprovalId":50775,
      //         "SupplierMeasurement":null,
      //         "LineId":1154,
      //         "Name":"4",
      //         "RequestedMeasurement":"0",
      //         "CompanyMeasurement":null,
      //         "SupplierDiscrepancy":0,
      //         "CompanyDiscrepancy":0,
      //         "NewMeasurement":"0",
      //         "Tolerance":20,
      //         "Changes":[
    
      //         ],
      //         "sampleRequestStatus":0
      //       },
      //       {
      //         "Id":85621,
      //         "SizeMeasurementApprovalId":50775,
      //         "SupplierMeasurement":null,
      //         "LineId":1155,
      //         "Name":"3",
      //         "RequestedMeasurement":"0",
      //         "CompanyMeasurement":null,
      //         "SupplierDiscrepancy":0,
      //         "CompanyDiscrepancy":0,
      //         "NewMeasurement":"0",
      //         "Tolerance":0,
      //         "Changes":[
    
      //         ],
      //         "sampleRequestStatus":0
      //       },
      //       {
      //         "Id":85622,
      //         "SizeMeasurementApprovalId":50775,
      //         "SupplierMeasurement":null,
      //         "LineId":1156,
      //         "Name":"3",
      //         "RequestedMeasurement":"0",
      //         "CompanyMeasurement":null,
      //         "SupplierDiscrepancy":0,
      //         "CompanyDiscrepancy":0,
      //         "NewMeasurement":"0",
      //         "Tolerance":0,
      //         "Changes":[
    
      //         ],
      //         "sampleRequestStatus":0
      //       },
      //       {
      //         "Id":85623,
      //         "SizeMeasurementApprovalId":50775,
      //         "SupplierMeasurement":null,
      //         "LineId":1157,
      //         "Name":"4",
      //         "RequestedMeasurement":"0",
      //         "CompanyMeasurement":null,
      //         "SupplierDiscrepancy":0,
      //         "CompanyDiscrepancy":0,
      //         "NewMeasurement":"0",
      //         "Tolerance":0,
      //         "Changes":[
    
      //         ],
      //         "sampleRequestStatus":0
      //       },
      //       {
      //         "Id":85624,
      //         "SizeMeasurementApprovalId":50775,
      //         "SupplierMeasurement":null,
      //         "LineId":1158,
      //         "Name":"9",
      //         "RequestedMeasurement":"0",
      //         "CompanyMeasurement":null,
      //         "SupplierDiscrepancy":0,
      //         "CompanyDiscrepancy":0,
      //         "NewMeasurement":"0",
      //         "Tolerance":0,
      //         "Changes":[
    
      //         ],
      //         "sampleRequestStatus":0
      //       },
      //       {
      //         "Id":85625,
      //         "SizeMeasurementApprovalId":50775,
      //         "SupplierMeasurement":null,
      //         "LineId":1159,
      //         "Name":"77",
      //         "RequestedMeasurement":"0",
      //         "CompanyMeasurement":null,
      //         "SupplierDiscrepancy":0,
      //         "CompanyDiscrepancy":0,
      //         "NewMeasurement":"0",
      //         "Tolerance":0,
      //         "Changes":[
    
      //         ],
      //         "sampleRequestStatus":0
      //       },
      //       {
      //         "Id":85626,
      //         "SizeMeasurementApprovalId":50775,
      //         "SupplierMeasurement":null,
      //         "LineId":1160,
      //         "Name":"ttt",
      //         "RequestedMeasurement":"0",
      //         "CompanyMeasurement":null,
      //         "SupplierDiscrepancy":0,
      //         "CompanyDiscrepancy":0,
      //         "NewMeasurement":"0",
      //         "Tolerance":2,
      //         "Changes":[
    
      //         ],
      //         "sampleRequestStatus":0
      //       },
      //       {
      //         "Id":85627,
      //         "SizeMeasurementApprovalId":50775,
      //         "SupplierMeasurement":null,
      //         "LineId":1169,
      //         "Name":"55",
      //         "RequestedMeasurement":"0",
      //         "CompanyMeasurement":null,
      //         "SupplierDiscrepancy":0,
      //         "CompanyDiscrepancy":0,
      //         "NewMeasurement":"0",
      //         "Tolerance":null,
      //         "Changes":[
    
      //         ],
      //         "sampleRequestStatus":0
      //       },
      //       {
      //         "Id":85628,
      //         "SizeMeasurementApprovalId":50775,
      //         "SupplierMeasurement":null,
      //         "LineId":1161,
      //         "Name":"0",
      //         "RequestedMeasurement":"0",
      //         "CompanyMeasurement":null,
      //         "SupplierDiscrepancy":0,
      //         "CompanyDiscrepancy":0,
      //         "NewMeasurement":"0",
      //         "Tolerance":2,
      //         "Changes":[
    
      //         ],
      //         "sampleRequestStatus":0
      //       },
      //       {
      //         "Id":85629,
      //         "SizeMeasurementApprovalId":50775,
      //         "SupplierMeasurement":null,
      //         "LineId":1170,
      //         "Name":"4",
      //         "RequestedMeasurement":"0",
      //         "CompanyMeasurement":null,
      //         "SupplierDiscrepancy":0,
      //         "CompanyDiscrepancy":0,
      //         "NewMeasurement":"0",
      //         "Tolerance":1,
      //         "Changes":[
    
      //         ],
      //         "sampleRequestStatus":0
      //       },
      //       {
      //         "Id":85630,
      //         "SizeMeasurementApprovalId":50775,
      //         "SupplierMeasurement":null,
      //         "LineId":1503,
      //         "Name":"p",
      //         "RequestedMeasurement":"0",
      //         "CompanyMeasurement":null,
      //         "SupplierDiscrepancy":0,
      //         "CompanyDiscrepancy":0,
      //         "NewMeasurement":"0",
      //         "Tolerance":null,
      //         "Changes":[
    
      //         ],
      //         "sampleRequestStatus":0
      //       },
      //       {
      //         "Id":85631,
      //         "SizeMeasurementApprovalId":50775,
      //         "SupplierMeasurement":null,
      //         "LineId":1504,
      //         "Name":"p",
      //         "RequestedMeasurement":"0",
      //         "CompanyMeasurement":null,
      //         "SupplierDiscrepancy":0,
      //         "CompanyDiscrepancy":0,
      //         "NewMeasurement":"0",
      //         "Tolerance":null,
      //         "Changes":[
    
      //         ],
      //         "sampleRequestStatus":0
      //       }
      //     ]
      //   }
      // ],
      "FinishInsideApproved":finish.finishInsideApproved,
      "FinishOutsideApproved":finish.finishOutsideApproved,
      "FinishInsideComment":finishInsideData,
      "FinishOutsideComment":finishOutsideData,
      "StyleSampleRequestCommentFields": updatedCustomCommentsArray,
      // [
      //   {// custom comment
      //     "Id":13910,
      //     "Approved":false,
      //     "Comment":{
      //       "Text":"",
      //       "VisualComments":[
    
      //       ]
      //     },
      //     "AdminSampleRequestCommentFieldId":1170
      //   },
      //   {
      //     "Id":13911,
      //     "Approved":false,
      //     "Comment":{
      //       "Text":"",
      //       "VisualComments":[
    
      //       ]
      //     },
      //     "AdminSampleRequestCommentFieldId":1225
      //   },
      //   {
      //     "Id":13912,
      //     "Approved":false,
      //     "Comment":{
      //       "Text":"",
      //       "VisualComments":[
    
      //       ]
      //     },
      //     "AdminSampleRequestCommentFieldId":1295
      //   },
      //   {
      //     "Id":13913,
      //     "Approved":false,
      //     "Comment":{
      //       "Text":"",
      //       "VisualComments":[
    
      //       ]
      //     },
      //     "AdminSampleRequestCommentFieldId":1492
      //   },
      //   {
      //     "Id":13914,
      //     "Approved":false,
      //     "Comment":{
      //       "Text":"",
      //       "VisualComments":[
    
      //       ]
      //     },
      //     "AdminSampleRequestCommentFieldId":1518
      //   }
      // ],
      "StyleId":status.styleId,
      "Status":status.status,
      "deadline": status.deadline,
      "ETD":status.etd,
      "RequestedSampleSizesCommand":updatedSampleSizesArray,
      // [
      //   {
      //     "Id":173579,
      //     "SizeRangeSizeId":22,
      //     "RequestedSampleSizeSpecCommands":[
      //       {
      //         "Available":true,
      //         "StyleColorId":"0",
      //         "Quantity":"20"
      //       },
      //       {
      //         "Available":false,
      //         "StyleColorId":"401",
      //         "Quantity":""
      //       },
      //       {
      //         "Available":false,
      //         "StyleColorId":"402",
      //         "Quantity":""
      //       },
      //       {
      //         "Available":false,
      //         "StyleColorId":"403",
      //         "Quantity":""
      //       },
      //       {
      //         "Available":false,
      //         "StyleColorId":"404",
      //         "Quantity":""
      //       },
      //       {
      //         "Available":false,
      //         "StyleColorId":"405",
      //         "Quantity":""
      //       }
      //     ]
      //   },
      //   {
      //     "Id":173580,
      //     "SizeRangeSizeId":23,
      //     "RequestedSampleSizeSpecCommands":[
      //       {
      //         "Available":true,
      //         "StyleColorId":"0",
      //         "Quantity":""
      //       },
      //       {
      //         "Available":false,
      //         "StyleColorId":"401",
      //         "Quantity":""
      //       },
      //       {
      //         "Available":false,
      //         "StyleColorId":"402",
      //         "Quantity":""
      //       },
      //       {
      //         "Available":false,
      //         "StyleColorId":"403",
      //         "Quantity":""
      //       },
      //       {
      //         "Available":false,
      //         "StyleColorId":"404",
      //         "Quantity":""
      //       },
      //       {
      //         "Available":false,
      //         "StyleColorId":"405",
      //         "Quantity":""
      //       }
      //     ]
      //   },
      //   {
      //     "Id":173581,
      //     "SizeRangeSizeId":24,
      //     "RequestedSampleSizeSpecCommands":[
      //       {
      //         "Available":true,
      //         "StyleColorId":"0",
      //         "Quantity":""
      //       },
      //       {
      //         "Available":false,
      //         "StyleColorId":"401",
      //         "Quantity":""
      //       },
      //       {
      //         "Available":false,
      //         "StyleColorId":"402",
      //         "Quantity":""
      //       },
      //       {
      //         "Available":false,
      //         "StyleColorId":"403",
      //         "Quantity":""
      //       },
      //       {
      //         "Available":false,
      //         "StyleColorId":"404",
      //         "Quantity":""
      //       },
      //       {
      //         "Available":false,
      //         "StyleColorId":"405",
      //         "Quantity":""
      //       }
      //     ]
      //   },
      //   {
      //     "Id":173582,
      //     "SizeRangeSizeId":25,
      //     "RequestedSampleSizeSpecCommands":[
      //       {
      //         "Available":true,
      //         "StyleColorId":"0",
      //         "Quantity":""
      //       },
      //       {
      //         "Available":false,
      //         "StyleColorId":"401",
      //         "Quantity":""
      //       },
      //       {
      //         "Available":false,
      //         "StyleColorId":"402",
      //         "Quantity":""
      //       },
      //       {
      //         "Available":false,
      //         "StyleColorId":"403",
      //         "Quantity":""
      //       },
      //       {
      //         "Available":false,
      //         "StyleColorId":"404",
      //         "Quantity":""
      //       },
      //       {
      //         "Available":false,
      //         "StyleColorId":"405",
      //         "Quantity":""
      //       }
      //     ]
      //   }
      // ],
      "TrackingNumber":sampleDataState.sampleData.trackingNumber,
      "Location":sampleDataState.sampleData.location,
      // {
      //   "Id":"5"
      // },
      "Note":sampleDataState.sampleData.note,
      "NotifiedUsers":null,
      "Set_ON_OFF_WIPStateOfStyle":false
    }

    axios({
      url: `${baseUrl}StyleSampleRequest`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: data1,
    })
      .then(res => {
        console.log('success in other sample', res);
        resolve(res);

      })
      .catch(function (error) {
        console.error("error in other sample", error);
      });
  });
}
export default UpdateOtherSampleRequest;


// {
//   "IsQuickSave":false,
//   "IsUpdated":true,
//   "Comment":{
//     "Text":"",
//     "VisualComments":[

//     ]
//   },
//   "Id":33226,
//   "CancelComment":{

//   },
//   "ItemPlacementCommentUpdateCommands":[
//     {
//       "Id":93186,
//       "Approved":false,
//       "Comment":{
//         "Text":"<p>item placement</p>",
//         "VisualComments":[
//           {
//             "Id":"fa6d0812-5bf8-410c-8c5c-dcff3c55324d",
//             "FileIconUrl":"handlers/ThumbnailService.ashx?ResourceId=fa6d0812-5bf8-410c-8c5c-dcff3c55324d&Width=200&Height=168&ResourceType=samplerequest",
//             "Name":"beautiful-beauty-blue-bright-414612.jpg",
//             "FileName":"beautiful-beauty-blue-bright-414612.jpg",
//             "ResourceId":"fa6d0812-5bf8-410c-8c5c-dcff3c55324d",
//             "CreatedOn":"/Date(1582522787990)/",
//             "IsFileEditable":true,
//             "Status":1,
//             "URL":"https://s3-eu-west-1.amazonaws.com/designhubtest/organization_2/style_26/fc22ecfd-6127-40c5-b40d-449e1d22aefa/beautiful-beauty-blue-bright-414612.jpg",
//             "IsDeletedFromS3":false,
//             "IsLink":false,
//             "IsStyleColorActive":false,
//             "IsColorwayModuleAccessible":false,
//             "RelatedEntityId":93186,
//             "RelatedEntityType":6,
//             "Provider":"DesignHub.Business.FileResource.S3FileResource",
//             "StorageLocation":"organization_2/style_26/fc22ecfd-6127-40c5-b40d-449e1d22aefa",
//             "StyleColorName":null
//           }
//         ]
//       },
//       "Status":"0"
//     },
//     {
//       "Id":93187,
//       "Approved":false,
//       "Comment":{
//         "Text":"",
//         "VisualComments":[

//         ]
//       },
//       "Status":"0"
//     }
//   ],
//   "FitApproved":false,
//   "FitComment":{
//     "Text":"",
//     "VisualComments":[

//     ]
//   },
//   "SizeMeasurementCommentUpdateCommands":[
//     {
//       "Comment":{
//         "Text":"",
//         "VisualComments":[

//         ]
//       },
//       "Id":"50775",
//       "Approved":false,
//       "MeasurementLineCommentUpdateCommands":[
//         {
//           "Id":85616,
//           "SizeMeasurementApprovalId":50775,
//           "SupplierMeasurement":null,
//           "LineId":1113,
//           "Name":"aaaaa",
//           "RequestedMeasurement":"553",
//           "CompanyMeasurement":null,
//           "SupplierDiscrepancy":0,
//           "CompanyDiscrepancy":0,
//           "NewMeasurement":"553",
//           "Tolerance":20,
//           "Changes":[

//           ],
//           "sampleRequestStatus":0
//         },
//         {
//           "Id":85617,
//           "SizeMeasurementApprovalId":50775,
//           "SupplierMeasurement":null,
//           "LineId":1116,
//           "Name":"bb",
//           "RequestedMeasurement":"2",
//           "CompanyMeasurement":null,
//           "SupplierDiscrepancy":0,
//           "CompanyDiscrepancy":0,
//           "NewMeasurement":"2",
//           "Tolerance":5.2,
//           "Changes":[

//           ],
//           "sampleRequestStatus":0
//         },
//         {
//           "Id":85618,
//           "SizeMeasurementApprovalId":50775,
//           "SupplierMeasurement":null,
//           "LineId":1117,
//           "Name":"cc",
//           "RequestedMeasurement":"0",
//           "CompanyMeasurement":null,
//           "SupplierDiscrepancy":0,
//           "CompanyDiscrepancy":0,
//           "NewMeasurement":"0",
//           "Tolerance":null,
//           "Changes":[

//           ],
//           "sampleRequestStatus":0
//         },
//         {
//           "Id":85619,
//           "SizeMeasurementApprovalId":50775,
//           "SupplierMeasurement":null,
//           "LineId":1153,
//           "Name":"r",
//           "RequestedMeasurement":"33",
//           "CompanyMeasurement":null,
//           "SupplierDiscrepancy":0,
//           "CompanyDiscrepancy":0,
//           "NewMeasurement":"33",
//           "Tolerance":null,
//           "Changes":[

//           ],
//           "sampleRequestStatus":0
//         },
//         {
//           "Id":85620,
//           "SizeMeasurementApprovalId":50775,
//           "SupplierMeasurement":null,
//           "LineId":1154,
//           "Name":"4",
//           "RequestedMeasurement":"0",
//           "CompanyMeasurement":null,
//           "SupplierDiscrepancy":0,
//           "CompanyDiscrepancy":0,
//           "NewMeasurement":"0",
//           "Tolerance":20,
//           "Changes":[

//           ],
//           "sampleRequestStatus":0
//         },
//         {
//           "Id":85621,
//           "SizeMeasurementApprovalId":50775,
//           "SupplierMeasurement":null,
//           "LineId":1155,
//           "Name":"3",
//           "RequestedMeasurement":"0",
//           "CompanyMeasurement":null,
//           "SupplierDiscrepancy":0,
//           "CompanyDiscrepancy":0,
//           "NewMeasurement":"0",
//           "Tolerance":0,
//           "Changes":[

//           ],
//           "sampleRequestStatus":0
//         },
//         {
//           "Id":85622,
//           "SizeMeasurementApprovalId":50775,
//           "SupplierMeasurement":null,
//           "LineId":1156,
//           "Name":"3",
//           "RequestedMeasurement":"0",
//           "CompanyMeasurement":null,
//           "SupplierDiscrepancy":0,
//           "CompanyDiscrepancy":0,
//           "NewMeasurement":"0",
//           "Tolerance":0,
//           "Changes":[

//           ],
//           "sampleRequestStatus":0
//         },
//         {
//           "Id":85623,
//           "SizeMeasurementApprovalId":50775,
//           "SupplierMeasurement":null,
//           "LineId":1157,
//           "Name":"4",
//           "RequestedMeasurement":"0",
//           "CompanyMeasurement":null,
//           "SupplierDiscrepancy":0,
//           "CompanyDiscrepancy":0,
//           "NewMeasurement":"0",
//           "Tolerance":0,
//           "Changes":[

//           ],
//           "sampleRequestStatus":0
//         },
//         {
//           "Id":85624,
//           "SizeMeasurementApprovalId":50775,
//           "SupplierMeasurement":null,
//           "LineId":1158,
//           "Name":"9",
//           "RequestedMeasurement":"0",
//           "CompanyMeasurement":null,
//           "SupplierDiscrepancy":0,
//           "CompanyDiscrepancy":0,
//           "NewMeasurement":"0",
//           "Tolerance":0,
//           "Changes":[

//           ],
//           "sampleRequestStatus":0
//         },
//         {
//           "Id":85625,
//           "SizeMeasurementApprovalId":50775,
//           "SupplierMeasurement":null,
//           "LineId":1159,
//           "Name":"77",
//           "RequestedMeasurement":"0",
//           "CompanyMeasurement":null,
//           "SupplierDiscrepancy":0,
//           "CompanyDiscrepancy":0,
//           "NewMeasurement":"0",
//           "Tolerance":0,
//           "Changes":[

//           ],
//           "sampleRequestStatus":0
//         },
//         {
//           "Id":85626,
//           "SizeMeasurementApprovalId":50775,
//           "SupplierMeasurement":null,
//           "LineId":1160,
//           "Name":"ttt",
//           "RequestedMeasurement":"0",
//           "CompanyMeasurement":null,
//           "SupplierDiscrepancy":0,
//           "CompanyDiscrepancy":0,
//           "NewMeasurement":"0",
//           "Tolerance":2,
//           "Changes":[

//           ],
//           "sampleRequestStatus":0
//         },
//         {
//           "Id":85627,
//           "SizeMeasurementApprovalId":50775,
//           "SupplierMeasurement":null,
//           "LineId":1169,
//           "Name":"55",
//           "RequestedMeasurement":"0",
//           "CompanyMeasurement":null,
//           "SupplierDiscrepancy":0,
//           "CompanyDiscrepancy":0,
//           "NewMeasurement":"0",
//           "Tolerance":null,
//           "Changes":[

//           ],
//           "sampleRequestStatus":0
//         },
//         {
//           "Id":85628,
//           "SizeMeasurementApprovalId":50775,
//           "SupplierMeasurement":null,
//           "LineId":1161,
//           "Name":"0",
//           "RequestedMeasurement":"0",
//           "CompanyMeasurement":null,
//           "SupplierDiscrepancy":0,
//           "CompanyDiscrepancy":0,
//           "NewMeasurement":"0",
//           "Tolerance":2,
//           "Changes":[

//           ],
//           "sampleRequestStatus":0
//         },
//         {
//           "Id":85629,
//           "SizeMeasurementApprovalId":50775,
//           "SupplierMeasurement":null,
//           "LineId":1170,
//           "Name":"4",
//           "RequestedMeasurement":"0",
//           "CompanyMeasurement":null,
//           "SupplierDiscrepancy":0,
//           "CompanyDiscrepancy":0,
//           "NewMeasurement":"0",
//           "Tolerance":1,
//           "Changes":[

//           ],
//           "sampleRequestStatus":0
//         },
//         {
//           "Id":85630,
//           "SizeMeasurementApprovalId":50775,
//           "SupplierMeasurement":null,
//           "LineId":1503,
//           "Name":"p",
//           "RequestedMeasurement":"0",
//           "CompanyMeasurement":null,
//           "SupplierDiscrepancy":0,
//           "CompanyDiscrepancy":0,
//           "NewMeasurement":"0",
//           "Tolerance":null,
//           "Changes":[

//           ],
//           "sampleRequestStatus":0
//         },
//         {
//           "Id":85631,
//           "SizeMeasurementApprovalId":50775,
//           "SupplierMeasurement":null,
//           "LineId":1504,
//           "Name":"p",
//           "RequestedMeasurement":"0",
//           "CompanyMeasurement":null,
//           "SupplierDiscrepancy":0,
//           "CompanyDiscrepancy":0,
//           "NewMeasurement":"0",
//           "Tolerance":null,
//           "Changes":[

//           ],
//           "sampleRequestStatus":0
//         }
//       ]
//     }
//   ],
//   "FinishInsideApproved":false,
//   "FinishOutsideApproved":false,
//   "FinishInsideComment":{
//     "Text":"",
//     "VisualComments":[

//     ]
//   },
//   "FinishOutsideComment":{
//     "Text":"",
//     "VisualComments":[

//     ]
//   },
//   "StyleSampleRequestCommentFields":[
//     {
//       "Id":13910,
//       "Approved":false,
//       "Comment":{
//         "Text":"",
//         "VisualComments":[

//         ]
//       },
//       "AdminSampleRequestCommentFieldId":1170
//     },
//     {
//       "Id":13911,
//       "Approved":false,
//       "Comment":{
//         "Text":"",
//         "VisualComments":[

//         ]
//       },
//       "AdminSampleRequestCommentFieldId":1225
//     },
//     {
//       "Id":13912,
//       "Approved":false,
//       "Comment":{
//         "Text":"",
//         "VisualComments":[

//         ]
//       },
//       "AdminSampleRequestCommentFieldId":1295
//     },
//     {
//       "Id":13913,
//       "Approved":false,
//       "Comment":{
//         "Text":"",
//         "VisualComments":[

//         ]
//       },
//       "AdminSampleRequestCommentFieldId":1492
//     },
//     {
//       "Id":13914,
//       "Approved":false,
//       "Comment":{
//         "Text":"",
//         "VisualComments":[

//         ]
//       },
//       "AdminSampleRequestCommentFieldId":1518
//     }
//   ],
//   "StyleId":26,
//   "Status":"0",
//   "Deadline":"20-Feb-2020",
//   "ETD":"20-Feb-2020",
//   "RequestedSampleSizesCommand":[
//     {
//       "Id":173579,
//       "SizeRangeSizeId":22,
//       "RequestedSampleSizeSpecCommands":[
//         {
//           "Available":true,
//           "StyleColorId":"0",
//           "Quantity":"20"
//         },
//         {
//           "Available":false,
//           "StyleColorId":"401",
//           "Quantity":""
//         },
//         {
//           "Available":false,
//           "StyleColorId":"402",
//           "Quantity":""
//         },
//         {
//           "Available":false,
//           "StyleColorId":"403",
//           "Quantity":""
//         },
//         {
//           "Available":false,
//           "StyleColorId":"404",
//           "Quantity":""
//         },
//         {
//           "Available":false,
//           "StyleColorId":"405",
//           "Quantity":""
//         }
//       ]
//     },
//     {
//       "Id":173580,
//       "SizeRangeSizeId":23,
//       "RequestedSampleSizeSpecCommands":[
//         {
//           "Available":true,
//           "StyleColorId":"0",
//           "Quantity":""
//         },
//         {
//           "Available":false,
//           "StyleColorId":"401",
//           "Quantity":""
//         },
//         {
//           "Available":false,
//           "StyleColorId":"402",
//           "Quantity":""
//         },
//         {
//           "Available":false,
//           "StyleColorId":"403",
//           "Quantity":""
//         },
//         {
//           "Available":false,
//           "StyleColorId":"404",
//           "Quantity":""
//         },
//         {
//           "Available":false,
//           "StyleColorId":"405",
//           "Quantity":""
//         }
//       ]
//     },
//     {
//       "Id":173581,
//       "SizeRangeSizeId":24,
//       "RequestedSampleSizeSpecCommands":[
//         {
//           "Available":true,
//           "StyleColorId":"0",
//           "Quantity":""
//         },
//         {
//           "Available":false,
//           "StyleColorId":"401",
//           "Quantity":""
//         },
//         {
//           "Available":false,
//           "StyleColorId":"402",
//           "Quantity":""
//         },
//         {
//           "Available":false,
//           "StyleColorId":"403",
//           "Quantity":""
//         },
//         {
//           "Available":false,
//           "StyleColorId":"404",
//           "Quantity":""
//         },
//         {
//           "Available":false,
//           "StyleColorId":"405",
//           "Quantity":""
//         }
//       ]
//     },
//     {
//       "Id":173582,
//       "SizeRangeSizeId":25,
//       "RequestedSampleSizeSpecCommands":[
//         {
//           "Available":true,
//           "StyleColorId":"0",
//           "Quantity":""
//         },
//         {
//           "Available":false,
//           "StyleColorId":"401",
//           "Quantity":""
//         },
//         {
//           "Available":false,
//           "StyleColorId":"402",
//           "Quantity":""
//         },
//         {
//           "Available":false,
//           "StyleColorId":"403",
//           "Quantity":""
//         },
//         {
//           "Available":false,
//           "StyleColorId":"404",
//           "Quantity":""
//         },
//         {
//           "Available":false,
//           "StyleColorId":"405",
//           "Quantity":""
//         }
//       ]
//     }
//   ],
//   "TrackingNumber":"12345",
//   "Location":{
//     "Id":"5"
//   },
//   "Note":"",
//   "NotifiedUsers":null,
//   "Set_ON_OFF_WIPStateOfStyle":false
// }