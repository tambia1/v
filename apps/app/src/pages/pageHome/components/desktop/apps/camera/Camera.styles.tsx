import styled from "styled-components";

export const Camera = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBgSelected};
`;

export const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	position: relative;
	width: 100%;
	height: 20rem;
`;

export const Image = styled.img`
	position: relative;
	width: 100%;
	height: 100%;

	background-color: ${(props) => props.theme.color.normalBg};

	&[alt]:after {
		display: block;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: "";
		background-color: ${(props) => props.theme.color.normalBg};
		position: absolute;
	}
`;

export const Video = styled.video`
	display: block;
	position: relative;
	width: 100%;
	height: 20rem;
	background-color: ${(props) => props.theme.color.normalBg};
`;

export const Buttons = styled.div`
	display: flex;
	height: auto;
	justify-content: space-between;
	margin-top: auto;
`;
