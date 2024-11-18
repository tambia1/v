import { Icon } from "@src/components/icon/Icon";
import styled, { css } from "styled-components";

export const Home = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	box-sizing: border-box;

	color: ${(props) => props.theme.color.primaryFg};
	background-color: ${(props) => props.theme.color.primaryBg};
`;

export const Spacer = styled.div`
	width: 100%;
	height: 1rem;
`;

export const Bar = styled.div`
	width: 100%;
	height: 4rem;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	flex-shrink: 0;

	background-color: ${(props) => props.theme.color.primaryBgSelected};
`;

const IconBar = css`
	width: 2rem;
	height: 2rem;
	cursor: pointer;
	padding: 1rem;

	&:hover {
		background-color: ${(props) => props.theme.color.primaryBgHover};
	}

	&:active {
		background-color: ${(props) => props.theme.color.primaryBgActive};
	}
`;

export const IconMenu = styled(Icon)`
	${IconBar}
`;

export const IconLogout = styled(Icon)`
	${IconBar}
`;

export const Container = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
`;

export const Transition = styled.div<{ $visible: boolean }>`
	width: 100%;
	height: 100%;
	position: absolute;
	transition: opacity 0.3s ease;
	opacity: ${(props) => (props.$visible ? 1 : 0)};
	z-index: ${(props) => (props.$visible ? 1 : 0)};
	pointer-events: ${(props) => (props.$visible ? "auto" : "none")};
`;
