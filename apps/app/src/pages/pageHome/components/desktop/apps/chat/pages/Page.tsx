import * as S from "./Pages.styles";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import { List } from "@src/components/list/List";
import { Talk } from "./components/talk/Talk";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";

export const Pages = () => {
	const navigator = useNavigator();

	const handleOnClickCell = (userId: string) => {
		navigator.pushPage(
			<Navigator.Page id="talks" title={userId}>
				<Talk />
			</Navigator.Page>
		);
	};

	return (
		<S.Pages>
			<List.Section>
				<T>{lang.chat.talks}</T>
			</List.Section>

			<List>
				<List.Cell onClick={() => handleOnClickCell("User 1")}>User 1</List.Cell>
				<List.Cell onClick={() => handleOnClickCell("User 2")}>User 2</List.Cell>
				<List.Cell onClick={() => handleOnClickCell("User 3")}>User 3</List.Cell>
			</List>
		</S.Pages>
	);
};
