import { type HTMLAttributes, type ReactNode, useEffect, useRef, useState } from "react";
import * as S from "./Select.styles";
import { Display } from "./components/display/Display";
import { Items } from "./components/items/Items";
import { ContextSelect } from "./context/UseContextSelect";

export type Props = HTMLAttributes<HTMLDivElement> & {
	className?: string;
	children: ReactNode[];
	onClickItem: (index: number, value: string) => void;
	isCloseOnSelectItem?: boolean;
};

export const Select = ({ className, children, isCloseOnSelectItem = true, onClickItem, ...rest }: Props) => {
	const refSelect = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleOnClickOutside = (e: MouseEvent) => {
			if (isOpen && refSelect.current && !refSelect.current.contains(e.target as Node)) {
				setTimeout(() => {
					setIsOpen(false);
				}, 10);
			}
		};

		document.addEventListener("mouseup", handleOnClickOutside);

		return () => {
			document.removeEventListener("mouseup", handleOnClickOutside);
		};
	}, [isOpen]);

	const handleOnClickDisplay = () => {
		setIsOpen(!isOpen);
	};

	const handleOnClickItem = (e: React.MouseEvent, index: number, item: ReactNode) => {
		e.stopPropagation();

		if (isCloseOnSelectItem) {
			setIsOpen(false);
		}

		const value = (item as React.ReactElement).props.value;
		onClickItem(index, value);
	};

	return (
		<S.Select ref={refSelect} className={className} {...rest}>
			<ContextSelect.Provider value={{ isOpen, setIsOpen, onClickDisplay: handleOnClickDisplay, onClickItem: handleOnClickItem }}>
				{children}
			</ContextSelect.Provider>
		</S.Select>
	);
};

Select.Display = Display;
Select.Items = Items;
