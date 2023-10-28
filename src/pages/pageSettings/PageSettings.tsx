import * as S from "./PageSettings.styles";
import { Pager } from "@src/components/pager/Pager";
import { useLanguage } from "@src/language/UseLanguage";
import { Settings } from "./components/settings/Settings";

export const PageSettings = () => {
	const { lang } = useLanguage();

	return (
		<S.PageSettings>
			<Pager>
				<Pager.Page id="settings" title={lang.settings.title}>
					<Settings />
				</Pager.Page>
			</Pager>
		</S.PageSettings>
	);
};
