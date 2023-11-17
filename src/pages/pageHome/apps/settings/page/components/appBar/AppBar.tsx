import { useState } from "react";
import * as S from "./AppBar.styles";
import { List } from "@src/components/list/List";
import { Icon } from "@src/icons/Icon";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useSearchParams } from "react-router-dom";
import { IAppBarPosition } from "@src/pages/pageHome/PageHome.styles";

export const AppBar = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [appBarPosition, setAppBarPosition] = useState<IAppBarPosition>((searchParams.get("appbar") as IAppBarPosition) || "bottom");

	const handleOnClickChangeAppBarPosition = (appBarPosition: IAppBarPosition) => {
		setAppBarPosition(appBarPosition);

		searchParams.set("appbar", appBarPosition);
		setSearchParams(searchParams, { replace: true });
	};

	return (
		<S.AppBar>
			<List.Section>
				<T>{lang.settings.appBar.title}</T>
			</List.Section>

			<List>
				<List.Cell onClick={() => handleOnClickChangeAppBarPosition("top")}>
					<List.Cell.Image>
						<Icon iconName="iconArrowUpCircle" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.appBar.top}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={appBarPosition === "top" ? "iconCheck" : ""} />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={() => handleOnClickChangeAppBarPosition("bottom")}>
					<List.Cell.Image>
						<Icon iconName="iconArrowDownCircle" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.appBar.bottom}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={appBarPosition === "bottom" ? "iconCheck" : ""} />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={() => handleOnClickChangeAppBarPosition("left")}>
					<List.Cell.Image>
						<Icon iconName="iconArrowLeftCircle" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.appBar.left}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={appBarPosition === "left" ? "iconCheck" : ""} />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={() => handleOnClickChangeAppBarPosition("right")}>
					<List.Cell.Image>
						<Icon iconName="iconArrowRightCircle" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.appBar.right}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={appBarPosition === "right" ? "iconCheck" : ""} />
					</List.Cell.Arrow>
				</List.Cell>
			</List>
		</S.AppBar>
	);
};
