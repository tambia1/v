import type { InputHTMLAttributes } from "react";
import * as S from "./Input.styles";

export type Props = InputHTMLAttributes<HTMLInputElement> & {
	className?: string;
	value: string;
	placeholder?: string;
	disabled?: boolean;
	onTextChange?: (content: string) => void;
	onPressEnter?: () => void;
};

export const Input = ({ className, value, placeholder, disabled, onTextChange, onPressEnter, ...rest }: Props) => {
	const handleTextChange = (e: React.FormEvent<HTMLInputElement>) => {
		onTextChange?.(e.currentTarget.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			onPressEnter?.();
		}
	};

	return (
		<S.Input
			className={className}
			value={value}
			placeholder={placeholder}
			type="text"
			disabled={disabled}
			onChange={handleTextChange}
			onKeyDown={handleKeyDown}
			{...rest}
		/>
	);
};
