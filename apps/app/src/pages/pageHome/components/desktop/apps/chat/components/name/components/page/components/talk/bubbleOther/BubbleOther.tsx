import * as S from "./BubbleOther.styles";

interface Props {
	content: string;
	status: string;
}

export const BubbleOther = ({ content, status }: Props) => {
	return (
		<S.BubbleOther>
			<S.BubbleOtherMessage>{content}</S.BubbleOtherMessage>
			<S.BubbleOtherStatus>{status}</S.BubbleOtherStatus>
		</S.BubbleOther>
	);
};
