import * as S from "./BubbleOther.styles";

interface Props {
	content: string;
}

export const BubbleOther = ({ content }: Props) => {
	return (
		<S.BubbleOther>
			<S.BubbleOtherMessage>{content}</S.BubbleOtherMessage>
		</S.BubbleOther>
	);
};
