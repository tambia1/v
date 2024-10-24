import { type HTMLAttributes, type ReactNode, useLayoutEffect, useRef, useState } from "react";
import * as S from "./PopupMenu.styles";
import { Button } from "./components/button/Button";
import { Items } from "./components/items/Items";
import { ContextPopupMenu } from "./context/UsePopupMenu";

export type PositionVer = "top" | "middle" | "bottom";
export type PositionHor = "left" | "center" | "right";

export type Props = HTMLAttributes<HTMLDivElement> & {
	className?: string;
	children: ReactNode;
	visible: boolean;
	onClickCover?: () => void;
	PositionVer?: PositionVer;
	PositionHor?: PositionHor;
};

export const PopupMenu = ({ className, children, visible, onClickCover, PositionVer = "bottom", PositionHor = "right", ...rest }: Props) => {
	const refCover = useRef<HTMLDivElement>(null);
	const refItems = useRef<HTMLDivElement>(null);
	const refButton = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
	const [isItemsOpen, setIsItemsOpen] = useState(false);

	useLayoutEffect(() => {
		if (refButton.current && refCover.current && refItems.current && visible) {
			const rectCover = refCover.current.getBoundingClientRect();
			const rectItems = refItems.current.getBoundingClientRect();
			const rectButton = refButton.current.getBoundingClientRect();

			const verMap: { [K in PositionVer]: number } = {
				top: rectButton.top - rectItems.height,
				middle: rectButton.top + rectButton.height / 2 - rectItems.height / 2,
				bottom: rectButton.bottom,
			};

			const horMap: { [K in PositionHor]: number } = {
				left: rectButton.left - rectItems.width,
				center: rectButton.left + rectButton.width / 2 - rectItems.width / 2,
				right: rectButton.right,
			};

			setPosition({
				top: verMap[PositionVer] - rectCover.top,
				left: horMap[PositionHor] - rectCover.left,
			});

			setTimeout(() => {
				setIsItemsOpen(true);
			}, 100);
		} else {
			setIsItemsOpen(false);
		}
	}, [visible, PositionVer, PositionHor]);

	const handleOnClickCover = () => {
		onClickCover?.();
	};

	return (
		<S.ContextMenu className={className} {...rest}>
			<ContextPopupMenu.Provider value={{ refCover, refButton, refItems, position, isItemsOpen, isVisible: visible, onClickCover: handleOnClickCover }}>
				{children}
			</ContextPopupMenu.Provider>
		</S.ContextMenu>
	);
};

PopupMenu.Button = Button;
PopupMenu.Items = Items;
