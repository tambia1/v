import { usePager } from "@src/components/pager/hooks/UsePager";
import * as S from "./ClashRoyaleMenu.styles";
import { Pager } from "@src/components/pager/Pager";
import { ClashRoyaleGame } from "./ClashRoyaleGame";
import { Paging } from "@src/components/paging/Paging";
import { useState } from "react";
import { IType as IArenaType } from "./game/Arena";

export const ClashRoyaleMenu = () => {
	const pager = usePager();
	const [pageIndex, setPageIndex] = useState(0);

	const Arenas: IArenaType[] = ["arena1", "arena2", "arena3", "arena4", "arena5", "arena6", "arena7", "arena8", "arena9", "arena10", "arena11"];

	const handleOnClickStart = () => {
		pager.pushPage(
			<Pager.Page id={"game"} title={"Game"}>
				<ClashRoyaleGame arenaType={Arenas[pageIndex]} />
			</Pager.Page>
		);
	};

	return (
		<S.ClashRoyaleMenu>
			<S.Page>
				<S.Bg />
				<S.Splash>
					<S.PagingContainer>
						<Paging onChange={(pageIndex) => setPageIndex(pageIndex)}>
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
						</Paging>
					</S.PagingContainer>
					<S.ButtonStart $isVisible={true} onClick={handleOnClickStart}>
						START
					</S.ButtonStart>
				</S.Splash>
			</S.Page>
		</S.ClashRoyaleMenu>
	);
};