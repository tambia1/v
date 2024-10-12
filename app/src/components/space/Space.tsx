import type { ITheme } from "@src/theme/Theme.types";
import * as S from "./Space.styles";

interface Props {
	className?: string;
	size?: keyof ITheme["size"];
}

export const Space = ({ className, size = "s" }: Props) => {
	return <S.Space className={className} $size={size} />;
};
