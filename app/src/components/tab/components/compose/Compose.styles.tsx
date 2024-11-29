import styled from "styled-components";

export const Compose = styled.div`
	width: auto;
	height: auto;
	display: flex;
	flex-direction: row;
	box-sizing: border-box;
	overflow: hidden;
	background-color: ${(props) => props.theme.color.primaryBgHover};
	border-radius: 5rem;
`;
