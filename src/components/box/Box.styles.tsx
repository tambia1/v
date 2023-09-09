import { ITheme } from "@src/themes/Theme.types";
import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;

	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	border: solid 0.1rem #aaaaaa;
	border-radius: 1rem;
	box-sizing: border-box;

	padding: 0.5rem;

	background-color: ${({ theme }: { theme: ITheme }) => theme.color.background};
`;

export const ContainerTitle = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.5rem;

	padding: 0.5rem;
`;

export const Title = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: #ffffff;
	text-decoration: underline;
	text-shadow: 0 0 5px #fff;
`;

export const ContainerChildren = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	position: relative;
`;
