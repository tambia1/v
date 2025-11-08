import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import { Pager } from "@src/components/pager/Pager";
import { useState } from "react";
import { Avatar } from "./components/avatar/Avatar";
import { type AvatarType, avatars } from "./components/avatar/Avatar.styles";
import { NameBar } from "./components/messageBar/NameBar";
import { Talk } from "./components/talk/Talk";
import { StoreChat } from "./stores/StoreChat";
import * as S from "./User.styles";

export const User = () => {
	const navigator = useNavigator();
	const storeChat = StoreChat();
	const [pageIndex, setPageIndex] = useState(storeChat.avatar);

	const handleOnClickSet = (userName: string) => {
		storeChat.setName(userName);
		storeChat.setAvatar(pageIndex);

		navigator.pushPage(
			<Navigator.Page name="talks" title={userName}>
				<Talk name={userName} avatar={pageIndex} />
			</Navigator.Page>,
		);
	};

	const handleChangeAvatar = (pageIndex: number) => {
		setPageIndex(pageIndex);
	};

	return (
		<S.Name>
			<NameBar name={storeChat.name || "user-0"} onClickSet={handleOnClickSet} />

			<S.PagingContainer>
				<Pager
					initialPageIndex={storeChat.avatar}
					onMouseUp={(pageIndex) => {
						handleChangeAvatar(pageIndex);
					}}
				>
					{avatars.map((value, index) => (
						<S.PagingItem key={value}>
							<Avatar index={index as unknown as AvatarType} size="l" />
						</S.PagingItem>
					))}
				</Pager>
			</S.PagingContainer>
		</S.Name>
	);
};
