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
	height: 3rem;
	display: flex;
	flex-shrink: 0;
	align-items: center;
	color: ${(props) => props.theme.color.ternaryFg};
	background-color: ${(props) => props.theme.color.ternaryBg};
	text-shadow: 0px 1px 3px #ff0000;
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

	color: ${(props) => props.theme.color.secondaryFg};
	background-color: ${(props) => props.theme.color.secondaryBg};
`;

export const Header = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	align-items: center;
	margin-left: 1rem;
	text-shadow: ${(props) => props.theme.shadow.text} ${(props) => props.theme.color.primaryBg};
	font-size: ${(props) => props.theme.fontSize.title};
`;

export const Back = styled.div`
	width: 7rem;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
`;

export const BackButton = styled.div<{ $isVisible: boolean }>`
	position: absolute;
	width: 3rem;
	height: 3rem;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 1rem;
	margin-right: 1rem;
	border-radius: 1rem;
	cursor: pointer;
	transition: all 0.3s ease;
	opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
	pointer-events: ${({ $isVisible }) => ($isVisible ? "auto" : "none")};

	color: ${(props) => props.theme.color.primaryFg};

	&:active {
		color: ${(props) => props.theme.color.primaryFgActive};
	}
`;
