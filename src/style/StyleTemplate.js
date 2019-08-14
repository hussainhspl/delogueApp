import React from 'react';
import {View, Text} from 'react-native';
import styled from "styled-components";
import {Icon} from 'native-base';

//button css
const ButtonRow = styled.View`
  justify-content: center;
  align-items: center;
`;
const CommentedButton = styled(View)`
  background-color: #99afaf;
  margin-left: 15;
  width: 180;
  margin: 15px auto;
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

class StyleTemplate extends React.Component {
	render() {
		return(
			<View>
				<ButtonRow>
          <CommentedButton small>
            <IconView>
              <Icon style={{ color: "#fff", fontSize: 15 }} name="undo" />
            </IconView>
            <ButtonText> hide commented </ButtonText>
          </CommentedButton>
        </ButtonRow>
			</View>
		)
	}
}
export default StyleTemplate;
