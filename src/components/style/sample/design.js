import React, {Fragment} from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import styled from 'styled-components';
import GetAsyncToken from '../../../script/getAsyncToken';
import GetDesign from '../../../api/sample/getDesign';

class Design extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount = () => {
    GetAsyncToken()
      .then(token => {
        GetDesign(token, this.props.id)
          .then(res => {
            console.log('design data from api',res)
          })
      })
  }
  render() {
    return(
      <Text>design data </Text>
    )
  }
}
export default Design;
