import { Icon } from "@src/components/icon/Icon";
import styled from "styled-components";

export const Header = styled.div`
	width: 100%;
	height: 5rem;
	display: flex;
	align-items: center;
	color: ${(props) => props.theme.color.primary800};
	background-color: ${(props) => props.theme.color.primary300};
	padding: 0.5rem;
	box-sizing: border-box;
	cursor: pointer;
`;

export const HeaderIcon = styled(Icon)<{ collapsed: boolean }>`
	transition: transform 0.3s ease;
	transform: ${(props) => (props.collapsed ? "rotate(180deg)" : "rotate(0deg)")};
`;

export const HeaderContent = styled.div`
	flex: 1;
	display: flex;
	justify-content: left;
	font-size: ${(props) => props.theme.font.header.size};
	font-weight: ${(props) => props.theme.font.header.weight};
	color: ${(props) => props.theme.color.primary800};
`;
