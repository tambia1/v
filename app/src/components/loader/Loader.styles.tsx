import styled from "@emotion/styled";
import { Icon } from "@src/components/icon/Icon";
import type { Theme } from "@src/theme/Theme.types";

export const Loader = styled(Icon)<{ size: keyof Theme["size"]; color: keyof Theme["color"] }>`
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
