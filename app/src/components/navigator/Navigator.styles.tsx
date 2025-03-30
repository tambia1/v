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
	color: ${(props) => props.theme.color.primary700};
	background-color: ${(props) => props.theme.color.primary300};
	z-index: 1;

	& * {
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

	color: ${(props) => props.theme.color.primary700};
	background-color: ${(props) => props.theme.color.primary100};
`;

export const Header = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	align-items: center;
	margin-left: 1rem;
	text-shadow: ${(props) => props.theme.shadow.text} ${(props) => props.theme.color.primary100};
	font-size: ${(props) => props.theme.font.title.size};
	font-weight: ${(props) => props.theme.font.title.weight};
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
	width: 4rem;
	height: 4rem;
	margin: 0.5rem;
	border-radius: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 1rem;
	cursor: pointer;
	transition: all 0.3s ease;
	opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
	pointer-events: ${({ $isVisible }) => ($isVisible ? "auto" : "none")};

	color: ${(props) => props.theme.color.primary700};

	&:hover{
		color: ${(props) => props.theme.color.primary100};
		background-color: ${(props) => props.theme.color.primary400};
	}
`;
