import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: 1rem;
	overflow: hidden;

	display: flex;
	flex-direction: row;
	gap: 0.2rem;

	border: solid 0.1rem #aaaaaa;
	padding: 0.2rem;

	background-color: #ffffff;
`;

export const Cell = styled.div<{ $isSelected: boolean; $isEnabled: boolean }>`
	width: 100%;
	height: 100%;

	background-color: ${({ $isSelected, $isEnabled }) => ($isEnabled ? ($isSelected ? "green" : "lightgreen") : $isSelected ? "grey" : "lightgrey")};

	&:hover {
		background-color: green;
		cursor: pointer;
	}
`;
