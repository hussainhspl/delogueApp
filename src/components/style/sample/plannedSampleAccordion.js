import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import styled from "styled-components";
import { Icon } from "native-base";
import Accordion from 'react-native-collapsible/Accordion';
import { connect } from 'react-redux';
import { sampleStatusPlanned } from '../../../store/actions/index';
import PlannedSampleStatus from './PlannedSampleStatus';
import Collapsible from 'react-native-collapsible';

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
];


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

class PlannedSampleAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      plannedData: null,
    }

  }

  componentDidMount = () => {
    console.log('entered in planned sample accordion');
    this.setState({
      plannedData: this.props.data
    }, () => this.props.sampleStatusPlannedFunction(this.state.plannedData))
  };

  _renderHeader = section => {
    return (
      <StyleFileTitle>
        <Capital> hello </Capital>
        <Flex>
          <Icon style={{ color: "#555", fontSize: 15, marginRight: 10 }} name="add" />
          <Text>show more</Text>
        </Flex>
      </StyleFileTitle>
    );
  };

  _renderContent = section => {
    console.log('enter in render content', section, this.state.plannedData);
    return (
      <View >
        {/* {
          this.state.plannedData != null ?
            // <PlannedSampleStatus />
            // <Text>hey</Text>
            : <Text>loading</Text>
        } */}

      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };
  render() {
    console.log('planned render : ', Array.isArray(this.props.sampleStatusPlannedState), this.props.sampleStatusPlannedState)
    return (
      <View>
        {this.state.plannedData != null ?
          // <Accordion
          //   activeSections={this.state.activeSections}
          //   sections={['Section 1']}
          //   renderSectionTitle={this._renderSectionTitle}
          //   renderHeader={this._renderHeader}
          //   renderContent={this._renderContent}
          //   onChange={this._updateSections}
          //   underlayColor="#eee"
          //   collapsed={false}
          // />
          <View>
            <TouchableHighlight underlayColor="#eee" onPress={() => this.setState({collapse: !this.state.collapse})}>
            <StyleFileTitle>
              <Capital> hello </Capital>
              <Flex>
                <Icon style={{ color: "#555", fontSize: 15, marginRight: 10 }} name="add" />
                <Text>show more</Text>
              </Flex>
            </StyleFileTitle>
            </TouchableHighlight>
            <Collapsible collapsed={this.state.collapse}>
              {/* <SomeCollapsedView />
          < */}
            {
              Array.isArray(this.props.sampleStatusPlannedState) == false ?
              <PlannedSampleStatus /> 
              : null
            }
              
            </Collapsible>
          </View>
          : <Text> loading </Text>}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    // unreadList: state.unreadMessagesList.unreadMessagesListState
    sampleStatusPlannedState: state.sampleRequestTabs.sampleStatusPlannedState,

  };
};
const mapDispatchToProps = dispatch => {
  return {
    sampleStatusPlannedFunction: (data) => dispatch(sampleStatusPlanned(data)),
    // measurementTableFunction: (data) => dispatch(measurementTable(data)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlannedSampleAccordion);
