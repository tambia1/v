import { useState } from "react";
import * as S from "./Layout.styles";
import { List } from "@src/components/list/List";
import { Icon } from "@src/icons/Icon";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useSearchParams } from "react-router-dom";
import { IBarPosition } from "@src/pages/pageHome/PageHome.styles";

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
					<List.Cell.Image>
						<Icon iconName="iconArrowUpCircle" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.layout.top}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={barPosition === "top" ? "iconCheck" : ""} />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={() => handleOnClickChangeBarPosition("bottom")}>
					<List.Cell.Image>
						<Icon iconName="iconArrowDownCircle" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.layout.bottom}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={barPosition === "bottom" ? "iconCheck" : ""} />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={() => handleOnClickChangeBarPosition("left")}>
					<List.Cell.Image>
						<Icon iconName="iconArrowLeftCircle" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.layout.left}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={barPosition === "left" ? "iconCheck" : ""} />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={() => handleOnClickChangeBarPosition("right")}>
					<List.Cell.Image>
						<Icon iconName="iconArrowRightCircle" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.layout.right}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={barPosition === "right" ? "iconCheck" : ""} />
					</List.Cell.Arrow>
				</List.Cell>
			</List>
		</S.Layout>
	);
};
