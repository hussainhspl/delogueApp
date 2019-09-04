import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import styled from 'styled-components';


const ImageBox = styled.View`
  height: 40px;
  width: 40px;
  border: 1px #ddd solid;
  border-color: #ddd;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;

`;
const Flex = styled.View`
   flex: 1;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 11px;
  padding-right: 5px;
  color: #9b9b9b;
  text-transform: uppercase;
  text-align: right;
  width: ${Dimensions.get("window").width / 5};
  padding-top: 2px;
`;

const SubTitle = styled.Text`
  font-size: 12px;
  color: #4A4A4A;
`;

const MainRow = styled.View`
  border-bottom-width: 0.5px;
  border-color: rgba(0,0,0,0.3);
  padding: 5px 5px 10px 5px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state={} 
  };
  render() {
    let data= this.props.data;
    // console.log("data",data);
    return(
      <MainRow>
        <ImageBox>
          <Image resizeMode="contain" source={require('../../assets/img/styleblack.png')} /> 
        </ImageBox>
        <Flex>
          <Row>
            <Title numberOfLines={1} >style no</Title>
            <Flex>
              <SubTitle numberOfLines={1}>{data.styleNo}</SubTitle>
            </Flex>
          </Row>
          <Row>
            <Title >style name</Title>
            <Flex>
              <SubTitle numberOfLines={1}>{data.styleName}</SubTitle>
            </Flex>
          </Row>
        </Flex>

        <Flex>
          <Row>
            <Title numberOfLines={1} >supplier</Title>
            <Flex>
              <SubTitle numberOfLines={1}>{data.supplier}</SubTitle>
            </Flex>
          </Row>
          <Row>
            <Title numberOfLines={1} > season</Title>
            <Flex>
              <SubTitle numberOfLines={1} >{data.season}</SubTitle>
            </Flex>
          </Row>
        </Flex>
      </MainRow>
    )
  }
}

export default ItemDetail;
