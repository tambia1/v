import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { jsx } from "react/jsx-runtime";
//#region src/components/button/Button.styles.tsx
const Button$1 = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	outline: none;
	cursor: pointer;
	border: none;

	${(props) => props.$variant === "full" && css`
			--label-color: hsl(0, 0%, 100%);
			--background-color: hsl(230, 60%, 50%);
			--border-color: hsl(230, 60%, 50%);

			color: var(--label-color);
			background-color: var(--background-color);
			border-color: var(--border-color);

			border-width: 4px;
			border-style: solid;

			padding: 10px 64px;
			border-radius: 8px;
			font-size: 18px;

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

	${(props) => props.$variant === "stroke" && css`
			--label-color: hsl(230, 60%, 50%);
			--background-color: hsl(0, 0%, 100%);
			--border-color: hsl(230, 60%, 50%);

			color: var(--label-color);
			background-color: var(--background-color);
			border-color: var(--border-color);

			border-width: 4px;
			border-style: solid;

			padding: 10px 64px;
			border-radius: 8px;
			font-size: 18px;

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

	${(props) => props.$variant === "link" && css`
			--label-color: hsl(230, 60%, 50%);
			--background-color: hsla(0, 0%, 0%, 0);

			color: var(--label-color);
			background-color: var(--background-color);

			font-size: 18px;

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
`;
//#endregion
//#region src/components/button/Button.tsx
const Button = ({ children, varian = "full", ...rest }) => {
	return /* @__PURE__ */ jsx(Button$1, {
		...rest,
		$variant: varian,
		children
	});
};
//#endregion
export { Button };
