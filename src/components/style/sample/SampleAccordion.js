import React, { Fragment } from 'react';
import {
	View, Text, TouchableOpacity, Image,
	Dimensions, TouchableHighlight
} from 'react-native';
import styled from "styled-components";
import { Icon, Picker } from 'native-base';
import { withTheme } from 'styled-components';
import Accordion from 'react-native-collapsible/Accordion';
// relative import
import Measurement from './measurement';
import DesignTab from './designTab';
import Finish from './finish';
import SampleStatus from './sampleStatus';
import CustomComment from './customComment';
import ItemPlacement from './ItemPlacement';
import GetAsyncToken from '../../../script/getAsyncToken';
import GetMeasurement from '../../../api/sample/getMeasurement';
import GetItemPlacement from '../../../api/sample/getItemPlacement';
import GetDesign from '../../../api/sample/getDesign';
import GetFinish from '../../../api/sample/getFinish';
import GetSampleStatus from '../../../api/sample/get SampleStatus';
import GetCustomComment from '../../../api/sample/getCustomComment';
import { connect } from 'react-redux';
import { measurementTable } from '../../../store/actions/index';


let renderOnce;

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
			activeComponent: null,
			ArrayData: null,
			custom: false,
			measurement: null,
			itemPlacementData: null,
			designData: null,
			textAreaDesign: "",
			finishData: null,
			statusData: null,
			customData: [],
			commentFieldId: null,
			gotAllData: false
		}
	}
	componentDidMount = () => {
		console.log('accordion did mount', this.props.data.sampleRequestStatus);
		GetAsyncToken()
			.then(token => {
				GetMeasurement(token, this.props.data.id)
					.then(res => {
						console.log('response from measurement api', res);
						this.setState({
							measurement: res.data,
						}, () => this.callItemPlacement(token))
					})
			})
		if (this.props.data.sampleRequestStatus == "Planned") {
			let requestedFields = this.props.data.adminSampleRequestCommentFields.filter(item => item.name == "Sample status");
			console.log('filter', requestedFields);
			this.setState({
				ArrayData: requestedFields
			})
			// this.setState({
			// 	ArrayData: this.props.data.adminSampleRequestCommentFields
			// })
		} else {
			this.setState({
				ArrayData: this.props.data.adminSampleRequestCommentFields
			})
		}
	}
	callItemPlacement(token) {
		GetItemPlacement(token, this.props.data.id)
			.then(res => {
				console.log('item placement data from api', res)
				this.setState({
					itemPlacementData: res.data
				}, () => this.callDesign(token))
				// res.data.itemPlacementComments.map((d, idx) => {
				// 	console.log('in map', d.designerComment.text, d.id)
				// 	this.setState({
				// 		[d.id]: d.designerComment.text
				// 	})
				// })
			})
	}

	callDesign(token) {
		GetDesign(token, this.props.data.id)
			.then(res => {
				console.log('design data from api', res)
				this.setState({
					designData: res.data,
					textArea: res.data.designCommentDetails.designerComment.text
				}, () => this.callFinish(token))
			})
	}

	callFinish(token) {
		console.log('done design')
		GetFinish(token, this.props.data.id)
			.then(res => {
				console.log('finish data from api', res)
				this.setState({
					finishData: res.data,
				}, () => this.callSampleStatus(token))
			})
	}

	callSampleStatus(token) {
		console.log('ge in sample status');

		GetSampleStatus(token, this.props.data.id)
			.then(res => {
				console.log('sample status data from api', res)
				this.setState({
					statusData: res.data,
				}, () => this.callCustomComments(token))
			})
	}

	callCustomComments(token) {
		if (this.state.activeSections.length > 0) {
			// this.state.commentFieldId = this.state.ArrayData[this.state.activeSections[0]].id;
			// console.log('custom ids', this.state.ArrayData);
		}
		this.state.ArrayData.map(d => {
			if (d.templateSubTabId == 6) {
				// console.log("d.id", d.id);
				GetCustomComment(token, this.props.data.id, d.id)
					.then(res => {
						console.log('custom comments data from api', res);
						this.setState(prevState => ({
							customData: [...prevState.customData, res.data.styleSampleRequestCommentFields],
						}), 
						() => this.setState({gotAllData : true})
						)
					})
			}
		})
	}
	updateMeasurement = (LineComments) => {
		console.log('update measurement called', LineComments, this.state.measurement);
		let updateArray=[];
		LineComments.map( data => {
			let {id, designerComment, approved, measurementLineMeasurements} = data;
			let fields = {
				"Comment" : designerComment,
				"id" : id,
				"Approved" : approved,
				"MeasurementLineCommentUpdateCommands" : measurementLineMeasurements	
			};
			updateArray.push(fields);
		})
		console.log('updateArray', updateArray);
		this.props.measurementTableFunction(updateArray);

	}
	_renderSectionTitle = section => {
		return (
			<View>
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
		// console.log('render content', this.state.activeSections);

		if (this.state.activeComponent != section.name) {
			return null
		}
		// console.log('id', section.id, this.state.activeComponent);

		// let commentFieldId;
		if (this.state.activeSections.length > 0) {
			this.state.commentFieldId = this.state.ArrayData[this.state.activeSections[0]].id;
		}
  	let currentCustomTab = this.state.customData.filter(data => data.adminSampleRequestCommentField.id == section.id)
		// console.log('this.state.activeComponent', this.state.activeComponent, currentCustomTab);
		return (
			<View>
				{this.state.activeComponent == "Measurement" && (<Measurement 
					data={this.state.measurement.measurementComments} 
					id={this.props.data.id}
					parent={this.updateMeasurement}
				/>)}
				{this.state.activeComponent == "Design" && (<DesignTab data={this.state.designData} id={this.props.data.id} />)}
				{this.state.activeComponent == "Finish" && (<Finish data={this.state.finishData} id={this.props.data.id} />)}
				{this.state.activeComponent == "Item placement" && (<ItemPlacement data={this.state.itemPlacementData} id={this.props.data.id} />)}
				{this.state.activeComponent == "Sample status" && (<SampleStatus data={this.state.statusData} id={this.props.data.id} />)}
				{
					(this.state.activeComponent != "Measurement" &&
						this.state.activeComponent != "Design" &&
						this.state.activeComponent != "Finish" &&
						this.state.activeComponent != "Item placement" &&
						this.state.activeComponent != "Sample status" &&
						this.state.activeSections.length > 0) ?
						<Fragment>
							{console.log('render custom', this.state.activeComponent)}
							<CustomComment data={currentCustomTab} id={this.props.data.id} />
						</Fragment>
						
						 :
						null
				}
			</View>
		)
	};

	_updateSections = (activeSections) => {
		// console.log("enter in on change", activeSections, this.props.data.adminSampleRequestCommentFields);
		if (activeSections.length > 0) {
			let name = this.state.ArrayData[activeSections].name
			// console.log('name', name)
			if (name == "Measurement") {
				this.setState({ activeSections, activeComponent: "Measurement" })
			}
			else if (name == "Design") {
				this.setState({ activeSections, activeComponent: "Design" })
			}
			else if (name == "Finish") {
				this.setState({ activeSections, activeComponent: "Finish" })
			}
			else if (name == "Item placement") {
				this.setState({ activeSections, activeComponent: "Item placement" })
			}
			else if (name == "Sample status") {
				this.setState({ activeSections, activeComponent: "Sample status" })
			}
			else {
				this.setState({ activeSections, activeComponent: name })
			}
		} else {
			this.setState({ activeSections })
		}

	};

	render() {
		// console.log('props data in accordion', this.props.data);
		return (
			<View>
				{this.state.ArrayData != null ?
					this.state.gotAllData ?
						<Accordion
							sections={this.state.ArrayData}
							activeSections={this.state.activeSections}
							// renderSectionTitle={this._renderSectionTitle}
							renderHeader={this._renderHeader}
							renderContent={this._renderContent}
							onChange={this._updateSections}
							underlayColor="#eee"
						/>
						: <Text>Getting Api Data </Text>
						: <Text>loading</Text>
				}
			</View>
		)
	}
}

const mapStateToProps = state => {
  return {
    // unreadList: state.unreadMessagesList.unreadMessagesListState
  };
};
const mapDispatchToProps = dispatch => {
  return {
    measurementTableFunction: (data) => dispatch(measurementTable(data))
    
  };
}

export default connect(
	mapStateToProps, mapDispatchToProps)(withTheme(SampleAccordion)
);


