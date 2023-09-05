import styled, { css } from "styled-components";

const Common = css`
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
`;

export const Container = styled.div`
	${Common};
	z-index: 0;
`;

export const Children = styled.div`
	${Common};
	z-index: 1;
`;

export const ElmA = styled.div`
	${Common};
	z-index: 2;
	pointer-events: none;
`;

export const ElmB = styled.div`
	${Common};
	z-index: 2;
	pointer-events: none;
`;
