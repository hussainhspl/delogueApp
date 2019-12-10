import {Dimensions, Image} from 'react-native';
import styled from 'styled-components';

const GridImage = styled.Image`
  width: ${props =>
    props.tablet
      ? Dimensions.get("window").width / 4 - 45
      : Dimensions.get("window").width / 3 - 34};
  height: ${props =>
    props.tablet
      ? Dimensions.get("window").height / 4 - 90
      : Dimensions.get("window").height / 3 - 125};
  /* background-color: #dedede; */
`;
export default GridImage;