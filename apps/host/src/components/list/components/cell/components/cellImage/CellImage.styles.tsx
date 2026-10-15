import styled from "@emotion/styled";
import { Icon } from "@src/components/icon/Icon.styles";

export const CellImage = styled.div`
	width: 2rem;
	height: 2rem;
	display: flex;
	align-items: center;
	flex-shrink: 0;
	color: ${(props) => props.theme.color.primary500};

	& ${Icon} {
		width: 100%;
		height: 100%;
	}
`;
