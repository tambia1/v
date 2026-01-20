import styled from "@emotion/styled";
import { Headers } from "@src/components/navigator/Navigator.styles";

export const Commander = styled.div`
	font-family: monospace;

	width: 100%;
	height: 100%;

	display: flex;

	& ${Headers} {
		background-image: linear-gradient(45deg, #27649e, #1c437b);
		color: ${(props) => props.theme.color.primary100};
	}
`;
