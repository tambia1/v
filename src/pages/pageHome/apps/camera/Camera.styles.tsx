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

export const Image = styled.img`
	position: relative;
	width: 10rem;
	height: 10rem;

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
	position: relative;
	width: 10rem;
	height: 10rem;

	background-color: ${(props) => props.theme.color.normalBg};
`;
