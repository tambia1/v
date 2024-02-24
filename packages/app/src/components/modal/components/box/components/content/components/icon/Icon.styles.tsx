import styled from "styled-components";
import imageCheck from "./assets/Check.png";
import imageClose from "./assets/Close.png";
import imageError from "./assets/Error.png";
import imageQuestion from "./assets/Question.png";
import imageInfo from "./assets/Info.png";

const Icons = {
	check: imageCheck,
	close: imageClose,
	error: imageError,
	question: imageQuestion,
	info: imageInfo,
} as const;

export type IconsName = keyof typeof Icons;

export const Icon = styled.div``;

export const Image = styled.div<{ $iconName: IconsName }>`
	display: flex;
	width: 50px;
	height: 50px;
	background-image: url(${({ $iconName }) => Icons[$iconName]});
	background-size: contain;
	background-repeat: no-repeat;
	margin: 10px;
`;
