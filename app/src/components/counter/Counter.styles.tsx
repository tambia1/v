import { Icon } from "@src/icons/Icon";
import styled from "styled-components";

export const Counter = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5rem;
`;

export const IconCounter = styled(Icon)`
	cursor: pointer;
	flex-shrink: 0;
`;
