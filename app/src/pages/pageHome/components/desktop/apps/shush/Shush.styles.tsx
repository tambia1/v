import styled from "styled-components";

export const Shush = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	color: #ffffff;
	background-color: #000000;
`;

export const VolumeBars = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: center;
	height: 100px;
	gap: 2px;
`;

export const Bar = styled.div<{ height: number; color: string }>`
	width: 10px;
	height: ${({ height }) => height}%;
	background-color: ${({ color }) => color};
	transition: height 0.2s ease-in-out, background-color 0.2s ease-in-out;
`;
