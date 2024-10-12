import * as S from "./Plus.styles";

type Props = {
	onClick: () => void;
};

export const Plus = ({ onClick }: Props) => {
	return <S.Plus iconName="iconPlusSquare" onMouseDown={onClick} />;
};
