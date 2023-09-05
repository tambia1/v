import { useState } from "react";
import * as S from "./PageHome.styles";
import { PageItem, PageKey } from "./PageHome.types";
import { PageHeader } from "./components/pageHeader/PageHeader";
import { PageMenu } from "./components/pageMenu/PageMenu";
import { PageScreen } from "./components/pageScreen/pageScreen";

interface Props {
	pageKey: PageKey;
}

export const PageHome = ({ pageKey }: Props) => {
	const [isCollapsed, setIsCollapsed] = useState(true);

	const onClickButtonCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<S.PageContainer>
			<S.MenuContainer $isCollapsed={isCollapsed}>
				<PageMenu selectedItem={PageItem[pageKey].menuItem} />
				<S.ButtonCollapse onClick={onClickButtonCollapse} $isCollapsed={isCollapsed}>
					{isCollapsed ? "+" : "-"}
				</S.ButtonCollapse>
			</S.MenuContainer>

			<S.ScreenContainer>
				<PageHeader>{PageItem[pageKey].pageHeader}</PageHeader>
				<PageScreen>{PageItem[pageKey].pageScreen}</PageScreen>
			</S.ScreenContainer>
		</S.PageContainer>
	);
};
