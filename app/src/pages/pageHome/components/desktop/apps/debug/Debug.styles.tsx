import styled from "styled-components";

export const Debug = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	box-sizing: border-box;
	padding: 1rem;

	background-color: ${(props) => props.theme.color.normalBgSelected};
`;

export const Console = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	white-space: pre-wrap;
	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.accentBg};
	padding: 1rem;
	box-sizing: border-box;
	box-shadow: ${(props) => props.theme.color.shadow};
`;
