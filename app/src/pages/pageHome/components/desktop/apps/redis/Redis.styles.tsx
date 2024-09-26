import { Icon } from "@src/icons/Icon";
import styled, { css } from "styled-components";

export const Redis = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBgSelected};
`;

export const Spacer = styled.div`
	width: 100%;
	height: 1rem;
`;

export const Bar = styled.div`
	width: 100%;
	height: 5rem;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBgSelected};
`;

const IconBar = css`
	cursor: pointer;
	padding: 0.5rem;
	margin: 0.5rem;

	&:hover {
		background-color: ${(props) => props.theme.color.normalBgHover};
	}

	&:active {
		background-color: ${(props) => props.theme.color.normalBgActive};
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
`;
