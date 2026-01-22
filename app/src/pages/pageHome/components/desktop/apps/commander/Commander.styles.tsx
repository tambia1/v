import styled from "@emotion/styled";
import { Headers } from "@src/components/navigator/Navigator.styles";
import oswaldFont from "./pages/fonts/Oswald-VariableFont_wght.ttf";

export const Commander = styled.div`
	@font-face {
		font-family: "Oswald";
		font-weight: normal;
		font-style: normal;
		src: url(${oswaldFont});
	}

	font-family: "Oswald", sans-serif;
	font-weight: bold;

	width: 100%;
	height: 100%;

	display: flex;

	& ${Headers} {
		background-image: linear-gradient(45deg, #2F3337, #4A4F55);
		color: ${(props) => props.theme.color.success400};
	}
`;
