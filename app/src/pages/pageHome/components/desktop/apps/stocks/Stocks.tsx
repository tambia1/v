import * as S from "./Stocks.styles";
import { Navigator } from "@src/components/navigator/Navigator";
import { StocksPage } from "./pages/StocksPage";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";

export const Stocks = () => {
	return (
		<S.Stocks>
			<Navigator>
				<Navigator.Page id="app" title={<T>{lang.stocks.title}</T>}>
					<StocksPage />
				</Navigator.Page>
			</Navigator>
		</S.Stocks>
	);
};
