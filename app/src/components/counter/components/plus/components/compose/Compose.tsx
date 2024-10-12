import type { IIconName } from "@src/components/icon/Icon.types";
import * as S from "./Compose.styles";

export interface Props {
	iconName: IIconName;
	onClickPlus: () => void;
}

export const Compose = ({ iconName, onClickPlus }: Props) => {
	return <S.Compose iconName={iconName} onClick={onClickPlus} />;
};
