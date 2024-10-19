import styled from "styled-components";
import { Icon } from "../icon/Icon.styles";

export const Check = styled.div`
	width: 2.5rem;
	height: 2.5rem;
	display: flex;
	overflow: hidden;

	& ${Icon}{
		width: 120%;
    	height: 120%;
    	margin: -10%;
	}
`;

export const Dot = styled.div<{ $checkState: boolean }>`
	width: 50%;
	height: 100%;
	background-color: ${(props) => props.theme.color.primaryBg};
	border-radius: 100rem;
`;
