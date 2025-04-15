import type { Theme } from "@src/theme/Theme.types";
import * as S from "./Loader.styles";

interface Props {
	className?: string;
	size?: keyof Theme["size"];
	color?: keyof Theme["color"];
}

export const Loader = ({ className, color = "primary800", size = "size250" }: Props) => {
	return <S.Loader className={className} iconName="iconLoader" color={color} size={size} />;
};
