import * as S from "./Space.styles";
import { ITheme } from "@src/theme/Theme.types";

interface Props {
	size?: keyof ITheme["size"];
}

export const Space = ({ size = "s" }: Props) => {
	return <S.Space $size={size} />;
};
