import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import * as S from "./ClashRoyaleMenu.styles";
import { Navigator } from "@src/components/navigator/Navigator";
import { ClashRoyaleGame } from "./ClashRoyaleGame";
import { Pager } from "@src/components/pager/Pager";
import { useState } from "react";
import { IType as IArenaType } from "./game/Arena";

export const ClashRoyaleMenu = () => {
	const navigator = useNavigator();
	const [pageIndex, setPageIndex] = useState(0);

	const Arenas: IArenaType[] = ["arena1", "arena2", "arena3", "arena4", "arena5", "arena6", "arena7", "arena8", "arena9", "arena10", "arena11"];

	const handleOnClickStart = () => {
		navigator.pushPage(
			<Navigator.Page id={"game"} title={"Game"}>
				<ClashRoyaleGame arenaType={Arenas[pageIndex]} />
			</Navigator.Page>
		);
	};

	return (
		<S.ClashRoyaleMenu>
			<S.Page>
				<S.Bg />
				<S.Splash>
					<S.PagingContainer>
						<Pager onChange={(pageIndex) => setPageIndex(pageIndex)}>
							<S.PagingItem1 />
							<S.PagingItem2 />
							<S.PagingItem3 />
							<S.PagingItem4 />
							<S.PagingItem5 />
							<S.PagingItem6 />
							<S.PagingItem7 />
							<S.PagingItem8 />
							<S.PagingItem9 />
							<S.PagingItem10 />
							<S.PagingItem11 />
						</Pager>
					</S.PagingContainer>
					<S.ButtonStart $isVisible={true} onClick={handleOnClickStart}>
						START
					</S.ButtonStart>
				</S.Splash>
			</S.Page>
		</S.ClashRoyaleMenu>
	);
};
