import * as S from "./Name.styles";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import { StoreChat } from "./stores/StoreChat";
import { NameBar } from "./components/messageBar/NameBar";
import { Page } from "./components/page/Page";
import { Pager } from "@src/components/pager/Pager";
import { useState } from "react";
import { Avatar } from "./components/avatar/Avatar";
import { avatars, IAvatar } from "./components/avatar/Avatar.styles";

export const Name = () => {
	const navigator = useNavigator();
	const storeChat = StoreChat();
	const [pageIndex, setPageIndex] = useState(storeChat.avatar);

	const handleOnClickSet = (userName: string) => {
		storeChat.setName(userName);
		storeChat.setAvatar(pageIndex);

		navigator.pushPage(
			<Navigator.Page id="talks" title={userName}>
				<Page name={userName} avatar={pageIndex} />
			</Navigator.Page>
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
					{avatars.map((_, index) => (
						<S.PagingItem>
							<Avatar index={index as unknown as IAvatar} size="l" />
						</S.PagingItem>
					))}
				</Pager>
			</S.PagingContainer>
		</S.Name>
	);
};
