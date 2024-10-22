import { Icon } from "@src/components/icon/Icon.styles";
import styled from "styled-components";

export const CellInfo = styled.div`
	width: auto;
	height: 100%;
	display: flex;
	align-items: center;
	flex-shrink: 0;
	color: ${(props) => props.theme.color.quarteryFg};

	& ${Icon} {
		width: 100%;
		height: 100%;
	}

`;
