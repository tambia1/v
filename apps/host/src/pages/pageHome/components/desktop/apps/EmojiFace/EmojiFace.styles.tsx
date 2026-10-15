import styled from "@emotion/styled";

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

export const Video = styled.video`
	position: absolute;
	display: flex;
	width: 100%;
	height: 100%;
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

export const Loader = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	z-index: 1;
`;
