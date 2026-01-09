import { Navigator } from "@src/components/navigator/Navigator";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { PageMenu } from "./pages/PageMenu";
import * as S from "./Warlords.styles";

export const Warlords = () => {
	return (
		<S.Warlords>
			<Navigator>
				<Navigator.Page name="app" title={<T>{lang.warlords.title}</T>}>
					<PageMenu />
				</Navigator.Page>
			</Navigator>
		</S.Warlords>
	);
};
