import { Flag } from "@src/components/flag/Flag";
import { Icon } from "@src/components/icon/Icon";
import { List } from "@src/components/list/List";
import { T } from "@src/locales/T";
import i18n, { lang } from "@src/locales/i18n";
import * as S from "../../TestEdit.styles";

export const ExampleList = () => {
	return (
		<S.Col>
			<S.Title>List</S.Title>

			<List>
				<List.Cell onClick={() => {}}>
					<List.Cell.Icon>
						<Flag flagName="gb" />
					</List.Cell.Icon>
					<List.Cell.Text>
						<T>{lang.settings.language.english}</T>
					</List.Cell.Text>
					<List.Cell.Image>
						<Icon iconName={i18n.language === "en" ? "iconCheck" : ""} />
					</List.Cell.Image>
				</List.Cell>

				<List.Cell onClick={() => {}}>
					<List.Cell.Icon>
						<Flag flagName="fi" />
					</List.Cell.Icon>
					<List.Cell.Text>
						<T>{lang.settings.language.finnish}</T>
					</List.Cell.Text>
					<List.Cell.Image>
						<Icon iconName={i18n.language === "fi" ? "iconCheck" : ""} />
					</List.Cell.Image>
				</List.Cell>

				<List.Cell onClick={() => {}}>
					<List.Cell.Icon>
						<Icon iconName="iconGlobe" />
					</List.Cell.Icon>
					<List.Cell.Text>
						<T>{lang.settings.language.title}</T>
					</List.Cell.Text>
					<List.Cell.Image>
						<Icon iconName="iconChevronRight" />
					</List.Cell.Image>
				</List.Cell>

				<List.Cell onClick={() => {}}>
					<List.Cell.Icon>
						<Icon iconName="iconLayout" />
					</List.Cell.Icon>
					<List.Cell.Text>
						<T>{lang.settings.layout.title}</T>
					</List.Cell.Text>
					<List.Cell.Info>
						<T>Top</T>
					</List.Cell.Info>
					<List.Cell.Image>
						<Icon iconName="iconChevronRight" />
					</List.Cell.Image>
				</List.Cell>

				<List.Cell onClick={() => {}} $isEnabled={false}>
					<List.Cell.Icon>
						<Icon iconName="iconLayout" />
					</List.Cell.Icon>
					<List.Cell.Text>
						<T>{lang.settings.layout.title}</T>
					</List.Cell.Text>
					<List.Cell.Info>
						<T>Top</T>
					</List.Cell.Info>
					<List.Cell.Image>
						<Icon iconName="iconChevronRight" />
					</List.Cell.Image>
				</List.Cell>

				<List.Cell onClick={() => {}}>
					<T>{lang.settings.about.title}</T>
				</List.Cell>
			</List>
		</S.Col>
	);
};
