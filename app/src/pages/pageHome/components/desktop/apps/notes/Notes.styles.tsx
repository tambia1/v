import styled from "@emotion/styled";
import { BackButton, Headers } from "@src/components/navigator/Navigator.styles";

export const Notes = styled.div`
	width: 100%;
	height: 100%;

	display: flex;

	& ${Headers} {
		background-color: #fbdc4a;
	}

	& ${Headers} ${BackButton}:hover{
		background-color: #dbbc2a;
	}
`;
