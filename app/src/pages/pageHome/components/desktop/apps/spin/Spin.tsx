import { Navigator } from "@src/components/navigator/Navigator";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { SpinPage } from "./pages/SpinPage";
import * as S from "./Spin.styles";

export const Spin = () => {
	return (
		<S.Spin>
			<Navigator>
				<Navigator.Page id="app" title={<T>{lang.spin.title}</T>}>
					<SpinPage />
				</Navigator.Page>
			</Navigator>
		</S.Spin>
	);
};
