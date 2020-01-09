import styled from 'styled-components';

const SuggestionTerm = styled.Text`
  font-family: ${props => props.theme.regular};
  color: ${props => props.theme.textColor};
  padding: 5px 10px; 
`;

export default SuggestionTerm;

