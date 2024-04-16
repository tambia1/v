import * as S from "./Spin.styles";
import { Navigator } from "@src/components/navigator/Navigator";
import { SpinPage } from "./pages/SpinPage";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";

export const Spin = () => {
	return (
		<S.Spin>
			<Navigator>
				<Navigator.Page id="app" title={<T>{lang.notes.title}</T>}>
					<SpinPage />
				</Navigator.Page>
			</Navigator>
		</S.Spin>
	);
};
