import { ITheme } from "@src/themes/Theme.types";
import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	background-color: ${({ theme }: { theme: ITheme }) => theme.color.background};
	background-color: #ff000088;

	overflow: auto;
`;
