import { Icon } from "@src/components/icon/Icon.styles";
import { Input } from "@src/components/input/Input";
import styled from "styled-components";

export const SpinPage = styled.div`
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

	& span:hover {
		color: ${(props) => props.theme.color.primary400};
		cursor: pointer;
	}
`;

export const Buttons = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	margin-top: 2rem;
`;

export const InputText = styled(Input)`
	width: 100%;
	border: none;
	background-color: transparent;
	padding: 0;
`;
