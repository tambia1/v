import styled from "@emotion/styled";
import { Icon } from "@src/components/icon/Icon.styles";

export const NotesPage = styled.div`
	width: auto;
	height: auto;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;
`;

export const CellGrid = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;

	& ${Icon}:hover {
		color: ${(props) => props.theme.color.primary400};
		cursor: pointer;
	}
`;
