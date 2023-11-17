import { useState } from "react";
import * as S from "./PageBar.styles";
import { List } from "@src/components/list/List";
import { Icon } from "@src/icons/Icon";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useSearchParams } from "react-router-dom";
import { IPageBarPosition } from "@src/pages/pageHome/PageHome.styles";

export const PageBar = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [pageBarPosition, setPageBarPosition] = useState<IPageBarPosition>((searchParams.get("pageBar") as IPageBarPosition) || "bottom");

	const handleOnClickChangePageBarPosition = (pageBarPosition: IPageBarPosition) => {
		setPageBarPosition(pageBarPosition);

		searchParams.set("pagebar", pageBarPosition);
		setSearchParams(searchParams, { replace: true });
	};

	return (
		<S.PageBar>
			<List.Section>
				<T>{lang.settings.pageBar.title}</T>
			</List.Section>

			<List>
				<List.Cell onClick={() => handleOnClickChangePageBarPosition("top")}>
					<List.Cell.Image>
						<Icon iconName="iconArrowUpCircle" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.pageBar.top}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={pageBarPosition === "top" ? "iconCheck" : ""} />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={() => handleOnClickChangePageBarPosition("bottom")}>
					<List.Cell.Image>
						<Icon iconName="iconArrowDownCircle" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.pageBar.bottom}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={pageBarPosition === "bottom" ? "iconCheck" : ""} />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={() => handleOnClickChangePageBarPosition("left")}>
					<List.Cell.Image>
						<Icon iconName="iconArrowLeftCircle" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.pageBar.left}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={pageBarPosition === "left" ? "iconCheck" : ""} />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={() => handleOnClickChangePageBarPosition("right")}>
					<List.Cell.Image>
						<Icon iconName="iconArrowRightCircle" />
					</List.Cell.Image>
					<List.Cell.Text>
						<T>{lang.settings.pageBar.right}</T>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName={pageBarPosition === "right" ? "iconCheck" : ""} />
					</List.Cell.Arrow>
				</List.Cell>
			</List>
		</S.PageBar>
	);
};
