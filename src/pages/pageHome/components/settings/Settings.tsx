import * as S from "./Settings.styles";
import { usePager } from "@src/components/pager/hooks/UsePager";
import { Pager } from "@src/components/pager/Pager";
import { Language } from "./../language/Language";
import { Theme } from "./../theme/Theme";
import { List } from "@src/components/list/List";
import { Text } from "@src/components/text/Text";
import { Icon } from "@src/components/icon/Icon";

export const Settings = () => {
	const pager = usePager();

	const handleOnClickLanguage = () => {
		pager.push(<Pager.Page id="language" title="Language" body={<Language />} />);
	};

	const handleOnClickTheme = () => {
		pager.push(<Pager.Page id="theme" title="Theme" body={<Theme />} />);
	};

	return (
		<S.Settings>
			<List.Title>Appearance</List.Title>

			<List>
				<List.Cell onClick={handleOnClickLanguage}>
					<List.Cell.Image>
						<Icon iconName="globe" size="s" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Text>Language</Text>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName="chevronRight" size="s" />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={handleOnClickTheme}>
					<List.Cell.Image>
						<Icon iconName="aperture" size="s" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Text>Theme</Text>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName="chevronRight" size="s" />
					</List.Cell.Arrow>
				</List.Cell>
				<List.Cell>About</List.Cell>
			</List>
		</S.Settings>
	);
};
