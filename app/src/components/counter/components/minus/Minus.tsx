import * as S from "./Minus.styles";

type Props = {
	onClick: () => void;
};

export const Minus = ({ onClick }: Props) => {
	return <S.Minus iconName="iconMinusSquare" onMouseDown={onClick} />;
};
