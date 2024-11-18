import type { InputHTMLAttributes } from "react";
import * as S from "./Input.styles";

const sizes = {
	s: "5rem",
	m: "12rem",
	l: "25rem",
} as const;

export type ISize = keyof typeof sizes;
export type ITextAlign = "left" | "center" | "right";

export type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
	className?: string;
	value: string;
	placeholder?: string;
	disabled?: boolean;
	size?: ISize;
	textAlign?: ITextAlign;
	onTextChange?: (content: string) => void;
	onPressEnter?: () => void;
};

export const Input = ({ className, value, placeholder, disabled, size = "l", textAlign = "left", onTextChange, onPressEnter, ...rest }: Props) => {
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
			$width={sizes[size]}
			$textALign={textAlign}
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
