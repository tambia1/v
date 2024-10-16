import { Icon } from "@src/components/icon/Icon.styles";
import styled from "styled-components";

export const CellRight = styled.div`
	width: 2rem;
	height: 100%;
	display: flex;
	align-items: center;
	flex-shrink: 0;

	& ${Icon} {
		width: 100%;
		height: 100%;
	}

`;
