import styled from "styled-components";
import { List } from "../list/List.styles";
import { Cell } from "../list/components/cell/Cell.styles";
import { Section } from "../list/components/section/Section.styles";

export const Menu = styled.div`
	width: 100%;
	height: 100%;
`;

export const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`;

export const Cover = styled.div<{ $visible: boolean }>`
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	background-color: #ffffff88;
	pointer-events: none;
	opacity: ${(props) => (props.$visible ? 1 : 0)};
	transition: all 0.3s ease;
`;

export const MenuList = styled.div<{ $visible: boolean }>`
	position: absolute;
	width: 20rem;
	height: 100%;
	padding: 0%.5rem;
	background-color: ${(props) => props.theme.color.normalBg};
	transform: translateX(${(props) => (props.$visible ? "0%" : "-100%")});
	opacity: ${(props) => (props.$visible ? 1 : 0)};
	transition: all 0.3s ease;

	${List} {
		box-shadow: none;
		border-radius: 0;

		${Cell} {
			border-radius: 0;
		}
	}

	${Section} {
		color: ${(props) => props.theme.color.normalBg};
		background-color: ${(props) => props.theme.color.normalFg};
		padding: 0.5rem;
		width: auto;
	}
`;
