import { Icon } from "@src/components/icon/Icon.styles";
import styled from "styled-components";

export const Button = styled.div`
	width: 3rem;
	height: 3rem;
	display: flex;
	overflow: hidden;
	cursor: pointer;
	flex-shrink: 0;

	& ${Icon}{
		width: 120%;
    	height: 120%;
    	margin: -10%;
	}
`;
