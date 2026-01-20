import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import { Pager } from "@src/components/pager/Pager";
import { useState } from "react";
import type { ArenaType as IArenaType } from "./game/Arena";
import { PageGame } from "./PageGame";
import * as S from "./PageMenu.styles";

export const PageMenu = () => {
	const navigator = useNavigator();
	const [pageIndex, setPageIndex] = useState(0);

	const Arenas: IArenaType[] = ["arena1", "arena2", "arena3"];

	const handleOnClickStart = () => {
		navigator.pushPage(
			<Navigator.Page name={"game"} title={"Game"}>
				<PageGame arenaType={Arenas[pageIndex]} />
			</Navigator.Page>,
		);
	};

	return (
		<S.PageMenu>
			<S.Page>
				<S.Bg />
				<S.PageContainer>
					<S.PagingContainer>
						<Pager onMouseUp={(pageIndex) => setPageIndex(pageIndex)}>
							<S.PagingItem1 />
							<S.PagingItem2 />
							<S.PagingItem3 />
						</Pager>
					</S.PagingContainer>

					<S.ButtonStart $isVisible={true} onClick={handleOnClickStart}>
						START
					</S.ButtonStart>
				</S.PageContainer>
			</S.Page>
		</S.PageMenu>
	);
};
