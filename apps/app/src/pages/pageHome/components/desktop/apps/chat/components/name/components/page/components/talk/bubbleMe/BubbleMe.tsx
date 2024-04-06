import * as S from "./BubbleMe.styles";

interface Props {
	content: string;
}

export const BubbleMe = ({ content }: Props) => {
	return (
		<S.BubbleMe>
			<S.BubbleMeMessage>{content}</S.BubbleMeMessage>
		</S.BubbleMe>
	);
};
