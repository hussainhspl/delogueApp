import axios from "axios";
import qs from "qs";
import {Platform, PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const PrintPdf = (token, id, PrintOptionsIds, SampleTypeIds) => {
  let TimeZone = new Date().getTimezoneOffset();
  console.log('token styles 12', id, PrintOptionsIds, SampleTypeIds, TimeZone)
  return new Promise(function(resolve, reject) {
    
    RNFetchBlob.fetch('POST', `${baseUrl}style/print/`, {
      "Authorization" : `Bearer ${token}`,
      'Content-Type' : 'application/json',
    }, [
      {"Id" :id.toString(),
      "PrintOptions" : PrintOptionsIds,
      "SelectedSampleTypeIds" : SampleTypeIds,
      "PrintLayout" : "0",
      "TimeZone" : TimeZone.toString()}
    ])
    .then((resp) => {
      console.log('success');
      resolve(resp);
      console.log('success blob', resp);
    }).catch((err) => {
      console.log('failure', err);
    })



    // const data1 = {
    //   "Id" : id.toString(),
    //   "PrintOptions" : PrintOptionsIds,
    //   "SelectedSampleTypeIds" : SampleTypeIds,
    //   "PrintLayout" : 0,
    //   "TimeZone" : TimeZone

    // }
    // axios({
    //   url: `${baseUrl}style/print/`,
    //   method: 'POST',
    //   responseType: 'blob', // important
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/pdf'
    //   },
    //   data: data1,
    // })
    //   .then(res => {
    //     resolve(res);
    //     console.log("response in print pdf", res);
    //     const blob = new Blob([res.data], {
    //       type: 'application/pdf',
    //     });
    //     // FileSaver.saveAs(blob, Math.random());
    //     console.log('blob', blob);
    //   })
    //   .catch(function(error) {
    //     console.error("error in print pdf", error);
    //   });
  });
}
export default PrintPdf;