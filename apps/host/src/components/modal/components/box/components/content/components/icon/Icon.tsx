import * as S from "./Icon.styles";

export type Props = {
	iconName?: S.IconsName;
};

export const Icon = ({ iconName }: Props) => {
	return iconName && <S.Image $iconName={iconName} />;
};
