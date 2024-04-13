import styled, { css } from "styled-components";
import { Button } from "@components/button/Button";

export const TestAnimation = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBgSelected};
`;

export const Rect = styled.div`
	position: absolute;
	height: 500px;
	top: 50px;
	left: 0px;
	right: 0px;
	background-color: black;
`;

const ButtonCommon = css`
	position: absolute;
	width: 100px;
	height: 25px;
	right: 10px;
	background-color: gray;
	text-align: center;
	cursor: pointer;
`;

export const ButtonStart = styled(Button)`
	${ButtonCommon};
	top: 10px;
`;

export const ButtonStop = styled(Button)`
	${ButtonCommon};
	top: 40px;
`;

export const ButtonReset = styled(Button)`
	${ButtonCommon};
	top: 70px;
`;

const RectInfoCommon = css`
	position: absolute;
	left: 10px;
`;

export const RectInfo0 = styled.div`
	${RectInfoCommon};
	top: 10px;
	color: red;
`;

export const RectInfo1 = styled.div`
	${RectInfoCommon};
	top: 30px;
	color: green;
`;

export const RectInfo2 = styled.div`
	${RectInfoCommon};
	top: 50px;
	color: blue;
`;

export const RectInfo3 = styled.div`
	${RectInfoCommon};
	top: 70px;
	color: yellow;
`;

export const RectInfo4 = styled.div`
	${RectInfoCommon};
	top: 90px;
	color: purple;
`;

const RectCommon = css`
	position: absolute;
	width: 10px;
	height: 10px;
	top: 500px;
	left: 0px;
`;

export const Rect0 = styled.div`
	${RectCommon};
	background-color: red;
`;

export const Rect1 = styled.div`
	${RectCommon};
	background-color: green;
`;

export const Rect2 = styled.div`
	${RectCommon};
	background-color: blue;
`;

export const Rect3 = styled.div`
	${RectCommon};
	background-color: yellow;
`;

export const Rect4 = styled.div`
	${RectCommon};
	background-color: purple;
`;
