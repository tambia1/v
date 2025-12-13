import styled from "@emotion/styled";

export const Collapsable = styled.div<{ $collapsed: boolean }>`
	transition: grid-template-rows 0.3s ease, opacity 0.3s ease;
	display: grid;
	grid-template-rows: ${(props) => (props.$collapsed ? "0fr" : "1fr")};
	opacity: ${(props) => (props.$collapsed ? 0 : 1)};
	overflow: hidden;
`;

export const Content = styled.div`
	overflow: hidden;
`;
