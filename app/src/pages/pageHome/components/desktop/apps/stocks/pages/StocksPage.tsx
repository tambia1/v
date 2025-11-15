import { Icon } from "@src/components/icon/Icon";
import type { IconName } from "@src/components/icon/Icon.types";
import { List } from "@src/components/list/List";
import { Loader } from "@src/components/loader/Loader";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { QueryStocks, type StockOk } from "../queries/QueryStocks";
import { Stock } from "./components/stock/Stock";
import * as S from "./StocksPage.styles";

const iconMap: { [k: string]: IconName } = {
	AAPL: "iconApple",
	USD: "iconDollarSign",
	GLD: "iconCircle",
	GOOG: "iconGoogle",
	MSFT: "iconMicrosoft",
	META: "iconFacebook",
	BTC: "iconCircle",
};

export const StocksPage = () => {
	const navigator = useNavigator();

	const query = QueryStocks.stocks({}, { enabled: true });

	const handleOnSymbol = (stock: StockOk) => {
		navigator.pushPage(
			<Navigator.Page name={stock.meta.symbol} title={stock.meta.symbol}>
				<Stock stock={stock} />
			</Navigator.Page>,
		);
	};

	return (
		<S.StocksPage>
			<List.Section>
				<Text variant="title">
					<T>{lang.stocks.title}</T>
				</Text>
			</List.Section>

			<S.Loader>{query.isLoading && <Loader />}</S.Loader>

			<List>
				{Object.values(query.data || {})
					.filter((stock) => stock.status === "ok")
					.map((stock) => (
						<List.Cell key={stock.meta.symbol} onClick={() => handleOnSymbol(stock as StockOk)}>
							<List.Cell.Icon>
								<Icon iconName={iconMap[stock.meta.symbol] ?? ""} />
							</List.Cell.Icon>
							<List.Cell.Text>{stock.meta.symbol}</List.Cell.Text>
							<List.Cell.Image>
								<Icon iconName="iconChevronRight" />
							</List.Cell.Image>
						</List.Cell>
					))}
			</List>
		</S.StocksPage>
	);
};
