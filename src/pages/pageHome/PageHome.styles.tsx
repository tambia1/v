import styled from "styled-components";

export const PageHome = styled.div`
	width: 100%;
	height: 100%;

	display: flex;

	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.normalBg};
`;

export const ThemeMode = styled.div`
	position: absolute;
	bottom: 1rem;
	right: 1rem;
	margin: 1rem;
	display: flex;
	gap: 1rem;
	align-items: center;
	justify-content: center;

	& svg {
		stroke: ${(props) => props.theme.color.normalFg};
	}
`;

export const Version = styled.div`
	position: absolute;
	bottom: 1rem;
	left: 1rem;
	margin: 1rem;
	color: ${(props) => props.theme.color.normalFg};
`;

export const Apps = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	gap: 0.5rem;
	padding-bottom: 6px;
	color: ${(props) => props.theme.color.normalFg};
	font-size: ${(props) => props.theme.size.l};
`;

export const Test = styled.div`
	position: absolute;
	width: 300px;
	height: 400px;
	left: 150px;
	top: 150px;
	display: flex;
`;
