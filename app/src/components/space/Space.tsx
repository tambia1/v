import * as S from "./Space.styles";
import { ITheme } from "@src/theme/Theme.types";

interface Props {
	className?: string | undefined;
	size?: keyof ITheme["size"];
}

export const Space = ({ className, size = "s" }: Props) => {
	return <S.Space className={className} $size={size} />;
};
