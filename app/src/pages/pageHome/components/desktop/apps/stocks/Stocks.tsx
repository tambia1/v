import { Navigator } from "@src/components/navigator/Navigator";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { StocksPage } from "./pages/StocksPage";
import * as S from "./Stocks.styles";

export const Stocks = () => {
	return (
		<S.Stocks>
			<Navigator>
				<Navigator.Page name="app" title={<T>{lang.stocks.title}</T>}>
					<StocksPage />
				</Navigator.Page>
			</Navigator>
		</S.Stocks>
	);
};
