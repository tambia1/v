import * as S from "./pageScreen.styles";

interface Props {
	children: React.ReactNode;
}

export const PageScreen = ({ children }: Props) => {
	return <S.Container>{children}</S.Container>;
};
