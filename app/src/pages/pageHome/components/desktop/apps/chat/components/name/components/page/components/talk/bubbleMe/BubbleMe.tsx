import * as S from "./BubbleMe.styles";

interface Props {
	content: string;
	avatar: number;
}

export const BubbleMe = ({ content, avatar }: Props) => {
	return (
		<S.BubbleMe>
			<S.ClientAvatar $avatarIndex={avatar} />
			<S.BubbleMeMessage>{content}</S.BubbleMeMessage>
		</S.BubbleMe>
	);
};
