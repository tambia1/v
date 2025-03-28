import styled, { css } from "styled-components";
import { Icon } from "../icon/Icon.styles";

export const Check = styled.div<{ disabled: boolean }>`
	width: 3rem;
	height: 3rem;
	border-radius: 0.5rem;

	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;

	overflow: hidden;
	transition: all 0.3s ease;

	cursor: pointer;

	& svg {
		stroke: ${(props) => (props.disabled ? props.theme.color.primaryFgDisabled : props.theme.color.primaryFgEnabled)};
		fill: ${(props) => (props.disabled ? props.theme.color.primaryBgDisabled : props.theme.color.primaryBgEnabled)};
	}

	&:hover{
		color: ${(props) => props.theme.color.primaryFgHover};
		background-color: ${(props) => props.theme.color.primaryBgHover};
	}

	${(props) =>
		props.disabled &&
		css`
		
			cursor: not-allowed;
			opacity: 0.6;
		`}

	& ${Icon}{
		width: 120%;
		height: 120%;
		margin: -10%;
	} 
`;
