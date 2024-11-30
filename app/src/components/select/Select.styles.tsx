import styled from "styled-components";

export const Select = styled.div<{ $width: string }>`
	width: ${(props) => props.$width};
	height: 4rem;
	position: relative;
`;
