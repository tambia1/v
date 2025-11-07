import { Navigator } from "@src/components/navigator/Navigator";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { Page } from "./components/page/Page";
import * as S from "./Settings.styles";

export const Settings = () => {
	return (
		<S.Settings>
			<Navigator>
				<Navigator.Page id="app" title={<T>{lang.settings.title}</T>}>
					<Page />
				</Navigator.Page>
			</Navigator>
		</S.Settings>
	);
};
