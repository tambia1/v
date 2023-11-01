import { useState } from "react";
import * as S from "./Pager.styles";
import { Item } from "./components/item/Item";
import { PagerContext } from "./hooks/UsePager";
import { IAnimationState, IAnimationType } from "./components/item/Item.styles";
import { Icon } from "../../icons/Icon";
import { Page, IPage } from "./components/page/Page";
import { Lang } from "@src/language/Lang";

interface Props {
	children?: IPage;
	animtionType?: IAnimationType;
	onPushStart?: ICallback;
	onPushEnd?: ICallback;
	onPopStart?: ICallback;
	onPopEnd?: ICallback;
	onBack?: ICallback;
	onClose?: ICallback;
}

export interface IPagerItem {
	page: IPage;
	pageAnimation: IAnimationState;
	titleAnimation: IAnimationState;
}

export type IAction = "pushStart" | "pushEnd" | "popStart" | "popEnd" | "back" | "close";
export type ICallback = (pagerItem?: IPagerItem) => void;

export const Pager = ({ children, animtionType = "slide", onPushStart, onPushEnd, onPopStart, onPopEnd, onBack, onClose }: Props) => {
	const [pagerItems, setPagerItems] = useState<IPagerItem[]>(children ? [{ pageAnimation: "goToCenter", titleAnimation: "goToCenter", page: children }] : []);
	const [listeners, setListeners] = useState<{ [K in IAction]: { [K in string]: ICallback } }>({
		pushStart: onPushStart ? { pager: onPushStart } : {},
		pushEnd: onPushEnd ? { pager: onPushEnd } : {},
		popStart: onPopStart ? { pager: onPopStart } : {},
		popEnd: onPopEnd ? { pager: onPopEnd } : {},
		back: onBack ? { pager: onBack } : {},
		close: onClose ? { pager: onClose } : {},
	});

	const pushPage = (page: IPage) => {
		setPagerItems((prevPages) => {
			const newPages = prevPages.map((page) => ({ ...page, pageAnimation: "moveFromCenterToLeft" as IAnimationState, titleAnimation: "hideFromCenter" as IAnimationState }));

			return [
				...newPages,
				{
					page,
					pageAnimation: "moveFromRightToCenter",
					titleAnimation: "moveFromRightToCenter",
				},
			];
		});
	};

	const popPage = () => {
		setPagerItems((prevPages) => {
			const newPages = [...prevPages];

			if (newPages.length >= 2) {
				newPages[newPages.length - 1].pageAnimation = "moveFromCenterToRight";
				newPages[newPages.length - 1].titleAnimation = "moveFromCenterToRight";
				newPages[newPages.length - 2].pageAnimation = "moveFromLeftToCenter";
				newPages[newPages.length - 2].titleAnimation = "showInCenter";
			}

			return newPages;
		});
	};

	const onAnimationStart = (pagerItem: IPagerItem) => {
		if (pagerItem.pageAnimation === "moveFromRightToCenter" || pagerItem.pageAnimation === "goFromRightToCenter") {
			Object.keys(listeners.popStart).forEach((k) => listeners.popStart[k](pagerItem));
		}

		if (pagerItem.pageAnimation === "moveFromCenterToRight" || pagerItem.pageAnimation === "goFromCenterToRight") {
			Object.keys(listeners.popStart).forEach((k) => listeners.popStart[k](pagerItem));
		}
	};

	const onAnimationEnd = (pagerItem: IPagerItem) => {
		if (pagerItem.pageAnimation === "moveFromRightToCenter" || pagerItem.pageAnimation === "goFromRightToCenter") {
			Object.keys(listeners.pushEnd).forEach((k) => listeners.pushEnd[k](pagerItem));
		}

		if (pagerItem.pageAnimation === "moveFromCenterToRight" || pagerItem.pageAnimation === "goFromCenterToRight") {
			Object.keys(listeners.popEnd).forEach((k) => listeners.popEnd[k](pagerItem));
		}

		if (pagerItem.pageAnimation === "moveFromCenterToRight") {
			setPagerItems((prevPages) => [...prevPages.slice(0, -1)]);
		}
	};

	const handleBack = () => {
		popPage();
		Object.keys(listeners.back).forEach((k) => listeners.back[k]());
	};

	const goHome = () => {
		setPagerItems((prevPages) => {
			const newPages = [prevPages[0]];

			if (newPages.length >= 2) {
				newPages[newPages.length - 1].pageAnimation = "moveFromCenterToRight";
				newPages[newPages.length - 1].titleAnimation = "moveFromCenterToRight";
				newPages[0].pageAnimation = "moveFromLeftToCenter";
				newPages[0].titleAnimation = "showInCenter";
			}

			return newPages;
		});

		Object.keys(listeners.back).forEach((k) => listeners.back[k]());
	};

	const handleClose = () => {
		Object.keys(listeners.close).forEach((k) => listeners.close[k]());
	};

	const addListener = (action: IAction, key: string, callback: ICallback) => {
		if (!listeners[action][key]) {
			setListeners({ ...listeners, [action]: { ...listeners[action], [key]: callback } });
		}
	};

	const removeListener = (action: IAction, key: string) => {
		if (listeners[action][key]) {
			const newListeners = { ...listeners, [action]: { ...listeners[action] } };
			delete newListeners[action][key];
			setListeners(newListeners);
		}
	};

	return (
		<PagerContext.Provider value={{ pages: pagerItems, pushPage, popPage, goHome, addListener, removeListener }}>
			<S.Pager data-items={pagerItems.length}>
				<S.Headers>
					<S.Back>
						<S.BackContainer onClick={handleClose} $isVisible={onClose !== undefined && pagerItems.length === 1}>
							<Icon iconName="x" size="l" />
						</S.BackContainer>
						<S.BackContainer onClick={handleBack} $isVisible={pagerItems.length > 1}>
							<Icon iconName="chevronLeft" size="l" />
						</S.BackContainer>
					</S.Back>
					<S.Header>
						{pagerItems.map((pagerItem) => (
							<Item key={pagerItem.page.props.title} animationType={animtionType} animation={pagerItem.titleAnimation}>
								<Lang>{pagerItem.page.props.title}</Lang>
							</Item>
						))}
					</S.Header>
				</S.Headers>
				<S.Bodies>
					{pagerItems.map((pagerItem) => (
						<Item
							key={pagerItem.page.props.id}
							animationType={animtionType}
							animation={pagerItem.pageAnimation}
							onAnimationStart={() => onAnimationStart(pagerItem)}
							onAnimationEnd={() => onAnimationEnd(pagerItem)}
						>
							{pagerItem.page.props.children}
						</Item>
					))}
				</S.Bodies>
			</S.Pager>
		</PagerContext.Provider>
	);
};

Pager.Page = Page;
