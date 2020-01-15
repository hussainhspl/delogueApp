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
      parentId: null
    };
  }
  componentDidMount = () => {
    // console.log('entering in did mount comment');
    // console.log('props data', this.props.location.data, this.props.location.openMessage);
    if (this.state.openMessage) {
      console.log('props data', this.props.dataMsg);
    }
  }
  openMessage(id) {

    console.log("open msg called", id, this.state.showList);
    GetAsyncToken().then(token => {
      SpecificMessage(token, id)
        .then(res => {
          console.log('resp in message comments :', res.data.styleAuditLog);
          this.setState({
            MessageContent: res.data,
            showList: false,
            styleMessage: true
          });
        })
    })
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.MessageContent !== prevState.MessageContent) {
      // console.log("Entered nextProps comments");
      if(nextProps.dataMsg != null) {
        if(prevState.parentId == null)
          console.log("Entered comment derived", nextProps.dataMsg);
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
    })
  }
  openCreateReply = (id)  =>{
    console.log('reply id', id, this.state.MessageContent, this.state.MessageContent.styleId);
    this.setState({
      parentId: id,
      ShowNewMsg: true,
      showMessage: false
    })
  }
  render() {
    console.log("message open",this.props.styleID, this.state.MessageContent, );
    return (
      <View style={{ flex: 1 }}>
        <ItemDetail data={this.props.styleData} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.ShowNewMsg || this.state.showMessage ? (
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
              // submitMessage={this.sendMessage}
            />
          )}

          {this.state.showList && (
            <CommentsList
              closeList={(id) => this.openMessage(id)}
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

export default Comments;
