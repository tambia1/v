import { Icon } from "@src/components/icon/Icon.styles";
import styled from "styled-components";

export const CellRight = styled.div`
	width: 1.5rem;
	height: 1.5rem;
	display: flex;
	align-items: center;
	flex-shrink: 0;
	color: ${(props) => props.theme.color.quarteryFg};

	& ${Icon} {
		width: 100%;
		height: 100%;
	}

`;
