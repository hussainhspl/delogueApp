import styled from 'styled-components';
import {TouchableHighlight} from 'react-native'

const Close = styled.TouchableHighlight`
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -10px;
  top: -10px;
  background-color: #ddd;
  border-radius: 15px;
  margin: 5px;
  border: 1px solid #bbb
`;

export default Close;