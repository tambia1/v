import { type HTMLAttributes, type ReactNode, type RefObject, useLayoutEffect, useRef, useState } from "react";
import { List } from "../list/List";
import * as S from "./ContextMenu.styles";
import { Item } from "./components/item/Item";

export type PositionVer = "top" | "middle" | "bottom";
export type PositionHor = "left" | "center" | "right";

export type Props = HTMLAttributes<HTMLDivElement> & {
	className?: string;
	children: ReactNode;
	visible: boolean;
	onClickCover?: () => void;
	refButton: RefObject<HTMLElement>;
	PositionVer?: PositionVer;
	PositionHor?: PositionHor;
};

export const ContextMenu = ({ className, children, visible, onClickCover, refButton, PositionVer = "bottom", PositionHor = "right", ...rest }: Props) => {
	const refCover = useRef<HTMLDivElement>(null);
	const refItems = useRef<HTMLDivElement>(null);
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
	}, [refButton, visible, PositionVer, PositionHor]);

	const handleOnClick = () => {
		onClickCover?.();
	};

	return (
		<S.ContextMenu ref={refCover} className={className} onClick={handleOnClick} $visible={visible} {...rest}>
			<S.Items ref={refItems} $left={position.left} $top={position.top}>
				<S.ItemsContainer $isOpen={isItemsOpen}>
					<List>{children}</List>
				</S.ItemsContainer>
			</S.Items>
		</S.ContextMenu>
	);
};

ContextMenu.Item = Item;
