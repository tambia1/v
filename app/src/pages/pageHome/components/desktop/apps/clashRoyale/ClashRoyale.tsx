import { Navigator } from "@src/components/navigator/Navigator";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import * as S from "./ClashRoyale.styles";
import { ClashRoyaleMenu } from "./pages/ClashRoyaleMenu";

export const ClashRoyale = () => {
	return (
		<S.ClashRoyale>
			<Navigator>
				<Navigator.Page id="app" title={<T>{lang.clashRoyale.title}</T>}>
					<ClashRoyaleMenu />
				</Navigator.Page>
			</Navigator>
		</S.ClashRoyale>
	);
};
