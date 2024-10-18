import styled from "styled-components";
import { List } from "../list/List.styles";
import { Cell } from "../list/components/cell/Cell.styles";
import { Section } from "../list/components/section/Section.styles";

export const Menu = styled.div`
	width: 100%;
	height: 100%;
`;

export const Content = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	z-index: 0;
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
	pointer-events: ${(props) => (props.$visible ? "all" : "none")};
	opacity: ${(props) => (props.$visible ? 1 : 0)};
	transition: all 0.3s ease;
	z-index: 1;
`;

export const MenuList = styled.div<{ $visible: boolean }>`
	position: absolute;
	top: 0;
	width: 15rem;
	height: 100%;
	padding: 0%.5rem;
	background-color: ${(props) => props.theme.color.primaryBg};
	transform: translateX(${(props) => (props.$visible ? "0%" : "-100%")});
	opacity: ${(props) => (props.$visible ? 1 : 0)};
	transition: all 0.3s ease;
	z-index: 2;
	box-shadow: ${(props) => props.theme.shadow.box} ${(props) => props.theme.color.primaryFg};

	${List} {
		box-shadow: none;
		border-radius: 0;

		${Cell} {
			border-radius: 0;
		}
	}

	${Section} {
		color: ${(props) => props.theme.color.primaryBg};
		background-color: ${(props) => props.theme.color.primaryFg};
		padding: 0.5rem;
		width: auto;
	}
`;

export const MenuGroup = styled.div``;
