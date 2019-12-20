// import React, { Component } from 'react';
// import { ScrollView, View } from 'react-native';
// import HTML from 'react-native-render-html';
// import { IGNORED_TAGS, alterNode, makeTableRenderer } from 'react-native-render-html-table-bridge';
// import { WebView } from 'react-native-webview';

// const DWebView = ({htmlStr}) => {
//   const html = "<div><table class='CommentStyleCommentBlueBoxTable FixedTablewidth'><tr><td class='LightColor'>Deadline: </td><td><span>02-Feb-2020</span></td></tr><tr><td class='LightColor'>Status:</td><td><span>Planned</span></td></tr><tr><td class='LightColor'>Location Name: </td><td><span>&nbsp;-</span></td></tr><tr><td class='LightColor'>Location Address: </td><td><span><pre>&nbsp;-</pre></span></td></tr><tr><td class='LightColor'>Note:</td><td><span>454656564</span></td></tr><tr id='notifiedUsersRow'><td class='lightColor'>Notified Users:</td><td id='notifiedUsers'><span>-</span></td></tr></table><br/></div><div class='FixedPadding'><table id='RequestedSampleSizeSpecsTable' class='addNewRecordTableStyle addNewRecordTableStyle PlannedSampleSizeLogTable'><thead><tr><th align='left'>Size</th><th align='left'>Available</th><th align='left'> Air123 - 2343</th></tr></thead><tr><td>1</td><td align='right'>1</td><td align='right'>0</td></tr><tr><td>2</td><td align='right'>0</td><td align='right'>0</td></tr><tr><td>3</td><td align='right'>0</td><td align='right'>0</td></tr><tr><td>4</td><td align='right'>0</td><td align='right'>0</td></tr><tr><td>5</td><td align='right'>0</td><td align='right'>0</td></tr><tr><td>6</td><td align='right'>0</td><td align='right'>0</td></tr><tr><td>7</td><td align='right'>0</td><td align='right'>0</td></tr><tr><td>8</td><td align='right'>0</td><td align='right'>0</td></tr><tr><td>9</td><td align='right'>0</td><td align='right'>0</td></tr><tr><td>10</td><td align='right'>0</td><td align='right'>0</td></tr><tr><td>11</td><td align='right'>0</td><td align='right'>0</td></tr><tr><td>12</td><td align='right'>0</td><td align='right'>0</td></tr><tr><td>13</td><td align='right'>0</td><td align='right'>0</td></tr><tr><td>14</td><td align='right'>0</td><td align='right'>0</td></tr><tr><td>15</td><td align='right'>0</td><td align='right'>0</td></tr></table></div>";
//   const html1 = "<div><table class='CommentStyleCommentBlueBoxTable FixedTablewidth'><tr><td>Note:</td><td><span>&nbsp;uiuyyhjjn</span></td></tr><tr id='notifiedUsersRow'><td class='lightColor'><b>Notified Users:</b></td><td id='notifiedUsers'><span>-</span></td></tr><tr><td>Note:</td><td><span>&nbsp;uiuyyhjjn</span></td></tr><tr id='notifiedUsersRow'><td class='lightColor'><b>Notified Users:</b></td><td id='notifiedUsers'><span>-</span></td></tr><tr><td>Note:</td><td><span>&nbsp;uiuyyhjjn</span></td></tr><tr id='notifiedUsersRow'><td class='lightColor'><b>Notified Users:</b></td><td id='notifiedUsers'><span>-</span></td></tr><tr><td>Note:</td><td><span>&nbsp;uiuyyhjjn</span></td></tr><tr id='notifiedUsersRow'><td class='lightColor'><b>Notified Users:</b></td><td id='notifiedUsers'><span>-</span></td></tr><tr><td>Note:</td><td><span>&nbsp;uiuyyhjjn</span></td></tr><tr id='notifiedUsersRow'><td class='lightColor'><b>Notified Users:</b></td><td id='notifiedUsers'><span>-</span></td></tr><tr><td>Note:</td><td><span>&nbsp;uiuyyhjjn</span></td></tr><tr id='notifiedUsersRow'><td class='lightColor'><b>Notified Users:</b></td><td id='notifiedUsers'><span>-</span></td></tr><tr><td>Note:</td><td><span>&nbsp;uiuyyhjjn</span></td></tr><tr id='notifiedUsersRow'><td class='lightColor'><b>Notified Users:</b></td><td id='notifiedUsers'><span>-</span></td></tr></table></div><br/><div class='FixedPadding'></div>";
//   const config = {
//     WebViewComponent: WebView
//   };
//   const renderers = {
//     table: makeTableRenderer(config)
//   };
//   const htmlConfig = {
//     alterNode,
//     renderers,
//     ignoredTags: IGNORED_TAGS
//   };
//   return (
//     <View style={{ flex: 1}}>
//         <HTML html={htmlStr} {...htmlConfig} />
//      </View>

//   )
// }
// export default DWebView;