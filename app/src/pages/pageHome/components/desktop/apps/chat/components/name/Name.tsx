import * as S from "./Name.styles";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import { StoreChat } from "./stores/StoreChat";
import { NameBar } from "./components/messageBar/NameBar";
import { Page } from "./components/page/Page";
import { Pager } from "@src/components/pager/Pager";
import { useState } from "react";

export const Name = () => {
	const navigator = useNavigator();
	const storeChat = StoreChat();
	const [pageIndex, setPageIndex] = useState(storeChat.avatar);

	const handleOnClickSet = (userName: string) => {
		storeChat.setName(userName);
		storeChat.setAvatar(pageIndex);

		navigator.pushPage(
			<Navigator.Page id="talks" title={userName}>
				<Page name={userName} />
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
					<S.PagingItem0 />
					<S.PagingItem1 />
					<S.PagingItem2 />
					<S.PagingItem3 />
				</Pager>
			</S.PagingContainer>
		</S.Name>
	);
};
