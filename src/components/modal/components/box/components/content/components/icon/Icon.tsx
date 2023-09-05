import * as S from "./Icon.styles";

interface Props {
	iconName: S.IconsName;
}

export const Icon = ({ iconName }: Props) => {
	return <Icon.Compose>{iconName && <S.Icon $iconName={iconName} />}</Icon.Compose>;
};

Icon.Compose = S.Container;
