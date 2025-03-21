import { Avatar } from "../../../../avatar/Avatar";
import { AvatarType } from "../../../../avatar/Avatar.styles";
import * as S from "./BubbleMe.styles";

interface Props {
	content: string;
	avatar: AvatarType;
}

export const BubbleMe = ({ content, avatar }: Props) => {
	return (
		<S.BubbleMe>
			<Avatar index={avatar} size="s" />
			<S.BubbleMeMessage>{content}</S.BubbleMeMessage>
		</S.BubbleMe>
	);
};
