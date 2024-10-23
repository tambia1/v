import styled from "styled-components";
import { Icon } from "../icon/Icon.styles";

export const Check = styled.div`
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
