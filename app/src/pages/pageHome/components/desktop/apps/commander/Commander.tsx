import { Navigator } from "@src/components/navigator/Navigator";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import * as S from "./Commander.styles";
import { PageMenu } from "./pages/PageMenu";

export const Commander = () => {
	return (
		<S.Commander>
			<Navigator>
				<Navigator.Page name="app" title={<T>{lang.commander.title}</T>}>
					<PageMenu />
				</Navigator.Page>
			</Navigator>
		</S.Commander>
	);
};
