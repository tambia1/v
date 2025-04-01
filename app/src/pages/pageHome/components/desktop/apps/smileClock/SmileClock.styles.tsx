import styled from "styled-components";
import imageBg from "./assets/bg.avif";

export const SmileClock = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	padding: 1rem;
	box-sizing: border-box;

	color: #ffffff;
	background-color: #000000;

	background-image: url(${imageBg});
	background-size: cover; 
`;

export const Video = styled.video`
	position: absolute;
	display: flex;
	width: 100px;
	height: 100px;
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
