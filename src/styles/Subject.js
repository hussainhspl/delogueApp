import styled from 'styled-components';

const Subject = styled.Text`
  color: ${props => props.theme.darkBlue};
  font-size: ${props => props.theme.xl};
  font-family: ${props => props.theme.bold};
  padding-bottom: 5px;
`;

export default Subject;