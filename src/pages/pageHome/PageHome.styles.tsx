import { Button } from "@src/components/button/Button";
import { Theme } from "@src/themes/Theme.types";
import styled from "styled-components";

export const PageContainer = styled.div<{ theme: Theme }>`
	display: flex;
	width: 100%;
	height: 100%;

	background-image: ${({ theme }) => `url("${theme.images.mainBackground}")`};
	background-size: cover;
`;

export const MenuContainer = styled.div<{ $isCollapsed: boolean }>`
	display: flex;
	width: ${(props) => (props.$isCollapsed ? "5rem" : "15rem")};
	height: 100%;
	flex-shrink: 0;

	transition: all ease-out 0.3s;
	position: relative;
`;

export const ScreenContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;

	color: ${({ theme }) => theme.colors.primary};
`;

export const ButtonCollapse = styled(Button)<{ $isCollapsed: boolean }>`
	position: absolute;
	top: 1rem;
	right: -1rem;
	width: 2rem;
	height: 2rem;
	min-width: unset;
	padding: 0;
	margin: 0;

	padding-top: ${(props) => (props.$isCollapsed ? "2px" : "0px")};
`;
