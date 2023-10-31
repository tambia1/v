import { Headers, Pager } from "@src/components/pager/Pager.styles";
import styled from "styled-components";

export const Applications = styled.div`
	width: 100%;
	height: 100%;

	display: flex;

	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.normalBg};

	& ${Pager} ${Headers} {
		box-shadow: 0px 0px 5px #000000;
	}
`;
