import { usePager } from "@src/components/pager/hooks/UsePager";
import * as S from "./ClashRoyaleMenu.styles";
import { Pager } from "@src/components/pager/Pager";
import { ClashRoyaleGame } from "./ClashRoyaleGame";

export const ClashRoyaleMenu = () => {
	const pager = usePager();

	const handleOnClickStart = () => {
		pager.pushPage(
			<Pager.Page id={"game"} title={"Game"}>
				<ClashRoyaleGame />
			</Pager.Page>
		);
	};

	return (
		<S.ClashRoyaleMenu>
			<S.Page>
				<S.Bg />
				<S.Splash>
					<S.Paging>
						<S.PagingItem />
					</S.Paging>
					<S.ButtonStart $isVisible={true} onClick={handleOnClickStart}>
						START
					</S.ButtonStart>
				</S.Splash>
			</S.Page>
		</S.ClashRoyaleMenu>
	);
};
