import styled from "@emotion/styled";
import { Icon } from "@src/components/icon/Icon.styles";

export const CellText = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;

	& ${Icon} {
		width: 100%;
		height: 100%;
	}
`;
