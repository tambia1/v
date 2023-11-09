import { useLanguage } from "@src/language/UseLanguage";
import * as S from "./PageHome.styles";
import { AppContainer } from "./components/appContainer/AppContainer";
import { Pager } from "@src/components/pager/Pager";
import { Lang } from "@src/language/Lang";

export const PageHome = () => {
	const { lang } = useLanguage();

	return (
		<S.Applications>
			<Pager>
				<Pager.Page id="apps" title={<Lang>{lang.home.title}</Lang>}>
					<AppContainer />
				</Pager.Page>
			</Pager>
		</S.Applications>
	);
};
