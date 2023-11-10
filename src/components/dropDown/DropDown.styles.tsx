import styled from "styled-components";

export const DropDown = styled.div`
	width: 20rem;
	position: relative;
`;

export const ListContainer = styled.div<{ $isOpen: boolean }>`
	margin-top: 0.5rem;
	display: grid;
	grid-template-rows: ${({ $isOpen }) => ($isOpen ? "1fr" : "0fr")};
	opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
	transition: all 0.3s ease;
	position: absolute;
	width: 20rem;
`;

export const ContainerIconArrow = styled.div<{ $isOpen: boolean }>`
	transition: all 0.3s ease;

	transform: rotateX(${({ $isOpen }) => ($isOpen ? 180 : 0)}deg);
`;
