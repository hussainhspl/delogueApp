import styled from 'styled-components';

const SmallText = styled.Text`
  color: ${props => props.theme.greyText};
  text-transform: uppercase;
  font-family: ${props => props.theme.regular};
  font-size: ${props => props.theme.xs};
`;

export default SmallText;