import styled, { css } from "styled-components";

export const Flag = styled.div<{ $size: string; $fill?: string; $stroke?: string }>`
	width: ${({ $size }) => $size};
	height: ${({ $size }) => $size};
	box-shadow: 0px 0px 5px 1px ${(props) => props.theme.color.primary800};
	border-radius: 100px;
	overflow: hidden;

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
