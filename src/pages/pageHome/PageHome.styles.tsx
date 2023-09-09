import { ITheme } from "@src/themes/Theme.types";
import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: 100%;

	display: flex;

	background-color: ${({ theme }: { theme: ITheme }) => theme.color.background};
`;
export const Title = styled.div`
	display: inline-flex;
	padding-bottom: 6px;
	color: ${({ theme }: { theme: ITheme }) => theme.color.onBackground};
	font-size: ${({ theme }: { theme: ITheme }) => theme.size.large};
`;

export const Theme = styled.div`
	position: absolute;
	bottom: 1rem;
	right: 1rem;
	margin: 1rem;
	display: flex;
	gap: 1rem;
	align-items: center;
	justify-content: center;

	& svg {
		stroke: ${({ theme }: { theme: ITheme }) => theme.color.onBackground};
	}
`;

export const Version = styled.div`
	position: absolute;
	bottom: 1rem;
	left: 1rem;
	margin: 1rem;
	color: ${({ theme }: { theme: ITheme }) => theme.color.onBackground};
`;
