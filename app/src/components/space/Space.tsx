import type { Theme } from "@src/theme/Theme.types";
import * as S from "./Space.styles";
import type { Direction } from "./Space.types";

type Props = {
	className?: string;
	size?: keyof Theme["size"];
	direction?: Direction;
};

export const Space = ({ className, size = "size500", direction = "vertical" }: Props) => {
	return <S.Space className={className} $size={size} $direction={direction} />;
};
