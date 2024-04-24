import { Icon } from "@src/icons/Icon";
import { ITheme } from "@src/theme/Theme.types";
import styled from "styled-components";

export const Loader = styled(Icon)<{ size: keyof ITheme["size"]; color: keyof ITheme["color"] }>`
	width: ${(props) => props.theme.size[props.size]};
	height: ${(props) => props.theme.size[props.size]};
	color: ${(props) => props.theme.color[props.color]};

	animation: spin 3s linear infinite;

	@keyframes spin {
		0% {
			rotate: 0deg;
		}
		100% {
			rotate: 360deg;
		}
	}
`;
