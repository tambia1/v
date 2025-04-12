import styled from "styled-components";

export const Body = styled.div<{ $collapsed: boolean }>`
	transition: all 0.3s ease;
	display: grid;
	grid-template-rows: ${(props) => (props.$collapsed ? "0fr" : "1fr")};
	opacity: ${(props) => (props.$collapsed ? 0 : 1)};
	overflow: hidden;
	width: 100%;
	height: auto;
	padding: 0.5rem;
	padding-top: ${(props) => (props.$collapsed ? 0 : "0.5rem")};
	padding-bottom: ${(props) => (props.$collapsed ? 0 : "0.5rem")};
	box-sizing: border-box;
	border-top: solid ${(props) => (props.$collapsed ? "0px" : "1px")} ${(props) => props.theme.color.primary700};
`;

export const Content = styled.div`
	overflow: hidden;
	display: flex;
	align-items: start;
	justify-content: left;
	font-size: ${(props) => props.theme.font.body.size};
	font-weight: ${(props) => props.theme.font.body.weight};
`;
