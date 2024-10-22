import { Icon } from "@src/components/icon/Icon";
import { List } from "@src/components/list/List";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import type { IBarPosition } from "@src/pages/pageHome/components/desktop/Desktop.styles";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as S from "./Layout.styles";

export const Layout = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [barPosition, setBarPosition] = useState<IBarPosition>((searchParams.get("bar") as IBarPosition) || "top");

	const handleOnClickChangeBarPosition = (barPosition: IBarPosition) => {
		setBarPosition(barPosition);

		searchParams.set("bar", barPosition);
		setSearchParams(searchParams, { replace: true });
	};

	return (
		<S.Layout>
			<List.Section>
				<T>{lang.settings.layout.barPositon}</T>
			</List.Section>

			<List>
				<List.Cell onClick={() => handleOnClickChangeBarPosition("top")}>
					<List.Cell.Icon>
						<Icon iconName="iconArrowUpCircle" />
					</List.Cell.Icon>
					<List.Cell.Text>
						<T>{lang.settings.layout.top}</T>
					</List.Cell.Text>
					<List.Cell.Image>
						<Icon iconName={barPosition === "top" ? "iconCheck" : ""} />
					</List.Cell.Image>
				</List.Cell>

				<List.Cell onClick={() => handleOnClickChangeBarPosition("bottom")}>
					<List.Cell.Icon>
						<Icon iconName="iconArrowDownCircle" />
					</List.Cell.Icon>
					<List.Cell.Text>
						<T>{lang.settings.layout.bottom}</T>
					</List.Cell.Text>
					<List.Cell.Image>
						<Icon iconName={barPosition === "bottom" ? "iconCheck" : ""} />
					</List.Cell.Image>
				</List.Cell>

				<List.Cell onClick={() => handleOnClickChangeBarPosition("left")}>
					<List.Cell.Icon>
						<Icon iconName="iconArrowLeftCircle" />
					</List.Cell.Icon>
					<List.Cell.Text>
						<T>{lang.settings.layout.left}</T>
					</List.Cell.Text>
					<List.Cell.Image>
						<Icon iconName={barPosition === "left" ? "iconCheck" : ""} />
					</List.Cell.Image>
				</List.Cell>

				<List.Cell onClick={() => handleOnClickChangeBarPosition("right")}>
					<List.Cell.Icon>
						<Icon iconName="iconArrowRightCircle" />
					</List.Cell.Icon>
					<List.Cell.Text>
						<T>{lang.settings.layout.right}</T>
					</List.Cell.Text>
					<List.Cell.Image>
						<Icon iconName={barPosition === "right" ? "iconCheck" : ""} />
					</List.Cell.Image>
				</List.Cell>
			</List>
		</S.Layout>
	);
};
