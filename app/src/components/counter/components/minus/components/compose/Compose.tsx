import type { IIconName } from "@src/components/icon/Icon.types";
import * as S from "./Compose.styles";

export interface Props {
	iconName: IIconName;
	onClickMinus: () => void;
}

export const Compose = ({ iconName, onClickMinus }: Props) => {
	return <S.Compose iconName={iconName} onClick={onClickMinus} />;
};
