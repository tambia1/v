import styled from "styled-components";

export const PageHome = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	position: relative;

	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.normalBg};
`;

export const Apps = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: block;
	gap: 0.5rem;
	color: ${(props) => props.theme.color.normalFg};
`;

export const ThemeMode = styled.div`
	bottom: 1rem;
	right: 1rem;
	margin: 1rem;
	display: flex;
	flex-shrink: 0;
	gap: 1rem;
	align-items: center;
	justify-content: center;
`;

export const Version = styled.div`
	bottom: 1rem;
	left: 1rem;
	margin: 1rem;
	flex-shrink: 0;
	color: ${(props) => props.theme.color.normalFg};
`;

export const PageBar = styled.div`
	overflow: hidden;
	position: relative;
	width: 100%;
	height: 5rem;
	display: flex;
	flex-shrink: 0;
	align-items: center;
	background-color: ${(props) => props.theme.color.normalBg};
	background-color: red;
	z-index: 1;
`;

export const PageBarButton = styled.div<{ $isVisible: boolean }>`
	width: 4rem;
	height: 4rem;
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;
	margin-left: 1rem;
	border-radius: 50%;
	color: ${(props) => props.theme.color.normalFg};
	transition: all 0.3s ease;
	opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
	cursor: ${({ $isVisible }) => ($isVisible ? "pointer" : "none")};
	pointer-events: ${({ $isVisible }) => ($isVisible ? "" : "none")};

	&:active {
		color: ${(props) => props.theme.color.normalFgActive};
	}
`;

export const PageBarSeparator = styled.div`
	width: 100%;
	height: 100%;
`;
