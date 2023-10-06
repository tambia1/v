import { useState } from "react";
import * as S from "./Pager.styles";
import { Item } from "./components/item/Item";
import { PagerContext } from "./hooks/UsePager";
import { IState } from "./components/item/Item.styles";
import { Text } from "../text/Text";
import { Icon } from "../icon/Icon";
import { Page, IPage } from "./components/page/Page";

interface Props {
	children?: IPage;
	onChange?: (action: IAction, pagerItem?: IPagerItem) => void;
}

export interface IPagerItem {
	page: IPage;
	pageState: IState;
	titleState: IState;
}

type IAction = "onStart" | "onEnd" | "onBack" | "onClose";

export const Pager = ({ children, onChange }: Props) => {
	const [pagerItems, setPagerItems] = useState<IPagerItem[]>(children ? [{ pageState: "goToCenter", titleState: "goToCenter", page: children }] : []);

	const pushPage = (page: IPage) => {
		setPagerItems((prevPages) => {
			const newPages = prevPages.map((page) => ({ ...page, pageState: "moveFromCenterToLeft" as IState, titleState: "hideFromCenter" as IState }));

			return [
				...newPages,
				{
					page,
					pageState: "moveFromRightToCenter",
					titleState: "moveFromRightToCenter",
				},
			];
		});
	};

	const popPage = () => {
		setPagerItems((prevPages) => {
			const newPages = [...prevPages];

			if (newPages.length >= 2) {
				newPages[newPages.length - 1].pageState = "moveFromCenterToRight";
				newPages[newPages.length - 1].titleState = "moveFromCenterToRight";
				newPages[newPages.length - 2].pageState = "moveFromLeftToCenter";
				newPages[newPages.length - 2].titleState = "showInCenter";
			}

			return newPages;
		});
	};

	const goHome = () => {
		setPagerItems([pagerItems[0]]);
	};

	const onAnimationStart = (pagerItem: IPagerItem) => {
		onChange?.("onStart", pagerItem);
	};

	const onAnimationEnd = (pagerItem: IPagerItem) => {
		onChange?.("onEnd", pagerItem);

		if (pagerItem.pageState === "moveFromCenterToRight") {
			setPagerItems((prevPages) => [...prevPages.slice(0, -1)]);
		}
	};

	const handleGoBack = () => {
		popPage();
		onChange?.("onBack", pagerItems.at(-1));
	};

	const handleClose = () => {
		onChange?.("onClose", pagerItems.at(-1));
	};

	return (
		<PagerContext.Provider value={{ pages: pagerItems, pushPage, popPage, goHome }}>
			<S.Container>
				<S.Headers>
					<S.Back>
						<S.BackContainer onClick={handleClose} $isVisible={pagerItems.length === 1}>
							<Icon iconName="x" size="l" />
						</S.BackContainer>
						<S.BackContainer onClick={handleGoBack} $isVisible={pagerItems.length > 1}>
							<Icon iconName="chevronLeft" size="l" />
						</S.BackContainer>
					</S.Back>
					<S.Header>
						{pagerItems.map((pagerItem) => (
							<Item key={pagerItem.page.props.id} state={pagerItem.titleState}>
								<Text>{pagerItem.page.props.title}</Text>
							</Item>
						))}
					</S.Header>
				</S.Headers>
				<S.Bodies>
					{pagerItems.map((pagerItem) => (
						<Item key={pagerItem.page.props.id} state={pagerItem.pageState} onAnimationStart={() => onAnimationStart(pagerItem)} onAnimationEnd={() => onAnimationEnd(pagerItem)}>
							{pagerItem.page.props.body}
						</Item>
					))}
				</S.Bodies>
			</S.Container>
		</PagerContext.Provider>
	);
};

Pager.Page = Page;
