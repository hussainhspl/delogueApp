import React from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components'

const ImageView = styled.View`
  height: 250,
`;

class Style extends React.Component {
  render() {
    return(
      <View>
        {/* <ImageView>
          <Image 
            resizeMode={"center"}
            source={require('../../img/shirt-static.png')}

          />
        </ImageView> */}
        <Text> hey </Text>
      </View>
    )
  }
}

export default Style;