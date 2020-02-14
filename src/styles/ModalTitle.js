import styled from 'styled-components'

const ModalTitle = styled.Text`
  color: white;
	padding: 10px;
	font-size: ${props => props.theme.xl};
	font-family: ${props => props.theme.regular};
	text-transform : uppercase;
	line-height: 25px;
`;
export default ModalTitle;