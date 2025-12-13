import { css } from "@emotion/react";
import styled from "@emotion/styled";
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
		stroke: ${(props) => (props.disabled ? props.theme.color.primary500 : props.theme.color.primary800)};
		fill: ${(props) => (props.disabled ? props.theme.color.primary300 : props.theme.color.primary100)};
	}

	&:hover{
		color: ${(props) => props.theme.color.primary400};
		background-color: ${(props) => props.theme.color.primary600};
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
