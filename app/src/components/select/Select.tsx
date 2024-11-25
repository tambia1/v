import { type HTMLAttributes, type ReactNode, useEffect, useRef, useState } from "react";
import * as S from "./Select.styles";
import { Display } from "./components/display/Display";
import { Items } from "./components/items/Items";
import { ContextSelect } from "./context/UseContextSelect";

const sizes = {
	xs: "5rem",
	s: "10rem",
	m: "15rem",
	l: "20rem",
	xl: "28rem",
} as const;

export type ISize = keyof typeof sizes;

export type Props = HTMLAttributes<HTMLDivElement> & {
	className?: string;
	children: ReactNode[];
	onClickItem: (index: number, value: string) => void;
	isCloseOnSelectItem?: boolean;
	size?: ISize;
};

export const Select = ({ className, children, isCloseOnSelectItem = true, onClickItem, size = "m", ...rest }: Props) => {
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
		<S.Select ref={refSelect} className={className} $width={sizes[size]} {...rest}>
			<ContextSelect.Provider value={{ isOpen, setIsOpen, onClickDisplay: handleOnClickDisplay, onClickItem: handleOnClickItem }}>
				{children}
			</ContextSelect.Provider>
		</S.Select>
	);
};

Select.Display = Display;
Select.Items = Items;
