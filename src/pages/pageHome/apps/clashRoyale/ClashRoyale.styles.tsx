import { Headers } from "@src/components/pager/Pager.styles";
import styled from "styled-components";

export const ClashRoyale = styled.div`
	width: 100%;
	height: 100%;

	display: flex;

	& ${Headers} {
		background-image: linear-gradient(45deg, #27649e, #1c437b);
	}
`;
