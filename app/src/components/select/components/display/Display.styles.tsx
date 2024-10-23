import styled from "styled-components";

export const Display = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const ContainerIconArrow = styled.div<{ $isOpen: boolean }>`
	transition: all 0.3s ease;

	transform: rotateX(${({ $isOpen }) => ($isOpen ? 180 : 0)}deg);
`;
