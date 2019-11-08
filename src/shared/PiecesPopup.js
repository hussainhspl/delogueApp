import React,{Fragment} from "react";
import { View, Text, Modal, Dimensions, ScrollView } from "react-native";
import styled from 'styled-components';
import ApplyButton from '../styles/ApplyButton'


const colArr=['Availble','102 Nude','200 Black','300 White','400 Cherry Red','500 Orange'];
const sizeArr=['S','M','L','XL','Total'];
const MainArr=[
  {
    size: 'S',
    Available: '',
    spec :[{
      color: '102 Nude',
      qty: 1,
    },
    {
      color: '200 Black',
      qty:'',
    },
    {
      // Available: true,
      color: '300 White',
      qty: 3,
    },{
      color: '200 Black',
      qty:'',
    },{
      color: '200 Black',
      qty:'',
    },]
  },
  {
    size: 'M',
    Available: '',
    spec :[{
      color: '102 Nude',
      qty: 4,
    },
    {
      // Available: true,
      color: '102 Nude',
      qty: 5,
    },
    {
      // Available: true,
      color: '102 Nude',
      qty: '',
    },{
      qty: 3,
    },{
      qty: 3,
    }]
  },
  {
    size: 'L',
    Available: '',
    spec :[{
      color: '102 Nude',
      qty: 7,
    },
    {
      Available: true,
      color: '102 Nude',
      qty: 8,
    },
    {
      Available: true,
      color: '102 Nude',
      qty: 9,
    },{
      qty: 3,
    },{
      qty: 3,
    }]
  },
  {
    size: 'XL',
    Available: '',
    spec :[{
      color: '102 Nude',
      qty: 27,
    },
    {
      Available: true,
      color: '102 Nude',
      qty: 28,
    },
    {
      Available: true,
      color: '102 Nude',
      qty: 11,
    },{
      qty: 13,
    },{
      qty: 13,
    }]
  }
]
const BgView = styled.View`
  background-color: ${props => props.theme.overlayBlue};
  flex: 1;
  justify-content: flex-end;
`;
const ModalView = styled.View`
  height: 60%;
  padding-top: 10px;
  background-color: #fff;/
`;
const ColumnRow = styled.View`
  flex-direction: row;
`;
const HeaderColumn = styled.View`
  width: ${Dimensions.get("window").width / 6};
  height: ${Dimensions.get("window").width / 7};
  justify-content: center;
  align-items: center;
  background-color: #ccc;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-color: #aaa;
  padding: 5px;
`;

const Column = styled.View`
  width: ${Dimensions.get("window").width / 6};
  height: ${Dimensions.get("window").width / 7};
  justify-content: center;
  align-items: center;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-color: #aaa;
  padding: 5px;
`;
const TableData = styled.View`
  height: ${(Dimensions.get("window").width / 7) *4.5};
`;
const SaveRow = styled.View`
  align-items: flex-end;
  padding: 15px;
`;
const ApplyButtonText = styled.Text`
	color: #fff;
	text-transform: uppercase;
	padding-bottom: -5px;
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
        onRequestClose={() => {
        }}
      >
				<BgView>
          <ModalView>
          <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
                <View>
						<ColumnRow>
              <HeaderColumn> 
                <Text>Size</Text>
              </HeaderColumn>
              {colArr.map(c => {
                  return(
                    <HeaderColumn>
                      <Text>{c}</Text>
                    </HeaderColumn>
                  )
                })
              }      
						</ColumnRow>
                  <TableData>
                    <ScrollView>
            {
              MainArr.map(data => {
                return(
						      <ColumnRow>         
                    <Column> 
                      <Text>{data.size}</Text>
                    </Column>
                    <Column> 
                      <Text></Text>
                    </Column>
                      {data.spec.map(data => {
                        return(                             
                          <Column>
                            <Text>{data.qty}</Text>
                          </Column>
                        )
                      })}
                  </ColumnRow>
                )
              })
            }
            <ColumnRow>
              <Column>
                <Text>Total</Text>
              </Column>
              {
                colArr.map(d => {
                  return(
                    <Column />
                    )
                  })
                }
            </ColumnRow>
                </ScrollView>
                </TableData>
            </View>
            </ScrollView>
            <SaveRow>
              <ApplyButton onPress={this.props.close}>
                <ApplyButtonText>save </ApplyButtonText>
              </ApplyButton>
            </SaveRow> 
					</ModalView>
				</BgView>
			</Modal> 
    )
  }
}
export default PiecesPopup;