import { type HTMLAttributes, type ReactNode, useEffect, useState } from "react";
import * as S from "./Select.styles";
import { Display } from "./components/display/Display";
import { Items } from "./components/items/Items";
import { ContextSelect } from "./context/UseContextSelect";

export type Props = HTMLAttributes<HTMLDivElement> & {
	className?: string;
	children: ReactNode[];
	onClickItem: (index: number) => void;
};

export const Select = ({ className, children, onClickItem, ...rest }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleOnClickOutside = () => {
			if (isOpen) {
				setTimeout(() => {
					if (isOpen) {
						setIsOpen(false);
					}
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

	const handleOnClickItem = (event: React.MouseEvent, index: number) => {
		event.stopPropagation();
		onClickItem(index);
		setIsOpen(false);
	};

	return (
		<S.Select className={className} {...rest}>
			<ContextSelect.Provider value={{ isOpen, setIsOpen, onClickDisplay: handleOnClickDisplay, onClickItem: handleOnClickItem }}>
				{children}
			</ContextSelect.Provider>
		</S.Select>
	);
};

Select.Display = Display;
Select.Items = Items;
