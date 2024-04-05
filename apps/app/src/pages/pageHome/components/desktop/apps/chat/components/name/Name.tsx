import * as S from "./Name.styles";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import { StoreChat } from "./stores/StoreChat";
import { NameBar } from "./components/messageBar/NameBar";
import { Page } from "./components/page/Page";

export const Name = () => {
	const navigator = useNavigator();
	const storeChat = StoreChat();

	const handleOnClickSet = (userName: string) => {
		storeChat.setData(userName);

		navigator.pushPage(
			<Navigator.Page id="talks" title={userName}>
				<Page />
			</Navigator.Page>
		);
	};

	return (
		<S.Name>
			<NameBar name={storeChat.name} onClickSet={handleOnClickSet} />
		</S.Name>
	);
};
