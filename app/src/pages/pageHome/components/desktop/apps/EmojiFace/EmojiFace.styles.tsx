import styled from "styled-components";

export const EmojiFace = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	color: #ffffff;
	background-color: #000000;
`;

export const Spacer = styled.div`
	width: 100%;
	height: 1rem;
`;

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
`;

export const Col = styled.div`
	display: flex;
	flex-direction: col;
	gap: 0.5rem;
`;

export const Video = styled.video`
	position: absolute;
	display: flex;
	width: 100%;
	height: 100%;
	background-color: #ff0000;
`;

export const Canvas = styled.canvas`
	position: absolute;
	display: flex;
	width: 100%;
	height: 100%;
	background-color: transparent;
`;

export const Container = styled.div`
	position: absolute;
	display: flex;
	width: 100%;
	height: 100%;
	z-index: 1;
`;

export const Buttons = styled.div`
	position: absolute;
	inset: auto 0 0 0;
	display: flex;
	justify-content: center;
	gap: 4rem;
	margin-bottom: 3rem;
`;

export const Loader = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	z-index: 1;
`;
