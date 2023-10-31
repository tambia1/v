import styled from "styled-components";

export const AppContainer = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	position: relative;

	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.normalBg};
`;

export const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	gap: 0.5rem;
	padding: 1rem;
	color: ${(props) => props.theme.color.normalFg};
	font-size: ${(props) => props.theme.size.l};
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
`;

export const Version = styled.div`
	position: absolute;
	bottom: 1rem;
	left: 1rem;
	margin: 1rem;
	color: ${(props) => props.theme.color.normalFg};
`;
