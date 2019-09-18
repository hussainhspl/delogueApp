import React, {Fragment} from "react";
import {
  View,
  Text,
  Dimensions
} from "react-native";
import styled from "styled-components";
import { Icon, Button } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CommonModal from "../shared/CommonModal";

const ModalTitle = styled.View`
  background-color: #415461;
  padding: 10px 0px;
  flex-direction: row;
  align-items: center;
`;
const CloseBox = styled.View`
  margin-left: auto;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
`;
const HeaderText = styled.Text`
  color: white;
  padding-left: 10px;
  font-size: 16px;
  text-transform: uppercase;
  line-height: 25px;
`;
const ApplyBar = styled.View`
  padding: 15px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.lightBrown};
  padding-right: 15px;
`;
const SummaryTitle = styled.Text`
  font-weight: 600;
  color: #9b9b9b;
  text-transform: uppercase;
  padding-right: 5px;
  width: 50%;
  text-align: right;
  /* background-color:  #ddd; */
`;
const Info = styled.Text`
  width: 50%;
  /* background-color: red; */
  padding-left: 5px;
`;
const Row = styled.View`
  flex-direction: row;
  padding-bottom: 10px;
`;
const StyleImage = styled.Image`
  max-width: ${Dimensions.get("window").width/1.5 - 30};
  max-height: ${Dimensions.get("window").height/1.8 - 30};
  padding: 10px;
`;
const ImageBox = styled.View`
  width: ${Dimensions.get("window").width /1.5 };
  height: ${Dimensions.get("window").height /1.8};
  justify-content: center;
  align-items: center;
  margin: auto;
  /* background-color: #f00; */
`;
class StyleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
	}
	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}
  render() {
    
    return (
      <Fragment>
        <ImageBox>
          <StyleImage
            resizeMode={"contain"}
            source={require("../../assets/img/shirt-static.png")}
          />
        </ImageBox>
        {/* {this.props.hideButton ? null : ( */}
          <ApplyBar>
            <Row>
              <SummaryTitle> Name </SummaryTitle>
              <Info>babican_feather tee</Info>
            </Row>
            <Row>
              <SummaryTitle> file name </SummaryTitle>
              <Info>babican_feather tee.png</Info>
            </Row>
            <Row>
              <SummaryTitle> created </SummaryTitle>
              <Info>18 Aug 2019</Info>
            </Row>
            <Row>
              <SummaryTitle> State </SummaryTitle>
              <Info>Active</Info>
            </Row>
            <Row>
              <SummaryTitle> File Note </SummaryTitle>
              <Info>
                PLaborum voluptate nostrud pariatur deserunt amet est excepteur
                laborum cillum occaecat voluptate. Irure est aute tempor ex
                incididunt ea nostrud ullamco consequat{" "}
              </Info>
            </Row>
          </ApplyBar>
 
      </Fragment>
    );
  }
}
export default StyleModal;
