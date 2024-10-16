import { Icon } from "@src/components/icon/Icon.styles";
import styled from "styled-components";

export const CellCenter = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;

	& ${Icon} {
		width: 100%;
		height: 100%;
	}
`;
