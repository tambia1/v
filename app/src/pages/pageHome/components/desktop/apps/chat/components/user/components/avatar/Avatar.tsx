import * as S from "./Avatar.styles";

interface Props {
	index: S.IAvatar;
	size: S.ISize;
}

export const Avatar = ({ index, size }: Props) => {
	return <S.Avatar $index={index} $size={size} />;
};
