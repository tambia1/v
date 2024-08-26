import styled, { css } from "styled-components";
import { IVariant } from "./Button";

export const Button = styled.button<{ $variant: IVariant }>`
	display: flex;
	align-items: center;
	justify-content: center;
	outline: none;
	cursor: pointer;
	border: none;

	${(props) =>
		props.$variant === "styled" &&
		css`
			background-image: linear-gradient(to top, #d8d9db 0%, #ffffff 80%, #fdfdfd 100%);
			border-radius: 100em;
			border: 1px solid #8f9092;
			color: #606060;
			text-shadow: 0 1px #fff;
			transition: all 0.1s ease;
			padding: 0.5em 1em 0.5em 1em;
			box-sizing: border-box;
			min-width: 5em;
			width: fit-content;
			white-space: nowrap;

			&:hover {
			}

			&:active {
				box-shadow: inset 0 0 3px 0px #bbbbbb, inset 0 0 10px #dddddd;
				background-image: linear-gradient(to top, #fdfdfd 0%, #ffffff 20%, #d8d9db 100%);
			}

			&:disabled {
				opacity: 0.6;
				cursor: not-allowed;
			}
		`}

	${(props) =>
		props.$variant === "full" &&
		css`
			--label-color: hsl(0, 0%, 100%);
			--background-color: hsl(230, 60%, 50%);
			--border-color: hsl(230, 60%, 50%);

			color: var(--label-color);
			background-color: var(--background-color);
			border-color: var(--border-color);

			border-width: 0.2rem;
			border-style: solid;

			padding: 0.5em 1em 0.5em 1em;
			border-radius: 0.5rem;
			font-size: 100%;

			width: fit-content;

			&:hover {
				--background-hover-color: hsl(230, 60%, 55%);
				background-color: var(--background-hover-color);
			}

			&:active {
				--background-active-color: hsl(230, 60%, 60%);
				background-color: var(--background-active-color);
			}

			&:disabled {
				--label-disabled-color: hsl(0, 0%, 100%);
				--background-disabled-color: hsl(0, 0%, 63%);
				--border-disabled-color: hsl(0, 0%, 63%);
				color: var(--label-disabled-color);
				background-color: var(--background-disabled-color);
				border-color: var(--border-disabled-color);
			}
		`}

	${(props) =>
		props.$variant === "stroke" &&
		css`
			--label-color: hsl(230, 60%, 50%);
			--background-color: hsl(0, 0%, 100%);
			--border-color: hsl(230, 60%, 50%);

			color: var(--label-color);
			background-color: var(--background-color);
			border-color: var(--border-color);

			border-width: 0.2rem;
			border-style: solid;

			padding: 0.5em 1em 0.5em 1em;
			border-radius: 0.5rem;
			font-size: 100%;

			width: fit-content;

			&:hover {
				--background-hover-color: hsl(230, 55%, 80%);
				background-color: var(--background-hover-color);
			}

			&:active {
				--background-active-color: hsl(230, 55%, 85%);
				background-color: var(--background-active-color);
			}

			&:disabled {
				--label-disabled-color: hsl(0, 0%, 63%);
				--background-disabled-color-color: hsl(0, 0%, 100%);
				--border-disabled-color: hsl(0, 0%, 63%);
				color: var(--label-disabled-color);
				background-color: var(--background-disabled-color);
				border-color: var(--border-disabled-color);
			}
		`} 

		${(props) =>
		props.$variant === "link" &&
		css`
			--label-color: hsl(230, 60%, 50%);
			--background-color: hsla(0, 0%, 0%, 0);

			color: var(--label-color);
			background-color: var(--background-color);
			border-color: transparent;

			border-width: 0.2rem;
			border-style: solid;

			padding: 0.5em 1em 0.5em 1em;
			border-radius: 0.5rem;
			font-size: 100%;

			width: fit-content;

			&:hover {
				--label-color: hsl(230, 55%, 80%);
				color: var(--label-color);
			}

			&:active {
				--label-color: hsl(230, 55%, 85%);
				color: var(--label-color);
			}

			&:disabled {
				--label-color: hsl(0, 0%, 63%);
				color: var(--label-color);
			}
		`}

		${(props) => props.$variant === "none" && css``}
`;
