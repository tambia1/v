import type { ITheme } from "@src/theme/Theme.types";
import * as S from "./Space.styles";
import type { IDirection } from "./Space.types";

interface Props {
	className?: string;
	size?: keyof ITheme["size"];
	direction?: IDirection;
}

export const Space = ({ className, size = "s", direction = "vertical" }: Props) => {
	return <S.Space className={className} $size={size} $direction={direction} />;
};
