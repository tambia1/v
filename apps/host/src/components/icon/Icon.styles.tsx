import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Icon = styled.div<{ $size: string; $fill?: string; $stroke?: string }>`
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

		${({ $fill }) =>
			$fill &&
			css`
				fill: ${$fill};
			`};

		${({ $stroke }) =>
			$stroke &&
			css`
				stroke: ${$stroke};
			`};
	}
`;
