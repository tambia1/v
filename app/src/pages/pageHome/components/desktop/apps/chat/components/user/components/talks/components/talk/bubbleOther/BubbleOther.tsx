import { Avatar } from "../../../../avatar/Avatar";
import { IAvatar } from "../../../../avatar/Avatar.styles";
import * as S from "./BubbleOther.styles";

interface Props {
	content: string;
	avatar: IAvatar;
}

export const BubbleOther = ({ content, avatar }: Props) => {
	return (
		<S.BubbleOther>
			<Avatar index={avatar} size="s" />
			<S.BubbleOtherMessage>{content}</S.BubbleOtherMessage>
		</S.BubbleOther>
	);
};
