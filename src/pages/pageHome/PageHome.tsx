import * as S from "./PageHome.styles";
import { AppContainer } from "./components/appContainer/AppContainer";
import { Pager } from "@src/components/pager/Pager";

export const PageHome = () => {
	return (
		<S.Applications>
			<Pager>
				<Pager.Page id="apps" title="Apps">
					<AppContainer />
				</Pager.Page>
			</Pager>
		</S.Applications>
	);
};
