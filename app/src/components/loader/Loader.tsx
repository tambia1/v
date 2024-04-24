import { ITheme } from "@src/theme/Theme.types";
import * as S from "./Loader.styles";

interface Props {
	size?: keyof ITheme["size"];
	color?: keyof ITheme["color"];
}

export const Loader = (props: Props) => {
	return <S.Loader iconName="iconLoader" color={props.color || "normalFg"} size={props.size || "m"} />;
};
