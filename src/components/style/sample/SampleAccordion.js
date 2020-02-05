import React from 'react';
import {View, Text, TouchableOpacity, Image, 
	Dimensions, TouchableHighlight, StyleSheet} from 'react-native';
import styled from "styled-components";
import {Icon, Picker} from 'native-base';
import { withTheme } from 'styled-components';
import Accordion from 'react-native-collapsible/Accordion';

// relative import
import StyleStatus from './styleStatus';
import Measurement from './measurement';
import Design from './design';
import Finish from './finish';
import ItemPlacement from './ItemPlacement';

const CommentedButton = styled.View`
  background-color: ${props => props.theme.blue};
  margin-left: 15;
  width: 180;
  margin: 15px;
  padding: 0;
  flex-direction: row;
  align-items: center;
`;
const IconView = styled.View`
  width: 30;
  height: 30;
  background-color: #415461;
  justify-content: center;
  align-items: center;
`;
const ButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  width: 150;
  text-align: center;
`;
//button css end


const StyleFileTitle = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: ${props => props.theme.lightBrown};
	/* border: 1px solid #DCD7D4; */
	padding: 10px ;
	margin-bottom: 5px;
`;
const Capital = styled.Text`
	text-transform: uppercase;
	font-family: ${props => props.theme.regular};
	color: ${props => props.theme.textColor};
	font-size: ${props => props.theme.large};
`;

const Flex = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const LessText = styled.Text`
	font-family: ${props => props.theme.regular};
	color: ${props => props.theme.textColor};
	font-size: ${props => props.theme.large};
`;


class SampleAccordion extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			activeSections: [],
			activeComponent :null,
			ArrayData: null
		}
	}
	componentDidMount = () => {
		this.setState({
			ArrayData: this.props.data.adminSampleRequestCommentFields
		})
	}

	_renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };
 
  _renderHeader = section => {
    return (
			<StyleFileTitle>
				<Capital> {section.name} </Capital>
				<Flex>
					<Icon style={{ color: "#555", fontSize: 15, marginRight: 10 }} name="add" />
					<Text>show more</Text>
				</Flex>
			</StyleFileTitle>
    );
	};
 
  _renderContent = section => {
		console.log('render content',this.state.activeComponent, section.name);
		if(this.state.activeComponent != section.name) {
			return null
		}
			console.log('id', section.id);
			return (
				<View style={styles.content}>
					{this.state.activeComponent == "Measurement" && (<Measurement id={this.props.data.id} />)}
					{this.state.activeComponent == "Design" && (<Design id={this.props.data.id} />)}
					{this.state.activeComponent == "Finish" && (<Finish id={this.props.data.id} />)}
					{this.state.activeComponent == "Item placement" && (<ItemPlacement id={this.props.data.id} />)}

				</View>
			)
  };
 
  _updateSections = (activeSections) => {
		console.log("enter in on change", activeSections, this.props.data.adminSampleRequestCommentFields);
		if(activeSections.length > 0) {
			let name = this.state.ArrayData[activeSections].name
			if( name == "Measurement" ) {
				this.setState({activeSections, activeComponent: "Measurement"})
			}
			else if(name == "Design") {
				this.setState({activeSections, activeComponent: "Design"})
			}
			else if(name == "Finish") {
				this.setState({activeSections, activeComponent: "Finish"})
			}
			else if(name == "Item placement") {
				this.setState({activeSections, activeComponent: "Item placement"})
			}
			else {
				this.setState({ activeSections })
			}
		} else {
			this.setState({ activeSections })
		}
		
  };

	render() {
		console.log('props data in accordion', this.props.data);
		return(
			<View>
				{this.state.ArrayData != null ?
					<Accordion
						sections={this.state.ArrayData}
						activeSections={this.state.activeSections}
						// renderSectionTitle={this._renderSectionTitle}
						renderHeader={this._renderHeader}
						renderContent={this._renderContent}
						onChange={this._updateSections}
						underlayColor="#eee"
					/>
					: <Text>loading</Text>
				}
			</View>
		)
	}
}
const styles = StyleSheet.create({

});
export default withTheme(SampleAccordion);
