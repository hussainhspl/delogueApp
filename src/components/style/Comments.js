import React, { Fragment } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Accordion, Icon } from "native-base";
import styled from "styled-components/native";
import General from "./General";
import NewMessage from "./NewMessage";
import CommentBlock from "./CommentBlock";
import CommentsList from "./CommentsList";
import ItemDetail from "../../shared/ItemDetail";
import CommonModal from "../../shared/CommonModal";
import SpecificMessage from "../../api/message/specificMessage";
import GetAsyncToken from "../../script/getAsyncToken";
import SpecificStyleMessage from '../style/specificStyleMessage';
import { connect } from 'react-redux';
import { styleId, singleStyle, sampleTab} from '../../store/actions/index';
import GetSelectedStyle from '../../api/getStyle';


const ImageView = styled.View`
  height: ${Dimensions.get("window").width / 3 + 30};
  width: ${Dimensions.get("window").width / 3};
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  margin: 20px 0px 20px 20px;
`;
const StyleImage = styled.Image`
  height: ${Dimensions.get("window").width / 3};
  width: ${Dimensions.get("window").width / 3 - 30};
`;
const Row = styled.View`
  flex-direction: row;
`;

const ImageDetails = styled.View`
  text-align: center;
  flex: 1;
  align-items: center;
  margin: 20px 10px 20px 10px;
`;
const StyleInfo = styled.View`
  flex-direction: row;
  padding-bottom: 10px;
`;
const Title = styled.Text`
  width: 45%;
  text-align: right;
  color: #9b9b9b;
  text-transform: uppercase;
  font-family: ${props => props.theme.bold};
  padding-right: 5px;
  font-size: 13;
`;

const StyledTouchableHighlight = styled.TouchableHighlight`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
`;

const AddButton = styled.View`
  /* border: 1px solid #eee; */
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #849d7a;
  border-radius: 25px;
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

const BackRow = styled.View`
  flex-direction: row;
  padding: 5px 15px;
  align-items: center;
`;
const BackText = styled.Text`
  color: #aaa;
  padding-left: 5px;
  font-size: 12px;
`;

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowNewMsg: false,
      showMessage: props.openMessage || false,
      showList: !props.openMessage || false,
      MessageContent: null,
      styleMessage: false,
      parentId: null, 
      singleStyleState: null,
      existingNotifiedUsers: null,
    };
  }
  componentDidMount = () => {
    console.log('entering in did mount comment',this.props);
    // this.props.styleIdFunction(this.props.dataMsg.styleId);
    // console.log('props data', this.props.location.data, this.props.location.openMessage);
    if (this.state.openMessage) {
      console.log('props data', this.props.dataMsg);
    }
    // if (this.props.style  == null) {
      // console.log('in did mount comments', this.props.styleID);
      this.getCurrentStyle();
    // }
  }
  getCurrentStyle() {
    console.log('enter when click on msg on first page');
    GetAsyncToken()
      .then(token => {
        // GetSelectedStyle(token, this.props.styleID)
        //   .then(res => {
        //     // console.log('got single style : ', res);
        //     this.props.singleStyleFunction(res.data)
        //   })
      })
  }
  openMessage(id, selectedObj) {

    console.log("open msg called when we click on inner style message", selectedObj.messageType, id, this.state.showList);
    if(selectedObj.messageType == "StyleCommunicationMessage") {
      GetAsyncToken().then(token => {
        SpecificMessage(token, id)
          .then(res => {
            console.log('resp in message comments :', res.data.styleAuditLog);
            this.setState({
              MessageContent: res.data,
              showList: false,
              styleMessage: true
            });
            // this.props.styleIdFunction(res.data.styleId);
          })
      })
    } else {
      console.log('comments open msg history :', this.props.history);
      this.props.sampleTabFunction();
      this.props.history.push({
        pathname: '/style',
        SampleCommentData: selectedObj,
        sampleRequestOpen: true
      })
    }
    
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.MessageContent !== prevState.MessageContent) {
      console.log("Entered nextProps comments");
      if(nextProps.dataMsg != null) {
        if(prevState.parentId == null)
          // console.log("Entered comment derived", nextProps.dataMsg);
          return {
            MessageContent: nextProps.dataMsg,
          }
      }
      else {
        return null;
      }  
    }
    
    return null;
  }
  backClicked = () => {
    console.log('back clicked')
    this.setState({
      showList: true,
      ShowNewMsg: false,
      showMessage: false,
      styleMessage : false
    })
  }
  openCreateReply = (id)  =>{
    // console.log('reply id', id, this.state.MessageContent, this.state.MessageContent.styleId);
    console.log('reply notified ', this.state.MessageContent.styleAuditLog.notifiedUsers.length );
    this.setState({
      parentId: id,
      ShowNewMsg: true,
      showMessage: false,
    })
  }
  // shouldComponentUpdate  () {
  //   if(this.state.MessageContent != null) {
  //     console.log("comm style id ",this.state.MessageContent.styleId);
  //     this.props.styleIdFunction(123)
  //   }
  // }
  render() {
    console.log("in comments tab render", this.state.singleStyleState);
    // console.log('enter in comments render', this.props.style)
    return (
      <View style={{ flex: 1 }}>
        <ItemDetail />
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.ShowNewMsg || this.state.showMessage || this.state.styleMessage ? (
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={this.backClicked}
            >
              <BackRow>
                <Icon
                  style={{ color: "#aaa", fontSize: 22 }}
                  name="arrow-back"
                />
                <BackText> back </BackText>
              </BackRow>
            </TouchableOpacity>
          ) : null}
          {this.state.ShowNewMsg && (
            <NewMessage 
              styleID={this.props.styleID == null ? this.state.MessageContent.styleId : this.props.styleID}
              closeMessage={this.backClicked}
              parentId={this.state.parentId}
              selectedUsers= {this.state.MessageContent.styleAuditLog.notifiedUsers != null ? this.state.MessageContent.styleAuditLog.notifiedUsers : null}
              // submitMessage={this.sendMessage}
            />
          )}

          {this.state.showList && (
            <CommentsList
              closeList={(id, selectedObj) => this.openMessage(id, selectedObj)}
              styleID={this.props.styleID}
            />
          )}
          {this.state.showMessage && (
            <Fragment>
              <CommentBlock
                data={this.state.MessageContent}
                createReply={(id1) => this.openCreateReply(id1)}
              />
            </Fragment>
          )}
          {
            this.state.styleMessage && (
              <SpecificStyleMessage
                data={this.state.MessageContent}
                createReply={(id1) => this.openCreateReply(id1)}
              />
            )
          }
        </ScrollView>
        {this.state.ShowNewMsg == false && this.state.showMessage == false ? (
          <AddButton>
            <StyledTouchableHighlight
              underlayColor="#354733"
              onPress={
                () => this.setState({ ShowNewMsg: true, showList: false })
                // console.log('msg button click')
              }
            >
              <Icon style={{ color: "#fff" }} name="ios-add" />
            </StyledTouchableHighlight>
          </AddButton>
        ) : null}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    style: state.singleStyle.singleStyleState,
    styleId: state.styleId.styleIdState

  }
}
const mapDispatchToProps = dispatch => {
  return {
    styleIdFunction: (sid) => dispatch(styleId(sid)),
    singleStyleFunction: (s) => dispatch(singleStyle(s)),
    sampleTabFunction: () => dispatch(sampleTab()),

    // styleListFunction: (s) => dispatch(styleList(s)),;

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
