import { ITheme } from "@src/themes/Theme.types";
import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: start;
	flex-direction: column;
	gap: 0.5rem;
	width: 5rem;
	height: 7rem;
	background-color: red;
	overflow: hidden;
`;

export const Icon = styled.div`
	background-color: yellow;
	border-radius: 0.5rem;
	width: 5rem;
	height: 5rem;
	flex-shrink: 0;
`;

export const Title = styled.div`
	font-size: ${({ theme }: { theme: ITheme }) => theme.size.xs};
	background: green;
`;
