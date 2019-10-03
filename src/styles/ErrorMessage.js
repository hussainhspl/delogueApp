import styled from 'styled-components';
import {Dimensions} from 'react-native';


const ErrorMessage = styled.View`
  height: 30px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: ${Dimensions.get("window").width};
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 1;
  background-color: #b22929;
`;

export default ErrorMessage;