import type { ITheme } from "@src/theme/Theme.types";
import * as S from "./Loader.styles";

interface Props {
	className?: string;
	size?: keyof ITheme["size"];
	color?: keyof ITheme["color"];
}

export const Loader = ({ className, color = "normalFg", size = "m" }: Props) => {
	return <S.Loader className={className} iconName="iconLoader" color={color} size={size} />;
};
