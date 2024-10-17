import styled from "styled-components";

export const Navigator = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	overflow: hidden;
`;

export const Headers = styled.div`
	position: relative;
	width: 100%;
	height: 5rem;
	display: flex;
	flex-shrink: 0;
	align-items: center;
	background-color: ${(props) => props.theme.color.primaryBgActive};
	z-index: 1;

	& * {
		height: 100%;
		display: flex;
		align-items: center;
	}
`;

export const Pages = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	position: relative;
	overflow: hidden;

	background-color: ${(props) => props.theme.color.primaryBgSelected};
`;

export const Header = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	align-items: center;
	margin-left: 1rem;
	text-shadow: 0px 1px 3px #00000066;
`;

export const Back = styled.div`
	width: 4rem;
	height: 3rem;
	display: flex;
	align-items: center;
	position: relative;
`;

export const BackContainer = styled.div<{ $isVisible: boolean }>`
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	margin-left: 1rem;
	border-radius: 1rem;
	color: ${(props) => props.theme.color.primaryFg};
	cursor: pointer;
	transition: all 0.3s ease;
	opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
	pointer-events: ${({ $isVisible }) => ($isVisible ? "auto" : "none")};

	&:active {
		color: ${(props) => props.theme.color.primaryFgActive};
	}
`;
