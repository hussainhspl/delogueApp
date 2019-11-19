import styled from 'styled-components'

const ButtonText = styled.Text`
	color: #fff;
	text-transform: uppercase;
	padding: 0px 5px;
	font-family: ${props => props.theme.regular};
	font-size: ${props => props.theme.large};
`;
export default ButtonText;