import { ITheme } from "@src/themes/Theme.types";
import styled from "styled-components";

export const Container = styled.div`
	width: 2rem;
	height: 1rem;
	display: flex;
	background-color: ${({ theme }: { theme: ITheme }) => theme.color.primary};
	border-radius: 10rem;
	overflow: hidden;
	padding: 0rem;
	box-sizing: border-box;
`;

export const Dot = styled.div<{ $isChecked: boolean }>`
	width: 50%;
	height: 100%;
	transform: translateX(${({ $isChecked }) => ($isChecked ? "100%" : "0%")});
	transition: all 0.3s ease;
	background-color: ${({ theme }: { theme: ITheme }) => theme.color.onPrimary};
	border-radius: 10rem;
`;
