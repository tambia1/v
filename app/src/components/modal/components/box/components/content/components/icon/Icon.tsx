import * as S from "./Icon.styles";

export interface Props {
	iconName: S.IconsName;
}

export const Icon = ({ iconName }: Props) => {
	return <Icon.Compose>{iconName && <S.Image $iconName={iconName} />}</Icon.Compose>;
};

Icon.Compose = S.Icon;
