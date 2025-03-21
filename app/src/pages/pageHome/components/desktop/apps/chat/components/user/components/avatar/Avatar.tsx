import * as S from "./Avatar.styles";

interface Props {
	index: S.AvatarType;
	size: S.SizeType;
}

export const Avatar = ({ index, size }: Props) => {
	return <S.Avatar $index={index} $size={size} />;
};
