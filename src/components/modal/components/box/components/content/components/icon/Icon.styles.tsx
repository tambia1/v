import styled from "styled-components";
import imageCheck from "./assets/Check.png";
import imageClose from "./assets/Close.png";
import imageError from "./assets/Error.png";
import imageHelp from "./assets/Help.png";
import imageInfo from "./assets/Info.png";

const Icons = {
	check: imageCheck,
	close: imageClose,
	error: imageError,
	help: imageHelp,
	info: imageInfo,
};

export type IconsName = keyof typeof Icons;

export const Container = styled.div``;

export const Icon = styled.div<{ $iconName: IconsName }>`
	display: flex;
	width: 50px;
	height: 50px;
	background-image: url(${({ $iconName }) => Icons[$iconName]});
	background-size: contain;
	background-repeat: no-repeat;
	margin: 10px;
`;
