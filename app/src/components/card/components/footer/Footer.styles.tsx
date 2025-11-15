import styled from "styled-components";

export const Footer = styled.div`
	display: flex;
	width: 100%;
	height: auto;
	box-sizing: border-box;
`;

export const FooterContent = styled.div`
	width: 100%;
	display: flex;
	padding: 0.5rem;
	color: ${(props) => props.theme.color.primary500};
	background-color: ${(props) => props.theme.color.primary200};
	font-size: ${(props) => props.theme.font.font400.size};
	font-weight: ${(props) => props.theme.font.font400.weight};
`;
