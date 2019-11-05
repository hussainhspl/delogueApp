import {Dimensions} from 'react-native'
import styled from "styled-components";

const GridImageView = styled.View`
width: ${props =>
  props.tablet
    ? Dimensions.get("window").width / 4
    : Dimensions.get("window").width / 3 - 25};
height: ${props =>
  props.tablet
    ? Dimensions.get("window").height / 4 - 80
    : Dimensions.get("window").height / 3 - 120};
justify-content: center;
align-items: center;
align-self: center;
/* background-color: #aaa; */
`;

export default GridImageView;
