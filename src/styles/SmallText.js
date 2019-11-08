import styled from 'styled-components';

const SmallText = styled.Text`
  color: #9b9b9b;
  text-transform: uppercase;
  font-family: ${props => props.theme.regular};
  font-size: ${props => props.theme.xs};
`;

export default SmallText;