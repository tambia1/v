import styled from "styled-components";

export const Redis = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.primary200};
`;

export const Transition = styled.div<{ $visible: boolean }>`
	width: 100%;
	height: 100%;
	position: absolute;
	transition: opacity 0.3s ease;
	opacity: ${(props) => (props.$visible ? 1 : 0)};
	z-index: ${(props) => (props.$visible ? 1 : 0)};
	pointer-events: ${(props) => (props.$visible ? "auto" : "none")};
`;
