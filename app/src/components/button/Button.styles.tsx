import type { ITheme } from "@src/theme/Theme.types";
import styled, { css } from "styled-components";
import type { IVariant } from "./Button";

export const Button = styled.button<{ $variant: IVariant; $width: keyof ITheme["size"] }>`
	display: flex;
	align-items: center;
	justify-content: center;
	outline: none;
	cursor: pointer;
	border: none;

	font-size: inherit;
	font-weight: inherit;

	${(props) =>
		props.$variant === "styled" &&
		css`
			background-image: linear-gradient(to top, #d8d9db 0%, #ffffff 80%, #fdfdfd 100%);
			border-radius: 100em;
			border: 1px solid #8f9092;
			color: #606060;
			text-shadow: 0 1px #fff;
			transition: all 0.1s ease;
			padding: 0.5rem 1rem 0.5rem 1rem;
			box-sizing: border-box;
			width: ${(p) => p.theme.size[props.$width]};
			min-width: 5em;
			height: 3rem;
			white-space: nowrap;

			&:not(:disabled) {
				&:hover {
				}
				
				&:active {
					box-shadow: inset 0 0 3px 0px #bbbbbb, inset 0 0 10px #dddddd;
					background-image: linear-gradient(to top, #fdfdfd 0%, #ffffff 20%, #d8d9db 100%);
				}
			}

			&:disabled {
				cursor: not-allowed;
				opacity: 0.6;
			}
		`}

	${(props) =>
		props.$variant === "full" &&
		css`
			color: ${(props) => props.theme.color.primaryBg};
			background-color: ${(props) => props.theme.color.primaryFg};
			border-color: ${(props) => props.theme.color.primaryFg};

			border-width: 0.2rem;
			border-style: solid;
			box-sizing: border-box;

			padding: 0.5rem 1rem 0.5rem 1rem;
			border-radius: 5rem;

			width: ${(p) => p.theme.size[props.$width]};
			min-width: 5em;
			height: 3rem;

			&:not(:disabled) {
				&:hover {
					background-color: ${(props) => props.theme.color.primaryFgHover};
				}

				&:active {
					background-color: ${(props) => props.theme.color.primaryFgActive};
				}
			}

			&:disabled {
				cursor: not-allowed;
				color: ${(props) => props.theme.color.primaryBgDisabled};
				background-color: ${(props) => props.theme.color.primaryFgDisabled};
				border-color: ${(props) => props.theme.color.primaryFgDisabled};
			}
		`}

	${(props) =>
		props.$variant === "stroke" &&
		css`
			color: ${(props) => props.theme.color.primaryFg};
			background-color: ${(props) => props.theme.color.primaryBg};
			border-color: ${(props) => props.theme.color.primaryFg};

			border-width: 0.2rem;
			border-style: solid;
			box-sizing: border-box;

			padding: 0.5rem 1rem 0.5rem 1rem;
			border-radius: 5rem;
			font-size: 100%;

			width: ${(p) => p.theme.size[props.$width]};
			min-width: 5em;
			height: 3rem;

			&:not(:disabled) {
				&:hover {
					background-color: ${(props) => props.theme.color.primaryBgHover}
				}

				&:active {
					background-color: ${(props) => props.theme.color.primaryBgActive}
				}
			}

			&:disabled {
				cursor: not-allowed;
				color: ${(props) => props.theme.color.primaryFgDisabled}
				background-color: ${(props) => props.theme.color.primaryBgDisabled}
				border-color: ${(props) => props.theme.color.primaryBgDisabled}
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
			box-sizing: border-box;

			padding: 0.5rem 1rem 0.5rem 1rem;
			border-radius: 0.5rem;
			font-size: 100%;

			width: ${(p) => p.theme.size[props.$width]};
			min-width: 5em;
			height: 3rem;

			&:not(:disabled) {
				&:hover {
					--label-color: hsl(230, 55%, 70%);
					color: var(--label-color);
				}

				&:active {
					--label-color: hsl(230, 55%, 75%);
					color: var(--label-color);
				}
			}

			&:disabled {
				cursor: not-allowed;
				--label-color: hsl(0, 0%, 63%);
				color: var(--label-color);
			}
		`}

		${(props) =>
			props.$variant === "text" &&
			css`
			color: ${(props) => props.theme.color.primaryFg};
			background-color: transparent;
			border-color: transparent;

			border-width: 0.2rem;
			border-style: solid;
			box-sizing: border-box;

			padding: 0.5rem 1rem 0.5rem 1rem;
			border-radius: 0.5rem;
			font-size: 100%;

			width: ${(p) => p.theme.size[props.$width]};
			min-width: 5em;
			height: 3rem;

			&:not(:disabled) {
				&:hover {
					color: ${(props) => props.theme.color.primaryFgHover};
					color: var(--label-color);
				}

				&:active {
					color: ${(props) => props.theme.color.primaryFgActive};
					color: var(--label-color);
				}
			}

			&:disabled {
				cursor: not-allowed;
				color: ${(props) => props.theme.color.primaryFgDisabled};
				color: var(--label-color);
			}
		`}

		${(props) => props.$variant === "none" && css``}
`;
