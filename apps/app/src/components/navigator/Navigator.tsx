import { useState } from "react";
import * as S from "./Navigator.styles";
import { Item } from "./components/item/Item";
import { NavigatorContext } from "./hooks/UseNavigator";
import { IAnimationState } from "./components/item/Item.styles";
import { Icon } from "../../icons/Icon";
import { Page, IPage } from "./components/page/Page";
import { useThemeContext } from "@src/theme/UseThemeContext";

interface Props {
	children?: IPage;
	onPushStart?: ICallback;
	onPushEnd?: ICallback;
	onPopStart?: ICallback;
	onPopEnd?: ICallback;
	onBack?: ICallback;
	onClose?: ICallback;
}

export interface INavigatorItem {
	page: IPage;
	pageAnimation: IAnimationState;
	titleAnimation: IAnimationState;
}

export type IAction = "pushStart" | "pushEnd" | "popStart" | "popEnd" | "back" | "close";
export type ICallback = (key?: string, navigatorItem?: INavigatorItem) => void;

export const Navigator = ({ children, onPushStart, onPushEnd, onPopStart, onPopEnd, onBack, onClose }: Props) => {
	const { theme } = useThemeContext();
	const [navigatorItems, setNavigatorItems] = useState<INavigatorItem[]>(children ? [{ pageAnimation: "goToCenter", titleAnimation: "goToCenter", page: children }] : []);
	const [listeners, setListeners] = useState<{ [K in IAction]: { [K in string]: ICallback } }>({
		pushStart: onPushStart ? { pager: onPushStart } : {},
		pushEnd: onPushEnd ? { pager: onPushEnd } : {},
		popStart: onPopStart ? { pager: onPopStart } : {},
		popEnd: onPopEnd ? { pager: onPopEnd } : {},
		back: onBack ? { pager: onBack } : {},
		close: onClose ? { pager: onClose } : {},
	});

	const pushPage = (page: IPage) => {
		setNavigatorItems((prevPages) => {
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

	const onAnimationStart = (navigatorItem: INavigatorItem) => {
		if (navigatorItem.pageAnimation === "moveFromRightToCenter" || navigatorItem.pageAnimation === "goFromRightToCenter") {
			Object.keys(listeners.popStart).forEach((k) => listeners.popStart[k](k, navigatorItem));
		}

		if (navigatorItem.pageAnimation === "moveFromCenterToRight" || navigatorItem.pageAnimation === "goFromCenterToRight") {
			Object.keys(listeners.popStart).forEach((k) => listeners.popStart[k](k, navigatorItem));
		}
	};

	const onAnimationEnd = (navigatorItem: INavigatorItem) => {
		if (navigatorItem.pageAnimation === "moveFromRightToCenter" || navigatorItem.pageAnimation === "goFromRightToCenter") {
			Object.keys(listeners.pushEnd).forEach((k) => listeners.pushEnd[k](k, navigatorItem));
		}

		if (navigatorItem.pageAnimation === "moveFromCenterToRight" || navigatorItem.pageAnimation === "goFromCenterToRight") {
			Object.keys(listeners.popEnd).forEach((k) => listeners.popEnd[k](k, navigatorItem));
		}

		if (navigatorItem.pageAnimation === "moveFromCenterToRight") {
			setNavigatorItems((prevPages) => [...prevPages.slice(0, -1)]);
		}
	};

	const handleBack = () => {
		popPage();
		Object.keys(listeners.back).forEach((k) => listeners.back[k]());
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
		<NavigatorContext.Provider value={{ pages: navigatorItems, pushPage, popPage, goHome, addListener, removeListener }}>
			<S.Navigator data-items={navigatorItems.length}>
				<S.Headers>
					<S.Back>
						<S.BackContainer onClick={handleClose} $isVisible={onClose !== undefined && navigatorItems.length === 1}>
							<Icon iconName="iconX" size={theme.size.l} />
						</S.BackContainer>
						<S.BackContainer onClick={handleBack} $isVisible={navigatorItems.length > 1}>
							<Icon iconName="iconChevronLeft" size={theme.size.l} />
						</S.BackContainer>
					</S.Back>
					<S.Header>
						{navigatorItems.map((navigatorItem) => (
							<Item key={navigatorItem.page.props.id} animation={navigatorItem.titleAnimation}>
								{navigatorItem.page.props.title}
							</Item>
						))}
					</S.Header>
				</S.Headers>
				<S.Pages>
					{navigatorItems.map((navigatorItem) => (
						<Item key={navigatorItem.page.props.id} animation={navigatorItem.pageAnimation} onAnimStart={() => onAnimationStart(navigatorItem)} onAnimEnd={() => onAnimationEnd(navigatorItem)}>
							{navigatorItem.page.props.children}
						</Item>
					))}
				</S.Pages>
			</S.Navigator>
		</NavigatorContext.Provider>
	);
};

Navigator.Page = Page;
