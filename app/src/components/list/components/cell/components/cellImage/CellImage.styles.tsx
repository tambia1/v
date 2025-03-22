import { Icon } from "@src/components/icon/Icon.styles";
import styled from "styled-components";

export const CellImage = styled.div`
	width: 2rem;
	height: 2rem;
	display: flex;
	align-items: center;
	flex-shrink: 0;
	color: ${(props) => props.theme.color.primaryFgDisabled};

	& ${Icon} {
		width: 100%;
		height: 100%;
	}
`;
