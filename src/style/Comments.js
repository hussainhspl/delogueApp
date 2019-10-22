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
import ItemDetail from "../shared/ItemDetail";
import CommentsList from "./CommentsList";
import CommonModal from "../shared/CommonModal";

const data = {
  styleNo: "sty2211",
  styleName: "Casual Shirt",
  supplier: "head textiles",
  season: "summer"
};

const dataArray = [{ title: "New Message", content: <NewMessage /> }];

// const MessageAccordion = styled.Accordion`
//   background-color: #f00;
// `;

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
const SubTitle = styled.Text`
  text-align: left;
  width: 55%;
  color: #4a4a4a;
  padding-left: 5;
  text-transform: capitalize;
  font-size: 13;
  font-family: ${props => props.theme.regular};
`;

const StyledTouchableOpacity = styled.TouchableHighlight`
  position: absolute;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  right: 20px;
  bottom: 20px;
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
`;

const BackRow = styled.View`
  flex-direction: row;
  padding: 15px 0px 5px 15px;
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
      showMessage: false,
      showList: true,
    };
  }
  render() {
    console.log("hello");
    return (
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ItemDetail data={data} />
          {this.state.showList && (
            <CommentsList
              close={() => {
                this.setState({ showList: false, showMessage: true });
                console.log("hey", this.state.showList);
              }}
            />
          )}
          {this.state.ShowNewMsg && <Fragment>
                <TouchableOpacity activeOpacity={0.3} onPress={ () => this.setState({showList: true})}>
              <BackRow>
                  <Icon style={{color: '#aaa', fontSize: 22}} name="arrow-back" />
                  <BackText> back </BackText>
              </BackRow>
                </TouchableOpacity>
                <NewMessage />
                </Fragment>}
          {this.state.showMessage && 
            <Fragment>
                <TouchableOpacity activeOpacity={0.3} onPress={ () => this.setState({showList: true})}>
              <BackRow>
                  <Icon style={{color: '#aaa', fontSize: 22}} name="arrow-back" />
                  <BackText> back </BackText>
              </BackRow>
                </TouchableOpacity>
              <CommentBlock />
            </Fragment>
          }
          
        </ScrollView>
        {this.state.ShowNewMsg == false ? (
          <StyledTouchableOpacity
            underlayColor="#354733"
            onPress={() => this.setState({ ShowNewMsg: true })}
          >
            <AddButton>
              <Icon style={{ color: "#fff" }} name="ios-add" />
            </AddButton>
          </StyledTouchableOpacity>
        ) : null}
      </View>
    );
  }
}

export default Comments;
