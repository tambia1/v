import * as S from "./Settings.styles";
import { Navigator } from "@src/components/navigator/Navigator";
import { SettingsPage } from "./pages/SettingsPage";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";

export const Settings = () => {
	return (
		<S.Settings>
			<Navigator>
				<Navigator.Page id="app" title={<T>{lang.settings.title}</T>}>
					<SettingsPage />
				</Navigator.Page>
			</Navigator>
		</S.Settings>
	);
};
