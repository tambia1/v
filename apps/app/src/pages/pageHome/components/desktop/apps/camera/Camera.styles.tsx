import styled from "styled-components";

export const Camera = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBg};
`;

export const Video = styled.video`
	position: absolute;
	display: flex;
	width: 100%;
	height: 100%;
	background-color: ${(props) => props.theme.color.normalBg};
`;

export const ImageContainer = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	position: relative;
	width: 100%;
	height: 100%;
	background-color: transparent;
`;

export const Image = styled.img`
	position: relative;
	width: 100%;
	height: 100%;

	&[alt]:after {
		display: block;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: "";
		position: absolute;
	}
`;

export const Buttons = styled.div`
	position: absolute;
	inset: auto 0 0 0;
	display: flex;
	justify-content: center;
	margin-bottom: 3rem;

	& svg {
		stroke: ${(props) => props.theme.color.normalFg};
		fill: ${(props) => props.theme.color.errorBg};
	}
`;
