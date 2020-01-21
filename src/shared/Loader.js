import React, {Fragment} from 'react';
import { View, Text, Image} from 'react-native';
import LottieView from 'lottie-react-native';
 
export default class BasicExample extends React.Component {
  render() {
    return (
      
        
        // <LottieView 
        //   source={require('../../assets/animation/68-loader.json')} 
        //   autoPlay loop 
        // />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{width: 128, height: 128}}
            source={require('../../assets/img/loader.gif')}
            // source={require('../../assets/img/delogue-loader.gif')}
          />
        </View>
    )
  }
}