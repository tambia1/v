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
	const [barPosition, setBarPosition] = useState<IBarPosition>((searchParams.get("bar") as IBarPosition) || "bottom");

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
					<List.Cell.Left>
						<Icon iconName="iconArrowUpCircle" />
					</List.Cell.Left>
					<List.Cell.Center>
						<T>{lang.settings.layout.top}</T>
					</List.Cell.Center>
					<List.Cell.Right>
						<Icon iconName={barPosition === "top" ? "iconCheck" : ""} />
					</List.Cell.Right>
				</List.Cell>

				<List.Cell onClick={() => handleOnClickChangeBarPosition("bottom")}>
					<List.Cell.Left>
						<Icon iconName="iconArrowDownCircle" />
					</List.Cell.Left>
					<List.Cell.Center>
						<T>{lang.settings.layout.bottom}</T>
					</List.Cell.Center>
					<List.Cell.Right>
						<Icon iconName={barPosition === "bottom" ? "iconCheck" : ""} />
					</List.Cell.Right>
				</List.Cell>

				<List.Cell onClick={() => handleOnClickChangeBarPosition("left")}>
					<List.Cell.Left>
						<Icon iconName="iconArrowLeftCircle" />
					</List.Cell.Left>
					<List.Cell.Center>
						<T>{lang.settings.layout.left}</T>
					</List.Cell.Center>
					<List.Cell.Right>
						<Icon iconName={barPosition === "left" ? "iconCheck" : ""} />
					</List.Cell.Right>
				</List.Cell>

				<List.Cell onClick={() => handleOnClickChangeBarPosition("right")}>
					<List.Cell.Left>
						<Icon iconName="iconArrowRightCircle" />
					</List.Cell.Left>
					<List.Cell.Center>
						<T>{lang.settings.layout.right}</T>
					</List.Cell.Center>
					<List.Cell.Right>
						<Icon iconName={barPosition === "right" ? "iconCheck" : ""} />
					</List.Cell.Right>
				</List.Cell>
			</List>
		</S.Layout>
	);
};
