import { useTheme } from "@emotion/react";
import type { Theme } from "@src/theme/Theme.types";
import { ReactSVG } from "react-svg";
import * as S from "./Icon.styles";
import { type IconName, Icons } from "./Icon.types";

export type Props = React.HTMLAttributes<HTMLDivElement> & {
	className?: string;
	iconName: IconName;
	size?: keyof Theme["size"];
	fill?: string;
	stroke?: string;
};

export const Icon = ({ className, iconName, size = "size200", fill, stroke, ...rest }: Props) => {
	const theme = useTheme();

	return (
		<S.Icon className={className} $size={theme.size[size]} data-name={iconName} $fill={fill} $stroke={stroke} {...rest}>
			<ReactSVG src={Icons[iconName]} title={iconName} />
		</S.Icon>
	);
};
