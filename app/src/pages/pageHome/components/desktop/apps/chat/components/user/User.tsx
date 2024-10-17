import { Navigator } from "@src/components/navigator/Navigator";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Pager } from "@src/components/pager/Pager";
import { useState } from "react";
import * as S from "./User.styles";
import { Avatar } from "./components/avatar/Avatar";
import { type IAvatar, avatars } from "./components/avatar/Avatar.styles";
import { NameBar } from "./components/messageBar/NameBar";
import { Talks } from "./components/talks/Talks";
import { StoreChat } from "./stores/StoreChat";

export const User = () => {
	const navigator = useNavigator();
	const storeChat = StoreChat();
	const [pageIndex, setPageIndex] = useState(storeChat.avatar);

	const handleOnClickSet = (userName: string) => {
		storeChat.setName(userName);
		storeChat.setAvatar(pageIndex);

		navigator.pushPage(
			<Navigator.Page id="talks" title={userName}>
				<Talks name={userName} avatar={pageIndex} />
			</Navigator.Page>,
		);
	};

	const handleChangeAvatar = (pageIndex: number) => {
		setPageIndex(pageIndex);
	};

	return (
		<S.Name>
			<NameBar name={storeChat.name} onClickSet={handleOnClickSet} />

			<S.PagingContainer>
				<Pager
					initialPageIndex={storeChat.avatar}
					onChange={(pageIndex) => {
						handleChangeAvatar(pageIndex);
					}}
				>
					{avatars.map((value, index) => (
						<S.PagingItem key={value}>
							<Avatar index={index as unknown as IAvatar} size="l" />
						</S.PagingItem>
					))}
				</Pager>
			</S.PagingContainer>
		</S.Name>
	);
};
