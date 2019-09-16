import React, {Fragment} from 'react';
import { View, Text} from 'react-native';
import LottieView from 'lottie-react-native';
 
export default class BasicExample extends React.Component {
  render() {
    return (
      
        
        <LottieView 
          source={require('../../assets/animation/68-loader.json')} 
          autoPlay loop 
        />
    )
  }
}