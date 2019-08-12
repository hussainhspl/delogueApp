import React from 'react';
import { View, Text, ScrollView, Dimensions, Image } from 'react-native';
import styled from  'styled-components';


const StyleDescriptionRow = styled.View`
	padding: 5px;
	flex-direction: row;
	align-items: center;
	border-bottom-width: 1px;
	border-bottom-color: #ddd;
	margin-bottom: 5px;
`;

const ImageBox = styled.View`
	height: 40px;
	width: 40px;
	border-width: 1px;
	border-color: #ddd;
	border-radius: 4px;
	justify-content: center;
	align-items: center;
`;

const Flex = styled.View`
	flex: 1;
`;

const Row = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin: auto;
	width: 100%;
`;

const Title = styled.Text`
	font-weight: 600;
	font-size: 11px;
	padding-right: 5px;
	color: #7b7b7b;
	text-transform: uppercase;
	text-align: right;
	width: ${Dimensions.get('window').width/ 5};
	padding-top: 2px;
`;
const SubTitle = styled.Text`
	font-size: 12;
	color: #222;
`;
class Sample extends React.Component {
  render() {
    return(
      <ScrollView  showsVerticalScrollIndicator={false}>
				<StyleDescriptionRow> 
					<ImageBox>
						<Image resizeMode={"contain"} source={require('../../img/styleblack.png')} /> 
					</ImageBox>
					<Flex>
						<Row>
							<Title numberOfLines={1}>style no</Title>
							<Flex>
								<SubTitle numberOfLines={1}>sty1100</SubTitle>
							</Flex>
							{/* <Text>hello</Text> */}
						</Row>
						<Row>
							<Title numberOfLines={1}>style name</Title>
							<Flex>
								<SubTitle numberOfLines={1}>sty1100uyuyyhkghgjgg</SubTitle>
							</Flex>
						</Row>
					</Flex>

					<Flex>
						<Row>
							<Title numberOfLines={1}>supplier</Title>
							<Flex>
								<SubTitle numberOfLines={1}>sty1100</SubTitle>
							</Flex>
						</Row>
						<Row>
							<Title numberOfLines={1}>season</Title>
							<Flex>
								<SubTitle numberOfLines={1}>sty1100uyuyyhkghgjgg</SubTitle>
							</Flex>
						</Row>
					</Flex>
				</StyleDescriptionRow>
      </ScrollView>
    )
  }

}
export default Sample