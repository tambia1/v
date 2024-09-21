import styled from "styled-components";

export const Collapsable = styled.div<{ $collapsed: boolean }>`
	transition: grid-template-rows 0.3s ease;
	display: grid;
	grid-template-rows: ${(props) => (props.$collapsed ? "0fr" : "1fr")};
`;

export const Content = styled.div`
	overflow: hidden;
`;
