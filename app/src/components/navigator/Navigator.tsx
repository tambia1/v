import { useState } from "react";
import { Icon } from "../icon/Icon";
import { Item } from "./components/item/Item";
import type { AnimationState } from "./components/item/Item.styles";
import { Page } from "./components/page/Page";
import { NavigatorContext } from "./hooks/UseNavigator";
import * as S from "./Navigator.styles";
import { type PageType } from "./Navigator.types";

type Props = {
	className?: string;
	children?: PageType;
	onPushStart?: Callback;
	onPushEnd?: Callback;
	onPopStart?: Callback;
	onPopEnd?: Callback;
	onBack?: Callback;
	onClose?: Callback;
};

export interface NavigatorItem {
	page: PageType;
	pageAnimation: AnimationState;
	titleAnimation: AnimationState;
}

export type Action = "pushStart" | "pushEnd" | "popStart" | "popEnd" | "back" | "close";
export type Callback = (key: string) => boolean;

export const Navigator = ({ className, children, onPushStart, onPushEnd, onPopStart, onPopEnd, onBack, onClose }: Props) => {
	const [navigatorItems, setNavigatorItems] = useState<NavigatorItem[]>(
		children ? [{ pageAnimation: "goToCenter", titleAnimation: "goToCenter", page: children }] : [],
	);
	const [listeners, setListeners] = useState<{ [K in Action]: { [K in string]: Callback } }>({
		pushStart: onPushStart ? { pager: onPushStart } : {},
		pushEnd: onPushEnd ? { pager: onPushEnd } : {},
		popStart: onPopStart ? { pager: onPopStart } : {},
		popEnd: onPopEnd ? { pager: onPopEnd } : {},
		back: onBack ? { pager: onBack } : {},
		close: onClose ? { pager: onClose } : {},
	});

	const pushPage = (page: PageType) => {
		Object.keys(listeners.pushStart).forEach((k) => listeners.popStart[k](k));

		setNavigatorItems((prevPages) => {
			const newPages = prevPages.map((prevPage) => ({
				...prevPage,
				pageAnimation: "moveFromCenterToLeft" as AnimationState,
				titleAnimation: "hideFromCenter" as AnimationState,
			}));

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
		setNavigatorItems((prevPages) => {
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

	const addPage = (index: number, page: PageType) => {
		setNavigatorItems((prevPages) => {
			const newPages = [...prevPages];

			newPages.splice(index, 0, {
				page,
				pageAnimation: "showInCenter",
				titleAnimation: "showInCenter",
			});

			return newPages;
		});
	};

	const removePage = (index: number) => {
		setNavigatorItems((prevPages) => {
			const newPages = [...prevPages];

			newPages.splice(index, 1);

			return newPages;
		});
	};

	const onAnimationStart = (navigatorItem: NavigatorItem) => {
		if (navigatorItem.pageAnimation === "moveFromRightToCenter" || navigatorItem.pageAnimation === "goFromRightToCenter") {
			Object.keys(listeners.pushStart).forEach((k) => listeners.pushStart[k](k));
		}
		if (navigatorItem.pageAnimation === "moveFromCenterToRight" || navigatorItem.pageAnimation === "goFromCenterToRight") {
			Object.keys(listeners.popStart).forEach((k) => listeners.popStart[k](k));
		}
	};

	const onAnimationEnd = (navigatorItem: NavigatorItem) => {
		if (navigatorItem.pageAnimation === "moveFromRightToCenter" || navigatorItem.pageAnimation === "goFromRightToCenter") {
			Object.keys(listeners.pushEnd).forEach((k) => listeners.pushEnd[k](k));
		}

		if (navigatorItem.pageAnimation === "moveFromCenterToRight" || navigatorItem.pageAnimation === "goFromCenterToRight") {
			Object.keys(listeners.popEnd).forEach((k) => listeners.popEnd[k](k));
		}

		if (navigatorItem.pageAnimation === "moveFromCenterToRight") {
			setNavigatorItems((prevPages) => [...prevPages.slice(0, -1)]);
		}
	};

	const handleBack = () => {
		let result = true;

		Object.keys(listeners.back).forEach((k) => {
			result = result && listeners.back[k](k);
		});

		if (result) {
			popPage();
		}
	};

	const goHome = () => {
		setNavigatorItems((prevPages) => {
			const newPages = [prevPages[0]];

			if (newPages.length >= 2) {
				newPages[newPages.length - 1].pageAnimation = "moveFromCenterToRight";
				newPages[newPages.length - 1].titleAnimation = "moveFromCenterToRight";
				newPages[0].pageAnimation = "moveFromLeftToCenter";
				newPages[0].titleAnimation = "showInCenter";
			}

			return newPages;
		});

		Object.keys(listeners.back).forEach((k) => listeners.back[k](k));
	};

	const handleClose = () => {
		Object.keys(listeners.close).forEach((k) => listeners.close[k](k));
	};

	const addListener = (action: Action, key: string, callback: Callback) => {
		setListeners({ ...listeners, [action]: { ...listeners[action], [key]: callback } });
	};

	const removeListener = (action: Action, key: string) => {
		if (listeners[action][key]) {
			const newListeners = { ...listeners, [action]: { ...listeners[action] } };
			delete newListeners[action][key];
			setListeners(newListeners);
		}
	};

	return (
		<NavigatorContext value={{ pages: navigatorItems, pushPage, popPage, goHome, addPage, removePage, addListener, removeListener }}>
			<S.Navigator className={className} data-items={navigatorItems.length}>
				<S.Headers>
					<S.Back>
						<S.BackButton onClick={handleClose} $isVisible={onClose !== undefined && navigatorItems.length === 1}>
							<Icon iconName="iconX" size="size250" />
						</S.BackButton>
						<S.BackButton onClick={handleBack} $isVisible={navigatorItems.length > 1}>
							<Icon iconName="iconChevronLeft" size="size250" />
						</S.BackButton>
					</S.Back>
					<S.Header>
						{navigatorItems.map((navigatorItem) => (
							<Item key={navigatorItem.page.props.name} animation={navigatorItem.titleAnimation}>
								{navigatorItem.page.props.title}
							</Item>
						))}
					</S.Header>
				</S.Headers>
				<S.Pages>
					{navigatorItems.map((navigatorItem) => (
						<Item
							key={navigatorItem.page.props.name}
							animation={navigatorItem.pageAnimation}
							onAnimStart={() => onAnimationStart(navigatorItem)}
							onAnimEnd={() => onAnimationEnd(navigatorItem)}
						>
							{navigatorItem.page.props.children}
						</Item>
					))}
				</S.Pages>
			</S.Navigator>
		</NavigatorContext>
	);
};

Navigator.Page = Page;
