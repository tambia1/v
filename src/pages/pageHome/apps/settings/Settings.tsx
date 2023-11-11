import * as S from "./Settings.styles";
import { Pager } from "@src/components/pager/Pager";
import { SettingsPage } from "./page/SettingsPage";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";

export const Settings = () => {
	return (
		<S.Settings>
			<Pager>
				<Pager.Page id="app" title={<T>{lang.settings.title}</T>}>
					<SettingsPage />
				</Pager.Page>
			</Pager>
		</S.Settings>
	);
};
