import {Dimensions} from 'react-native';
import styled from "styled-components";

const GridCard = styled.View`
  width: ${props =>
    props.tablet
      ? Dimensions.get("window").width / 4
      : Dimensions.get("window").width / 3 - 13.5};
  height: ${props =>
    props.tablet
      ? Dimensions.get("window").height / 4 - 30
      : Dimensions.get("window").height / 3 - 48};
  border: 1px solid #ccc;
  align-self: flex-end;
  margin: 10px 5px 0px 5px;
`;

export default GridCard;