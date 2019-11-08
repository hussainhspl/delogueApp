import React from "react";
import { View, Text, Modal, Dimensions } from "react-native";
import styled from 'styled-components';

const colArr=[1,2,3,4,5,6];
const sizeArr=['S','M','L','XL','Total'];
const BgView = styled.View`
  background-color: ${props => props.theme.overlayBlue};
  flex: 1;
  justify-content: flex-end;
`;
const ModalView = styled.View`
  height: 50%;
  background-color: #fff;
  /* border-top-width: 1px;
  border-color: #aaa; */
`;
const ColumnRow = styled.View`
  flex-direction: row;
  padding: 15px 0px 0px 0px;
`;
const Column = styled.View`
  width: ${Dimensions.get("window").width / 7};
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-color: #aaa;
`;

class PiecesPopup extends React.Component{
  constructor(props){
    super(props);
    this.state={}
  }
  render() {
		console.log("pieces called");
    return(
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}
        // style={{height: 200}}
        onRequestClose={() => {
          // this.props.close÷
          // {this.closeModal(this.props.close)}
        }}
      >
				<BgView>
          <ModalView>
						<ColumnRow>
              <Column> 
                <Text>Size</Text>
              </Column>
            {
              colArr.map(data => {
                return(
                  <Column> 
                    <Text>Available</Text>
                  </Column>
                )
              })
            }
            </ColumnRow>
            {
              sizeArr.map(data => {
                return(
                  <Column>
                    <Text> {data}</Text>
                  </Column>
                )
              })
            }
					</ModalView>
				</BgView>
			</Modal> 
    )
  }
}
export default PiecesPopup;