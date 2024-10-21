import { Icon } from "@src/components/icon/Icon.styles";
import styled from "styled-components";

export const CellLeft = styled.div`
	min-width: 2rem;
	height: 2rem;
	display: flex;
	align-items: center;
	flex-shrink: 0;

	& ${Icon} {
		width: 100%;
		height: 100%;
	}
`;
