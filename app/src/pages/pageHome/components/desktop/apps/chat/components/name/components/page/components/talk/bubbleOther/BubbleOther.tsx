import * as S from "./BubbleOther.styles";

interface Props {
	content: string;
	avatar: number;
}

export const BubbleOther = ({ content, avatar }: Props) => {
	return (
		<S.BubbleOther>
			<S.ClientAvatar $avatarIndex={avatar} />
			<S.BubbleOtherMessage>{content}</S.BubbleOtherMessage>
		</S.BubbleOther>
	);
};
