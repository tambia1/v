import { useState } from "react";
import * as S from "./Pager.styles";
import { Item } from "./components/item/Item";
import { PagerContext } from "./hooks/UsePager";
import { State } from "./components/item/Item.styles";
import { Text } from "../text/Text";
import { Icon } from "../icon/Icon";
import { Page, IPage } from "./components/page/Page";

interface Props {
	children?: IPage;
	onChange?: (action: IAction, pagerItem?: IPagerItem) => void;
}

type IAction = "" | "onPushStart" | "onPushEnd" | "onPopStart" | "onPopEnd" | "onClickBack" | "onClickClose";

export interface IPagerItem {
	page: IPage;
	pageState: State;
	titleState: State;
}

export const Pager = ({ children, onChange }: Props) => {
	const [pagerItems, setPagerItems] = useState<IPagerItem[]>(children ? [{ pageState: "goToCenter", titleState: "goToCenter", page: children }] : []);
	const [action, setAction] = useState<IAction>("");

	const push = (page: IPage) => {
		setAction("onPushStart");
		setPagerItems((prevPages) => {
			const newPages = prevPages.map((page) => ({ ...page, pageState: "moveFromCenterToLeft" as State, titleState: "hideFromCenter" as State }));

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

	const pop = () => {
		setAction("onPopStart");
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

	const home = () => {
		setPagerItems([pagerItems[0]]);
	};

	const onAnimationStart = (page: IPagerItem) => {
		onChange?.(action, page);
	};

	const onAnimationEnd = (page: IPagerItem) => {
		if (action === "onPushStart") {
			setAction("onPushEnd");
			onChange?.("onPushEnd", page);
		}

		if (action === "onPopStart") {
			setAction("onPopEnd");
			onChange?.("onPopEnd", page);
		}

		if (page.pageState === "moveFromCenterToRight") {
			setPagerItems((prevPages) => [...prevPages.slice(0, -1)]);
		}
	};

	const handleGoBack = (action: IAction) => {
		pop();
		onChange?.(action, pagerItems.at(-1));
	};

	return (
		<PagerContext.Provider value={{ pages: pagerItems, push, pop, home }}>
			<S.Container>
				<S.Headers>
					<S.Back>
						<S.BackContainer
							onClick={() => {
								handleGoBack("onClickBack");
							}}
							$isVisible={pagerItems.length > 1}
						>
							<Icon iconName="chevronLeft" size="l" />
						</S.BackContainer>
						<S.BackContainer
							onClick={() => {
								handleGoBack("onClickClose");
							}}
							$isVisible={pagerItems.length === 1}
						>
							<Icon iconName="x" size="l" />
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
