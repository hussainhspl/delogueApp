import styled from 'styled-components';

const CardText = styled.Text`
  font-family: ${props => props.theme.regular};
  font-size: ${props => props.theme.large};
  color: ${props => props.theme.textColor};
  text-transform: capitalize;
`;

export default CardText;