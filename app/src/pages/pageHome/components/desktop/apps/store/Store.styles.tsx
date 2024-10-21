import { Text } from "@src/components/text/Text";
import styled from "styled-components";
import imageBg from "./assets/bg.jpg";

export const Store = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.primaryBgSelected};

	background-image: url(${imageBg});
	background-size: cover;

	overflow: auto;
`;

export const Title = styled(Text).attrs({ fontSize: "header" })``;

export const Group = styled.div`
	display: flex;
	flex-direction: column;
`;

export const App = styled.div`
	display: flex;
	flex-direction: row;
	padding: 1rem;
`;

export const AppIcon = styled.div<{ url: string }>`
	border-radius: 0.5rem;
	width: 5rem;
	height: 5rem;
	flex-shrink: 0;
	background-image: url(${(props) => props.url});
	background-size: contain;
	background-repeat: no-repeat;
	background-position: 50%;
	background-color: ${(props) => props.theme.color.primaryBg};
	box-shadow: ${(props) => props.theme.shadow.box} ${(props) => props.theme.color.primaryFg};

	border-radius: 15px;
	cursor: pointer;
`;

export const AppName = styled.div`
	display: flex;
	align-items: center;
	margin-left: 1rem;
`;
