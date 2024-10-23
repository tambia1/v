import { type HTMLAttributes, type ReactNode, useState } from "react";
import * as S from "./Select.styles";
import { Display } from "./components/display/Display";
import { Options } from "./components/options/Options";
import { ContextSelect } from "./context/UseContextSelect";

export type Props = HTMLAttributes<HTMLDivElement> & {
	className?: string;
	children: ReactNode[];
	onClickOption: (index: number) => void;
};

export const Select = ({ className, children, onClickOption, ...rest }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOnClickDisplay = () => {
		setIsOpen(!isOpen);
	};

	const handleOnClickOption = (index: number) => {
		onClickOption(index);
		setIsOpen(false);
	};

	return (
		<S.Select className={className} {...rest}>
			<ContextSelect.Provider value={{ isOpen, setIsOpen, onClickDisplay: handleOnClickDisplay, onClickOption: handleOnClickOption }}>
				{children}
			</ContextSelect.Provider>
		</S.Select>
	);
};

Select.Display = Display;
Select.Options = Options;
