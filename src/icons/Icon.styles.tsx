import styled from "styled-components";

export const Icon = styled.div<{ $size: string; $color: string }>`
	width: ${({ $size }) => $size};
	height: ${({ $size }) => $size};

	& > div {
		width: 100%;
		height: 100%;
	}

	& > div > div {
		width: 100%;
		height: 100%;
		display: flex;
	}

	& > div > div > svg {
		width: 100%;
		height: 100%;
		color: ${({ $color }) => $color};
	}
`;
