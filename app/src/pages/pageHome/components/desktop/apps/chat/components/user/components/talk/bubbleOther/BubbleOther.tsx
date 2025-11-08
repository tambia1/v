import { Avatar } from "../../avatar/Avatar";
import { AvatarType } from "../../avatar/Avatar.styles";
import * as S from "./BubbleOther.styles";

type Props = {
	content: string;
	avatar: AvatarType;
	name: string;
};

export const BubbleOther = ({ content, avatar, name }: Props) => {
	return (
		<S.BubbleOther>
			<Avatar index={avatar} size="s" />
			<S.MessageContainer>
				<S.BubbleOtherName>{name}</S.BubbleOtherName>
				<S.BubbleOtherMessage>{content}</S.BubbleOtherMessage>
			</S.MessageContainer>
		</S.BubbleOther>
	);
};
