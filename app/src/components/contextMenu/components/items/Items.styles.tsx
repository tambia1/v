import styled from "styled-components";

export const ItemsContainer = styled.div<{ $visible: boolean }>`
	width: 100%;
	height: 100%;
	display: ${(props) => (props.$visible ? "block" : "none")};
	position: fixed;
	left: 0;
	top: 0;
	z-index: 1;
	overflow: hidden;
	background-color: #00000055;
	pointer-events: ${(props) => (props.$visible ? "all" : "none")};
	animation: ${({ $visible }) => ($visible ? "show 0.1s forwards" : "none")};

	@keyframes show {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`;

export const Items = styled.div<{ $left: number; $top: number }>`
	position: absolute;
	left: ${(props) => `${props.$left}px`};
	top: ${(props) => `${props.$top}px`};
	width: 20rem;
`;

export const ItemsList = styled.div<{ $isOpen: boolean }>`
	margin-top: 0.5rem;
	display: grid;
	grid-template-rows: ${({ $isOpen }) => ($isOpen ? "1fr" : "0fr")};
	opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
	transition: all 0.3s ease;
`;
