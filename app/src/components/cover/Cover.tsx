import { type HTMLAttributes, type ReactNode, type RefObject, useLayoutEffect, useRef, useState } from "react";
import * as S from "./Cover.styles";

export type Props = HTMLAttributes<HTMLDivElement> & {
	className?: string;
	children: ReactNode;
	visible: boolean;
	onClickCover?: () => void;
	refButton: RefObject<HTMLElement>;
};

export const Cover = ({ className, children, visible, onClickCover, refButton, ...rest }: Props) => {
	const refCover = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
	const [isItemsOpen, setIsItemsOpen] = useState(false);

	useLayoutEffect(() => {
		if (refButton.current && refCover.current && visible) {
			const coverRect = refCover.current.getBoundingClientRect();
			const buttonRect = refButton.current.getBoundingClientRect();

			setPosition({
				top: buttonRect.bottom - coverRect.top,
				left: buttonRect.left - coverRect.left + refButton.current.clientWidth,
			});

			setTimeout(() => {
				setIsItemsOpen(true);
			}, 100);
		} else {
			setIsItemsOpen(false);
		}
	}, [refButton.current, visible]);

	const handleOnClick = () => {
		onClickCover?.();
	};

	return (
		<S.Cover ref={refCover} className={className} onClick={handleOnClick} $visible={visible} {...rest}>
			<S.Items $left={position.left} $top={position.top}>
				<S.ItemsContainer $isOpen={isItemsOpen}>{children}</S.ItemsContainer>
			</S.Items>
		</S.Cover>
	);
};
