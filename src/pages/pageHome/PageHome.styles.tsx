import { Headers, Pager } from "@src/components/pager/Pager.styles";
import styled from "styled-components";

export const PageHome = styled.div`
	width: 100%;
	height: 100%;

	display: flex;

	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.normalBg};

	& > ${Pager} > ${Headers} {
		height: 0;
	}
`;
