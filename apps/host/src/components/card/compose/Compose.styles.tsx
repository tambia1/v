import styled from "@emotion/styled";
import { Theme } from "@src/theme/Theme.types";

export const Compose = styled.div<{ width?: keyof Theme["size"]; height?: keyof Theme["size"] }>`
	width: ${(props) => (props.width ? props.theme.size[props.width] : "100%")};
	height: ${(props) => (props.height ? props.theme.size[props.height] : "auto")};
	max-width: 50rem;
	inset: 0;

	display: flex;
	flex-direction: column;

	color: ${(props) => props.theme.color.primary800};
	background-color: ${(props) => props.theme.color.primary100};

	border: solid 1px ${(props) => props.theme.color.primary400};
	border-radius: 1.5rem;
	overflow: hidden;
	box-sizing: border-box;
`;
