import styled from "styled-components";

export const PopupMenu = styled.div`
	width: 20rem;
	position: relative;
`;

export const Items = styled.div<{ $isOpen: boolean }>`
	margin-top: 0.5rem;
	display: grid;
	grid-template-rows: ${({ $isOpen }) => ($isOpen ? "1fr" : "0fr")};
	opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
	transition: all 0.3s ease;
	position: absolute;
	width: 20rem;
	z-index: 1;
`;
