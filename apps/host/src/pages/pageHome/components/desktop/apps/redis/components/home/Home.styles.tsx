import styled from "@emotion/styled";
import { Icon } from "@src/components/icon/Icon";

export const Home = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	box-sizing: border-box;

	color: ${(props) => props.theme.color.primary800};
	background-color: ${(props) => props.theme.color.primary100};
`;

export const Spacer = styled.div`
	width: 100%;
	height: 1rem;
`;

export const Bar = styled.div`
	width: 100%;
	height: 4rem;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	flex-shrink: 0;

	background-color: ${(props) => props.theme.color.primary200};
`;

const iconBarStyles = `
	width: 2rem;
	height: 2rem;
	cursor: pointer;
	padding: 1rem;
`;

export const IconMenu = styled(Icon)`
	${iconBarStyles}

	&:hover {
		background-color: ${(props) => props.theme.color.primary600};
	}

	&:active {
		background-color: ${(props) => props.theme.color.primary700};
	}
`;

export const IconLogout = styled(Icon)`
	${iconBarStyles}

	&:hover {
		background-color: ${(props) => props.theme.color.primary600};
	}

	&:active {
		background-color: ${(props) => props.theme.color.primary700};
	}
`;

export const Container = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
`;

export const Transition = styled.div<{ $visible: boolean }>`
	width: 100%;
	height: 100%;
	position: absolute;
	transition: opacity 0.3s ease;
	opacity: ${(props) => (props.$visible ? 1 : 0)};
	z-index: ${(props) => (props.$visible ? 1 : 0)};
	pointer-events: ${(props) => (props.$visible ? "auto" : "none")};
`;
