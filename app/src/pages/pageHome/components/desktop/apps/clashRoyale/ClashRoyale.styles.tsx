import styled from "@emotion/styled";
import { Headers } from "@src/components/navigator/Navigator.styles";
import supercellMagicFont from "./pages/game/fonts/SupercellMagicFont.ttf";

export const ClashRoyale = styled.div`
	width: 100%;
	height: 100%;

	display: flex;

	& ${Headers} {
		background-image: linear-gradient(45deg, #27649e, #1c437b);
		color: ${(props) => props.theme.color.primary100};
	}

	@font-face {
		font-family: "clashRoyaleFont";
		font-weight: normal;
		font-style: normal;
		src: url(${supercellMagicFont});
	}

	font-family: "clashRoyaleFont", sans-serif;
`;
