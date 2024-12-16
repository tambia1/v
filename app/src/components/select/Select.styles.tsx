import styled from "styled-components";
import { List } from "../list/List.styles";

export const Select = styled.div<{ $width: string }>`
	width: ${(props) => props.$width};
	height: 4rem;
	position: relative;

	&>${List}{
		border-radius: 10rem;
	}
`;
