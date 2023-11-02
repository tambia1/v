import { useLanguage } from "@src/language/UseLanguage";
import * as S from "./PageHome.styles";
import { AppContainer } from "./components/appContainer/AppContainer";
import { Pager } from "@src/components/pager/Pager";

export const PageHome = () => {
	const { lang } = useLanguage();

	return (
		<S.Applications>
			<Pager>
				<Pager.Page id="apps" title={lang.home.title}>
					<AppContainer />
				</Pager.Page>
			</Pager>
		</S.Applications>
	);
};
