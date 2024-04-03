import * as S from "./BubbleMe.styles";

interface Props {
	content: string;
	status: string;
}

export const BubbleMe = ({ content, status }: Props) => {
	return (
		<S.BubbleMe>
			<S.BubbleMeMessage>{content}</S.BubbleMeMessage>
			<S.BubbleMeStatus>{status}</S.BubbleMeStatus>
		</S.BubbleMe>
	);
};
