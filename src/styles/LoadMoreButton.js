import styled from 'styled-components';
import {Dimensions, TouchableHighlight} from 'react-native';

const LoadMoreButton = styled.TouchableHighlight`
  border: 1px solid #ccc;
	padding: 5px 10px;
  margin: 10px 5px 10px 5px;
	width: ${Dimensions.get("window").width /3 - 13.5 };
  align-items:center;
`;
export default LoadMoreButton;