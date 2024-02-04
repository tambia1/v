import { Pager } from "@src/components/pager/Pager";
import * as S from "./ClashRoyale.styles";
import { ClashRoyaleMenu } from "./pages/ClashRoyaleMenu";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";

export const ClashRoyale = () => {
	return (
		<S.ClashRoyale>
			<Pager>
				<Pager.Page id="app" title={<T>{lang.clashRoyale.title}</T>}>
					<ClashRoyaleMenu />
				</Pager.Page>
			</Pager>
		</S.ClashRoyale>
	);
};
