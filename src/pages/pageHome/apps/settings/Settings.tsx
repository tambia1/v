import * as S from "./Settings.styles";
import { Pager } from "@src/components/pager/Pager";
import { Lang } from "@src/language/Lang";
import { SettingsPage } from "./page/SettingsPage";
import { useLanguage } from "@src/language/UseLanguage";

export const Settings = () => {
	const { lang } = useLanguage();
	return (
		<S.Settings>
			<Pager>
				<Pager.Page id="app" title={<Lang>{lang.settings.title}</Lang>}>
					<SettingsPage />
				</Pager.Page>
			</Pager>
		</S.Settings>
	);
};
